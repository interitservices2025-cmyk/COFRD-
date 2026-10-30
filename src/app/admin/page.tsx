'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EventItem, ReservationParticipant, NewsArticle } from '@/lib/types';
import { formatCurrencyCAD, formatDateFrench } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Ticket,
  Download,
  Eye,
  Trash2,
  Plus,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  ShieldCheck,
  Search,
  X,
  AlertCircle,
  Loader2
} from 'lucide-react';

type AdminTab = 'overview' | 'events' | 'reservations' | 'news';

export default function AdminPage() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch('/api/admin/session', { method: 'DELETE' });
    router.replace('/admin/login');
    router.refresh();
  };
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [reservations, setReservations] = useState<ReservationParticipant[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [reservationSearch, setReservationSearch] = useState('');
  const [selectedEventFilter, setSelectedEventFilter] = useState('');

  // Modal nouvel événement
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [newEvent, setNewEvent] = useState({
    title: '',
    subtitle: '',
    artist: '',
    category: 'Spectacle',
    dateStart: '',
    dateEnd: '',
    locationName: '',
    address: '',
    city: 'Oshawa, ON',
    postalCode: '',
    capacity: 100,
    isFree: true,
    priceMin: 0,
    description: '',
    notes: '',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    status: 'published' as const,
  });

  const fetchData = async () => {
    try {
      const [evtRes, resRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/reservations'),
      ]);
      const evtData = await evtRes.json();
      const resData = await resRes.json();
      if (evtData.success) setEvents(evtData.events);
      if (resData.success) setReservations(resData.reservations);
    } catch (err) {
      console.error('Erreur de chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setLoading(true);
    void fetchData();
  };

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch('/api/events').then((r) => r.json()),
      fetch('/api/reservations').then((r) => r.json()),
    ])
      .then(([evtData, resData]) => {
        if (cancelled) return;
        if (evtData.success) setEvents(evtData.events);
        if (resData.success) setReservations(resData.reservations);
      })
      .catch((err) => console.error('Erreur de chargement:', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalRevenue = reservations
    .filter((r) => r.isPaid && r.status === 'confirmed')
    .reduce((acc, r) => acc + r.totalAmount, 0);

  const confirmedCount = reservations.filter((r) => r.status === 'confirmed').length;
  const publishedEvents = events.filter((e) => e.status === 'published').length;

  const exportCSV = (eventId?: string) => {
    const data = eventId ? reservations.filter((r) => r.eventId === eventId) : reservations;
    const headers = ['Code', 'Événement', 'Nom', 'Courriel', 'Téléphone', 'Billets', 'Catégorie', 'Montant', 'Statut', 'Date'];
    const rows = data.map((r) => [
      r.reservationCode,
      `"${r.eventTitle.replace(/"/g, '""')}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      r.email,
      r.phone,
      r.ticketCount,
      `"${r.categoryName || ''}"`,
      formatCurrencyCAD(r.totalAmount),
      r.status,
      new Date(r.createdAt).toLocaleDateString('fr-CA')
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cofrd_reservations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Confirmer la suppression définitive de cet événement ?')) return;
    const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
    if ((await res.json()).success) fetchData();
  };

  const handleTogglePublish = async (event: EventItem) => {
    const newStatus = event.status === 'published' ? 'draft' : 'published';
    const res = await fetch(`/api/events?id=${event.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if ((await res.json()).success) fetchData();
  };

  const handleCancelReservation = async (id: string) => {
    if (!confirm('Confirmer l\'annulation de cette réservation ?')) return;
    const res = await fetch(`/api/reservations?id=${id}`, { method: 'DELETE' });
    if ((await res.json()).success) fetchData();
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    setCreateLoading(true);

    try {
      const slug = newEvent.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + `-${new Date().getFullYear()}`;

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newEvent,
          slug,
          capacity: Number(newEvent.capacity),
          priceMin: newEvent.isFree ? 0 : Number(newEvent.priceMin),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de la création');
      }

      setCreateModalOpen(false);
      setNewEvent({
        title: '',
        subtitle: '',
        artist: '',
        category: 'Spectacle',
        dateStart: '',
        dateEnd: '',
        locationName: '',
        address: '',
        city: 'Oshawa, ON',
        postalCode: '',
        capacity: 100,
        isFree: true,
        priceMin: 0,
        description: '',
        notes: '',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
      });
      fetchData();
    } catch (err: any) {
      setCreateError(err.message || 'Erreur serveur.');
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(reservationSearch.toLowerCase()) ||
      r.reservationCode.toLowerCase().includes(reservationSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(reservationSearch.toLowerCase());
    const matchesEvent = selectedEventFilter ? r.eventId === selectedEventFilter : true;
    return matchesSearch && matchesEvent;
  });

  const tabs = [
    { id: 'overview' as AdminTab, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'events' as AdminTab, label: 'Événements', icon: Calendar },
    { id: 'reservations' as AdminTab, label: 'Participants & Billetterie', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Bannière admin */}
      <div className="bg-slate-900 text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
            <div>
              <span className="font-extrabold text-white text-sm sm:text-lg">Espace Administration — COFRD</span>
              <span className="text-xs text-slate-400 ml-3 hidden md:inline">Portail de gestion interne</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-300 hover:text-white transition px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-slate-800 border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Actualiser</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-300 hover:text-white transition px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-slate-800 border border-slate-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Navigation onglets */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-700 border-blue-700 bg-blue-50/30'
                      : 'text-slate-600 border-transparent hover:text-blue-600 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
            <p className="text-slate-500">Chargement des données en cours…</p>
          </div>
        )}

        {/* ONGLET 1 : VUE D'ENSEMBLE */}
        {!loading && activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { label: 'Événements publiés', value: publishedEvents, sub: `${events.length} au total`, icon: Calendar, color: 'text-blue-600 bg-blue-50' },
                { label: 'Inscriptions confirmées', value: confirmedCount, sub: `${reservations.length} toutes réservations`, icon: Ticket, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Recettes billetterie', value: formatCurrencyCAD(totalRevenue), sub: 'Paiements validés', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
                { label: 'Total places réservées', value: reservations.reduce((a, r) => a + (r.status === 'confirmed' ? r.ticketCount : 0), 0), sub: 'Billets distribués', icon: Users, color: 'text-purple-600 bg-purple-50' },
              ].map((kpi, i) => {
                const Icon = kpi.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${kpi.color} flex items-center justify-center mb-3 sm:mb-4`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">{kpi.value}</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">{kpi.label}</div>
                    <div className="text-xs text-slate-400">{kpi.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Inscriptions récentes */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Dernières inscriptions enregistrées</h2>
                <button
                  onClick={() => exportCSV()}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
                >
                  <Download className="w-4 h-4" />
                  Exporter CSV complet
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-3">Code</th>
                      <th className="text-left px-6 py-3">Participant</th>
                      <th className="text-left px-6 py-3">Événement</th>
                      <th className="text-left px-6 py-3">Billets</th>
                      <th className="text-left px-6 py-3">Montant</th>
                      <th className="text-left px-6 py-3">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reservations.slice(0, 6).map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-3 font-mono text-xs text-blue-700 font-bold">{r.reservationCode}</td>
                        <td className="px-6 py-3">
                          <div className="font-semibold text-slate-900">{r.fullName}</div>
                          <div className="text-xs text-slate-400">{r.email}</div>
                        </td>
                        <td className="px-6 py-3 text-xs text-slate-600 max-w-[200px] truncate">{r.eventTitle}</td>
                        <td className="px-6 py-3 text-slate-700 font-semibold">{r.ticketCount}</td>
                        <td className="px-6 py-3 font-bold text-slate-900">{r.totalAmount === 0 ? 'Gratuit' : formatCurrencyCAD(r.totalAmount)}</td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            r.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                            r.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {r.status === 'confirmed' ? <CheckCircle className="w-3 h-3" /> :
                             r.status === 'cancelled' ? <XCircle className="w-3 h-3" /> :
                             <Clock className="w-3 h-3" />}
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 2 : GESTION DES ÉVÉNEMENTS */}
        {!loading && activeTab === 'events' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900">{events.length} Événements au calendrier</h2>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm transition w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>Nouvel événement</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-3">Événement</th>
                      <th className="text-left px-6 py-3">Date</th>
                      <th className="text-left px-6 py-3">Capacité</th>
                      <th className="text-left px-6 py-3">Inscriptions</th>
                      <th className="text-left px-6 py-3">Statut</th>
                      <th className="text-left px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {events.map((evt) => {
                      const fill = Math.round((evt.reservedCount / evt.capacity) * 100);
                      return (
                        <tr key={evt.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-900 max-w-[220px] truncate">{evt.title}</div>
                            <div className="text-xs text-slate-400">{evt.category} · {evt.city}</div>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-600 whitespace-nowrap">{formatDateFrench(evt.dateStart)}</td>
                          <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{evt.capacity} places</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-900 font-semibold text-xs">{evt.reservedCount}/{evt.capacity}</span>
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${fill >= 90 ? 'bg-rose-500' : fill >= 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${Math.min(100, fill)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                              evt.status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                              evt.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {evt.status === 'published' ? 'Publié' : 'Brouillon'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleTogglePublish(evt)}
                                title={evt.status === 'published' ? 'Passer en brouillon' : 'Publier'}
                                className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => exportCSV(evt.id)}
                                title="Exporter les participants"
                                className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(evt.id)}
                                title="Supprimer"
                                className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 3 : PARTICIPANTS & BILLETTERIE */}
        {!loading && activeTab === 'reservations' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900">{reservations.length} Inscriptions enregistrées</h2>
              <button
                onClick={() => exportCSV()}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm transition w-fit"
              >
                <Download className="w-4 h-4" />
                <span>Exporter tout (CSV)</span>
              </button>
            </div>

            {/* Barre de recherche et filtre */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, code ou courriel..."
                  value={reservationSearch}
                  onChange={(e) => setReservationSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
                />
              </div>

              <div>
                <select
                  value={selectedEventFilter}
                  onChange={(e) => setSelectedEventFilter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
                >
                  <option value="">Tous les événements</option>
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-3">Code</th>
                      <th className="text-left px-6 py-3">Participant</th>
                      <th className="text-left px-6 py-3">Événement</th>
                      <th className="text-left px-6 py-3">Places</th>
                      <th className="text-left px-6 py-3">Montant</th>
                      <th className="text-left px-6 py-3">Statut</th>
                      <th className="text-left px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredReservations.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-3 font-mono text-xs text-blue-700 font-bold whitespace-nowrap">{r.reservationCode}</td>
                        <td className="px-6 py-3">
                          <div className="font-semibold text-slate-900">{r.fullName}</div>
                          <div className="text-xs text-slate-400">{r.email} · {r.phone}</div>
                        </td>
                        <td className="px-6 py-3 text-xs text-slate-600 max-w-[180px] truncate">{r.eventTitle}</td>
                        <td className="px-6 py-3 text-slate-700 font-semibold">{r.ticketCount}</td>
                        <td className="px-6 py-3 font-bold text-slate-900 whitespace-nowrap">
                          {r.totalAmount === 0 ? 'Gratuit' : formatCurrencyCAD(r.totalAmount)}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            r.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                            r.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {r.status === 'confirmed' ? <CheckCircle className="w-3 h-3" /> :
                             r.status === 'cancelled' ? <XCircle className="w-3 h-3" /> :
                             <Clock className="w-3 h-3" />}
                            {r.status === 'confirmed' ? 'Confirmé' : r.status === 'cancelled' ? 'Annulé' : r.status}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          {r.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancelReservation(r.id)}
                              title="Annuler cette réservation"
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL CRÉATION NOUVEL ÉVÉNEMENT */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-100 my-auto max-h-[92dvh] overflow-y-auto">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-black text-slate-900 mb-2">Ajouter un événement</h2>
            <p className="text-xs text-slate-500 mb-6">Renseignez les détails pour l'ajouter à la programmation culturelle.</p>

            {createError && (
              <div className="p-3.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Titre de l'événement *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Ex : Soirée Jazz des Franco-Ontariens"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Catégorie *</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
                  >
                    <option value="Spectacle">Spectacle</option>
                    <option value="Célébration">Célébration</option>
                    <option value="Jeunesse">Jeunesse</option>
                    <option value="Littérature">Littérature</option>
                    <option value="Atelier">Atelier</option>
                    <option value="Communautaire">Communautaire</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Artiste ou Intervenant</label>
                  <input
                    type="text"
                    value={newEvent.artist}
                    onChange={(e) => setNewEvent({ ...newEvent, artist: e.target.value })}
                    placeholder="Ex : Quatuor Jazz & Invités"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Capacité maximale (places) *</label>
                  <input
                    type="number"
                    required
                    min="5"
                    max="1000"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date et heure de début *</label>
                  <input
                    type="datetime-local"
                    required
                    value={newEvent.dateStart}
                    onChange={(e) => setNewEvent({ ...newEvent, dateStart: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lieu de l'événement *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.locationName}
                    onChange={(e) => setNewEvent({ ...newEvent, locationName: e.target.value })}
                    placeholder="Ex : ÉSC Saint-Charles-Garnier"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tarification *</label>
                  <div className="flex items-center gap-4 py-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={newEvent.isFree}
                        onChange={() => setNewEvent({ ...newEvent, isFree: true, priceMin: 0 })}
                      />
                      <span>Gratuit</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={!newEvent.isFree}
                        onChange={() => setNewEvent({ ...newEvent, isFree: false, priceMin: 20 })}
                      />
                      <span>Payant ($ CAD)</span>
                    </label>
                  </div>
                </div>

                {!newEvent.isFree && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Prix régulier ($ CAD) *</label>
                    <input
                      type="number"
                      min="1"
                      value={newEvent.priceMin}
                      onChange={(e) => setNewEvent({ ...newEvent, priceMin: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description détaillée *</label>
                <textarea
                  required
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Présentez l'événement, le programme, les artistes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {createLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Création en cours...</span>
                    </>
                  ) : (
                    <span>Créer et publier l'événement</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
