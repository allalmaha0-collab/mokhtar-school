export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

async function sync() {
  try { const d = await prisma.resource.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }] }); await ecSet('resources', d); return d; } catch { return []; }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || '';
    const cached = await ecGet('resources');
    let resources = cached != null ? cached : await prisma.resource.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }] });
    if (type) resources = resources.filter(r => r.type === type);
    return NextResponse.json({ resources });
  } catch (err) { return NextResponse.json({ resources: [], error: err.message }, { status: 500 }); }
}

export async function POST(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json();
    const resource = await prisma.resource.create({ data: body });
    sync().catch(() => {});
    return NextResponse.json({ resource }, { status: 201 });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function PATCH(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const { id, ...data } = await req.json();
    const resource = await prisma.resource.update({ where: { id }, data });
    sync().catch(() => {});
    return NextResponse.json({ resource });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    if (body.id) await prisma.resource.delete({ where: { id: body.id } });
    else if (body.type) await prisma.resource.deleteMany({ where: { type: body.type } });
    else await prisma.resource.deleteMany({});
    sync().catch(() => {});
    return NextResponse.json({ success: true });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
