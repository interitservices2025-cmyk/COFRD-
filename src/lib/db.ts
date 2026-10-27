import fs from 'fs';
import path from 'path';
import os from 'os';
import { EventItem, NewsArticle, ReservationParticipant } from './types';
import { INITIAL_EVENTS, INITIAL_NEWS, INITIAL_RESERVATIONS } from './data';
import { generateReservationCode } from './ticket-generator';

interface DatabaseSchema {
  events: EventItem[];
  reservations: ReservationParticipant[];
  news: NewsArticle[];
  lastUpdated: string;
}

// Emplacements de persistance
const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DB_FILE = path.join(LOCAL_DATA_DIR, 'cofrd_db.json');
const TMP_DB_FILE = path.join(os.tmpdir(), 'cofrd_db.json');

// Cache singleton en mémoire pour le runtime serverless et le développement
let inMemoryDb: DatabaseSchema | null = null;

/**
 * Retourne le jeu de données par défaut complet et officiel (embarqué dans le bundle).
 */
function getDefaultData(): DatabaseSchema {
  return {
    events: INITIAL_EVENTS,
    reservations: INITIAL_RESERVATIONS,
    news: INITIAL_NEWS,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Lecture de la base de données : STRICTEMENT EN LECTURE SEULE.
 * Ne tente JAMAIS de créer de dossier (mkdir) ni d'écrire de fichier lors d'une lecture,
 * garantissant ainsi la compatibilité totale avec les environnements serverless en lecture seule (Vercel).
 */
function readDb(): DatabaseSchema {
  // 1. Retourner le cache mémoire s'il est déjà initialisé
  if (inMemoryDb) {
    return inMemoryDb;
  }

  // 2. Tenter de lire le fichier local si disponible (développement local)
  try {
    if (fs.existsSync(LOCAL_DB_FILE)) {
      const content = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.events)) {
        inMemoryDb = parsed;
        return inMemoryDb!;
      }
    }
  } catch (err) {
    console.warn('[DB] Lecture du fichier local ignorée, fallback vers la source suivante:', err);
  }

  // 3. Tenter de lire depuis le stockage temporaire Vercel (/tmp)
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const content = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.events)) {
        inMemoryDb = parsed;
        return inMemoryDb!;
      }
    }
  } catch (err) {
    console.warn('[DB] Lecture du fichier temporaire /tmp ignorée:', err);
  }

  // 4. Fallback immédiat et sécurisé : initialiser le cache avec les données officielles embarquées
  inMemoryDb = getDefaultData();
  return inMemoryDb;
}

/**
 * Écriture de la base de données : met à jour la mémoire puis tente de persister
 * sur le système de fichiers (local ou /tmp sur Vercel) sans jamais bloquer ni faire crasher l'application.
 */
function writeDb(data: DatabaseSchema): void {
  data.lastUpdated = new Date().toISOString();
  // Mise à jour immédiate de la mémoire (source de vérité runtime)
  inMemoryDb = data;

  // 1. Tenter la persistance locale (pour le développement sous Windows/Linux)
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return;
  } catch {
    // Échec attendu dans les conteneurs serverless à système de fichiers en lecture seule (/var/task)
  }

  // 2. Fallback Vercel/Lambda : persistance dans os.tmpdir() (/tmp est le seul dossier inscriptible)
  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (tmpErr) {
    console.warn('[DB] Avertissement: Impossible de persister sur le disque temporaire serverless:', tmpErr);
  }
}

export const db = {
  // --- ÉVÉNEMENTS ---
  getEvents(): EventItem[] {
    const data = readDb();
    return data.events;
  },

  getEventById(id: string): EventItem | undefined {
    const events = this.getEvents();
    return events.find((e) => e.id === id || e.slug === id);
  },

  createEvent(eventData: Omit<EventItem, 'id' | 'reservedCount'>): EventItem {
    const data = readDb();
    const id = `evt-${Date.now()}`;
    const newEvent: EventItem = {
      ...eventData,
      id,
      reservedCount: 0,
    };
    data.events.unshift(newEvent);
    writeDb(data);
    return newEvent;
  },

  updateEvent(id: string, updates: Partial<EventItem>): EventItem | null {
    const data = readDb();
    const index = data.events.findIndex((e) => e.id === id);
    if (index === -1) return null;

    data.events[index] = { ...data.events[index], ...updates };
    writeDb(data);
    return data.events[index];
  },

  deleteEvent(id: string): boolean {
    const data = readDb();
    const initialLength = data.events.length;
    data.events = data.events.filter((e) => e.id !== id);
    if (data.events.length !== initialLength) {
      writeDb(data);
      return true;
    }
    return false;
  },

  // --- RÉSERVATIONS ---
  getReservations(eventId?: string): ReservationParticipant[] {
    const data = readDb();
    if (eventId) {
      return data.reservations.filter((r) => r.eventId === eventId);
    }
    return data.reservations;
  },

  getReservationByCode(code: string): ReservationParticipant | undefined {
    const data = readDb();
    return data.reservations.find(
      (r) => r.reservationCode.toUpperCase() === code.trim().toUpperCase()
    );
  },

  createReservation(
    params: {
      eventId: string;
      fullName: string;
      email: string;
      phone: string;
      ticketCount: number;
      categoryName?: string;
      notes?: string;
      isPaid?: boolean;
      paymentMethod?: 'free' | 'stripe' | 'door';
      paymentReference?: string;
      status?: 'confirmed' | 'pending';
    }
  ): { success: boolean; reservation?: ReservationParticipant; error?: string } {
    const data = readDb();
    const eventIndex = data.events.findIndex((e) => e.id === params.eventId);
    if (eventIndex === -1) {
      return { success: false, error: 'Événement introuvable.' };
    }

    const event = data.events[eventIndex];

    // Vérification de la date limite
    if (event.registrationDeadline) {
      const deadline = new Date(event.registrationDeadline);
      if (new Date() > deadline) {
        return { success: false, error: "La date limite d'inscription pour cet événement est dépassée." };
      }
    }

    // Vérification de la capacité restante
    const remainingSeats = event.capacity - event.reservedCount;
    if (params.ticketCount > remainingSeats) {
      return {
        success: false,
        error: `Capacité insuffisante. Seulement ${remainingSeats} place(s) disponible(s).`,
      };
    }

    // Prévention des doublons stricts (même email + même événement dans les dernières 3 minutes)
    const existingRecent = data.reservations.find(
      (r) =>
        r.eventId === params.eventId &&
        r.email.toLowerCase() === params.email.toLowerCase() &&
        r.status === 'confirmed' &&
        new Date().getTime() - new Date(r.createdAt).getTime() < 3 * 60 * 1000
    );
    if (existingRecent) {
      return {
        success: false,
        error: 'Une réservation similaire a déjà été validée il y a quelques instants pour ce courriel.',
      };
    }

    // Calcul du montant
    let unitPrice = 0;
    if (!event.isFree) {
      if (params.categoryName && event.priceCategories) {
        const cat = event.priceCategories.find((c) => c.name === params.categoryName);
        unitPrice = cat ? cat.price : (event.priceMin || 0);
      } else {
        unitPrice = event.priceMin || 0;
      }
    }
    const totalAmount = unitPrice * params.ticketCount;

    // Référence unique (régénérée en cas de collision)
    let reservationCode = generateReservationCode();
    while (data.reservations.some((r) => r.reservationCode === reservationCode)) {
      reservationCode = generateReservationCode();
    }

    const newReservation: ReservationParticipant = {
      id: `res-${Date.now()}`,
      reservationCode,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.dateStart,
      fullName: params.fullName,
      email: params.email,
      phone: params.phone,
      ticketCount: params.ticketCount,
      categoryName: params.categoryName || (event.isFree ? 'Gratuit' : 'Général'),
      unitPrice,
      totalAmount,
      isPaid: event.isFree ? true : (params.isPaid ?? false),
      paymentMethod: params.paymentMethod || (event.isFree ? 'free' : 'stripe'),
      paymentReference: params.paymentReference,
      status: params.status ?? 'confirmed',
      createdAt: new Date().toISOString(),
      notes: params.notes,
    };

    // Mise à jour atomique de l'événement et enregistrement
    data.events[eventIndex].reservedCount += params.ticketCount;
    data.reservations.unshift(newReservation);
    writeDb(data);

    return { success: true, reservation: newReservation };
  },

  getReservationById(id: string): ReservationParticipant | undefined {
    return readDb().reservations.find((r) => r.id === id);
  },

  /** Confirme une réservation en attente après paiement validé. */
  confirmReservation(id: string, paymentReference?: string): ReservationParticipant | null {
    const data = readDb();
    const index = data.reservations.findIndex((r) => r.id === id);
    if (index === -1) return null;
    const current = data.reservations[index];
    if (current.status === 'cancelled') return null;
    data.reservations[index] = {
      ...current,
      status: 'confirmed',
      isPaid: true,
      paymentReference: paymentReference ?? current.paymentReference,
    };
    writeDb(data);
    return data.reservations[index];
  },

  attachPaymentReference(id: string, paymentReference: string): void {
    const data = readDb();
    const index = data.reservations.findIndex((r) => r.id === id);
    if (index === -1) return;
    data.reservations[index].paymentReference = paymentReference;
    writeDb(data);
  },

  cancelReservation(id: string): { success: boolean; error?: string } {
    const data = readDb();
    const resIndex = data.reservations.findIndex((r) => r.id === id);
    if (resIndex === -1) return { success: false, error: 'Réservation non trouvée.' };

    const reservation = data.reservations[resIndex];
    if (reservation.status === 'cancelled') {
      return { success: false, error: 'Cette réservation est déjà annulée.' };
    }

    // Remise des places dans la capacité
    const eventIndex = data.events.findIndex((e) => e.id === reservation.eventId);
    if (eventIndex !== -1) {
      data.events[eventIndex].reservedCount = Math.max(
        0,
        data.events[eventIndex].reservedCount - reservation.ticketCount
      );
    }

    data.reservations[resIndex].status = 'cancelled';
    writeDb(data);
    return { success: true };
  },

  // --- ACTUALITÉS ---
  getNews(): NewsArticle[] {
    const data = readDb();
    return data.news;
  },

  createNews(articleData: Omit<NewsArticle, 'id'>): NewsArticle {
    const data = readDb();
    const newArticle: NewsArticle = {
      ...articleData,
      id: `art-${Date.now()}`,
    };
    data.news.unshift(newArticle);
    writeDb(data);
    return newArticle;
  },

  updateNews(id: string, updates: Partial<NewsArticle>): NewsArticle | null {
    const data = readDb();
    const index = data.news.findIndex((a) => a.id === id);
    if (index === -1) return null;

    data.news[index] = { ...data.news[index], ...updates };
    writeDb(data);
    return data.news[index];
  },

  deleteNews(id: string): boolean {
    const data = readDb();
    const initialLength = data.news.length;
    data.news = data.news.filter((a) => a.id !== id);
    if (data.news.length !== initialLength) {
      writeDb(data);
      return true;
    }
    return false;
  },
};
