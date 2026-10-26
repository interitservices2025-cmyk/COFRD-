import { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Heart,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  ArrowRight,
  Sparkles,
  School
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Services d'Établissement & Intégration — COFRD",
  description: "Accueil chaleureux, intégration scolaire (TÉÉ) et appui aux familles et élèves nouveaux arrivants francophones (PAÉFLNA) dans la région de Durham. Subventionné par IRCC.",
};

const pillars = [
  {
    title: "Programme TÉÉ (Travailleurs d'Établissement dans les Écoles)",
    description: "Des intervenants dévoués directement présents au sein des écoles francophones de Durham pour épauler les nouveaux élèves immigrants et leurs parents dans leur adaptation scolaire et sociale.",
    icon: School,
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    title: "Programme PAÉFLNA (Appui aux Familles & Nouveaux Arrivants)",
    description: "Accompagnement individualisé pour l'accès aux services essentiels : inscription scolaire, démarches de santé (carte Santé OHIP), logement, démarches de citoyenneté et cours de perfectionnement linguistique.",
    icon: Heart,
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "Ateliers d'Orientation & Connexion Communautaire",
    description: "Séances d'information régulières sur la vie en Ontario : fonctionnement du système bancaire, climat canadien, activités récréatives, opportunités de bénévolat et réseautage avec des familles établies.",
    icon: Sparkles,
    color: "bg-amber-100 text-amber-700"
  },
  {
    title: "Liaison avec les Écoles Affiliées",
    description: "Partenariat étroit avec les 8 écoles francophones de Durham (catholiques MonAvenir et publiques Viamonde) pour prévenir le décrochage et encourager la fierté linguistique chez les jeunes.",
    icon: GraduationCap,
    color: "bg-indigo-100 text-indigo-700"
  }
];

const checklist = [
  "Obtention du numéro d'assurance sociale (NAS) et carte Santé OHIP",
  "Inscription des enfants dans les écoles primaires et secondaires de langue française",
  "Orientation vers les services de garde francophones affiliés (« Les Lucioles »)",
  "Accès aux banques alimentaires, vêtements d'hiver et matériel scolaire",
  "Ateliers sur les déclarations fiscales et les allocations familiales canadiennes",
  "Accompagnement personnalisé pour les démarches de résidence permanente"
];

export default function EtablissementPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Établissement & Immigration</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-4">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Service gratuit · Financement IRCC & Emploi Ontario</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Services d'Établissement & Intégration
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Bienvenue dans la région de Durham ! Notre équipe multiculturelle et bienveillante vous accompagne, vous et votre famille, à chaque étape de votre installation pour vous sentir rapidement chez vous.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/contact?sujet=etablissement"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
            >
              <span>Prendre contact avec une conseillère</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://etablissement.cofrd.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700 transition"
            >
              <span>Consulter etablissement.cofrd.org</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Piliers */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Nos programmes phares d'accueil
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Une passerelle humaine et rassurante entre votre arrivée et votre plein épanouissement communautaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Démarches accompagnées */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Accompagnement aux Premiers Pas
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Ce que nous faisons concrètement pour vous
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Naviguer dans un nouvel environnement administratif peut sembler intimidant. Nous sommes là pour vous orienter pas à pas en français.
              </p>
              <ul className="space-y-3 pt-2">
                {checklist.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 space-y-5">
              <h3 className="font-bold text-lg text-white">Équipe Établissement COFRD</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>57 rue Simcoe S, Suite 2D, Oshawa, ON, L1H 4G4</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="tel:9054347676" className="hover:text-white font-semibold">(905) 434-7676</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="mailto:dg@cofrd.org" className="hover:text-white">dg@cofrd.org</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lundi au Vendredi : 8h30 – 16h30</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                Financé par Immigration, Réfugiés et Citoyenneté Canada (IRCC).
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <Link
            href="/contact?sujet=etablissement"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-md transition"
          >
            <span>Prendre rendez-vous avec une travailleuse d'établissement</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
