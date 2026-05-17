export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ messages });
}

export async function POST(req) {
  const { name, email, phone, message } = await req.json();
  if (!name || !message) return NextResponse.json({ error: 'الاسم والرسالة مطلوبان' }, { status: 400 });
  const msg = await prisma.message.create({ data: { name, email: email || null, phone: phone || null, message } });
  return NextResponse.json({ message: msg }, { status: 201 });
}

export async function PATCH(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { id } = await req.json();
  await prisma.message.update({ where: { id }, data: { isRead: true } });
  return NextResponse.json({ success: true });
}
