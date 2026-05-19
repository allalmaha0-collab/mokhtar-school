export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncClubs() {
  try {
    const c = await prisma.club.findMany({ orderBy: [{ order: 'asc' }], include: { activities: { orderBy: { date: 'desc' }, take: 5 } } });
    await ecSet('clubs', c);
    return c;
  } catch { return []; }
}

export async function GET() {
  try {
    const cached = await ecGet('clubs');
    let clubs = cached || await prisma.club.findMany({ where: { isActive: true }, orderBy: [{ order: 'asc' }], include: { activities: { orderBy: { date: 'desc' }, take: 5 } } });
    if (cached) clubs = clubs.filter(c => c.isActive);
    return NextResponse.json({ clubs });
  } catch (err) {
    return NextResponse.json({ clubs: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json();
    const club = await prisma.club.create({ data: body });
    syncClubs().catch(() => {});
    return NextResponse.json({ club }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    await prisma.clubActivity.deleteMany({});
    await prisma.club.deleteMany({});
    await ecSet('clubs', []);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
