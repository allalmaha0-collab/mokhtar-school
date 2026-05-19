export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncTeachers() {
  const teachers = await prisma.teacher.findMany({ orderBy: [{ order: 'asc' }, { fullname: 'asc' }] });
  await ecSet('teachers', teachers);
  return teachers;
}

export async function GET() {
  const cached = await ecGet('teachers');
  const teachers = cached || await prisma.teacher.findMany({ orderBy: [{ order: 'asc' }, { fullname: 'asc' }] });
  return NextResponse.json({ teachers });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const teacher = await prisma.teacher.create({ data: body });
  await syncTeachers();
  return NextResponse.json({ teacher }, { status: 201 });
}

export async function DELETE(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  await prisma.teacher.deleteMany({});
  await ecSet('teachers', []);
  return NextResponse.json({ success: true });
}
