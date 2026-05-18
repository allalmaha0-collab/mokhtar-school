export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

export async function GET() {
  const posts = await prisma.boardingPost.findMany({ orderBy: { date: 'desc' } });
  return NextResponse.json({ posts });
}

export async function POST(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const post = await prisma.boardingPost.create({
    data: { title: body.title, content: body.content, category: body.category || 'خبر' },
  });
  return NextResponse.json({ post }, { status: 201 });
}

export async function PATCH(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { id, ...data } = await req.json();
  const post = await prisma.boardingPost.update({ where: { id }, data });
  return NextResponse.json({ post });
}

export async function DELETE(req) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (body.id) {
    await prisma.boardingPost.delete({ where: { id: body.id } });
  } else {
    await prisma.boardingPost.deleteMany({});
  }
  return NextResponse.json({ success: true });
}
