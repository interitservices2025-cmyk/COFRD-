'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface HeroCardImageProps {
  className?: string;
}

/**
 * Affiche officielle de la Saison Culturelle 2026-2027 du COFRD.
 * Charge directement /Affiche-corrige-SAISON-CULTURELLE-2026-2027-1024x431.png.webp
 * Respecte fidèlement le ratio 1024:431 sans déformation ni masquage de texte.
 */
export default function HeroCardImage({ className = '' }: HeroCardImageProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative aspect-[1024/431] w-full rounded-2xl overflow-hidden mb-5 group bg-slate-950 border border-slate-700/60 shadow-inner select-none ${className}`}>
      {!imgError ? (
        <Image
          src="/Affiche-corrige-SAISON-CULTURELLE-2026-2027-1024x431.png.webp"
          alt="Affiche officielle — Saison Culturelle 2026-2027 du COFRD"
          width={1024}
          height={431}
          priority
          className="w-full h-full object-cover sm:object-contain group-hover:scale-[1.02] transition-transform duration-500"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-blue-950 to-slate-900 text-white">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
            Programmation Officielle
          </span>
          <span className="text-lg font-black text-white">Saison Culturelle 2026 - 2027</span>
          <span className="text-xs text-slate-300 mt-2">Zale Seck · Donas Music · Les Patenteuses · Bilinguish Boys · Céleste Lévis</span>
        </div>
      )}
    </div>
  );
}
