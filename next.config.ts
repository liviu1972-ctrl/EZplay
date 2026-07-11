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
function getBuildVersion(base: string): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
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
