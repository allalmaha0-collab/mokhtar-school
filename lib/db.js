import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

function createClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is not set')

  const pool = new pg.Pool({
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
  })

  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

// Lazy — client is created only on the first real DB call, never at import/build time.
let _client = null
function getClient() {
  if (!_client) {
    _client = globalThis.__prisma ?? createClient()
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
