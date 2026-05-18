/**
 * Runs during Vercel build:
 * - If DATABASE_URL is PostgreSQL (Neon): push schema + seed
 * - If SQLite or missing: skip (dev mode)
 */
const { execSync } = require('child_process')

const url = process.env.DATABASE_URL || ''

if (!url.startsWith('postgresql://') && !url.startsWith('postgres://')) {
  console.log('⏭  Not a PostgreSQL DATABASE_URL — skipping db push & seed.')
  process.exit(0)
}

console.log('▶  prisma db push …')
execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })

console.log('▶  seed …')
execSync('node prisma/seed.js', { stdio: 'inherit' })
