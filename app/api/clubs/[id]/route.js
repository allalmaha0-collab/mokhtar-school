import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

export async function GET(req, { params }) {
  const club = await prisma.club.findUnique({
    where: { id: parseInt(params.id) },
    include: { activities: { orderBy: { date: 'desc' } } },
  });
  if (!club) return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
  return NextResponse.json({ club });
}

export async function PATCH(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const club = await prisma.club.update({ where: { id: parseInt(params.id) }, data: body });
  return NextResponse.json({ club });
}

export async function DELETE(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  await prisma.club.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
