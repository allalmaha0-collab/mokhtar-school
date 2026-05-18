export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

export async function GET() {
  const photos = await prisma.photo.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] });
  return NextResponse.json({ photos });
}

export async function POST(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const photo = await prisma.photo.create({ data: body });
  return NextResponse.json({ photo }, { status: 201 });
}

export async function PATCH(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { id, ...data } = await req.json();
  const photo = await prisma.photo.update({ where: { id }, data });
  return NextResponse.json({ photo });
}

export async function DELETE(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { id } = await req.json();
  if (id) await prisma.photo.delete({ where: { id } });
  else    await prisma.photo.deleteMany({});
  return NextResponse.json({ success: true });
}
