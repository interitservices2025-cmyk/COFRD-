import { ReservationParticipant } from './types';
import { formatCurrencyCAD, formatDateFrench, formatTimeFrench } from './utils';

/**
 * Service de courriels transactionnels (Resend via API REST).
 * Sans RESEND_API_KEY : mode simulation (journal serveur uniquement).
 */
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildConfirmationEmail(r: ReservationParticipant): { subject: string; html: string } {
  const pending = r.status === 'pending';
  const amount = r.totalAmount === 0 ? 'Gratuit' : formatCurrencyCAD(r.totalAmount);
  const subject = pending
    ? `Réservation reçue — ${r.eventTitle}`
    : `Confirmation de votre billet — ${r.eventTitle}`;
  const html = `
<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0f172a">
  <div style="background:#0056c6;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
    <h1 style="margin:0;font-size:20px">${pending ? 'Réservation reçue' : 'Réservation confirmée'}</h1>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:0;padding:24px;border-radius:0 0 12px 12px">
    <p>Bonjour ${escapeHtml(r.fullName)},</p>
    <p>${pending ? "Votre réservation est enregistrée et en attente de paiement." : 'Merci! Votre place est confirmée.'}</p>
    <p><strong>${escapeHtml(r.eventTitle)}</strong><br>
       ${escapeHtml(formatDateFrench(r.eventDate))} à ${escapeHtml(formatTimeFrench(r.eventDate))}</p>
    <p style="font-size:22px;letter-spacing:2px;font-family:monospace;background:#f1f5f9;padding:12px;text-align:center;border-radius:8px">
      ${escapeHtml(r.reservationCode)}</p>
    <p>${r.ticketCount} billet(s) · ${escapeHtml(amount)}</p>
    <p style="font-size:12px;color:#64748b">Présentez ce code à l'entrée. Questions : (905) 434-7676 — dg@cofrd.org</p>
  </div>
</div>`;
  return { subject, html };
}

export async function sendReservationEmail(r: ReservationParticipant): Promise<{ sent: boolean; simulated: boolean }> {
  const { subject, html } = buildConfirmationEmail(r);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'COFRD <billetterie@cofrd.org>';

  if (!apiKey) {
    console.info(`[email:simulation] À ${r.email} — ${subject} (${r.reservationCode})`);
    return { sent: false, simulated: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [r.email], subject, html }),
    });
    if (!res.ok) {
      console.error('[email] Échec Resend:', res.status, await res.text());
      return { sent: false, simulated: false };
    }
    return { sent: true, simulated: false };
  } catch (err) {
    // Un échec d'envoi ne doit jamais annuler la réservation
    console.error('[email] Erreur réseau:', err);
    return { sent: false, simulated: false };
  }
}
