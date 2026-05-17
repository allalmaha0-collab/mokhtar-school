/**
 * Runs `prisma db push` then seeds the database.
 * Skips gracefully when DATABASE_URL is not set (local dev without a DB).
 * On Vercel, DATABASE_URL is always set so both steps run.
 */
const { execSync } = require('child_process');

const url = process.env.DATABASE_URL;

if (!url || url.startsWith('file:')) {
  console.log('⏭  No PostgreSQL DATABASE_URL — skipping db push & seed.');
  process.exit(0);
}

console.log('▶  prisma db push …');
execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });

console.log('▶  seed …');
execSync('node prisma/seed.js', { stdio: 'inherit' });
