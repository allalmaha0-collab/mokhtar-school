const { execSync } = require('child_process');

const tursoUrl = process.env.TURSO_DATABASE_URL;

if (!tursoUrl) {
  console.log('⏭  No TURSO_DATABASE_URL — skipping db push & seed (local dev uses existing SQLite file).');
  process.exit(0);
}

console.log('▶  prisma db push …');
execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });

console.log('▶  seed …');
execSync('node prisma/seed.js', { stdio: 'inherit' });
