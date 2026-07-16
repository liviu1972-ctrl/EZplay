/**
 * @file middleware.ts
 *
 * [AI] Next.js middleware handling language cookie detection, Supabase session refresh,
 * route protection for authenticated areas (/dashboard, /profile, /settings, /admin, /onboarding),
 * automatic redirection to onboarding if incomplete, and role-based protection for the admin dashboard.
 *
 * [HUMAN] This is the traffic controller of the website. It checks if you are logged in,
 * sends you to onboarding if you haven't finished it, restricts access to the admin area to admins only,
 * and remembers your language preference (Romanian/English).
 */

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase/types";
import { LANGUAGE_COOKIE } from "@/lib/i18n/config";

export async function middleware(request: NextRequest) {
  // 1. Language Cookie Detection
  let locale = request.cookies.get(LANGUAGE_COOKIE)?.value;
  let response = NextResponse.next();

  if (!locale) {
    locale = "ro";
    
    // Set language cookie (expires in 1 year)
    response.cookies.set(LANGUAGE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }

  // 2. Supabase Session Refresh
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
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nextUrl = request.nextUrl.clone();
  const path = nextUrl.pathname;

  // Protect private routes
  const isPrivateRoute =
    path.startsWith("/dashboard") ||
    path.startsWith("/profile") ||
    path.startsWith("/settings") ||
    path.startsWith("/admin") ||
    path.startsWith("/onboarding") ||
    path.startsWith("/ezplay");

  const isAuthRoute = path.startsWith("/login") || path.startsWith("/register");

  // Authentication Checks
  if (isPrivateRoute && !user) {
    nextUrl.pathname = "/login";
    return NextResponse.redirect(nextUrl);
  }

  if (isAuthRoute && user) {
    nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(nextUrl);
  }

  // Admin Role Protection
  if (path.startsWith("/admin") && user) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      nextUrl.pathname = "/dashboard";
      return NextResponse.redirect(nextUrl);
    }
  }

  // Onboarding Completed Check
  if (
    user &&
    !path.startsWith("/onboarding") &&
    !path.startsWith("/api") &&
    !path.startsWith("/login") &&
    !path.startsWith("/register") &&
    !path.includes(".") &&
    path !== "/" &&
    path !== "/about" &&
    path !== "/how-it-works"
  ) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single();

    if (profile && !profile.onboarding_completed) {
      nextUrl.pathname = "/onboarding";
      return NextResponse.redirect(nextUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo_ezplay.svg, images/ (static logo and images)
     */
    "/((?!_next/static|_next/image|favicon.ico|logo_ezplay.svg|images/|.*\\.).*)",
  ],
};
