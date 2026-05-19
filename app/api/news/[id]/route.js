export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecSet } from '@/lib/store';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

async function syncNews() {
  const news = await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } });
  await ecSet('news', news);
}

export async function GET(req, { params }) {
  const item = await prisma.news.findUnique({ where: { id: parseInt(params.id) } });
  if (!item) return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
  return NextResponse.json({ news: item });
}

export async function PATCH(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const item = await prisma.news.update({ where: { id: parseInt(params.id) }, data: body });
  await syncNews();
  return NextResponse.json({ news: item });
}

export async function DELETE(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  await prisma.news.delete({ where: { id: parseInt(params.id) } });
  await syncNews();
  return NextResponse.json({ success: true });
}
