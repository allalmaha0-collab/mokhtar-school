import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';
import { fileURLToPath } from 'url';

function createPrismaClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (url && authToken) {
    const adapter = new PrismaLibSql({ url, authToken });
    return new PrismaClient({ adapter });
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const dbPath = path.resolve(__dirname, '../prisma/school.db');
  const adapter = new PrismaLibSql({ url: 'file:' + dbPath });
  return new PrismaClient({ adapter });
}

// Lazy proxy — Prisma client is created only on first actual DB call, not at import time.
// This prevents build failures when the database is not available during `next build`.
let _client = null;
function getClient() {
  if (!_client) {
    _client = globalThis.__prisma ?? createPrismaClient();
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
