export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { students, results, skipDuplicates = true } = await req.json();
  if (!students?.length) return NextResponse.json({ inserted: 0, errors: 0, duplicates: [] });

  let inserted = 0, errors = 0;
  const duplicates = [];

  for (const s of students) {
    try {
      const massar = s.massar_code || s.massarCode || '';
      const existing = massar ? await prisma.student.findUnique({ where: { massarCode: massar } }) : null;
      if (existing && skipDuplicates) { duplicates.push(s); continue; }

      const student = existing
        ? await prisma.student.update({ where: { id: existing.id }, data: { fullname: s.fullname, level: s.level || '', classroom: s.classroom || '' } })
        : await prisma.student.create({ data: { massarCode: massar || `TEMP-${Date.now()}`, fullname: s.fullname || 'غير محدد', level: s.level || '', classroom: s.classroom || '' } });

      if (results && massar) {
        const studentResults = results.filter(r => (r.massar_code || r.massarCode) === massar);
        for (const r of studentResults) {
          await prisma.studentResult.create({
            data: {
              studentId: student.id,
              semester: r.semester || 'الفصل الأول',
              generalAverage: parseFloat(r.generalAverage) || 0,
              councilDecision: r.councilDecision || '',
              grades: JSON.stringify(r.grades || []),
            },
          });
        }
      }
      inserted++;
    } catch (e) {
      console.error('Import error for student:', s.massarCode, e.message);
      errors++;
    }
  }

  return NextResponse.json({ inserted, errors, duplicates, total: students.length });
}
