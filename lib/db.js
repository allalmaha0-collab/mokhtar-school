import { PrismaClient } from '@prisma/client'

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

// Bind all methods to the real client so `this` is correct inside Prisma internals
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
