import { PrismaClient } from '@prisma/client'
import { copyFileSync, existsSync } from 'fs'
import path from 'path'

function createPrisma() {
  const url = process.env.DATABASE_URL || ''

  // PostgreSQL (Neon) — standard PrismaClient, no adapter needed
  if (url.startsWith('postgresql://') || url.startsWith('postgres://')) {
    return new PrismaClient()
  }

  // Local SQLite fallback for development
  // On Vercel (read-only filesystem), copy DB to writable /tmp first
  if (process.env.NODE_ENV === 'production') {
    const src = path.resolve(process.cwd(), 'prisma/school.db')
    const tmp = '/tmp/school.db'
    if (!existsSync(tmp) && existsSync(src)) copyFileSync(src, tmp)
    return new PrismaClient({ datasources: { db: { url: 'file:/tmp/school.db' } } })
  }

  return new PrismaClient()
}

// Lazy proxy — never runs at import/build time
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
