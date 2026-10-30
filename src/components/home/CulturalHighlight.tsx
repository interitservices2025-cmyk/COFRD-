'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EventItem } from '@/lib/types';
import { formatCurrencyCAD, formatDateFrench, formatTimeFrench } from '@/lib/utils';
import { Calendar, MapPin, Ticket, ArrowRight, Sparkles, Users } from 'lucide-react';
import BookingModal from '@/components/events/BookingModal';

interface CulturalHighlightProps {
  events: EventItem[];
}

export default function CulturalHighlight({ events }: CulturalHighlightProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Événements à venir
  const upcomingEvents = events.slice(0, 3);

  const handleBook = (event: EventItem) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[#f97316] font-extrabold text-xs tracking-wider uppercase bg-[#f97316]/10 border border-[#f97316]/20 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Saison Artistique &amp; Culturelle 2026-2027
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Prochains rendez-vous culturels francophones
            </h2>
            <p className="text-slate-600 text-base">
              Spectacles vivants, concerts, ateliers et célébrations pour rassembler la communauté à travers toute la région de Durham.
            </p>
          </div>

          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1b365d] hover:text-[#11233d] group"
          >
            <span>Consulter le calendrier complet</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grille des événements ou état vide gracieux */}
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border border-slate-200">
            <Calendar className="w-12 h-12 text-[#1b365d]/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Aucun événement public n'est programmé pour le moment
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-5">
              Notre programmation culturelle est en cours d'actualisation. Consultez notre billetterie ou revenez très bientôt !
            </p>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 bg-[#1b365d] hover:bg-[#11233d] text-white text-xs font-bold py-3 px-5 rounded-xl shadow-xs transition"
            >
              <span>Consulter tous les événements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {upcomingEvents.map((evt) => {
              const remaining = evt.capacity - evt.reservedCount;
              const isSoldOut = remaining <= 0;

              return (
                <div
                  key={evt.id}
                  className="bg-slate-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group md:last:col-span-2 lg:last:col-span-1"
                >
                  <div>
                    {/* Image avec badges superposés */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        src={evt.imageUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      {/* Badge catégorie */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-900/90 text-white backdrop-blur-xs">
                          {evt.category}
                        </span>
                      </div>

                      {/* Badge tarif */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-md ${
                          evt.isFree ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-slate-950'
                        }`}>
                          {evt.isFree ? 'Gratuit' : `Dès ${formatCurrencyCAD(evt.priceMin || 0)}`}
                        </span>
                      </div>

                      {/* Date sur l'image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-xs font-semibold text-amber-300 block">
                          {formatDateFrench(evt.dateStart)} · {formatTimeFrench(evt.dateStart)}
                        </span>
                      </div>
                    </div>

                    {/* Contenu textuel */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>

                      <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{evt.locationName} ({evt.city})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>
                            {isSoldOut ? (
                              <strong className="text-rose-600 font-bold">Complet</strong>
                            ) : (
                              `${remaining} places disponibles sur ${evt.capacity}`
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleBook(evt)}
                        disabled={isSoldOut}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1b365d] hover:bg-[#11233d] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition disabled:opacity-40"
                      >
                        <Ticket className="w-4 h-4 text-[#f97316]" />
                        <span>{isSoldOut ? 'Complet' : 'Réserver'}</span>
                      </button>
                      <Link
                        href={`/evenements/${evt.slug}`}
                        className="p-3 text-slate-700 hover:text-[#1b365d] hover:bg-slate-200/60 rounded-xl transition"
                        title="Voir les détails complets"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de réservation */}
      <BookingModal
        event={selectedEvent}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </section>
  );
}
