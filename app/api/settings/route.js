export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma, getSettings } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  if (!verifyToken(token)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { settings } = await req.json();
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({ where: { key }, update: { value: String(value) }, create: { key, value: String(value) } });
  }
  return NextResponse.json({ success: true });
}
