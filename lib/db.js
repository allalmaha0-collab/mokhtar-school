import { PrismaClient } from '@prisma/client'

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma

export async function getSettings() {
  const rows = await prisma.setting.findMany()
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}
