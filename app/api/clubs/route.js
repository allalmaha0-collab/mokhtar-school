import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const clubs = await prisma.club.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    include: { activities: { orderBy: { date: 'desc' }, take: 5 } },
  });
  return NextResponse.json({ clubs });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const club = await prisma.club.create({ data: body });
  return NextResponse.json({ club }, { status: 201 });
}
