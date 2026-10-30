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
    <header className="sticky top-0 z-40 bg-white/98 border-b border-slate-200 shadow-xs">
      {/* 1. BARRE SUPÉRIEURE D'INFORMATIONS PRATIQUES */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-3 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          {/* Coordonnées officielles adaptatives */}
          <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white shrink-0">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[200px] sm:max-w-none">57 rue Simcoe S, Suite 2D, Oshawa, ON</span>
            </span>
            <a 
              href="tel:9054347676" 
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors shrink-0"
              title="Appeler le secrétariat du COFRD"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap font-medium">(905) 434-7676</span>
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
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            <span className="hidden lg:inline text-slate-400 font-medium whitespace-nowrap">
              Depuis 1984 — 40+ ans au service de la communauté
            </span>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-400 px-2 sm:px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/60"
              title="Portail réservé à l'équipe du COFRD"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span className="font-semibold text-[11px] whitespace-nowrap">Accès Équipe</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION PRINCIPALE (ADAPTATIVE TOUS ÉCRANS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-2 lg:gap-4">
          
          {/* Logo officiel seul - Calé à gauche */}
          <Link 
            href="/" 
            className="flex items-center shrink-0 group py-1 focus-visible:outline-2 focus-visible:outline-[#1b365d] rounded-xl"
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
                className={`whitespace-nowrap px-2 py-2 xl:px-3.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors ${
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
                  type="button"
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  onFocus={() => setAboutDropdownOpen(true)}
                  className={`flex items-center gap-1 whitespace-nowrap px-2 py-2 xl:px-3.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors ${
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
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 ring-1 ring-slate-900/5">
                      <Link 
                        href="/a-propos" 
                        onClick={closeAllMenus}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-[#1b365d]/10 text-slate-700 hover:text-[#1b365d] transition-colors"
                      >
                        <div className="font-semibold text-xs text-slate-900 hover:text-[#1b365d]">Mission, vision &amp; histoire</div>
                        <div className="text-[11px] text-slate-500">Création en 1984 et valeurs</div>
                      </Link>
                      <Link 
                        href="/ca" 
                        onClick={closeAllMenus}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-[#1b365d]/10 text-slate-700 hover:text-[#1b365d] transition-colors"
                      >
                        <div className="font-semibold text-xs text-slate-900 hover:text-[#1b365d]">Conseil d&apos;administration &amp; Direction</div>
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
                  type="button"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  onFocus={() => setServicesDropdownOpen(true)}
                  className={`flex items-center gap-1 whitespace-nowrap px-2 py-2 xl:px-3.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors ${
                    pathname.startsWith('/services') 
                      ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' 
                      : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-100/70'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Services &amp; Programmes</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#1b365d]' : ''}`} />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 ring-1 ring-slate-900/5">
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
                          <div className="text-[11px] text-slate-500">Insertion, coaching &amp; carrières</div>
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
                className={`flex items-center gap-1.5 whitespace-nowrap px-2 py-2 xl:px-3.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors ${
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
                className={`whitespace-nowrap px-2 py-2 xl:px-3.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors ${
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
                className={`whitespace-nowrap px-2 py-2 xl:px-3.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors ${
                  pathname === '/contact' 
                    ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' 
                    : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-100/70'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* 7. Bouton d'action Billetterie & Inscriptions */}
            <Link
              href="/evenements"
              className="inline-flex items-center gap-1.5 xl:gap-2 whitespace-nowrap bg-[#1b365d] hover:bg-[#11233d] text-white font-bold text-xs xl:text-sm px-3 py-2.5 xl:px-4.5 xl:py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all shrink-0 ml-1 xl:ml-2 focus-visible:outline-2 focus-visible:outline-[#1b365d]"
            >
              <Ticket className="w-4 h-4 text-[#f97316] shrink-0" aria-hidden="true" />
              <span className="xl:hidden">Billetterie</span>
              <span className="hidden xl:inline">Billetterie &amp; Inscriptions</span>
            </Link>
          </div>

          {/* Boutons Tablettes et Mobiles (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/evenements"
              className="inline-flex items-center gap-1.5 bg-[#1b365d] hover:bg-[#11233d] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition-colors"
              aria-label="Accéder à la Billetterie"
            >
              <Ticket className="w-3.5 h-3.5 text-[#f97316]" aria-hidden="true" />
              <span className="hidden sm:inline">Billetterie</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-[#1b365d] hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#1b365d] active:scale-95"
              aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#1b365d]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. TIROIR MOBILE COMPLET, ROBUSTE & ACCESSIBLE (SMARTPHONES & TABLETTES) */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal de navigation"
        >
          {/* Panneau latéral coulissant de navigation */}
          <div 
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col z-50 border-l border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête du tiroir mobile */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-2.5">
                <CofrdLogo size="sm" />
                <div>
                  <span className="font-extrabold text-sm text-[#1b365d] block leading-tight">COFRD</span>
                  <span className="text-[11px] text-slate-500 block">Région de Durham</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-[#1b365d]"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Corps du tiroir (Défilement fluide) */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* Bouton CTA Billetterie en tête */}
              <Link
                href="/evenements"
                onClick={closeAllMenus}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#1b365d] to-[#11233d] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#f97316] text-white">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold leading-tight">Billetterie &amp; Spectacles</div>
                    <div className="text-[11px] text-blue-200 font-normal">Saison culturelle officielle</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#f97316] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Navigation principale */}
              <nav className="space-y-1 pt-1" aria-label="Liens du menu mobile">
                {/* Accueil */}
                <Link
                  href="/"
                  onClick={closeAllMenus}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/') 
                      ? 'bg-[#1b365d]/10 text-[#1b365d] font-bold' 
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>Accueil</span>
                  {isActive('/') && <span className="w-2 h-2 rounded-full bg-[#1b365d]" />}
                </Link>

                {/* Accordéon À propos */}
                <div className="border-t border-slate-100 pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      pathname.startsWith('/a-propos') || pathname.startsWith('/ca')
                        ? 'text-[#1b365d] font-bold'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                    aria-expanded={mobileAboutExpanded}
                  >
                    <span>À propos du COFRD</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileAboutExpanded ? 'rotate-180 text-[#1b365d]' : ''}`} />
                  </button>
                  {mobileAboutExpanded && (
                    <div className="pl-3 pr-1 py-1 space-y-1 bg-slate-50/90 rounded-xl my-1 border border-slate-100">
                      <Link
                        href="/a-propos"
                        onClick={closeAllMenus}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#1b365d] hover:bg-white transition-colors"
                      >
                        <div className="font-semibold text-slate-900">Mission, Vision &amp; Histoire</div>
                        <div className="text-[11px] text-slate-500">Création en 1984 à Oshawa</div>
                      </Link>
                      <Link
                        href="/ca"
                        onClick={closeAllMenus}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#1b365d] hover:bg-white transition-colors"
                      >
                        <div className="font-semibold text-slate-900">Conseil d&apos;administration &amp; Direction</div>
                        <div className="text-[11px] text-slate-500">Membres du CA et gouvernance</div>
                      </Link>
                      <Link
                        href="/a-propos#membres"
                        onClick={closeAllMenus}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#1b365d] hover:bg-white transition-colors"
                      >
                        <div className="font-semibold text-slate-900">Organismes membres affiliés</div>
                        <div className="text-[11px] text-slate-500">31 organismes &amp; 8 écoles affiliées</div>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Accordéon Services & Programmes */}
                <div className="border-t border-slate-100 pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      pathname.startsWith('/services')
                        ? 'text-[#1b365d] font-bold'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                    aria-expanded={mobileServicesExpanded}
                  >
                    <span>Services &amp; Programmes</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileServicesExpanded ? 'rotate-180 text-[#1b365d]' : ''}`} />
                  </button>
                  {mobileServicesExpanded && (
                    <div className="pl-3 pr-1 py-1 space-y-1 bg-slate-50/90 rounded-xl my-1 border border-slate-100">
                      <Link
                        href="/services/emploi"
                        onClick={closeAllMenus}
                        className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#1b365d] hover:bg-white transition-colors"
                      >
                        <div className="p-1 rounded-md bg-[#1b365d]/10 text-[#1b365d] shrink-0 mt-0.5">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Centre d&apos;Emploi (CEFD)</div>
                          <div className="text-[11px] text-slate-500">Insertion, coaching &amp; CV</div>
                        </div>
                      </Link>
                      <Link
                        href="/services/etablissement"
                        onClick={closeAllMenus}
                        className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#1b365d] hover:bg-white transition-colors"
                      >
                        <div className="p-1 rounded-md bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Services d&apos;Établissement</div>
                          <div className="text-[11px] text-slate-500">Accueil nouveaux arrivants, TÉÉ, PAÉFLNA</div>
                        </div>
                      </Link>
                      <Link
                        href="/services/justice"
                        onClick={closeAllMenus}
                        className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#1b365d] hover:bg-white transition-colors"
                      >
                        <div className="p-1 rounded-md bg-orange-100 text-[#f97316] shrink-0 mt-0.5">
                          <Scale className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Soutien Juridique</div>
                          <div className="text-[11px] text-slate-500">Justice civile, famille &amp; logement</div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Programmation culturelle */}
                <div className="border-t border-slate-100 pt-1">
                  <Link
                    href="/evenements"
                    onClick={closeAllMenus}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      pathname.startsWith('/evenements') ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#f97316]" />
                      <span>Programmation culturelle</span>
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">5 spectacles</span>
                  </Link>
                </div>

                {/* Actualités */}
                <Link
                  href="/actualites"
                  onClick={closeAllMenus}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname.startsWith('/actualites') ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>Actualités</span>
                  {isActive('/actualites') && <span className="w-2 h-2 rounded-full bg-[#1b365d]" />}
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={closeAllMenus}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === '/contact' ? 'text-[#1b365d] bg-[#1b365d]/10 font-bold' : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>Contact</span>
                  {isActive('/contact') && <span className="w-2 h-2 rounded-full bg-[#1b365d]" />}
                </Link>
              </nav>

              {/* Accès Équipe / Portail Admin */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/admin"
                  onClick={closeAllMenus}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-amber-600 hover:bg-amber-50/50 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Accès Équipe · Portail Admin</span>
                </Link>
              </div>
            </div>

            {/* Pied du tiroir mobile (Coordonnées d'accès direct) */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-600 space-y-2 shrink-0">
              <div className="flex items-center justify-between">
                <a
                  href="tel:9054347676"
                  className="flex items-center gap-1.5 font-bold text-[#1b365d] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>(905) 434-7676</span>
                </a>
                <a
                  href="mailto:dg@cofrd.org"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-[#1b365d] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>dg@cofrd.org</span>
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">57 rue Simcoe S, Suite 2D, Oshawa, ON</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
