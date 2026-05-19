export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncNews() {
  const news = await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } });
  await ecSet('news', news);
  return news;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit    = parseInt(searchParams.get('limit') || '50');
  const breaking = searchParams.get('breaking') === 'true';

  // Try Edge Config first (always fresh, shared across all instances)
  const cached = await ecGet('news');
  let news = cached || await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } });

  if (breaking) news = news.filter(n => n.isBreaking);
  else news = news.slice(0, limit);

  return NextResponse.json({ news });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const item = await prisma.news.create({ data: { title: body.title, content: body.content, category: body.category || 'عام', imageUrl: body.imageUrl || null, isBreaking: body.isBreaking || false } });
  await syncNews();
  return NextResponse.json({ news: item }, { status: 201 });
}
