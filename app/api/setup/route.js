export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

// One-time setup endpoint — creates admin user if none exist.
// Protected by SETUP_SECRET env var.
export async function POST(req) {
  try {
    const { secret } = await req.json();
    const setupSecret = process.env.SETUP_SECRET;

    if (!setupSecret || secret !== setupSecret) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const existing = await prisma.user.count();
    if (existing > 0) {
      return NextResponse.json({ message: 'المدير موجود بالفعل' });
    }

    const email = process.env.ADMIN_EMAIL || 'admin@school.ma';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, passwordHash, name: 'المدير', role: 'admin' },
    });

    return NextResponse.json({
      success: true,
      message: 'تم إنشاء حساب المدير',
      email: user.email,
    });
  } catch (err) {
    console.error('Setup error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
