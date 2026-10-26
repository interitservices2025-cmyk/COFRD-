import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { EventItem } from '@/lib/types';
import { isAdminRequest } from '@/lib/auth';

const UNAUTHORIZED = () =>
  NextResponse.json({ success: false, error: 'Authentification requise.' }, { status: 401 });

// Champs modifiables par l'admin (id, slug et reservedCount sont protégés)
const UPDATABLE_FIELDS: (keyof EventItem)[] = [
  'title', 'subtitle', 'description', 'longDescription', 'artist', 'dateStart', 'dateEnd',
  'locationName', 'address', 'city', 'postalCode', 'category', 'isFree', 'priceMin',
  'priceCategories', 'capacity', 'registrationDeadline', 'imageUrl', 'featured', 'status',
  'externalTicketUrl', 'notes',
];

// GET /api/events?slug=xxx&status=published  (le public ne voit que les événements publiés)
export async function GET(req: NextRequest) {
  try {
    const admin = await isAdminRequest(req);
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status');

    if (slug) {
      const event = db.getEventById(slug);
      if (!event || (!admin && event.status !== 'published')) {
        return NextResponse.json({ success: false, error: 'Événement introuvable.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, event });
    }

    let events = db.getEvents();
    if (!admin) events = events.filter((e) => e.status === 'published');
    if (status) {
      events = events.filter((e) => e.status === status);
    }

    return NextResponse.json({ success: true, events });
  } catch (err) {
    console.error('GET /api/events error:', err);
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 });
  }
}

// POST /api/events  (création admin)
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdminRequest(req))) return UNAUTHORIZED();
    const body = await req.json();
    const { title, slug, dateStart, dateEnd, locationName, address, city, category, capacity, imageUrl, description } = body;

    if (!title || !slug || !dateStart || !locationName || !city || !category || !capacity || !description) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants.' },
        { status: 400 }
      );
    }

    const newEvent = db.createEvent({
      slug,
      title,
      description,
      dateStart,
      dateEnd: dateEnd || dateStart,
      locationName,
      address: address || '',
      city,
      category,
      isFree: body.isFree ?? true,
      priceMin: body.priceMin,
      priceCategories: body.priceCategories,
      capacity: Number(capacity),
      registrationDeadline: body.registrationDeadline,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      featured: body.featured ?? false,
      status: body.status ?? 'draft',
      notes: body.notes,
    } as Omit<EventItem, 'id' | 'reservedCount'>);

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (err) {
    console.error('POST /api/events error:', err);
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 });
  }
}

// PATCH /api/events?id=xxx
export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAdminRequest(req))) return UNAUTHORIZED();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Paramètre id manquant.' }, { status: 400 });
    }

    const body = await req.json();
    const updates: Partial<EventItem> = {};
    for (const key of UPDATABLE_FIELDS) {
      if (key in body) (updates as Record<string, unknown>)[key] = body[key];
    }
    const updated = db.updateEvent(id, updates);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Événement introuvable.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, event: updated });
  } catch (err) {
    console.error('PATCH /api/events error:', err);
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 });
  }
}

// DELETE /api/events?id=xxx
export async function DELETE(req: NextRequest) {
  try {
    if (!(await isAdminRequest(req))) return UNAUTHORIZED();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Paramètre id manquant.' }, { status: 400 });
    }

    const deleted = db.deleteEvent(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Événement introuvable.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/events error:', err);
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 });
  }
}
