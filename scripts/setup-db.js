/**
 * Runs during Vercel build.
 * - PostgreSQL (Neon): push schema + seed
 * - SQLite/missing: skip
 */
const { execSync } = require('child_process')

const url = process.env.DATABASE_URL || ''

if (!url.startsWith('postgresql://') && !url.startsWith('postgres://')) {
  console.log('⏭  SQLite/no URL — skipping db push & seed.')
  process.exit(0)
}

// Switch schema to postgresql then push
const fs = require('fs')
const schema = fs.readFileSync('prisma/schema.prisma', 'utf8')
const pgSchema = schema.replace('provider = "sqlite"', 'provider = "postgresql"')
fs.writeFileSync('prisma/schema.prisma', pgSchema)

console.log('▶  prisma generate (postgresql) …')
execSync('npx prisma generate', { stdio: 'inherit' })

console.log('▶  prisma db push …')
execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })

console.log('▶  seed …')
execSync('node prisma/seed.js', { stdio: 'inherit' })
