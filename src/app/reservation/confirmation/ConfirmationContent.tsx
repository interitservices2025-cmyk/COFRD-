'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReservationParticipant } from '@/lib/types';
import { formatCurrencyCAD, formatDateFrench, formatTimeFrench } from '@/lib/utils';
import { CheckCircle, Ticket, Calendar, Mail, Printer, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [reservation, setReservation] = useState<ReservationParticipant | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const error = code ? fetchError : 'Code de réservation manquant.';

  useEffect(() => {
    if (!code) return;

    fetch(`/api/reservations?code=${encodeURIComponent(code)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReservation(data.reservation);
        else setFetchError(data.error || 'Réservation introuvable.');
      })
      .catch(() => setFetchError('Erreur de connexion au serveur.'));
  }, [code]);

  if (error || (!reservation && code)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h1 className="text-2xl font-black text-slate-900">Réservation introuvable</h1>
          <p className="text-slate-600 text-sm">{error}</p>
          <Link href="/evenements" className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-800 transition">
            Retour aux événements
          </Link>
        </div>
      </div>
    );
  }

  if (!reservation) return null;

  const isPending = reservation.status === 'pending';
  const isCancelled = reservation.status === 'cancelled';
  const statusLabel = isCancelled ? 'Annulé' : isPending ? 'En attente de paiement' : '✓ Confirmé';
  const statusClass = isCancelled
    ? 'bg-rose-100 text-rose-700'
    : isPending
      ? 'bg-amber-100 text-amber-800'
      : 'bg-emerald-100 text-emerald-700';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-500/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {isCancelled ? 'Réservation annulée' : isPending ? 'Réservation reçue' : 'Réservation confirmée !'}
          </h1>
          <p className="text-slate-300 text-lg">
            Merci <strong className="text-white">{reservation.fullName.split(' ')[0]}</strong>{' '}
            {isCancelled
              ? '— cette réservation n’est plus valide.'
              : isPending
                ? '— votre place est retenue, le paiement est en cours de validation.'
                : '— votre billet est prêt.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 sm:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">Billet officiel COFRD</div>
                <div className="text-xl sm:text-2xl font-black">{reservation.eventTitle}</div>
              </div>
              <Ticket className="w-10 h-10 text-amber-300 shrink-0" />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-300" />
                <span>{formatDateFrench(reservation.eventDate)} à {formatTimeFrench(reservation.eventDate)}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Code de réservation</div>
              <div className="text-3xl font-black text-blue-700 tracking-widest font-mono">{reservation.reservationCode}</div>
              <div className="text-xs text-slate-400 mt-2">Présentez ce code à l'entrée de l'événement</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-slate-500 font-semibold mb-1">Participant</div>
                <div className="font-bold text-slate-900">{reservation.fullName}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold mb-1">Courriel</div>
                <div className="font-bold text-slate-900 text-xs break-all">{reservation.email}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold mb-1">Billets</div>
                <div className="font-bold text-slate-900">{reservation.ticketCount} {reservation.ticketCount === 1 ? 'billet' : 'billets'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold mb-1">Catégorie</div>
                <div className="font-bold text-slate-900">{reservation.categoryName}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold mb-1">Montant</div>
                <div className="font-black text-xl text-blue-700">{reservation.totalAmount === 0 ? 'Gratuit' : formatCurrencyCAD(reservation.totalAmount)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold mb-1">Statut</div>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${statusClass}`}>{statusLabel}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">
                  {isPending ? 'Confirmation à venir par courriel' : 'Confirmation par courriel'}
                </p>
                <p className="text-xs text-blue-700">
                  {isPending
                    ? <>Votre billet sera envoyé à <strong>{reservation.email}</strong> dès la validation du paiement. Rafraîchissez cette page pour vérifier.</>
                    : <>Un courriel de confirmation est envoyé à <strong>{reservation.email}</strong>. Pensez à vérifier vos courriels indésirables.</>}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => window.print()} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-slate-800 transition">
                <Printer className="w-4 h-4" />
                Imprimer le billet
              </button>
              <Link href="/evenements" className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-blue-800 transition">
                <span>Voir d'autres événements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-400">
            COFRD — 57 rue Simcoe S, Suite 2D, Oshawa, ON · (905) 434-7676 · cofrd.org
          </div>
        </div>
      </div>
    </div>
  );
}
