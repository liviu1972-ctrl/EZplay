/**
 * @file client.ts
 *
 * [AI] Creates a Supabase browser client for use inside client components.
 * Utilizes createBrowserClient from @supabase/ssr with typed database schemas.
 *
 * [HUMAN] This file sets up the connection to Supabase for the visual interface parts (Client Components)
 * of the application. It allows us to retrieve data directly from the user's browser.
 */

import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
