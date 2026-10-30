'use client';

import React, { useState } from 'react';
import { EventItem, EventCategory } from '@/lib/types';
import { formatCurrencyCAD, formatDateFrench, formatTimeFrench } from '@/lib/utils';
import { Calendar, MapPin, Ticket, Filter, Sparkles, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import BookingModal from '@/components/events/BookingModal';

const CATEGORIES: { label: string; value: EventCategory | 'Tous' }[] = [
  { label: 'Tous les événements', value: 'Tous' },
  { label: 'Spectacles', value: 'Spectacle' },
  { label: 'Célébrations', value: 'Célébration' },
  { label: 'Ateliers', value: 'Atelier' },
  { label: 'Jeunesse', value: 'Jeunesse' },
  { label: 'Littérature', value: 'Littérature' },
  { label: 'Communautaire', value: 'Communautaire' },
];

interface Props {
  events: EventItem[];
}

export default function EventsClientPage({ events }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'Tous'>('Tous');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = events.filter((e) => {
    if (selectedCategory !== 'Tous' && e.category !== selectedCategory) return false;
    if (showFreeOnly && !e.isFree) return false;
    return true;
  });

  const handleBook = (evt: EventItem) => {
    setSelectedEvent(evt);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-20 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Saison culturelle 2026–2027
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Programmation culturelle <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">&amp; Billetterie</span>
          </h1>
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg">
            Spectacles, concerts, ateliers et célébrations francophones dans toute la région de Durham. Réservez directement en ligne.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Filtres */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5 sm:p-4 mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">Filtrer :</span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold border transition ${
                  selectedCategory === cat.value
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 pt-1 sm:pt-0">
            <input
              type="checkbox"
              checked={showFreeOnly}
              onChange={(e) => setShowFreeOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-blue-700"
            />
            Gratuits seulement
          </label>
        </div>

        {/* Résultats */}
        <p className="text-sm text-slate-500 mb-6 font-medium">
          {filtered.length} événement{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((evt) => {
            const remaining = evt.capacity - evt.reservedCount;
            const isSoldOut = remaining <= 0;
            const isAlmostFull = remaining > 0 && remaining <= 15;

            return (
              <div
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 flex flex-col hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-white">
                      {evt.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${
                      evt.isFree ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-slate-950'
                    }`}>
                      {evt.isFree ? 'Gratuit' : `Dès ${formatCurrencyCAD(evt.priceMin || 0)}`}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-xs font-semibold text-amber-300">
                      {formatDateFrench(evt.dateStart)} · {formatTimeFrench(evt.dateStart)}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition">
                    {evt.title}
                  </h2>
                  {evt.artist && (
                    <p className="text-xs font-semibold text-blue-600 mb-2">{evt.artist}</p>
                  )}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{evt.locationName} · {evt.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {isSoldOut ? (
                          <strong className="text-rose-600">Complet</strong>
                        ) : isAlmostFull ? (
                          <strong className="text-amber-600">{remaining} places restantes</strong>
                        ) : (
                          `${remaining} places disponibles`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <button
                      onClick={() => handleBook(evt)}
                      disabled={isSoldOut}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold py-3 rounded-xl shadow-sm transition disabled:opacity-40"
                    >
                      <Ticket className="w-3.5 h-3.5 text-amber-300" />
                      {isSoldOut ? 'Complet' : evt.isFree ? "S'inscrire" : 'Réserver'}
                    </button>
                    <Link
                      href={`/evenements/${evt.slug}`}
                      className="p-3 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition"
                      title="Voir les détails"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-semibold">Aucun événement ne correspond à vos filtres.</p>
            <p className="text-sm mt-2">Essayez d'autres critères ou consultez la liste complète.</p>
            <button
              onClick={() => { setSelectedCategory('Tous'); setShowFreeOnly(false); }}
              className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition"
            >
              Voir tous les événements
            </button>
          </div>
        )}
      </div>

      <BookingModal
        event={selectedEvent}
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedEvent(null); }}
      />
    </div>
  );
}
