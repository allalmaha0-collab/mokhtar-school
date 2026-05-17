import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

// Prisma 7: PrismaLibSql is a factory — pass config object directly (no createClient needed)
function createPrisma() {
  const tursoUrl = process.env.TURSO_DATABASE_URL

  const adapter = new PrismaLibSql(
    tursoUrl
      ? { url: tursoUrl, authToken: process.env.TURSO_AUTH_TOKEN }
      : { url: 'file:prisma/school.db' }
  )

  return new PrismaClient({ adapter })
}

// Lazy proxy — no DB connection at import/build time
let _client = null
function getClient() {
  if (!_client) {
    _client = globalThis.__prisma ?? createPrisma()
    if (process.env.NODE_ENV !== 'production') globalThis.__prisma = _client
  }
  return _client
}

const prisma = new Proxy(
  {},
  {
    get(_, prop) {
      const client = getClient()
      const val = client[prop]
      return typeof val === 'function' ? val.bind(client) : val
    },
  }
)

export default prisma

export async function getSettings() {
  const rows = await prisma.setting.findMany()
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}
