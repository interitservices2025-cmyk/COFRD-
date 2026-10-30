'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function BannerInfo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#1b365d] via-[#152a48] to-[#11233d] text-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm relative border-b border-[#1b365d]/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <Link 
          href="/evenements"
          className="flex items-center gap-2 flex-1 overflow-hidden group hover:opacity-95 transition"
        >
          <span className="inline-flex items-center gap-1 bg-[#f97316] text-white font-extrabold text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs shrink-0">
            <Sparkles className="w-3 h-3" />
            <span className="hidden xs:inline">Saison Culturelle</span>
            <span className="xs:hidden">Culture</span>
          </span>
          <span className="font-medium text-slate-200 truncate text-xs sm:text-sm">
            Billetterie des 5 spectacles ouverte !
          </span>
          <span className="inline-flex items-center gap-1 text-[#f97316] font-bold underline underline-offset-2 transition shrink-0 ml-1 text-xs">
            <span className="hidden sm:inline">Réserver</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition shrink-0"
          aria-label="Fermer le bandeau"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
