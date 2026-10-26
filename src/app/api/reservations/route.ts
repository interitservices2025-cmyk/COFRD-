import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { isAdminRequest } from '@/lib/auth';
import { sendReservationEmail } from '@/lib/email';
import { createCheckoutSession, isStripeConfigured } from '@/lib/stripe';

const UNAUTHORIZED = () =>
  NextResponse.json({ success: false, error: 'Authentification requise.' }, { status: 401 });

// GET /api/reservations?code=xxx (public, le code sert de secret)
// GET /api/reservations[?eventId=xxx] (admin uniquement : données personnelles)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (code) {
      const reservation = db.getReservationByCode(code);
      if (!reservation) {
        return NextResponse.json({ success: false, error: 'Code de réservation introuvable.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, reservation });
    }

    if (!(await isAdminRequest(req))) return UNAUTHORIZED();

    const reservations = db.getReservations(searchParams.get('eventId') || undefined);
    return NextResponse.json({ success: true, reservations });
  } catch (err) {
    console.error('GET /api/reservations error:', err);
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 });
  }
}

// POST /api/reservations
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, fullName, email, phone, ticketCount, categoryName, notes } = body;

    if (!eventId || !fullName || !email || !phone || !ticketCount) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants : eventId, fullName, email, phone, ticketCount.' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(ticketCount) || ticketCount < 1 || ticketCount > 10) {
      return NextResponse.json({ success: false, error: 'Nombre de billets invalide (1–10).' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Adresse courriel invalide.' }, { status: 400 });
    }

    const event = db.getEventById(eventId);
    if (!event || event.status !== 'published') {
      return NextResponse.json({ success: false, error: 'Événement introuvable.' }, { status: 404 });
    }

    const stripeReady = isStripeConfigured();
    const needsPayment = !event.isFree;

    const result = db.createReservation({
      eventId: event.id,
      fullName: String(fullName).trim().slice(0, 120),
      email: email.trim().toLowerCase(),
      phone: String(phone).trim().slice(0, 30),
      ticketCount,
      categoryName,
      notes: typeof notes === 'string' ? notes.slice(0, 500) : undefined,
      isPaid: !needsPayment,
      paymentMethod: needsPayment ? (stripeReady ? 'stripe' : 'door') : 'free',
      // Billet payant : en attente jusqu'à confirmation du paiement
      status: needsPayment ? 'pending' : 'confirmed',
    });

    if (!result.success || !result.reservation) {
      return NextResponse.json({ success: false, error: result.error }, { status: 409 });
    }

    const reservation = result.reservation;
    let checkoutUrl: string | undefined;

    if (needsPayment && stripeReady) {
      try {
        const session = await createCheckoutSession(reservation);
        db.attachPaymentReference(reservation.id, session.id);
        checkoutUrl = session.url;
      } catch (err) {
        // Libère les places retenues si la session de paiement ne peut être créée
        db.cancelReservation(reservation.id);
        console.error('Stripe checkout error:', err);
        return NextResponse.json(
          { success: false, error: 'Le service de paiement est momentanément indisponible. Réessayez.' },
          { status: 502 }
        );
      }
    } else {
      // Gratuit ou paiement sur place : courriel immédiat
      await sendReservationEmail(reservation);
    }

    return NextResponse.json({ success: true, reservation, checkoutUrl }, { status: 201 });
  } catch (err) {
    console.error('POST /api/reservations error:', err);
    return NextResponse.json({ success: false, error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}

// DELETE /api/reservations?id=xxx (admin)
export async function DELETE(req: NextRequest) {
  try {
    if (!(await isAdminRequest(req))) return UNAUTHORIZED();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Paramètre id manquant.' }, { status: 400 });
    }

    const result = db.cancelReservation(id);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/reservations error:', err);
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 });
  }
}
