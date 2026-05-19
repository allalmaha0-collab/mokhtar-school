export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncNews() {
  try {
    const news = await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } });
    await ecSet('news', news);
    return news;
  } catch { return []; }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit    = parseInt(searchParams.get('limit') || '50');
    const breaking = searchParams.get('breaking') === 'true';

    // Try Edge Config, fall back to SQLite
    let news = await ecGet('news');
    if (!news) {
      news = await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } });
    }

    if (breaking) news = news.filter(n => n.isBreaking);
    return NextResponse.json({ news: news.slice(0, limit) });
  } catch (err) {
    return NextResponse.json({ news: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await req.json();
    const item = await prisma.news.create({
      data: {
        title:      body.title     || '',
        content:    body.content   || '',
        category:   body.category  || 'عام',
        imageUrl:   body.imageUrl  || null,
        isBreaking: body.isBreaking || false,
      },
    });

    // Sync to Edge Config (non-blocking)
    syncNews().catch(() => {});

    return NextResponse.json({ news: item }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/news]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
