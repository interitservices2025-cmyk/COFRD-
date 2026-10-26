/**
 * Authentification administrateur COFRD.
 * Session = jeton signé HMAC-SHA256 (Web Crypto) stocké dans un cookie httpOnly.
 * Compatible runtime Node et proxy.ts.
 */
export const SESSION_COOKIE = 'cofrd_admin_session';
export const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 h

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
}

/** Comparaison en temps constant */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function getSessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  return secret && secret.length >= 16 ? secret : null;
}

export async function createSessionToken(): Promise<string | null> {
  const secret = getSessionSecret();
  if (!secret) return null;
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const secret = getSessionSecret();
  if (!secret) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'admin') return false;
  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now() / 1000) return false;
  const expected = await sign(`${parts[0]}.${parts[1]}`, secret);
  return safeEqual(expected, parts[2]);
}

/** Vérifie la session admin à partir d'une requête (route handlers). */
export async function isAdminRequest(req: { cookies: { get(name: string): { value: string } | undefined } }): Promise<boolean> {
  return verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
}
