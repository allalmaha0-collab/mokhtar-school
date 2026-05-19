export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncAnnouncements() {
  const items = await prisma.announcement.findMany({ where: { isActive: true }, orderBy: { date: 'desc' } });
  await ecSet('announcements', items);
  return items;
}

export async function GET() {
  const cached = await ecGet('announcements');
  const announcements = cached != null ? cached : await prisma.announcement.findMany({ where: { isActive: true }, orderBy: { date: 'desc' } });
  return NextResponse.json({ announcements });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const item = await prisma.announcement.create({ data: body });
  await syncAnnouncements();
  return NextResponse.json({ announcement: item }, { status: 201 });
}
