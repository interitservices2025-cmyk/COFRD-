import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

/**
 * Protège l'espace /admin : redirection vers /admin/login sans session valide.
 * (Les routes API vérifient aussi la session elles-mêmes — défense en profondeur.)
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const valid = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!valid) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
