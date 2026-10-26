import { Metadata } from 'next';
import { db } from '@/lib/db';
import EventsClientPage from './EventsClientPage';

export const metadata: Metadata = {
  title: 'Programmation culturelle & Billetterie — COFRD',
  description: 'Découvrez et réservez les spectacles, concerts, ateliers et célébrations de la saison culturelle francophone dans la région de Durham.',
};

// Les événements et les places restantes proviennent de la base : rendu à chaque requête
export const dynamic = 'force-dynamic';

export default function EvenementsPage() {
  const events = db.getEvents().filter((e) => e.status === 'published');
  return <EventsClientPage events={events} />;
}
