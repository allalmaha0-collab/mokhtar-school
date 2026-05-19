export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

async function sync() {
  try { const d = await prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } }); await ecSet('achievements', d); return d; } catch { return []; }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || '';
    const cached = await ecGet('achievements');
    let items = cached != null ? cached : await prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } });
    if (type) items = items.filter(i => i.type === type);
    return NextResponse.json({ achievements: items });
  } catch (err) { return NextResponse.json({ achievements: [], error: err.message }, { status: 500 }); }
}

export async function POST(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json();
    const item = await prisma.achievement.create({ data: body });
    sync().catch(() => {});
    return NextResponse.json({ achievement: item }, { status: 201 });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function PATCH(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const { id, ...data } = await req.json();
    const item = await prisma.achievement.update({ where: { id }, data });
    sync().catch(() => {});
    return NextResponse.json({ achievement: item });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const { id } = await req.json().catch(() => ({}));
    if (id) await prisma.achievement.delete({ where: { id } });
    else await prisma.achievement.deleteMany({});
    sync().catch(() => {});
    return NextResponse.json({ success: true });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
