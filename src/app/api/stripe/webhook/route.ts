import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendReservationEmail } from '@/lib/email';
import { verifyStripeSignature } from '@/lib/stripe';

// POST /api/stripe/webhook — confirmation ou expiration d'un paiement
export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // corps brut requis pour la signature
  if (!verifyStripeSignature(rawBody, req.headers.get('stripe-signature'))) {
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const session = event?.data?.object;
  const reservationId: string | undefined = session?.metadata?.reservationId;

  if (reservationId) {
    if (event.type === 'checkout.session.completed' && session.payment_status === 'paid') {
      const existing = db.getReservationById(reservationId);
      // Idempotence : Stripe peut renvoyer le même événement
      if (existing && existing.status === 'pending') {
        const confirmed = db.confirmReservation(reservationId, session.payment_intent || session.id);
        if (confirmed) await sendReservationEmail(confirmed);
      }
    } else if (event.type === 'checkout.session.expired') {
      const existing = db.getReservationById(reservationId);
      if (existing && existing.status === 'pending') db.cancelReservation(reservationId);
    }
  }

  return NextResponse.json({ received: true });
}
