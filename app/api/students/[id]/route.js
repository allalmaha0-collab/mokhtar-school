import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

export async function GET(req, { params }) {
  const student = await prisma.student.findUnique({
    where: { id: parseInt(params.id) },
    include: { results: { orderBy: { createdAt: 'desc' } } },
  });
  if (!student) return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
  return NextResponse.json({ student });
}

export async function PATCH(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const student = await prisma.student.update({ where: { id: parseInt(params.id) }, data: body });
  return NextResponse.json({ student });
}

export async function DELETE(req, { params }) {
  if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  await prisma.student.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
