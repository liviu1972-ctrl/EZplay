// This file configures Next.js settings, including image optimization patterns and injecting the build-time application version.

import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

let supabaseHostname = "omxcrlghlusgapkkrtgd.supabase.co";
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  try {
    supabaseHostname = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;
  } catch (e) {
    console.error("Invalid NEXT_PUBLIC_SUPABASE_URL in config", e);
  }
}

// Get the base version from package.json
const pkgPath = path.resolve(process.cwd(), "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const baseVersion = pkg.version || "1.0.0";

// Format build version: baseVersion.YYMMDD.HHMM-dev for local dev, baseVersion.YYMMDD.HHMM for production build
// Uses the Europe/Bucharest timezone to ensure local Romanian time is shown even when compiled on Vercel.
function getBuildVersion(base: string): string {
  const now = new Date();
  let yy = "";
  let mm = "";
  let dd = "";
  let hh = "";
  let min = "";

  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Bucharest",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const partMap = Object.fromEntries(parts.map((p) => [p.type, p.value]));

    yy = partMap.year.slice(-2);
    mm = partMap.month;
    dd = partMap.day;
    hh = partMap.hour;
    min = partMap.minute;
  } catch (e) {
    // Fallback if Europe/Bucharest timezone formatting fails
    yy = String(now.getFullYear()).slice(-2);
    mm = String(now.getMonth() + 1).padStart(2, "0");
    dd = String(now.getDate()).padStart(2, "0");
    hh = String(now.getHours()).padStart(2, "0");
    min = String(now.getMinutes()).padStart(2, "0");
  }

  const timestamp = `${yy}${mm}${dd}.${hh}${min}`;

  if (process.env.NODE_ENV === "development") {
    return `${base}.${timestamp}-dev`;
  }
  return `${base}.${timestamp}`;
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: getBuildVersion(baseVersion),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
