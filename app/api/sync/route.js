export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma, { getSettings } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecSet } from '@/lib/store';

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const [news, activities, teachers, clubs, announcements, settings, boarding, social, achievements, photos, media, resources] = await Promise.all([
    prisma.news.findMany({ orderBy: { publishedAt: 'desc' } }),
    prisma.activity.findMany({ orderBy: { date: 'desc' } }),
    prisma.teacher.findMany({ orderBy: [{ order: 'asc' }, { fullname: 'asc' }] }),
    prisma.club.findMany({ orderBy: [{ order: 'asc' }], include: { activities: { take: 5 } } }),
    prisma.announcement.findMany({ where: { isActive: true }, orderBy: { date: 'desc' } }),
    getSettings(),
    prisma.boardingPost.findMany({ orderBy: { date: 'desc' } }),
    prisma.socialPost.findMany({ orderBy: { date: 'desc' } }),
    prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.photo.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] }),
    prisma.mediaContent.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.resource.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }] }),
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
    ecSet('achievements', achievements),
    ecSet('photos', photos),
    ecSet('media', media),
    ecSet('resources', resources),
  ]);

  return NextResponse.json({
    success: true,
    synced: {
      news: news.length, activities: activities.length, teachers: teachers.length,
      clubs: clubs.length, announcements: announcements.length, boarding: boarding.length,
      social: social.length, achievements: achievements.length, photos: photos.length,
      media: media.length, resources: resources.length,
    },
  });
}
