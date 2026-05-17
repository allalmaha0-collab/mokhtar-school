export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const massarCode = searchParams.get('massar') || '';

  if (massarCode) {
    const student = await prisma.student.findUnique({
      where: { massarCode },
      include: { results: { orderBy: { createdAt: 'desc' } } },
    });
    if (!student) return NextResponse.json({ error: 'التلميذ غير موجود' }, { status: 404 });
    return NextResponse.json({ student });
  }

  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const students = await prisma.student.findMany({
    where: search ? { OR: [{ fullname: { contains: search } }, { massarCode: { contains: search } }] } : {},
    orderBy: { fullname: 'asc' },
    take: 100,
  });
  return NextResponse.json({ students, total: students.length });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const body = await req.json();
  const student = await prisma.student.create({ data: body });
  return NextResponse.json({ student }, { status: 201 });
}
