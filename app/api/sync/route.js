export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma, { getSettings } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecSet } from '@/lib/store';

// Sync ALL collections to Edge Config at once
// Call after any admin change or on first deploy
export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const [news, activities, teachers, clubs, announcements, settings, boarding, social] = await Promise.all([
    prisma.news.findMany({ orderBy: { publishedAt: 'desc' } }),
    prisma.activity.findMany({ orderBy: { date: 'desc' } }),
    prisma.teacher.findMany({ orderBy: [{ order: 'asc' }, { fullname: 'asc' }] }),
    prisma.club.findMany({ orderBy: [{ order: 'asc' }], include: { activities: { take: 5 } } }),
    prisma.announcement.findMany({ where: { isActive: true }, orderBy: { date: 'desc' } }),
    getSettings(),
    prisma.boardingPost.findMany({ orderBy: { date: 'desc' } }),
    prisma.socialPost.findMany({ orderBy: { date: 'desc' } }),
  ]);

  await Promise.all([
    ecSet('news', news),
    ecSet('activities', activities),
    ecSet('teachers', teachers),
    ecSet('clubs', clubs),
    ecSet('announcements', announcements),
    ecSet('settings', settings),
    ecSet('boarding', boarding),
    ecSet('social', social),
  ]);

  return NextResponse.json({ success: true, synced: { news: news.length, activities: activities.length, teachers: teachers.length, clubs: clubs.length } });
}
