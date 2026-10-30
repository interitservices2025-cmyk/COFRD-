import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BannerInfo from '@/components/layout/BannerInfo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1b365d',
};

export const metadata: Metadata = {
  title: 'COFRD — Conseil des Organismes Francophones de la Région de Durham',
  description: 'Au cœur de la francophonie de Durham depuis 1984. Le COFRD rassemble et accompagne les communautés francophones grâce à ses programmes d’emploi, d’établissement, de soutien juridique et sa programmation artistique et culturelle.',
  keywords: [
    'COFRD',
    'Durham',
    'francophonie',
    'Oshawa',
    'Whitby',
    'Ajax',
    'Pickering',
    'spectacles francophones',
    'billetterie culturelle',
    'soutien juridique',
    'centre emploi francophone',
    'nouveaux arrivants Ontario'
  ],
  authors: [{ name: 'COFRD — Conseil des Organismes Francophones de la Région de Durham' }],
  metadataBase: new URL('https://www.cofrd.org'),
  openGraph: {
    title: 'COFRD — Conseil des Organismes Francophones de la Région de Durham',
    description: 'Au cœur de la francophonie de Durham : programmes, services d’établissement, soutien juridique et programmation culturelle.',
    url: 'https://www.cofrd.org',
    siteName: 'COFRD',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COFRD — Région de Durham',
    description: 'Programmes communautaires, emploi, établissement et saison culturelle francophone.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded-xl focus:shadow-xl focus:font-bold focus:outline-none"
        >
          Passer au contenu principal
        </a>
        <BannerInfo />
        <Header />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
