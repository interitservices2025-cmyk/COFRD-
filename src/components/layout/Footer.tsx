import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Shield, 
  HeartHandshake, 
  Lock,
  Sparkles
} from 'lucide-react';
import { OFFICIAL_PARTNERS } from '@/lib/data';
import CofrdLogo from './CofrdLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Bandeau Partenaires Officiels */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Nos Partenaires Financiers &amp; Bailleurs de Fonds Institutionnels
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            {OFFICIAL_PARTNERS.map((p) => (
              <div 
                key={p.id} 
                className="px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white border border-slate-700/60 shadow-xs flex items-center justify-center transition-all duration-300 hover:scale-105"
                title={p.name}
              >
                {p.logoUrl ? (
                  <img
                    src={p.logoUrl}
                    alt={`Logo officiel ${p.name}`}
                    className="h-6 sm:h-7 max-w-[120px] w-auto object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xs font-semibold text-slate-800">{p.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal du Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Colonne 1 : À propos & Identité */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CofrdLogo size="sm" />
              <span className="font-extrabold text-white text-lg tracking-tight">
                COFRD
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Le Conseil des Organismes Francophones de la Région de Durham (COFRD) est un organisme sans but lucratif fondé en 1984. Actif, visible et engagé, il rassemble et célèbre la francophonie à travers une offre variée de services, d’ateliers et d’événements culturels.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Organisme parapluie regroupant 31 membres</span>
            </div>
          </div>

          {/* Colonne 2 : Coordonnées & Horaires */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-tight flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Coordonnées Officielles</span>
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="leading-snug">
                <strong className="text-slate-200 block">Siège social :</strong>
                57 rue Simcoe sud, Suite 2D<br />
                Oshawa, ON, L1H 4G4
              </p>
              <p>
                <strong className="text-slate-200 block">Direction & Accueil :</strong>
                <a href="tel:9054347676" className="text-blue-400 hover:underline block">
                  Tél : (905) 434-7676
                </a>
                <a href="mailto:dg@cofrd.org" className="text-blue-400 hover:underline block">
                  dg@cofrd.org
                </a>
              </p>
              <p>
                <strong className="text-slate-200 block">Soutien Juridique (Direct) :</strong>
                <a href="tel:9054347374" className="text-blue-400 hover:underline block">
                  Tél : (905) 434-7374
                </a>
                <a href="mailto:justice@cofrd.org" className="text-blue-400 hover:underline block">
                  justice@cofrd.org
                </a>
              </p>
            </div>
          </div>

          {/* Colonne 3 : Heures d'ouverture */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Heures d’ouverture</span>
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="font-medium text-slate-300">Lundi au Vendredi</span>
                <span className="text-slate-300 font-semibold">8h30 à 16h30</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Samedi</span>
                <span className="text-rose-400">Fermé</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Dimanche</span>
                <span className="text-rose-400">Fermé</span>
              </div>
              <div className="pt-2 text-xs text-slate-500">
                * Les activités et spectacles ont lieu en soirée et fins de semaine selon le calendrier culturel.
              </div>
            </div>
          </div>

          {/* Colonne 4 : Liens rapides & Plateformes */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-tight">
              Plateformes Spécialisées
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="https://emploi.cofrd.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-slate-400 hover:text-white transition group"
                >
                  <span>Centre d’Emploi (CEFD)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a 
                  href="https://etablissement.cofrd.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-slate-400 hover:text-white transition group"
                >
                  <span>Services d’Établissement</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <Link 
                  href="/services/justice" 
                  className="flex items-center justify-between text-slate-400 hover:text-white transition"
                >
                  <span>Soutien Juridique Spécialisé</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/evenements" 
                  className="flex items-center justify-between text-slate-400 hover:text-white transition"
                >
                  <span>Calendrier de la Saison Culturelle</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/actualites/livre-numerique-vivre-sa-francophonie-durham" 
                  className="flex items-center justify-between text-amber-400 hover:text-amber-300 transition"
                >
                  <span>Livre Numérique (Télécharger PDF)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Pied de page légal et copyright */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            Copyright © {new Date().getFullYear()} — Conseil des Organismes Francophones de la Région de Durham. Tous droits réservés.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/confidentialite" className="hover:text-slate-300 transition">
              Protection des renseignements personnels (LPRPDE)
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition">
              Nous joindre
            </Link>
            <Link href="/admin" className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition">
              <Lock className="w-3 h-3" />
              <span>Administration</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
