import { PrismaClient } from '@prisma/client'
import { copyFileSync, existsSync } from 'fs'
import path from 'path'

function getDbUrl() {
  if (process.env.NODE_ENV === 'production') {
    // /var/task is read-only on Vercel — copy DB to writable /tmp on first access
    const src = path.resolve(process.cwd(), 'prisma/school.db')
    const tmp = '/tmp/school.db'
    if (!existsSync(tmp) && existsSync(src)) {
      copyFileSync(src, tmp)
    }
    return 'file:/tmp/school.db'
  }
  return process.env.DATABASE_URL || 'file:./prisma/school.db'
}

// Lazy — never runs at import/build time, only on first DB call
let _client = null
function getClient() {
  if (!_client) {
    _client = globalThis.__prisma ?? new PrismaClient({
      datasources: { db: { url: getDbUrl() } },
    })
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
