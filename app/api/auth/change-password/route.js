export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { comparePassword, hashPassword, verifyToken } from '@/lib/auth';

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { old: oldPwd, new: newPwd } = await req.json();
  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user || !(await comparePassword(oldPwd, user.passwordHash)))
    return NextResponse.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 400 });

  const hashed = await hashPassword(newPwd);
  await prisma.user.update({ where: { id: decoded.id }, data: { passwordHash: hashed } });
  return NextResponse.json({ success: true });
}
