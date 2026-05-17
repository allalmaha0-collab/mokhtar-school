import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

function createPrisma() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const pgUrl    = process.env.DATABASE_URL

  if (tursoUrl) {
    // Turso remote database
    const adapter = new PrismaLibSql({ url: tursoUrl, authToken: process.env.TURSO_AUTH_TOKEN })
    return new PrismaClient({ adapter })
  }

  if (pgUrl && pgUrl.startsWith('postgresql')) {
    // Vercel Postgres / Neon
    const pool = new pg.Pool({ connectionString: pgUrl, ssl: { rejectUnauthorized: false } })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  }

  // Local SQLite fallback
  const adapter = new PrismaLibSql({ url: 'file:prisma/school.db' })
  return new PrismaClient({ adapter })
}

// Lazy proxy — never called at build/import time
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
