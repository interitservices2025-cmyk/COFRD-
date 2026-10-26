import React from 'react';
import Link from 'next/link';
import { HeartHandshake, UserPlus, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CommunitySection() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#1b365d] font-extrabold text-xs tracking-wider uppercase bg-[#1b365d]/10 border border-[#1b365d]/20 px-3.5 py-1.5 rounded-full">
            S'impliquer &amp; Collaborer
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Faites rayonner la francophonie à nos côtés
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Que vous soyez citoyen, artiste, professionnel ou organisme, plusieurs opportunités s’offrent à vous pour soutenir la vitalité francophone à Durham.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carte 1 : Devenir Bénévole */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#f97316]/10 text-[#f97316] flex items-center justify-center">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Devenir Bénévole
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Le bénévolat au COFRD est une occasion unique de s’engager au sein d’une équipe dynamique tout en contribuant activement à la vie culturelle locale.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Accueil et animation lors des spectacles de la saison</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Soutien logistique, TI et communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Accompagnement des nouveaux arrivants et ateliers</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/contact?sujet=benevolat"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#1b365d] hover:bg-[#11233d] text-white font-bold text-sm py-3.5 rounded-xl transition"
              >
                <span>Proposer ma candidature bénévole</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Carte 2 : Devenir Membre ou Partenaire */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1b365d]/10 text-[#1b365d] flex items-center justify-center">
                <UserPlus className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Devenir Membre ou Partenaire
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rejoignez le réseau des 31 organismes membres du COFRD. Participez aux tables de concertation, bénéficiez de notre visibilité et unissez vos forces.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1b365d] shrink-0" />
                  <span>Droit de vote et participation aux assemblées générales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1b365d] shrink-0" />
                  <span>Relais de vos événements dans notre calendrier régional</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1b365d] shrink-0" />
                  <span>Projets conjoints financés et partenariats stratégiques</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/contact?sujet=adhesion"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-sm py-3.5 rounded-xl shadow-md shadow-orange-500/20 transition"
              >
                <span>Faire une demande d'affiliation membre</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
