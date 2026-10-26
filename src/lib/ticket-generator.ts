/**
 * Générateur de code de réservation COFRD
 * Format : COFRD-YYYY-XXXXX (ex : COFRD-2026-AB12C)
 * Utilise le générateur cryptographique (codes non devinables).
 */
export function generateReservationCode(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Caractères sans ambiguïté (I, O, 0, 1 exclus)
  const random = new Uint32Array(5);
  crypto.getRandomValues(random);
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(random[i] % chars.length);
  }
  return `COFRD-${year}-${code}`;
}

/**
 * Valide le format d'un code de réservation
 */
export function isValidReservationCode(code: string): boolean {
  return /^COFRD-\d{4}-[A-Z0-9]{5}$/.test(code.trim().toUpperCase());
}
