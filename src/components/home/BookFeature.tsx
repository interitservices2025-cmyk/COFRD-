import React from 'react';
import Link from 'next/link';
import { BookOpen, Download, Sparkles, Heart } from 'lucide-react';

export default function BookFeature() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1b365d] to-[#11233d] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f97316]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 rounded-3xl p-8 sm:p-12 border border-slate-700/80 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Colonne gauche (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f97316]/20 text-[#f97316] text-xs font-bold border border-[#f97316]/30">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Publication Numérique Gratuite</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Vivre sa francophonie dans la région de Durham
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Le COFRD célèbre la francophonie sous toutes ses couleurs à l’occasion de la Semaine de la francophonie. Fruit d’ateliers d’écriture stimulants offerts aux nouveaux arrivants francophones, ce recueil documente avec émotion et fierté le parcours de quatre femmes immigrantes francophones jusqu’à notre belle région de Durham.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://www.cofrd.org//wp-content/uploads/VIVRE-SA-FRANCOPHONIE-DANS-LA-REGION-DE-DURHAM-Final.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Télécharger le livre (PDF)</span>
                </a>

                <Link
                  href="/actualites/livre-numerique-vivre-sa-francophonie-durham"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold px-4 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
                >
                  <span>En savoir plus sur le projet</span>
                </Link>
              </div>
            </div>

            {/* Colonne droite : Visuel livre (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-xs w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#f97316] to-[#1b365d] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl p-6 text-center space-y-4">
                  <div className="h-64 rounded-xl bg-gradient-to-br from-[#1b365d] via-slate-900 to-[#11233d] flex flex-col items-center justify-center p-6 text-white border border-blue-600/30 shadow-inner">
                    <Sparkles className="w-8 h-8 text-[#f97316] mb-2" />
                    <span className="text-xs uppercase tracking-widest text-[#f97316] font-bold">COFRD Éditions</span>
                    <h3 className="text-lg font-black text-white mt-2 leading-snug">Vivre sa francophonie</h3>
                    <p className="text-xs text-blue-200 mt-1">dans la région de Durham</p>
                    <div className="mt-4 text-[10px] text-slate-300 border-t border-blue-500/40 pt-2">
                      Récits d'immigration & inclusion
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Distribution libre et accessible à tous</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
