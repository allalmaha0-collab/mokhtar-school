export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { existsSync } from 'fs';
import path from 'path';

export async function GET() {
  const cwd = process.cwd();
  const dbPath = path.resolve(cwd, 'prisma/school.db');
  const tmpPath = '/tmp/school.db';

  const EC_ID = 'ecfg_93ikhqyrljsln1nafdfgwjli1bbf';
  const EC_TOKEN = process.env.VERCEL_API_TOKEN || '';
  const TEAM_ID = 'team_CetWfzqQbPBmLvFzoIzMIQ4W';

  // Test Edge Config write
  let ecWriteOk = false;
  let ecWriteError = '';
  if (EC_TOKEN) {
    try {
      const r = await fetch(`https://api.vercel.com/v1/edge-config/${EC_ID}/items?teamId=${TEAM_ID}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${EC_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ operation: 'upsert', key: '_healthcheck', value: new Date().toISOString() }] })
      });
      ecWriteOk = r.ok;
      if (!r.ok) ecWriteError = await r.text();
    } catch (e) { ecWriteError = e.message; }
  }

  const info = {
    time: new Date().toISOString(),
    cwd,
    db_bundle_exists: existsSync(dbPath),
    db_tmp_exists: existsSync(tmpPath),
    db_url: process.env.DATABASE_URL || '(not set)',
    jwt_set: !!process.env.JWT_SECRET,
    vercel_api_token_set: !!EC_TOKEN,
    vercel_api_token_prefix: EC_TOKEN ? EC_TOKEN.slice(0, 8) + '...' : '(empty)',
    ec_write_ok: ecWriteOk,
    ec_write_error: ecWriteError,
    node_env: process.env.NODE_ENV,
  };

  try {
    const { default: prisma } = await import('@/lib/db');
    const [userCount, teacherCount, newsCount] = await Promise.all([
      prisma.user.count(),
      prisma.teacher.count(),
      prisma.news.count(),
    ]);
    return NextResponse.json({ status: 'ok', ...info, db_connected: true, user_count: userCount, teacher_count: teacherCount, news_count: newsCount });
  } catch (err) {
    return NextResponse.json({ status: 'error', ...info, db_connected: false, error: err.message }, { status: 500 });
  }
}
