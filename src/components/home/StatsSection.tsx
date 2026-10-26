import React from 'react';
import { Target, Eye, Sparkles, Building2, Users2, CalendarDays } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { value: '40+', label: 'Années d’histoire', sub: 'Fondé en 1984 à Oshawa' },
    { value: '31+', label: 'Organismes membres', sub: 'Organisme parapluie régional' },
    { value: '8', label: 'Institutions scolaires', sub: 'Écoles francophones affiliées' },
    { value: '100%+', label: 'Engagement communautaire', sub: 'Durham, Oshawa, Whitby, Ajax...' },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chiffres clés */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {stats.map((s, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/60 text-center space-y-2 backdrop-blur-xs"
            >
              <div className="text-4xl sm:text-5xl font-black text-[#f97316] tracking-tight">
                {s.value}
              </div>
              <div className="text-base font-bold text-white">
                {s.label}
              </div>
              <div className="text-xs text-slate-400">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Bloc Mission / Vision / Vision artistique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1b365d]/50 text-sky-300 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Notre mission</h3>
            <ul className="text-sm text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#f97316] font-bold">•</span>
                <span>Être au service des communautés francophones de Durham et contribuer à leur vitalité.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f97316] font-bold">•</span>
                <span>Rassembler et célébrer la diversité des communautés francophones.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f97316] font-bold">•</span>
                <span>Regrouper et concerter les organisations francophones membres.</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Notre vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Actif, visible, créatif et engageant, le COFRD est au cœur des communautés francophones de la région de Durham en raison de son offre variée d’activités, de programmes et de services répondant aux besoins de ses clientèles ainsi que son leadership communautaire soutenu.
            </p>
          </div>

          {/* Vision artistique */}
          <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f97316]/20 text-[#f97316] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Vision artistique</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Diffuseur fièrement franco-ontarien qui rassemble les publics lors de rendez-vous artistiques et culturels chaleureux, diversifiés et à l’image de sa collectivité, le COFRD est le cœur culturel de la francophonie dans la région de Durham.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
