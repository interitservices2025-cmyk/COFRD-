import { Metadata } from 'next';
import { db } from '@/lib/db';
import { EventItem } from '@/lib/types';
import EventsClientPage from './EventsClientPage';

export const metadata: Metadata = {
  title: 'Programmation culturelle & Billetterie — COFRD',
  description: 'Découvrez et réservez les spectacles, concerts, ateliers et célébrations de la saison culturelle francophone dans la région de Durham.',
};

// Les événements et les places restantes proviennent de la base : rendu à chaque requête
export const dynamic = 'force-dynamic';

export default function EvenementsPage() {
  let events: EventItem[] = [];
  try {
    const all = db.getEvents();
    events = Array.isArray(all) ? all.filter((e) => e && e.status === 'published') : [];
  } catch (err) {
    console.error('Erreur lors du chargement des événements (/evenements):', err);
    events = [];
  }
  return <EventsClientPage events={events} />;
}
