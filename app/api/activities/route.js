export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncActivities() {
  try {
    const a = await prisma.activity.findMany({ orderBy: { date: 'desc' } });
    await ecSet('activities', a);
    return a;
  } catch { return []; }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit    = parseInt(searchParams.get('limit') || '50');
    const category = searchParams.get('category') || '';

    let activities = await ecGet('activities');
    if (activities == null) activities = await prisma.activity.findMany({ orderBy: { date: 'desc' } });

    if (category) activities = activities.filter(a => a.category === category);
    return NextResponse.json({ activities: activities.slice(0, limit) });
  } catch (err) {
    return NextResponse.json({ activities: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json();
    const activity = await prisma.activity.create({ data: body });
    syncActivities().catch(() => {});
    return NextResponse.json({ activity }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
