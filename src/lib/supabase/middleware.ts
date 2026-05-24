/**
 * @file middleware.ts
 *
 * [AI] Middleware function to refresh the user session on request.
 * Required by Next.js Server Components and Server Actions to prevent expired tokens.
 *
 * [HUMAN] This file is a security check that runs in the background. It refreshes the user's login session
 * automatically so they don't get logged out while using the platform.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "./types";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This will refresh the session if expired - necessary for Server Components
  // and Server Actions to get the latest session data.
  await supabase.auth.getUser();

  return supabaseResponse;
}
