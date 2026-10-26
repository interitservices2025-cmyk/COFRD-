import { db } from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import StatsSection from '@/components/home/StatsSection';
import CulturalHighlight from '@/components/home/CulturalHighlight';
import CommunitySection from '@/components/home/CommunitySection';
import BookFeature from '@/components/home/BookFeature';
import PartnersSection from '@/components/home/PartnersSection';

// Rendu à chaque requête : événements issus de la base
export const dynamic = 'force-dynamic';

// Récupérer les événements publiés (rendu côté serveur)
function getPublishedEvents() {
  return db.getEvents().filter((e) => e.status === 'published');
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
