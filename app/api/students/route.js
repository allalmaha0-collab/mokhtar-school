export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Public: lookup by massarCode (results page)
  const massarCode = searchParams.get('massar') || '';
  if (massarCode) {
    const student = await prisma.student.findUnique({
      where: { massarCode },
      include: { results: { orderBy: { createdAt: 'desc' } } },
    });
    if (!student) return NextResponse.json({ error: 'التلميذ غير موجود' }, { status: 404 });
    return NextResponse.json({ student });
  }

  // Protected: dashboard list with pagination + filters
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const search    = searchParams.get('search')    || '';
  const level     = searchParams.get('level')     || '';
  const classroom = searchParams.get('classroom') || '';
  const page      = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const per       = Math.min(100, parseInt(searchParams.get('per') || '20'));
  const skip      = (page - 1) * per;

  const where = {};
  if (search)    where.OR = [{ fullname: { contains: search } }, { massarCode: { contains: search } }];
  if (level)     where.level = { contains: level };
  if (classroom) where.classroom = { contains: classroom };

  const [students, total] = await Promise.all([
    prisma.student.findMany({ where, orderBy: { fullname: 'asc' }, skip, take: per }),
    prisma.student.count({ where }),
  ]);

  return NextResponse.json({ students, total, page, pages: Math.ceil(total / per) });
}

// DELETE all students
export async function DELETE(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  await prisma.studentResult.deleteMany({});
  await prisma.student.deleteMany({});
  return NextResponse.json({ success: true });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.massarCode?.trim()) return NextResponse.json({ error: 'رقم مسار مطلوب' }, { status: 400 });
    if (!body.fullname?.trim())   return NextResponse.json({ error: 'الاسم الكامل مطلوب' }, { status: 400 });

    const student = await prisma.student.create({
      data: {
        massarCode: body.massarCode.trim(),
        fullname:   body.fullname.trim(),
        level:      body.level     || '',
        classroom:  body.classroom || '',
      },
    });
    return NextResponse.json({ student }, { status: 201 });
  } catch (err) {
    if (err.code === 'P2002') return NextResponse.json({ error: 'رقم مسار موجود مسبقاً' }, { status: 409 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
