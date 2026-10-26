'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function BannerInfo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#1b365d] via-[#152a48] to-[#11233d] text-white px-4 py-2.5 text-xs sm:text-sm relative border-b border-[#1b365d]/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 bg-[#f97316] text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3 h-3" />
            Saison Culturelle
          </span>
          <span className="font-medium text-slate-200 truncate">
            La billetterie officielle des spectacles et ateliers est ouverte !
          </span>
          <Link 
            href="/evenements" 
            className="hidden md:inline-flex items-center gap-1 text-[#f97316] font-bold hover:text-white underline underline-offset-2 transition ml-2"
          >
            <span>Réserver mes places</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          aria-label="Fermer le bandeau"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
