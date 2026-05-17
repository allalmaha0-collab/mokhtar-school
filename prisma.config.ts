import { defineConfig } from 'prisma/config'

const localDb = 'file:' + new URL('./prisma/school.db', import.meta.url).pathname

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasourceUrl: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? localDb,
})
