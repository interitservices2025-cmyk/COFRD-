import { Metadata } from 'next';
import Link from 'next/link';
import { GOVERNANCE_MEMBERS } from '@/lib/data';
import { ShieldCheck, Users, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Conseil d'Administration & Direction — COFRD",
  description: "Découvrez les membres du Conseil d'Administration et la Direction Générale du COFRD. Une gouvernance saine, transparente et engagée pour la francophonie de Durham.",
};

export default function CaPage() {
  const caMembers = GOVERNANCE_MEMBERS.filter(m => m.category === 'ca');
  const direction = GOVERNANCE_MEMBERS.filter(m => m.category === 'direction');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <span>/</span>
            <Link href="/a-propos" className="hover:text-white transition">À propos</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Conseil d'administration & Direction</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Gouvernance Institutionnelle</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Conseil d'Administration & Direction
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Le COFRD est guidé par des administrateurs et des gestionnaires dévoués, élus démocratiquement par les organismes membres pour assurer le rayonnement de notre collectivité.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Direction Générale */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Gestion Opérationnelle
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Direction Générale
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {direction.map((member) => (
              <div key={member.id} className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl border border-blue-800 shadow-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-white text-center sm:text-left">
                <div className="w-24 h-24 rounded-2xl bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center text-amber-300 font-black text-3xl shrink-0 shadow-lg">
                  {member.name.split(' ').pop()?.charAt(0)}
                </div>
                <div className="space-y-2 flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Direction Générale du COFRD
                  </div>
                  <h3 className="text-2xl font-black text-white">{member.name}</h3>
                  <div className="text-sm text-blue-300 font-semibold">{member.role}</div>
                  {member.bio && (
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed pt-2 border-t border-blue-800/60">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conseil d'Administration */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              Conseil d'Administration 2025-2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Les Membres du Conseil
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Bénévoles engagés, ils définissent les orientations stratégiques et veillent à la saine gestion du COFRD.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-sm">
                    {member.name.split(' ').pop()?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                    <div className="text-xs text-blue-700 font-semibold mt-0.5">{member.role}</div>
                    {member.bio && (
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Principes de Gouvernance */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Transparence & Rigueur
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Une gouvernance au service des membres
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Le COFRD est un organisme sans but lucratif régi par la Loi sur les corporations ontariennes. Nos états financiers font l'objet d'un audit annuel indépendant et sont présentés aux membres lors de l'Assemblée Générale Annuelle (AGA).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Élection démocratique des administrateurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Audit comptable externe annuel certifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Comité de conformité et politique anti-oppression</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reddition de compte rigoureuse auprès des bailleurs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/a-propos#membres"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-4 px-6 rounded-xl shadow-sm transition"
              >
                <Building2 className="w-4 h-4" />
                <span>Découvrir les 31 organismes membres</span>
              </Link>
              <Link
                href="/contact?sujet=adhesion"
                className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-3.5 px-6 rounded-xl transition"
              >
                <span>Faire une demande d'affiliation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
