import { Metadata } from 'next';
import { INITIAL_NEWS } from '@/lib/data';
import Link from 'next/link';
import { Calendar, ArrowRight, Newspaper, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Actualités — COFRD | Nouvelles de la communauté francophone de Durham',
  description: 'Restez informé des dernières nouvelles du COFRD : événements culturels, programmes communautaires, justice et vie associative francophone à Durham.',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ActualitesPage() {
  const articles = INITIAL_NEWS.filter(a => a.published);
  const [featured, ...rest] = articles;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-5">
            <Newspaper className="w-3.5 h-3.5" />
            Vie communautaire & Nouvelles
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Actualités du COFRD
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Restez connectés à la vie francophone de Durham : événements passés, publications, programmes et initiatives.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Article vedette */}
        {featured && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                    <Tag className="w-3 h-3" />
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featured.date)}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-4">
                  {featured.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="text-xs text-slate-400 mb-5">Par {featured.author}</div>
                <Link
                  href={`/actualites/${featured.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition w-fit"
                >
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grille des autres articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((article) => (
            <div key={article.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400">{formatDate(article.date)}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-700 transition">
                  {article.title}
                </h2>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400">Par {article.author}</span>
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 group/link"
                  >
                    <span>Lire</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-semibold">Aucune actualité publiée pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
