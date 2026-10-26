export type EventCategory = 
  | 'Spectacle'
  | 'Atelier'
  | 'Littérature'
  | 'Communautaire'
  | 'Jeunesse'
  | 'Célébration';

export type EventStatus = 'published' | 'draft' | 'archived' | 'cancelled';

export interface EventPriceCategory {
  name: string;
  price: number; // 0 pour gratuit
  description?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  artist?: string;
  dateStart: string; // ISO String ou YYYY-MM-DDTHH:mm
  dateEnd: string;
  locationName: string;
  address: string;
  city: string;
  postalCode?: string;
  category: EventCategory;
  isFree: boolean;
  priceMin?: number;
  priceCategories?: EventPriceCategory[];
  capacity: number; // Capacité max
  reservedCount: number; // Nombre de places réservées
  registrationDeadline?: string;
  imageUrl: string;
  featured?: boolean;
  status: EventStatus;
  externalTicketUrl?: string; // Si Eventbrite ou billetterie partenaire
  notes?: string;
}

export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'waitlist';

export interface ReservationParticipant {
  id: string;
  reservationCode: string; // Ex: COFRD-2026-AB12C
  eventId: string;
  eventTitle: string;
  eventDate: string;
  fullName: string;
  email: string;
  phone: string;
  ticketCount: number;
  categoryName?: string;
  unitPrice: number;
  totalAmount: number;
  isPaid: boolean;
  paymentMethod?: 'free' | 'stripe' | 'door';
  paymentReference?: string;
  status: ReservationStatus;
  createdAt: string;
  notes?: string;
}

export interface MemberOrganization {
  id: string;
  name: string;
  affiliationDate: string;
  category: 'communautaire' | 'scolaire' | 'service';
  website?: string;
}

export interface GovernanceMember {
  id: string;
  name: string;
  role: string;
  category: 'ca' | 'direction';
  bio?: string;
  imageUrl?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  imageUrl: string;
  published: boolean;
}

export interface PartnerItem {
  id: string;
  name: string;
  logoUrl?: string;
  category: 'gouvernemental' | 'arts' | 'scolaire' | 'financier' | 'communautaire';
}
