export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category') || '';

  const activities = await prisma.activity.findMany({
    where: category ? { category } : {},
    orderBy: { date: 'desc' },
    take: limit,
  });
  return NextResponse.json({ activities });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const activity = await prisma.activity.create({ data: body });
  return NextResponse.json({ activity }, { status: 201 });
}
