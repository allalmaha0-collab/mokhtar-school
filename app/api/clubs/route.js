export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncClubs() {
  const clubs = await prisma.club.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }], include: { activities: { orderBy: { date: 'desc' }, take: 5 } } });
  await ecSet('clubs', clubs);
  return clubs;
}

export async function GET() {
  const cached = await ecGet('clubs');
  const clubs = cached || await prisma.club.findMany({ where: { isActive: true }, orderBy: [{ order: 'asc' }], include: { activities: { orderBy: { date: 'desc' }, take: 5 } } });
  return NextResponse.json({ clubs: cached ? clubs.filter(c => c.isActive) : clubs });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const club = await prisma.club.create({ data: body });
  await syncClubs();
  return NextResponse.json({ club }, { status: 201 });
}

export async function DELETE(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  await prisma.clubActivity.deleteMany({});
  await prisma.club.deleteMany({});
  await ecSet('clubs', []);
  return NextResponse.json({ success: true });
}
