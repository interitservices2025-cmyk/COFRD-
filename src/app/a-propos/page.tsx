import { Metadata } from 'next';
import { GOVERNANCE_MEMBERS, MEMBER_ORGANIZATIONS, AFFILIATED_SCHOOLS, OFFICIAL_PARTNERS } from '@/lib/data';
import { Target, Eye, Sparkles, ShieldCheck, Building2, GraduationCap, HeartHandshake, History } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À propos du COFRD — Mission, Vision & Histoire',
  description: "Fondé en 1984, le COFRD est l'organisme parapluie de la francophonie à Durham. Découvrez notre mission, notre vision, notre gouvernance et nos 31 organismes membres.",
};

export default function AProposPage() {
  const caMembers = GOVERNANCE_MEMBERS.filter(m => m.category === 'ca');
  const direction = GOVERNANCE_MEMBERS.filter(m => m.category === 'direction');
  const communautaireOrgs = MEMBER_ORGANIZATIONS.filter(m => m.category === 'communautaire');
  const scolaireOrgs = MEMBER_ORGANIZATIONS.filter(m => m.category === 'scolaire');
  const serviceOrgs = MEMBER_ORGANIZATIONS.filter(m => m.category === 'service');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-5">
            <History className="w-3.5 h-3.5" />
            Fondé en 1984 · 40 ans d'histoire
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5">
            À propos du COFRD
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Le Conseil des Organismes Francophones de la Région de Durham : au service des communautés francophones depuis plus de 40 ans.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Mission / Vision / Vision artistique */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: Target, color: 'bg-blue-100 text-blue-700',
              title: 'Notre mission',
              content: [
                'Être au service des communautés francophones de Durham et contribuer à leur vitalité.',
                'Rassembler et célébrer la diversité des communautés francophones.',
                'Regrouper et concerter les organisations francophones membres de la région.'
              ]
            },
            {
              icon: Eye, color: 'bg-emerald-100 text-emerald-700',
              title: 'Notre vision',
              content: [
                'Actif, visible, créatif et engageant, le COFRD est au cœur des communautés francophones de la région de Durham.',
                'Une offre variée d\'activités, de programmes et de services répondant aux besoins de ses clientèles ainsi qu\'un leadership communautaire soutenu.'
              ]
            },
            {
              icon: Sparkles, color: 'bg-amber-100 text-amber-700',
              title: 'Vision artistique',
              content: [
                'Diffuseur fièrement franco-ontarien qui rassemble les publics lors de rendez-vous artistiques et culturels chaleureux et diversifiés.',
                'Le COFRD est le cœur culturel de la francophonie dans la région de Durham, à l\'image de sa collectivité.'
              ]
            }
          ].map((bloc, i) => {
            const Icon = bloc.icon;
            return (
              <div key={i} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm md:last:col-span-2 lg:last:col-span-1">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bloc.color} mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">{bloc.title}</h2>
                <ul className="space-y-3">
                  {bloc.content.map((c, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-blue-500 mt-1.5 shrink-0">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Gouvernance — Conseil d'administration */}
        <div id="gouvernance">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-blue-700 font-extrabold text-xs tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Gouvernance
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">Conseil d'administration & Direction</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {caMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-lg shrink-0">
                  {member.name.split(' ').pop()?.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{member.name}</div>
                  <div className="text-xs text-blue-700 font-semibold mt-0.5">{member.role}</div>
                  {member.bio && <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {direction.map((member) => (
              <div key={member.id} className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl border border-blue-800 shadow-sm p-6 flex items-start gap-4 text-white">
                <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-black text-2xl shrink-0">
                  {member.name.split(' ').pop()?.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Direction Générale</div>
                  <div className="font-bold text-white text-base">{member.name}</div>
                  <div className="text-xs text-blue-300 font-semibold mt-0.5">{member.role}</div>
                  {member.bio && <p className="text-xs text-slate-300 mt-2 leading-relaxed">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organismes membres */}
        <div id="membres">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-blue-700 font-extrabold text-xs tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
              <Building2 className="w-3.5 h-3.5" />
              {MEMBER_ORGANIZATIONS.length} organismes affiliés
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">Nos Organismes membres</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
              Le COFRD fédère un réseau dynamique d'organismes communautaires, scolaires et de services francophones dans toute la région de Durham.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: 'Organismes communautaires', icon: HeartHandshake, color: 'text-blue-700 bg-blue-50', orgs: communautaireOrgs },
              { title: 'Institutions scolaires', icon: GraduationCap, color: 'text-emerald-700 bg-emerald-50', orgs: scolaireOrgs },
              { title: 'Services & Ressources', icon: Building2, color: 'text-amber-700 bg-amber-50', orgs: serviceOrgs },
            ].map((group, i) => {
              const Icon = group.icon;
              return (
                <div key={i} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden md:last:col-span-2 lg:last:col-span-1">
                  <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${group.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{group.title}</div>
                      <div className="text-xs text-slate-400">{group.orgs.length} organismes</div>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    {group.orgs.map((org) => (
                      <div key={org.id} className="px-3 py-2 rounded-xl hover:bg-slate-50 transition">
                        <div className="text-sm text-slate-900 font-medium">{org.name}</div>
                        <div className="text-xs text-slate-400">Affiliation : {org.affiliationDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Écoles affiliées */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900">8 Institutions scolaires affiliées</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AFFILIATED_SCHOOLS.map((school, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-blue-700" />
                </div>
                <div className="font-bold text-slate-900 text-sm">{school.name}</div>
                <div className="text-xs text-slate-400 mt-1">{school.city} · Depuis {school.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
