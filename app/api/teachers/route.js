export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const teachers = await prisma.teacher.findMany({ orderBy: [{ order: 'asc' }, { fullname: 'asc' }] });
  return NextResponse.json({ teachers });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const teacher = await prisma.teacher.create({ data: body });
  return NextResponse.json({ teacher }, { status: 201 });
}
