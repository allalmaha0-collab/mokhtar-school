export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { ecGet, ecSet } from '@/lib/store';

function auth(req) { return verifyToken(req.cookies.get('token')?.value); }

async function sync() {
  try { const d = await prisma.boardingPost.findMany({ orderBy: { date: 'desc' } }); await ecSet('boarding', d); return d; } catch { return []; }
}

export async function GET() {
  try {
    const cached = await ecGet('boarding');
    const posts = cached || await prisma.boardingPost.findMany({ orderBy: { date: 'desc' } });
    return NextResponse.json({ posts });
  } catch (err) { return NextResponse.json({ posts: [], error: err.message }, { status: 500 }); }
}

export async function POST(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json();
    const post = await prisma.boardingPost.create({ data: { title: body.title, content: body.content, category: body.category || 'خبر' } });
    sync().catch(() => {});
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function PATCH(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const { id, ...data } = await req.json();
    const post = await prisma.boardingPost.update({ where: { id }, data });
    sync().catch(() => {});
    return NextResponse.json({ post });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(req) {
  try {
    if (!auth(req)) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    if (body.id) await prisma.boardingPost.delete({ where: { id: body.id } });
    else await prisma.boardingPost.deleteMany({});
    sync().catch(() => {});
    return NextResponse.json({ success: true });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
