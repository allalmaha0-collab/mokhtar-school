export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncActivities() {
  const activities = await prisma.activity.findMany({ orderBy: { date: 'desc' } });
  await ecSet('activities', activities);
  return activities;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit    = parseInt(searchParams.get('limit') || '50');
  const category = searchParams.get('category') || '';

  const cached = await ecGet('activities');
  let activities = cached || await prisma.activity.findMany({ orderBy: { date: 'desc' } });

  if (category) activities = activities.filter(a => a.category === category);
  activities = activities.slice(0, limit);

  return NextResponse.json({ activities });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const activity = await prisma.activity.create({ data: body });
  await syncActivities();
  return NextResponse.json({ activity }, { status: 201 });
}
