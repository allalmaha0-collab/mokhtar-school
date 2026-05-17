export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function GET() {
  const info = {
    time: new Date().toISOString(),
    node: process.version,
    env: process.env.NODE_ENV,
    db_url_set: !!process.env.DATABASE_URL,
    db_url_prefix: process.env.DATABASE_URL?.slice(0, 30) + '…',
    jwt_set: !!process.env.JWT_SECRET,
  }

  try {
    const { default: prisma } = await import('@/lib/db')
    await prisma.$queryRaw`SELECT 1`
    const userCount = await prisma.user.count()
    return NextResponse.json({ status: 'ok', ...info, db_connected: true, user_count: userCount })
  } catch (err) {
    return NextResponse.json(
      { status: 'error', ...info, db_connected: false, error: err.message },
      { status: 500 }
    )
  }
}
