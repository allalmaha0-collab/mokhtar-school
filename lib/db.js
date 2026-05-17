import { PrismaClient } from '@prisma/client';

// Lazy proxy — Prisma client is created only on first actual DB call, not at import time.
// This prevents build failures when DATABASE_URL is not available during `next build`.
let _client = null;
function getClient() {
  if (!_client) {
    _client = globalThis.__prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== 'production') globalThis.__prisma = _client;
  }
  return _client;
}

export const prisma = new Proxy(
  {},
  { get(_, prop) { return getClient()[prop]; } }
);

export async function getSettings() {
  const rows = await prisma.setting.findMany();
  return Object.fromEntries(rows.map(r => [r.key, r.value]));
}
