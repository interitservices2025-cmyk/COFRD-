'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CofrdLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Composant Logo officiel du COFRD.
 * Charge directement le fichier officiel /logo-noBg.png.webp fourni dans /public.
 * Préserve le ratio ovale officiel (~1.8:1) sans déformation ni recadrage artificiel.
 */
export default function CofrdLogo({ size = 'md', className = '' }: CofrdLogoProps) {
  const [imgError, setImgError] = useState(false);

  const config = {
    sm: { heightClass: 'h-8 sm:h-9', width: 68, height: 38, fallbackBox: 'h-8 px-2.5', text: 'text-xs' },
    md: { heightClass: 'h-12 sm:h-14', width: 105, height: 56, fallbackBox: 'h-12 px-3.5', text: 'text-sm' },
    lg: { heightClass: 'h-14 sm:h-16', width: 120, height: 66, fallbackBox: 'h-14 px-4', text: 'text-base' },
  }[size];

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {!imgError ? (
        <div className={`relative ${config.heightClass} w-auto flex items-center justify-center select-none`}>
          <Image
            src="/logo-noBg.png.webp"
            alt="Logo officiel — Conseil des Organismes Francophones de la Région de Durham"
            width={config.width}
            height={config.height}
            className={`${config.heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
            priority
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className={`${config.fallbackBox} rounded-xl bg-gradient-to-br from-[#1b365d] via-blue-900 to-[#11233d] flex items-center justify-center text-white shadow-md shadow-blue-950/25 border border-white/20 transition-transform group-hover:scale-105 select-none`}>
          <div className="text-center font-black tracking-tight leading-none">
            <span className={`${config.text} text-[#f97316] font-extrabold tracking-wider mr-0.5`}>COF</span>
            <span className="text-[10px] tracking-widest text-white/95 font-bold">RD</span>
          </div>
        </div>
      )}
    </div>
  );
}
