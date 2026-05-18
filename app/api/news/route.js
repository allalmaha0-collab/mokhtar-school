export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit    = parseInt(searchParams.get('limit') || '20');
  const breaking = searchParams.get('breaking') === 'true';

  const where = breaking ? { isBreaking: true } : {};
  const news = await prisma.news.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
    take: breaking ? 10 : limit,
  });
  return NextResponse.json({ news });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { title, content, category, imageUrl } = await req.json();
  if (!title || !content) return NextResponse.json({ error: 'العنوان والمحتوى مطلوبان' }, { status: 400 });

  const item = await prisma.news.create({
    data: { title, content, category: category || 'عام', imageUrl: imageUrl || null },
  });
  return NextResponse.json({ news: item }, { status: 201 });
}
