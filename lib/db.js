import { PrismaClient } from '@prisma/client'

// Lazy proxy — client created only on first DB call, not at import/build time
let _client = null
function getClient() {
  if (!_client) {
    _client = globalThis.__prisma ?? new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    })
    if (process.env.NODE_ENV !== 'production') globalThis.__prisma = _client
  }
  return _client
}

export const prisma = new Proxy(
  {},
  { get(_, prop) { return getClient()[prop] } }
)

export async function getSettings() {
  const rows = await prisma.setting.findMany()
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}
