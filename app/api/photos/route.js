export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

async function sync() {
  try { const d = await prisma.photo.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] }); await ecSet('photos', d); return d; } catch { return []; }
}

export async function GET() {
  try {
    const cached = await ecGet('photos');
    const photos = cached != null ? cached : await prisma.photo.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] });
    return NextResponse.json({ photos });
  } catch (err) { return NextResponse.json({ photos: [], error: err.message }, { status: 500 }); }
}

export async function POST(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json();
    const photo = await prisma.photo.create({ data: body });
    sync().catch(() => {});
    return NextResponse.json({ photo }, { status: 201 });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function PATCH(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const { id, ...data } = await req.json();
    const photo = await prisma.photo.update({ where: { id }, data });
    sync().catch(() => {});
    return NextResponse.json({ photo });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const { id } = await req.json().catch(() => ({}));
    if (id) await prisma.photo.delete({ where: { id } });
    else await prisma.photo.deleteMany({});
    sync().catch(() => {});
    return NextResponse.json({ success: true });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
