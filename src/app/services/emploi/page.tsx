import { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  ArrowRight,
  FileText,
  UserCheck,
  Building,
  GraduationCap
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Centre d'Emploi Francophone de Durham (CEFD) — COFRD",
  description: "Services gratuits d'aide à l'emploi et de développement de carrière pour les francophones et bilingues de la région de Durham. Subventionné par Emploi Ontario.",
};

const programs = [
  {
    title: "Accompagnement et Bilan Professionnel",
    description: "Rencontre individuelle avec un conseiller en emploi pour évaluer vos compétences, cibler vos objectifs professionnels et établir un plan d'action personnalisé.",
    icon: UserCheck
  },
  {
    title: "Rédaction de CV et Lettres Canadiennes",
    description: "Optimisation de vos outils de candidature selon les normes canadiennes et ontariennes (format bilingue, mots-clés ATS, mise en valeur des compétences transférables).",
    icon: FileText
  },
  {
    title: "Préparation Intensive aux Entrevues",
    description: "Simulations d'entrevues d'embauche en français et en anglais avec rétroaction constructive pour gagner en assurance et valoriser votre parcours.",
    icon: GraduationCap
  },
  {
    title: "Jumelage et Liaison avec les Employeurs",
    description: "Mise en contact direct avec notre réseau d'entreprises partenaires dans les secteurs public, privé, communautaire et éducatif de la région de Durham.",
    icon: Building
  }
];

const workshops = [
  "Comprendre le marché du travail ontarien et les normes d'emploi",
  "Optimiser son profil LinkedIn et développer son réseau professionnel",
  "Négocier son salaire et valoriser son bilinguisme auprès des employeurs",
  "Transition de carrière et reconnaissance des diplômes acquis à l'étranger"
];

export default function EmploiPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* En-tête Hero */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Centre d'Emploi (CEFD)</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 mb-4">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Service gratuit · Financement Emploi Ontario</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Centre d'Emploi Francophone de Durham
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Votre carrefour professionnel francophone dans la région de Durham. Nous soutenons gratuitement les chercheurs d'emploi, les personnes en reconversion et les nouveaux arrivants dans leur réussite professionnelle.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/contact?sujet=emploi"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
            >
              <span>Prendre rendez-vous avec un conseiller</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://emploi.cofrd.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700 transition"
            >
              <span>Consulter emploi.cofrd.org</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Les 4 piliers d'accompagnement */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Un accompagnement complet vers l'emploi
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Chaque étape de votre démarche est encadrée par des professionnels certifiés du marché de l'emploi ontarien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ateliers collectifs */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                Formations & Ateliers Pratiques
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Ateliers mensuels en groupe
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Participez à nos ateliers dynamiques pour développer vos compétences de recherche et échanger avec d'autres professionnels de la communauté.
              </p>
              <ul className="space-y-3 pt-2">
                {workshops.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl p-6 space-y-5">
              <h3 className="font-bold text-lg text-white">Coordonnées du CEFD</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>57 rue Simcoe S, Suite 2D, Oshawa, ON, L1H 4G4</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="tel:9054347676" className="hover:text-white font-semibold">(905) 434-7676</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="mailto:dg@cofrd.org" className="hover:text-white">dg@cofrd.org</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Lundi au Vendredi : 8h30 – 16h30</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                Programme subventionné par le Gouvernement de l'Ontario (Emploi Ontario).
              </div>
            </div>
          </div>
        </div>

        {/* CTA prise de contact */}
        <div className="text-center py-8">
          <Link
            href="/contact?sujet=emploi"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-base px-8 py-4 rounded-xl shadow-md transition"
          >
            <span>Prendre rendez-vous avec le CEFD</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
