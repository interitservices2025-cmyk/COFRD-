import React from 'react';
import Image from 'next/image';
import { OFFICIAL_PARTNERS } from '@/lib/data';
import { Building2 } from 'lucide-react';

export default function PartnersSection() {
  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[#1b365d] font-extrabold text-xs tracking-wider uppercase bg-[#1b365d]/10 border border-[#1b365d]/20 px-3.5 py-1.5 rounded-full">
            <Building2 className="w-3.5 h-3.5 text-[#f97316]" />
            Partenaires institutionnels & Bailleurs de fonds
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ils nous font confiance et soutiennent notre mission
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Le COFRD réalise ses programmes communautaires, scolaires, juridiques et artistiques grâce au soutien constant de ses partenaires officiels.
          </p>
        </div>

        {/* Grille des logos partenaires */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 items-stretch">
          {OFFICIAL_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#1b365d]/40 hover:-translate-y-0.5 transition-all duration-300 min-h-[110px]"
              title={partner.name}
            >
              {partner.logoUrl ? (
                <div className="relative w-full h-12 flex items-center justify-center">
                  <Image
                    src={partner.logoUrl}
                    alt={`Logo officiel ${partner.name}`}
                    width={150}
                    height={48}
                    className="max-h-12 w-auto max-w-full object-contain filter group-hover:brightness-105 transition-all duration-300"
                    unoptimized
                  />
                </div>
              ) : (
                <span className="text-xs font-bold text-slate-800 text-center line-clamp-2">
                  {partner.name}
                </span>
              )}
              <span className="sr-only">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

