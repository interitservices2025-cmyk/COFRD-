import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { INITIAL_NEWS } from '@/lib/data';
import {
  Calendar,
  Tag,
  User,
  ArrowLeft,
  Share2,
  Download,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_NEWS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = INITIAL_NEWS.find((a) => a.slug === slug);
  if (!article) return { title: 'Actualité — COFRD' };

  return {
    title: `${article.title} — COFRD`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = INITIAL_NEWS.find((a) => a.slug === slug);

  if (!article) notFound();

  const otherArticles = INITIAL_NEWS.filter((a) => a.id !== article.id && a.published).slice(0, 2);
  const isDigitalBook = article.slug.includes('livre-numerique') || article.slug.includes('vivre-sa-francophonie');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero visuel */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à toutes les actualités</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                {formatDate(article.date)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contenu principal */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              {/* Chapeau */}
              <div className="text-base sm:text-lg font-semibold text-slate-700 border-l-4 border-blue-600 pl-4 py-1 leading-relaxed">
                {article.excerpt}
              </div>

              {/* Corps de texte */}
              <div className="text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base whitespace-pre-line">
                {article.content}
              </div>

              {/* Téléchargement spécial livre numérique */}
              {isDigitalBook && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-4 shadow-lg">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Document officiel en téléchargement libre</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Téléchargez le livre numérique complet (PDF)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Découvrez l'intégralité des récits, portraits et témoignages poignants rédigés lors des ateliers d'écriture du COFRD.
                  </p>
                  <a
                    href="https://www.cofrd.org//wp-content/uploads/VIVRE-SA-FRANCOPHONIE-DANS-LA-REGION-DE-DURHAM-Final.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-md transition"
                  >
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>Télécharger le livre (PDF, gratuit)</span>
                  </a>
                </div>
              )}

              {/* Signature de l'article */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Rédigé par <strong className="text-slate-800">{article.author}</strong></span>
                </div>
                <span>Publié le {formatDate(article.date)}</span>
              </div>
            </div>

            {/* Navigation bas de page */}
            <div className="flex items-center justify-between">
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour aux actualités</span>
              </Link>
              <Link
                href="/evenements"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-700 transition"
              >
                <span>Voir les événements culturels</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Panneau latéral */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400">
                Autres actualités récentes
              </h3>
              <div className="space-y-4">
                {otherArticles.map((other) => (
                  <Link
                    key={other.id}
                    href={`/actualites/${other.slug}`}
                    className="block group p-3 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                  >
                    <div className="text-xs text-slate-400 mb-1">{formatDate(other.date)}</div>
                    <div className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition line-clamp-2">
                      {other.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 text-center space-y-3">
              <h3 className="font-bold text-blue-900 text-sm">Restez informés</h3>
              <p className="text-xs text-blue-700 leading-relaxed">
                Suivez nos annonces et participez aux activités de la francophonie à Durham.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition"
              >
                <span>Nous contacter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
