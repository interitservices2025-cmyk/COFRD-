import { db } from '@/lib/db';
import { EventItem } from '@/lib/types';
import HeroSection from '@/components/home/HeroSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import StatsSection from '@/components/home/StatsSection';
import CulturalHighlight from '@/components/home/CulturalHighlight';
import CommunitySection from '@/components/home/CommunitySection';
import BookFeature from '@/components/home/BookFeature';
import PartnersSection from '@/components/home/PartnersSection';

// Rendu à chaque requête : événements issus de la base
export const dynamic = 'force-dynamic';

// Récupérer les événements publiés (rendu côté serveur sécurisé)
function getPublishedEvents(): EventItem[] {
  try {
    const all = db.getEvents();
    if (!Array.isArray(all)) return [];
    return all.filter((e) => e && e.status === 'published');
  } catch (err) {
    console.error('Erreur lors de la récupération des événements sur la page d\'accueil:', err);
    return [];
  }
}

export default function HomePage() {
  const events = getPublishedEvents();
  const featuredEvents = events.filter((e) => e.featured);
  const upcomingEvents = featuredEvents.length >= 3 ? featuredEvents : events.slice(0, 3);

  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <StatsSection />
      <CulturalHighlight events={upcomingEvents} />
      <BookFeature />
      <CommunitySection />
      <PartnersSection />
    </>
  );
}
