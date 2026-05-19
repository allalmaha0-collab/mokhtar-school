export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecSet } from '@/lib/store';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

async function syncActivities() {
  const activities = await prisma.activity.findMany({ orderBy: { date: 'desc' } });
  await ecSet('activities', activities);
}

export async function GET(req, { params }) {
  const item = await prisma.activity.findUnique({ where: { id: parseInt(params.id) } });
  if (!item) return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
  return NextResponse.json({ activity: item });
}

export async function PATCH(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const item = await prisma.activity.update({ where: { id: parseInt(params.id) }, data: body });
  await syncActivities();
  return NextResponse.json({ activity: item });
}

export async function DELETE(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  await prisma.activity.delete({ where: { id: parseInt(params.id) } });
  await syncActivities();
  return NextResponse.json({ success: true });
}
