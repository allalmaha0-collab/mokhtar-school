import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// Prisma 7 requires a driver adapter — the built-in connection engine was removed.
let _client = null
function getClient() {
  if (!_client) {
    if (globalThis.__prisma) {
      _client = globalThis.__prisma
    } else {
      const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
      const adapter = new PrismaPg(pool)
      _client = new PrismaClient({ adapter })
      if (process.env.NODE_ENV !== 'production') globalThis.__prisma = _client
    }
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
