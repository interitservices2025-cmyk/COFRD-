import { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase, Users, Scale, CheckCircle2, Phone, Mail,
  ArrowRight, ExternalLink, Clock, Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Programmes — COFRD | Emploi, Établissement, Justice',
  description: 'Le COFRD offre des services gratuits en emploi (CEFD), établissement des nouveaux arrivants (TÉÉ, PAÉFLNA) et soutien juridique pour les francophones de Durham.',
};

const services = [
  {
    id: 'emploi',
    icon: Briefcase,
    colorClass: 'bg-blue-100 text-blue-700 border-blue-200',
    accentClass: 'text-blue-700',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    title: 'Centre d\'Emploi Francophone de Durham (CEFD)',
    subtitle: 'Carrefour professionnel francophone',
    description: 'Accompagnement personnalisé et gratuit pour l\'insertion professionnelle et le développement de carrière des francophones de Durham.',
    features: [
      'Aide à la rédaction de CV et lettres de motivation bilingues',
      'Préparation aux entrevues d\'embauche',
      'Ateliers sur le marché du travail canadien',
      'Mise en relation directe avec les employeurs de Durham',
      'Orientation professionnelle individuelle',
      'Accès aux ressources numériques de recherche d\'emploi',
    ],
    contact: { phone: '(905) 434-7676', email: 'dg@cofrd.org' },
    externalUrl: 'https://emploi.cofrd.org/',
    externalLabel: 'emploi.cofrd.org',
    internalLink: '/services/emploi',
    hours: 'Lun–Ven, 8h30 – 16h30',
    note: 'Service entièrement gratuit et confidentiel pour les résidents de Durham.'
  },
  {
    id: 'etablissement',
    icon: Users,
    colorClass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    accentClass: 'text-emerald-700',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'Services d\'Établissement & Intégration',
    subtitle: 'Accueil des nouveaux arrivants',
    description: 'Accompagnement chaleureux pour faciliter l\'installation, l\'intégration scolaire et l\'épanouissement des familles et élèves immigrants francophones.',
    features: [
      'TÉÉ : Soutien à l\'intégration scolaire des élèves nouvellement arrivés',
      'PAÉFLNA : Appui à l\'intégration sociale et civique canadienne',
      'Établissement communautaire : Démarches administratives et logement',
      'Ateliers d\'orientation pour toute la famille',
      'Accompagnement aux démarches d\'immigration et de résidence',
      'Référencement vers les services communautaires et gouvernementaux',
    ],
    contact: { phone: '(905) 434-7676', email: 'dg@cofrd.org' },
    externalUrl: 'https://etablissement.cofrd.org/',
    externalLabel: 'etablissement.cofrd.org',
    internalLink: '/services/etablissement',
    hours: 'Lun–Ven, 8h30 – 16h30',
    note: 'Services subventionnés par IRCC et Emploi Ontario.'
  },
  {
    id: 'justice',
    icon: Scale,
    colorClass: 'bg-amber-100 text-amber-700 border-amber-200',
    accentClass: 'text-amber-700',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    title: 'Programme de Soutien Juridique',
    subtitle: 'Accès à la justice civile',
    description: 'Information, orientation et consultations juridiques gratuites pour les membres de la communauté francophone et racisée de Durham sur leurs droits civils.',
    features: [
      'Consultations individuelles avec des avocats et notaires',
      'Droits du travail, logement, famille et consommation',
      'Aiguillage vers la médiation et la résolution de conflits',
      'Sessions d\'information collectives régulières',
      'Traduction et interprétation disponibles',
      'Accompagnement pour les procédures en français devant les tribunaux',
    ],
    contact: { phone: '(905) 434-7374', email: 'justice@cofrd.org', contactPerson: 'Mme Adele Mbelle Nkelle' },
    internalLink: '/services/justice',
    hours: 'Sur rendez-vous · (905) 434-7374',
    note: 'Programme financé par le Ministère de la Justice du Canada.'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Services & Programmes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">
              du COFRD
            </span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Des services communautaires gratuits, confidentiels et en français pour les résidents francophones de la région de Durham.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.id} id={service.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Panneau de gauche */}
                <div className="bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 p-5 sm:p-8 space-y-5 sm:space-y-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${service.colorClass}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${service.badgeClass}`}>
                      {service.subtitle}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">{service.title}</h2>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">{service.description}</p>
                  </div>

                  {/* Horaires */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{service.hours}</span>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    {service.contact.contactPerson && (
                      <p className="text-xs font-semibold text-slate-700">Contact : {service.contact.contactPerson}</p>
                    )}
                    <a href={`tel:${service.contact.phone.replace(/\D/g, '')}`} className={`flex items-center gap-2 text-sm font-bold ${service.accentClass} hover:underline`}>
                      <Phone className="w-4 h-4" />
                      {service.contact.phone}
                    </a>
                    <a href={`mailto:${service.contact.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700">
                      <Mail className="w-4 h-4" />
                      {service.contact.email}
                    </a>
                  </div>

                  {/* Note de financement */}
                  <div className="text-xs text-slate-400 bg-slate-100 rounded-xl p-3">
                    {service.note}
                  </div>

                  {/* Liens */}
                  <div className="space-y-2">
                    <Link
                      href={service.internalLink}
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3 rounded-xl transition w-full justify-center"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {service.externalUrl && (
                      <a
                        href={service.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 font-semibold mt-2"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Portail dédié : {service.externalLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Panneau de droite : détails */}
                <div className="lg:col-span-2 p-5 sm:p-8">
                  <h3 className="text-base font-bold text-slate-900 mb-5">Ce que nous offrons</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${service.accentClass}`} />
                        <span className="text-sm text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
