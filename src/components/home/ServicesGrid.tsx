import React from 'react';
import Link from 'next/link';
import { Briefcase, Users, Scale, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ServicesGrid() {
  const services = [
    {
      id: 'cefd',
      icon: Briefcase,
      color: 'blue',
      badge: 'Carrefour Professionnel',
      title: 'Centre d’Emploi Francophone (CEFD)',
      description: 'Accompagnement personnalisé pour l’insertion professionnelle et le développement de carrière des francophones de la région de Durham.',
      features: [
        'Aide à la rédaction de CV et lettres en français & bilingue',
        'Préparation aux entrevues d’embauche',
        'Ateliers sur le marché du travail canadien',
        'Mise en relation directe avec les employeurs de Durham'
      ],
      internalLink: '/services/emploi',
      externalLink: 'https://emploi.cofrd.org/',
      externalLabel: 'emploi.cofrd.org'
    },
    {
      id: 'etablissement',
      icon: Users,
      color: 'emerald',
      badge: 'Nouveaux Arrivants',
      title: 'Services d’Établissement & Intégration',
      description: 'Accueil chaleureux, orientation et appui sur mesure pour faciliter l’installation et l’épanouissement des familles et des élèves immigrants.',
      features: [
        'TÉÉ : Soutien à l’intégration scolaire des élèves nouvellement arrivés',
        'PAÉFLNA : Appui à l’intégration sociale et civique canadienne',
        'Établissement communautaire : Démarches administratives et logement',
        'Ateliers d’orientation pour toute la famille'
      ],
      internalLink: '/services/etablissement',
      externalLink: 'https://etablissement.cofrd.org/',
      externalLabel: 'etablissement.cofrd.org'
    },
    {
      id: 'justice',
      icon: Scale,
      color: 'amber',
      badge: 'Accès à la Justice',
      title: 'Programme de Soutien Juridique',
      description: 'Information et orientation sur la justice civile et les droits des personnes francophones, particulièrement les membres de communautés racisées.',
      features: [
        'Consultations avec des juristes, avocats et notaires',
        'Droits du travail, logement, famille, immigration et consommation',
        'Aiguillage vers la médiation et la résolution de conflits',
        'Sessions d’information collectives régulières'
      ],
      internalLink: '/services/justice',
      phone: '(905) 434-7374',
      phoneEmail: 'justice@cofrd.org'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#1b365d] font-extrabold text-xs tracking-wider uppercase bg-[#1b365d]/10 border border-[#1b365d]/20 px-3.5 py-1.5 rounded-full">
            Nos Programmes &amp; Services à la Communauté
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Un accompagnement francophone complet et de proximité
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Le COFRD met à la disposition des résidents de Durham des services gratuits et confidentiels pour l’emploi, l’intégration des familles et l’accès à la justice.
          </p>
        </div>

        {/* Grille des 3 services phares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group md:last:col-span-2 lg:last:col-span-1"
              >
                <div>
                  {/* Icône & badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      s.color === 'blue' ? 'bg-[#1b365d]/10 text-[#1b365d]' :
                      s.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-[#f97316]/10 text-[#f97316]'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide px-3 py-1 bg-slate-100 rounded-full">
                      {s.badge}
                    </span>
                  </div>

                  {/* Titre & description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1b365d] transition">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {s.description}
                  </p>

                  {/* Liste de points */}
                  <div className="space-y-2.5 mb-8">
                    {s.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                          s.color === 'blue' ? 'text-blue-600' :
                          s.color === 'emerald' ? 'text-emerald-600' :
                          'text-amber-600'
                        }`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Liens d'action */}
                <div className="pt-6 border-t border-slate-100 space-y-2">
                  <Link
                    href={s.internalLink}
                    className="inline-flex items-center justify-between w-full text-sm font-bold text-slate-900 hover:text-[#1b365d] py-2 transition"
                  >
                    <span>Consulter les détails du service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {s.externalLink && (
                    <a
                      href={s.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#1b365d] hover:text-[#11233d] font-semibold"
                    >
                      <span>Accéder au portail dédié ({s.externalLabel})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {s.phone && (
                    <div className="text-xs text-slate-500 pt-1">
                      Ligne directe : <a href="tel:9054347374" className="font-bold text-[#f97316] hover:underline">{s.phone}</a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
