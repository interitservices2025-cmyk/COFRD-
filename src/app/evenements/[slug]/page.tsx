import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import EventDetailClient from './EventDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// Rendu à chaque requête : nouveaux événements et places restantes à jour
export const dynamic = 'force-dynamic';

function getPublishedEvent(slug: string) {
  const event = db.getEventById(slug);
  return event && event.status === 'published' ? event : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getPublishedEvent(slug);
  if (!event) return { title: 'Événement — COFRD' };
  return {
    title: `${event.title} — COFRD`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getPublishedEvent(slug);
  if (!event) notFound();
  return <EventDetailClient event={event} />;
}
