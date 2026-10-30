'use client';

import React, { useState } from 'react';
import { EventItem } from '@/lib/types';
import { formatCurrencyCAD, formatDateFrench, formatTimeFrench } from '@/lib/utils';
import { X, Ticket, Calendar, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BookingModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ event, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !event) return null;

  const remainingSeats = event.capacity - event.reservedCount;
  const isSoldOut = remainingSeats <= 0;

  // Calcul du prix
  let unitPrice = 0;
  if (!event.isFree) {
    if (selectedCategory && event.priceCategories) {
      const cat = event.priceCategories.find((c) => c.name === selectedCategory);
      unitPrice = cat ? cat.price : (event.priceMin || 0);
    } else {
      unitPrice = event.priceMin || 0;
    }
  }
  const totalAmount = unitPrice * ticketCount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          fullName,
          email,
          phone,
          ticketCount,
          categoryName: selectedCategory || (event.isFree ? 'Gratuit' : 'Standard'),
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Une erreur est survenue lors de l'enregistrement.");
      }

      // Billet payant avec Stripe : redirection vers la page de paiement sécurisée
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      // Redirection vers la page de confirmation avec code de réservation
      onClose();
      router.push(`/reservation/confirmation?code=${data.reservation.reservationCode}`);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la réservation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-slate-100 my-auto max-h-[92dvh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* En-tête */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Réservation & Billetterie Officielle</span>
          </div>
          <h2 id="modal-title" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {event.title}
          </h2>
          <div className="mt-2 text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatDateFrench(event.dateStart)} à {formatTimeFrench(event.dateStart)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{event.locationName} · {event.city}</span>
            </div>
          </div>
        </div>

        {/* Indicateur de places restantes */}
        <div className={`p-3 rounded-xl mb-6 text-xs flex flex-wrap items-center justify-between gap-1.5 ${
          isSoldOut ? 'bg-rose-50 text-rose-700 border border-rose-200' :
          remainingSeats < 15 ? 'bg-amber-50 text-amber-800 border border-amber-200' :
          'bg-emerald-50 text-emerald-800 border border-emerald-200'
        }`}>
          <span className="font-semibold">
            {isSoldOut ? 'Cet événement est complet' : `${remainingSeats} places encore disponibles`}
          </span>
          <span className="font-bold">
            {event.isFree ? 'Entrée Gratuite' : `Tarif : ${formatCurrencyCAD(unitPrice)}`}
          </span>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {isSoldOut ? (
          <div className="text-center py-6 space-y-3">
            <p className="text-sm text-slate-600">
              Les réservations pour cet événement sont closes car la capacité maximale a été atteinte.
            </p>
            <p className="text-xs text-slate-500">
              Pour toute question ou demande de désistement, contactez le COFRD au (905) 434-7676.
            </p>
            <button
              onClick={onClose}
              className="w-full mt-4 bg-slate-900 text-white font-bold text-sm py-3 rounded-xl"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sélection de tarif si payant */}
            {!event.isFree && event.priceCategories && event.priceCategories.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Catégorie de billet
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  required
                >
                  <option value="">Sélectionnez un tarif</option>
                  {event.priceCategories.map((cat, idx) => (
                    <option key={idx} value={cat.name}>
                      {cat.name} — {formatCurrencyCAD(cat.price)} {cat.description ? `(${cat.description})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Nombre de places */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nombre de places
                </label>
                <select
                  value={ticketCount}
                  onChange={(e) => setTicketCount(parseInt(e.target.value, 10))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num} disabled={num > remainingSeats}>
                      {num} {num === 1 ? 'place' : 'places'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Total à payer
                </label>
                <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm font-extrabold text-slate-900">
                  {event.isFree ? '0,00 $ (Gratuit)' : formatCurrencyCAD(totalAmount)}
                </div>
              </div>
            </div>

            {/* Nom complet */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nom complet du participant <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Marie-Claude Gagnon"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                required
              />
            </div>

            {/* Courriel */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Adresse courriel <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex : mc.gagnon@courriel.ca"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                required
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Votre confirmation et billet électronique seront transmis à cette adresse.
              </span>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Numéro de téléphone <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex : (905) 555-0123"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                required
              />
            </div>

            {/* Remarques / besoins d'accessibilité */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Besoins d'accessibilité ou commentaires (facultatif)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex : Accès fauteuil roulant, etc."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Bouton de confirmation */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirmation en cours...</span>
                  </>
                ) : event.isFree ? (
                  <span>Confirmer mon inscription gratuite</span>
                ) : (
                  <span>Valider et procéder au paiement ({formatCurrencyCAD(totalAmount)})</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
