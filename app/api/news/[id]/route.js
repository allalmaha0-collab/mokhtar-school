export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

export async function GET(req, { params }) {
  const item = await prisma.news.findUnique({ where: { id: parseInt(params.id) } });
  if (!item) return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
  return NextResponse.json({ news: item });
}

export async function PATCH(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const item = await prisma.news.update({ where: { id: parseInt(params.id) }, data: body });
  return NextResponse.json({ news: item });
}

export async function DELETE(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  await prisma.news.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
