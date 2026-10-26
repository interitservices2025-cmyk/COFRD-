import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
  createSessionToken,
  safeEqual,
} from '@/lib/auth';

// POST /api/admin/session  { password }  → ouvre une session
export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.SESSION_SECRET) {
    return NextResponse.json(
      { success: false, error: "L'authentification n'est pas configurée (ADMIN_PASSWORD / SESSION_SECRET)." },
      { status: 503 }
    );
  }

  const { password } = await req.json().catch(() => ({ password: '' }));
  if (typeof password !== 'string' || !safeEqual(password, expected)) {
    // Ralentissement léger contre le brute force
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ success: false, error: 'Mot de passe incorrect.' }, { status: 401 });
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json({ success: false, error: 'SESSION_SECRET invalide (16 caractères min).' }, { status: 503 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
  return res;
}

// DELETE /api/admin/session → déconnexion
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
