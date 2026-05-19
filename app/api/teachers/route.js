export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

async function syncTeachers() {
  try {
    const t = await prisma.teacher.findMany({ orderBy: [{ order: 'asc' }, { fullname: 'asc' }] });
    await ecSet('teachers', t);
    return t;
  } catch { return []; }
}

export async function GET() {
  try {
    const cached = await ecGet('teachers');
    const teachers = cached != null ? cached : await prisma.teacher.findMany({ orderBy: [{ order: 'asc' }, { fullname: 'asc' }] });
    return NextResponse.json({ teachers });
  } catch (err) {
    return NextResponse.json({ teachers: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json();
    const teacher = await prisma.teacher.create({ data: body });
    syncTeachers().catch(() => {});
    return NextResponse.json({ teacher }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    await prisma.teacher.deleteMany({});
    await ecSet('teachers', []);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
