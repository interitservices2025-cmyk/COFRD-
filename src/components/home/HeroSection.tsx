import React from 'react';
import Link from 'next/link';
import { Ticket, ArrowRight, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';
import HeroCardImage from './HeroCardImage';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-20 lg:py-28">
      {/* Motifs de fond décoratifs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Halo de lumière artistique */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Colonne texte (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Badge institutionnel */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b365d]/80 border border-[#1b365d] text-blue-100 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-[#f97316]" />
              <span>Depuis 1984 · Région de Durham (Ontario)</span>
            </div>

            {/* Titre officiel demandé par le cahier des charges */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Au cœur de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-100 to-[#f97316]">francophonie</span> de Durham
            </h1>

            {/* Texte officiel */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Le COFRD rassemble et accompagne les communautés francophones et francophiles de la région de Durham grâce à ses programmes, ses services et sa programmation artistique et culturelle.
            </p>

            {/* Boutons d'action prioritaires */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/evenements"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-base px-7 py-4 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all"
              >
                <Ticket className="w-5 h-5 text-white" />
                <span>Explorer les événements</span>
              </Link>

              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-base px-7 py-4 rounded-xl border border-slate-700 hover:border-slate-500 transition-all backdrop-blur-xs"
              >
                <span>Découvrir nos services</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Reassurance et points clés */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-center sm:text-left">
              <div>
                <div className="text-2xl font-black text-white">40+</div>
                <div className="text-xs text-slate-400">Années d'action</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#f97316]">31+</div>
                <div className="text-xs text-slate-400">Organismes membres</div>
              </div>
              <div>
                <div className="text-2xl font-black text-sky-400">100%</div>
                <div className="text-xs text-slate-400">En français</div>
              </div>
            </div>
          </div>

          {/* Colonne visuelle (5 cols) : Carte culturelle & coup de projecteur */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Carte principale */}
              <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    Programmation officielle
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Saison 2026-2027</span>
                </div>

                {/* Visuel de la carte d'accueil / affiche officielle */}
                <HeroCardImage />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Région de Durham · 5 grands spectacles francophones</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zale Seck, Bilinguish Boys, Céleste Lévis, Les Patenteuses et Donas Music. Réservez vos billets et célébrez la vitalité culturelle francophone.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Billetterie</span>
                    <span className="font-extrabold text-amber-400 text-base">Ouverte en ligne</span>
                  </div>
                  <Link
                    href="/evenements"
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl transition shadow-md shadow-amber-500/20"
                  >
                    <span>Voir les spectacles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Badge flottant Organisme Parapluie */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white text-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Organisme Parapluie</div>
                  <div className="text-sm font-extrabold text-slate-900">31 Organismes Fédérés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
