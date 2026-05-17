import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const posts = await prisma.boardingPost.findMany({ orderBy: { date: 'desc' } });
  return NextResponse.json({ posts });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const post = await prisma.boardingPost.create({ data: body });
  return NextResponse.json({ post }, { status: 201 });
}
