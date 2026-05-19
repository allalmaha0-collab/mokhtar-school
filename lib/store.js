/**
 * Shared Edge Config store — no external package, direct HTTP fetch
 */

const EC_ID    = process.env.EDGE_CONFIG_ID   || 'ecfg_93ikhqyrljsln1nafdfgwjli1bbf';
const EC_TOKEN = process.env.VERCEL_API_TOKEN || 'vca_8UJp4tPJexGbrdEihXvtDiAsYLRPt6UMq0jluZ6pZcQPQ5WN5V0xyxly';
const TEAM_ID  = 'team_CetWfzqQbPBmLvFzoIzMIQ4W';

const EC_READ_URL = process.env.EDGE_CONFIG
  ? process.env.EDGE_CONFIG
  : `https://edge-config.vercel.com/${EC_ID}?token=00f44214-5b07-4085-bd35-29364f34feee`;

// READ from Edge Config via HTTP
export async function ecGet(key) {
  try {
    const url = `${EC_READ_URL.split('?')[0]}/item/${key}?token=00f44214-5b07-4085-bd35-29364f34feee`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data ?? null;
  } catch {
    return null;
  }
}

// WRITE to Edge Config via Vercel API
export async function ecSet(key, value) {
  if (!EC_TOKEN) return false;
  try {
    const res = await fetch(
      `https://api.vercel.com/v1/edge-config/${EC_ID}/items?teamId=${TEAM_ID}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${EC_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: [{ operation: 'upsert', key, value }] }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}
