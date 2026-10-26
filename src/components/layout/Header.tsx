'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Ticket, 
  Calendar, 
  Briefcase, 
  Scale, 
  Users, 
  ChevronDown,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import CofrdLogo from './CofrdLogo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
  };

  // Ferme les dropdowns si clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ferme le menu mobile avec la touche Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setAboutDropdownOpen(false);
        setServicesDropdownOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Empêche le défilement de la page quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* 1. BARRE SUPÉRIEURE D'INFORMATIONS PRATIQUES */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Coordonnées officielles */}
          <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
            <span className="flex items-center gap-1.5 text-slate-300 hover:text-white shrink-0">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[200px] sm:max-w-none">57 rue Simcoe S, Suite 2D, Oshawa, ON</span>
            </span>
            <a 
              href="tel:9054347676" 
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors shrink-0"
              title="Appeler le secrétariat du COFRD"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">(905) 434-7676</span>
            </a>
            <a 
              href="mailto:dg@cofrd.org" 
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors shrink-0"
              title="Écrire à la direction générale"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
              <span>dg@cofrd.org</span>
            </a>
          </div>

          {/* Slogan & Accès Équipe */}
          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="hidden lg:inline text-slate-400 font-medium whitespace-nowrap">
              Depuis 1984 — 40+ ans au service de la communauté
            </span>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-400 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/60"
              title="Portail réservé à l'équipe du COFRD"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span className="font-semibold text-[11px] whitespace-nowrap">Accès Équipe</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION PRINCIPALE (MONO-LIGNE SUR ORDINATEUR & PORTABLE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-2 lg:gap-4">
          
          {/* Logo officiel seul - Calé à gauche */}
          <Link 
            href="/" 
            className="flex items-center shrink-0 group py-1 focus-visible:outline-2 focus-visible:outline-blue-600 rounded-xl"
            aria-label="Accueil — Conseil des Organismes Francophones de la Région de Durham"
          >
            <CofrdLogo size="md" />
          </Link>

          {/* Menu Desktop & Bouton Action - Disposés sur UNE SEULE LIGNE HORIZONTALE */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto shrink-0">
            <nav className="flex items-center gap-0.5 xl:gap-1.5" aria-label="Navigation principale">
              
              {/* 1. Accueil */}
              <Link 
                href="/" 
                onClick={closeAllMenus}
                className={`whitespace-nowrap px-2.5 py-2 xl:px-3.5 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' 
                    : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-100/70'
                }`}
              >
                Accueil
              </Link>

              {/* 2. À propos (Dropdown) */}
              <div 
                ref={aboutRef}
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button 
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  onFocus={() => setAboutDropdownOpen(true)}
                  className={`flex items-center gap-1 whitespace-nowrap px-2.5 py-2 xl:px-3.5 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/a-propos') || pathname.startsWith('/ca') 
                      ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' 
                      : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-100/70'
                  }`}
                  aria-expanded={aboutDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>À propos</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-[#1b365d]' : ''}`} />
                </button>

                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 pt-2 z-50">
                    <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 ring-1 ring-slate-900/5 animate-in fade-in slide-in-from-top-2 duration-150">
                      <Link 
                        href="/a-propos" 
                        onClick={closeAllMenus}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-[#1b365d]/10 text-slate-700 hover:text-[#1b365d] transition-colors"
                      >
                        <div className="font-semibold text-xs text-slate-900 hover:text-[#1b365d]">Mission, vision & histoire</div>
                        <div className="text-[11px] text-slate-500">Création en 1984 et valeurs</div>
                      </Link>
                      <Link 
                        href="/ca" 
                        onClick={closeAllMenus}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-[#1b365d]/10 text-slate-700 hover:text-[#1b365d] transition-colors"
                      >
                        <div className="font-semibold text-xs text-slate-900 hover:text-[#1b365d]">Conseil d&apos;administration & Direction</div>
                        <div className="text-[11px] text-slate-500">Membres du CA et gouvernance</div>
                      </Link>
                      <Link 
                        href="/a-propos#membres" 
                        onClick={closeAllMenus}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-[#1b365d]/10 text-slate-700 hover:text-[#1b365d] transition-colors"
                      >
                        <div className="font-semibold text-xs text-slate-900 hover:text-[#1b365d]">Organismes membres</div>
                        <div className="text-[11px] text-slate-500">31 organismes et 8 écoles affiliées</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Services & Programmes (Dropdown) */}
              <div 
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button 
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  onFocus={() => setServicesDropdownOpen(true)}
                  className={`flex items-center gap-1 whitespace-nowrap px-2.5 py-2 xl:px-3.5 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/services') 
                      ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' 
                      : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-100/70'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Services & Programmes</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#1b365d]' : ''}`} />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 pt-2 z-50">
                    <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 ring-1 ring-slate-900/5 animate-in fade-in slide-in-from-top-2 duration-150">
                      <Link 
                        href="/services/emploi" 
                        onClick={closeAllMenus}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1b365d]/10 text-slate-700 hover:text-[#1b365d] transition-colors"
                      >
                        <div className="p-1.5 rounded-lg bg-[#1b365d]/10 text-[#1b365d] shrink-0 mt-0.5">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-900">Centre d&apos;Emploi (CEFD)</div>
                          <div className="text-[11px] text-slate-500">Insertion, coaching & carrières</div>
                        </div>
                      </Link>
                      <Link 
                        href="/services/etablissement" 
                        onClick={closeAllMenus}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1b365d]/10 text-slate-700 hover:text-[#1b365d] transition-colors"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-900">Services d&apos;Établissement</div>
                          <div className="text-[11px] text-slate-500">Accueil nouveaux arrivants, TÉÉ, PAÉFLNA</div>
                        </div>
                      </Link>
                      <Link 
                        href="/services/justice" 
                        onClick={closeAllMenus}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1b365d]/10 text-slate-700 hover:text-[#1b365d] transition-colors"
                      >
                        <div className="p-1.5 rounded-lg bg-orange-100 text-[#f97316] shrink-0 mt-0.5">
                          <Scale className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-900">Soutien Juridique</div>
                          <div className="text-[11px] text-slate-500">Justice civile, famille, logement</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Programmation culturelle */}
              <Link 
                href="/evenements" 
                onClick={closeAllMenus}
                className={`flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 xl:px-3.5 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors ${
                  pathname.startsWith('/evenements') 
                    ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' 
                    : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-100/70'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-[#f97316] shrink-0" aria-hidden="true" />
                <span>Programmation culturelle</span>
              </Link>

              {/* 5. Actualités */}
              <Link 
                href="/actualites" 
                onClick={closeAllMenus}
                className={`whitespace-nowrap px-2.5 py-2 xl:px-3.5 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors ${
                  pathname.startsWith('/actualites') 
                    ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' 
                    : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-100/70'
                }`}
              >
                Actualités
              </Link>

              {/* 6. Contact */}
              <Link 
                href="/contact" 
                onClick={closeAllMenus}
                className={`whitespace-nowrap px-2.5 py-2 xl:px-3.5 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors ${
                  pathname === '/contact' 
                    ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' 
                    : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-100/70'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* 7. Bouton d'action Billetterie & Inscriptions (distinct mais harmonieux) */}
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 whitespace-nowrap bg-[#1b365d] hover:bg-[#11233d] text-white font-bold text-xs xl:text-sm px-3.5 py-2.5 xl:px-4.5 xl:py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all shrink-0 ml-1 xl:ml-2 focus-visible:outline-2 focus-visible:outline-[#1b365d]"
            >
              <Ticket className="w-4 h-4 text-[#f97316] shrink-0" aria-hidden="true" />
              <span>Billetterie & Inscriptions</span>
            </Link>
          </div>

          {/* Boutons Tablettes et Mobiles (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/evenements"
              className="inline-flex items-center gap-1.5 bg-[#1b365d] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs"
              aria-label="Accéder à la Billetterie"
            >
              <Ticket className="w-3.5 h-3.5 text-[#f97316]" aria-hidden="true" />
              <span className="hidden sm:inline">Billetterie</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#1b365d] hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#1b365d]"
              aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. MENU MOBILE COMPLET & ACCESSIBLE (TABLETTES & SMARTPHONES) */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 top-[113px] bottom-0 bg-slate-950/60 backdrop-blur-xs z-50 overflow-y-auto"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="bg-white border-b border-slate-200 px-4 py-5 shadow-2xl max-h-full overflow-y-auto animate-in slide-in-from-top-3 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
          >
            <div className="space-y-1">
              {/* Accueil */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/') ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                Accueil
              </Link>

              {/* Accordéon À propos */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
                  aria-expanded={mobileAboutExpanded}
                >
                  <span>À propos</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileAboutExpanded ? 'rotate-180 text-blue-700' : ''}`} />
                </button>
                {mobileAboutExpanded && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl my-1">
                    <Link
                      href="/a-propos"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-white"
                    >
                      Mission, Vision & Histoire (1984)
                    </Link>
                    <Link
                      href="/ca"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-white"
                    >
                      Conseil d&apos;administration & Direction
                    </Link>
                    <Link
                      href="/a-propos#membres"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-white"
                    >
                      31 Organismes membres affiliés
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordéon Services & Programmes */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
                  aria-expanded={mobileServicesExpanded}
                >
                  <span>Services & Programmes</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileServicesExpanded ? 'rotate-180 text-blue-700' : ''}`} />
                </button>
                {mobileServicesExpanded && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl my-1">
                    <Link
                      href="/services/emploi"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-white"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                      <span>Centre d&apos;Emploi (CEFD)</span>
                    </Link>
                    <Link
                      href="/services/etablissement"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-white"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Services d&apos;Établissement & Immigration</span>
                    </Link>
                    <Link
                      href="/services/justice"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-white"
                    >
                      <Scale className="w-3.5 h-3.5 text-amber-600" />
                      <span>Soutien Juridique (Justice civile)</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Programmation culturelle */}
              <div className="border-t border-slate-100 pt-1">
                <Link
                  href="/evenements"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    pathname.startsWith('/evenements') ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#f97316]" />
                    <span>Programmation culturelle</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Actualités */}
              <Link
                href="/actualites"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  pathname.startsWith('/actualites') ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                Actualités
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/contact' ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Bouton CTA Billetterie dans le menu mobile */}
            <div className="pt-4 mt-3 border-t border-slate-100">
              <Link
                href="/evenements"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2.5 bg-[#1b365d] hover:bg-[#11233d] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-colors"
              >
                <Ticket className="w-4 h-4 text-[#f97316]" />
                <span>Billetterie & Inscriptions</span>
              </Link>
            </div>

            {/* Rappel des coordonnées dans le menu mobile */}
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <a href="tel:9054347676" className="text-slate-700 font-medium">(905) 434-7676</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <a href="mailto:dg@cofrd.org" className="text-slate-700 font-medium">dg@cofrd.org</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>57 rue Simcoe S, Oshawa, ON</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
