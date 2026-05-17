import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(url, key);

// Server-side client with service role (bypasses RLS)
export function createServerClient() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Helper: get all settings as object
export async function getSettings() {
  const { data } = await supabase.from('settings').select('key,value');
  return Object.fromEntries((data || []).map(r => [r.key, r.value]));
}
