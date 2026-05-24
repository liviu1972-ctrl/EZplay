/**
 * @file server.ts
 *
 * [AI] Creates a Supabase server client for use inside Server Components, API routes, and Server Actions.
 * Handles reading and writing cookies properly using the cookies() header from next/headers.
 *
 * [HUMAN] This file sets up the connection to Supabase for the backend parts of our application (Server Components).
 * It manages cookies safely so that the server knows if a user is logged in.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./types";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if we have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
