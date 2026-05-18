export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || '';
  const where = type ? { type } : {};
  const resources = await prisma.resource.findMany({ where, orderBy: [{ category: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }] });
  return NextResponse.json({ resources });
}

export async function POST(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const resource = await prisma.resource.create({ data: body });
  return NextResponse.json({ resource }, { status: 201 });
}

export async function PATCH(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { id, ...data } = await req.json();
  const resource = await prisma.resource.update({ where: { id }, data });
  return NextResponse.json({ resource });
}

export async function DELETE(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (body.id) {
    await prisma.resource.delete({ where: { id: body.id } });
  } else if (body.type) {
    await prisma.resource.deleteMany({ where: { type: body.type } });
  } else {
    await prisma.resource.deleteMany({});
  }
  return NextResponse.json({ success: true });
}
