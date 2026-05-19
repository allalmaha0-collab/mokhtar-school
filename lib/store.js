/**
 * Shared data store using Vercel Edge Config.
 * - Reads: from Edge Config (shared across all Lambda instances)
 * - Writes: update Edge Config via Vercel API + local SQLite for backup
 *
 * This solves the Vercel SQLite /tmp isolation problem.
 */

const EDGE_CONFIG_ID  = process.env.EDGE_CONFIG_ID  || 'ecfg_93ikhqyrljsln1nafdfgwjli1bbf';
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN || '';
const TEAM_ID          = 'team_CetWfzqQbPBmLvFzoIzMIQ4W';

// ── READ from Edge Config ──────────────────────────────────────────────────
export async function ecGet(key) {
  if (!process.env.EDGE_CONFIG) return null;
  try {
    const { get } = await import('@vercel/edge-config');
    return await get(key);
  } catch {
    return null;
  }
}

// ── WRITE to Edge Config via Vercel API ────────────────────────────────────
export async function ecSet(key, value) {
  if (!VERCEL_API_TOKEN) return false;
  try {
    const res = await fetch(
      `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items?teamId=${TEAM_ID}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ operation: 'upsert', key, value }],
        }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

// ── Helper: sync a full collection to Edge Config ──────────────────────────
// Call after every admin write to keep Edge Config in sync
export async function syncCollection(collectionName, prismaQuery) {
  try {
    const data = await prismaQuery();
    await ecSet(collectionName, data);
  } catch {}
}
