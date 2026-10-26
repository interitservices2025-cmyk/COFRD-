import { createHmac, timingSafeEqual } from 'crypto';
import { ReservationParticipant } from './types';

/**
 * Intégration Stripe Checkout via l'API REST (aucune donnée bancaire sur nos serveurs).
 * Sans STRIPE_SECRET_KEY, isStripeConfigured() retourne false.
 */
export const isStripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export async function createCheckoutSession(
  r: ReservationParticipant
): Promise<{ id: string; url: string }> {
  const siteUrl = getSiteUrl();
  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('customer_email', r.email);
  params.set('client_reference_id', r.id);
  params.set('metadata[reservationId]', r.id);
  params.set('metadata[reservationCode]', r.reservationCode);
  params.set('success_url', `${siteUrl}/reservation/confirmation?code=${r.reservationCode}`);
  params.set('cancel_url', `${siteUrl}/evenements`);
  // Expiration minimale Stripe : 30 min (libère les places retenues)
  params.set('expires_at', String(Math.floor(Date.now() / 1000) + 31 * 60));
  params.set('line_items[0][quantity]', String(r.ticketCount));
  params.set('line_items[0][price_data][currency]', 'cad');
  params.set('line_items[0][price_data][unit_amount]', String(Math.round(r.unitPrice * 100)));
  params.set('line_items[0][price_data][product_data][name]', `${r.eventTitle} — ${r.categoryName ?? 'Billet'}`);

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || 'Erreur Stripe.');
  return { id: json.id, url: json.url };
}

/** Vérifie l'en-tête Stripe-Signature (schéma v1, tolérance 5 min). */
export function verifyStripeSignature(rawBody: string, header: string | null): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !header) return false;

  const parts = Object.fromEntries(
    header.split(',').map((p) => {
      const [k, ...v] = p.split('=');
      return [k.trim(), v.join('=')];
    })
  );
  const timestamp = parts['t'];
  const signature = parts['v1'];
  if (!timestamp || !signature) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
