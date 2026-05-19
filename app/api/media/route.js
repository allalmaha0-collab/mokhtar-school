export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

async function sync() {
  try { const d = await prisma.mediaContent.findMany({ orderBy: { createdAt: 'desc' } }); await ecSet('media', d); return d; } catch { return []; }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || '';
    const cached = await ecGet('media');
    let items = cached || await prisma.mediaContent.findMany({ orderBy: { createdAt: 'desc' } });
    if (type) items = items.filter(i => i.type === type);
    return NextResponse.json({ media: items });
  } catch (err) { return NextResponse.json({ media: [], error: err.message }, { status: 500 }); }
}

export async function POST(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json();
    const item = await prisma.mediaContent.create({ data: body });
    sync().catch(() => {});
    return NextResponse.json({ media: item }, { status: 201 });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function PATCH(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const { id, ...data } = await req.json();
    const item = await prisma.mediaContent.update({ where: { id }, data });
    sync().catch(() => {});
    return NextResponse.json({ media: item });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const { id } = await req.json().catch(() => ({}));
    if (id) await prisma.mediaContent.delete({ where: { id } });
    else await prisma.mediaContent.deleteMany({});
    sync().catch(() => {});
    return NextResponse.json({ success: true });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
