// Edge Config disabled — always return null so routes fall back to Prisma/SQLite
export async function ecGet(_key) { return null; }
export async function ecSet(_key, _value) { return false; }
