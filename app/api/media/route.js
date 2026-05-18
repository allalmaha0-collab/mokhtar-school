export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || '';
  const where = type ? { type } : {};
  const items = await prisma.mediaContent.findMany({ where, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ media: items });
}

export async function POST(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const item = await prisma.mediaContent.create({ data: body });
  return NextResponse.json({ media: item }, { status: 201 });
}

export async function PATCH(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { id, ...data } = await req.json();
  const item = await prisma.mediaContent.update({ where: { id }, data });
  return NextResponse.json({ media: item });
}

export async function DELETE(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { id } = await req.json();
  if (id) await prisma.mediaContent.delete({ where: { id } });
  else    await prisma.mediaContent.deleteMany({});
  return NextResponse.json({ success: true });
}
