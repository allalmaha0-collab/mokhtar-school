export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const announcements = await prisma.announcement.findMany({
    where: { isActive: true },
    orderBy: { date: 'desc' },
  });
  return NextResponse.json({ announcements });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const item = await prisma.announcement.create({ data: body });
  return NextResponse.json({ announcement: item }, { status: 201 });
}
