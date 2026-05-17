import { PrismaClient } from '@prisma/client'

// In Prisma 7, PrismaClient reads DATABASE_URL from env automatically.
// Do NOT pass datasourceUrl to the constructor — it is no longer valid.
let _client = null
function getClient() {
  if (!_client) {
    _client = globalThis.__prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalThis.__prisma = _client
  }
  return _client
}

export const prisma = new Proxy(
  {},
  {
    get(_, prop) {
      const client = getClient()
      const val = client[prop]
      return typeof val === 'function' ? val.bind(client) : val
    },
  }
)

export async function getSettings() {
  const rows = await prisma.setting.findMany()
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}
