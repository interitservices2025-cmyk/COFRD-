import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  FileCheck,
  Phone,
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Users2,
  Home,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Programme de Soutien Juridique — COFRD | Accès à la Justice Civile",
  description: "Consultations juridiques confidentielles et gratuites pour la communauté francophone racisée et les résidents de Durham. Financé par le Ministère de la Justice du Canada.",
};

const domains = [
  {
    title: "Droit du Logement & Droits des Locataires",
    description: "Protection contre les expulsions injustifiées, recours face aux hausses de loyer abusives, réparations non effectuées et litiges devant la Commission de la location immobilière (CLI).",
    icon: Home
  },
  {
    title: "Droit de la Famille & Garde d'Enfants",
    description: "Information juridique sur les pensions alimentaires, accords de garde parentale, séparation légale et médiation familiale en français.",
    icon: Users2
  },
  {
    title: "Droit du Travail & Normes d'Emploi",
    description: "Recours en cas de congédiement injustifié, discrimination en milieu de travail, non-paiement des heures supplémentaires ou blessures professionnelles.",
    icon: Briefcase
  },
  {
    title: "Médiation & Résolution Amiable des Conflits",
    description: "Accompagnement neutre et bienveillant pour parvenir à des ententes satisfaisantes sans passer par de longs et coûteux procès judiciaires.",
    icon: Scale
  }
];

const processSteps = [
  {
    step: "1",
    title: "Prise de contact confidentielle",
    description: "Appelez directement la ligne dédiée au (905) 434-7374 ou écrivez à justice@cofrd.org en décrivant brièvement votre situation."
  },
  {
    step: "2",
    title: "Évaluation initiale des besoins",
    description: "Mme Adele Mbelle Nkelle, coordonnatrice du programme, réalise un premier échange pour identifier la nature juridique de votre dossier."
  },
  {
    step: "3",
    title: "Consultation avec un juriste ou avocat",
    description: "Rendez-vous individuel (en personne à Oshawa ou virtuel) avec un avocat ou notaire francophone pour recevoir un avis juridique formel."
  },
  {
    step: "4",
    title: "Suivi et orientation",
    description: "Accompagnement continu dans vos démarches, aide au remplissage de formulaires et orientation vers l'Aide juridique de l'Ontario si nécessaire."
  }
];

export default function JusticePage() {
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
            <span className="text-amber-400 font-semibold">Soutien Juridique</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-4">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Programme financé par le Ministère de la Justice du Canada</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Programme de Soutien Juridique
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Un accès gratuit, confidentiel et équitable à la justice civile pour la communauté francophone et les personnes racisées de la région de Durham. Connaître ses droits, c'est s'émanciper.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="tel:9054347374"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Ligne directe : (905) 434-7374</span>
            </a>
            <Link
              href="/contact?sujet=justice"
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700 transition"
            >
              <span>Demande de consultation par courriel</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Domaines d'intervention */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Domaines juridiques couverts
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Des conseils clairs et indépendants pour faire valoir vos droits devant les tribunaux administratifs et juridiques ontariens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domains.map((d, idx) => {
              const Icon = d.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">{d.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{d.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Parcours d'accompagnement */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              Processus Simple & Confidentiel
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Comment se déroule votre prise en charge ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 relative flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-black text-sm flex items-center justify-center mb-3">
                  {step.step}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Encadré contact dédié */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Ligne Juridique Directe
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Mme Adele Mbelle Nkelle
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Coordonnatrice du programme de soutien juridique pour la communauté francophone racisée de la région de Durham. Vos échanges restent strictement confidentiels et protégés.
              </p>
              <div className="space-y-2 pt-2 text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Ligne directe : <a href="tel:9054347374" className="text-amber-300 font-bold hover:underline">(905) 434-7374</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Courriel : <a href="mailto:justice@cofrd.org" className="text-amber-300 hover:underline">justice@cofrd.org</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Consultations sur rendez-vous (du lundi au vendredi)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <a
                href="tel:9054347374"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm py-4 px-6 rounded-xl transition"
              >
                <Phone className="w-4 h-4" />
                <span>Appeler maintenant</span>
              </a>
              <Link
                href="/contact?sujet=justice"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm py-4 px-6 rounded-xl border border-slate-700 transition"
              >
                <span>Envoyer un message confidentiel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
