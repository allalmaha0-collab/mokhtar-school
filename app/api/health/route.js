export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { existsSync } from 'fs';
import path from 'path';

export async function GET() {
  const cwd = process.cwd();
  const dbPath = path.resolve(cwd, 'prisma/school.db');
  const dbExists = existsSync(dbPath);

  const info = {
    time: new Date().toISOString(),
    cwd,
    db_path: dbPath,
    db_file_exists: dbExists,
    db_url: process.env.DATABASE_URL,
    jwt_set: !!process.env.JWT_SECRET,
  };

  try {
    const { default: prisma } = await import('@/lib/db');
    const userCount = await prisma.user.count();
    return NextResponse.json({ status: 'ok', ...info, db_connected: true, user_count: userCount });
  } catch (err) {
    return NextResponse.json({ status: 'error', ...info, db_connected: false, error: err.message }, { status: 500 });
  }
}
