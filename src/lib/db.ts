import fs from 'fs';
import path from 'path';
import { EventItem, NewsArticle, ReservationParticipant } from './types';
import { INITIAL_EVENTS, INITIAL_NEWS, INITIAL_RESERVATIONS } from './data';
import { generateReservationCode } from './ticket-generator';

interface DatabaseSchema {
  events: EventItem[];
  reservations: ReservationParticipant[];
  news: NewsArticle[];
  lastUpdated: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cofrd_db.json');

// S'assure que le dossier et le fichier de données existent
function ensureDbExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      events: INITIAL_EVENTS,
      reservations: INITIAL_RESERVATIONS,
      news: INITIAL_NEWS,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function readDb(): DatabaseSchema {
  ensureDbExists();
  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Erreur de lecture de la base de données:', err);
    return {
      events: INITIAL_EVENTS,
      reservations: INITIAL_RESERVATIONS,
      news: INITIAL_NEWS,
      lastUpdated: new Date().toISOString(),
    };
  }
}

function writeDb(data: DatabaseSchema): void {
  ensureDbExists();
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
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
