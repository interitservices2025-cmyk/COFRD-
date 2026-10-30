'use client';

import React, { useState } from 'react';
import { EventItem } from '@/lib/types';
import { formatCurrencyCAD, formatDateFrench, formatTimeFrench } from '@/lib/utils';
import { Calendar, MapPin, Ticket, Users, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import BookingModal from '@/components/events/BookingModal';

interface Props {
  event: EventItem;
}

export default function EventDetailClient({ event }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const remaining = event.capacity - event.reservedCount;
  const isSoldOut = remaining <= 0;
  const isAlmostFull = remaining > 0 && remaining <= 15;
  const fillPercent = Math.round((event.reservedCount / event.capacity) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la programmation
            </Link>
            <span className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              {event.category}
              {event.artist && ` · ${event.artist}`}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="text-slate-300 mt-2 text-lg">{event.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">À propos de l'événement</h2>
              <div className="text-slate-600 leading-relaxed space-y-4 text-sm">
                {(event.longDescription || event.description).split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Tarification */}
            {!event.isFree && event.priceCategories && event.priceCategories.length > 0 && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-5">Tarification</h2>
                <div className="space-y-3">
                  {event.priceCategories.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{cat.name}</div>
                        {cat.description && (
                          <div className="text-xs text-slate-500 mt-0.5">{cat.description}</div>
                        )}
                      </div>
                      <span className="font-extrabold text-blue-700 text-base">
                        {formatCurrencyCAD(cat.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {event.notes && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 text-sm mb-1">Information pratique</p>
                    <p className="text-amber-800 text-sm">{event.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panneau latéral de réservation */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-24">
              {/* Tarif badge */}
              <div className="text-center mb-5 pb-5 border-b border-slate-100">
                {event.isFree ? (
                  <span className="text-3xl font-black text-emerald-600">Gratuit</span>
                ) : (
                  <>
                    <span className="text-xs text-slate-500 block mb-1">À partir de</span>
                    <span className="text-3xl font-black text-blue-700">
                      {formatCurrencyCAD(event.priceMin || 0)}
                    </span>
                  </>
                )}
              </div>

              {/* Infos */}
              <div className="space-y-3 mb-5 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">{formatDateFrench(event.dateStart)}</div>
                    <div className="text-xs text-slate-500">à {formatTimeFrench(event.dateStart)}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">{event.locationName}</div>
                    <div className="text-xs text-slate-500">{event.address}, {event.city}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-600 text-xs">
                    {event.registrationDeadline
                      ? `Inscriptions jusqu'au ${formatDateFrench(event.registrationDeadline)}`
                      : "Inscription jusqu'à l'événement"}
                  </span>
                </div>
              </div>

              {/* Jauge de capacité */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Capacité : {event.capacity} places</span>
                  </div>
                  <span className={`font-bold ${isSoldOut ? 'text-rose-600' : isAlmostFull ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {isSoldOut ? 'Complet' : `${remaining} restantes`}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isSoldOut ? 'bg-rose-500' : isAlmostFull ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                disabled={isSoldOut}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-extrabold text-sm py-4 rounded-2xl shadow-md transition disabled:opacity-40"
              >
                <Ticket className="w-4 h-4 text-amber-300" />
                {isSoldOut ? 'Événement complet' : event.isFree ? "S'inscrire gratuitement" : 'Choisir mes billets'}
              </button>

              <p className="text-center text-xs text-slate-400 mt-3">
                Confirmation instantanée par courriel · COFRD
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        event={event}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
