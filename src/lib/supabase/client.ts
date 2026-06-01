import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createClient() {
  // Use placeholders at build time — real values are required at runtime
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";
  return createBrowserClient<Database>(url, key);
}
