import type { NextConfig } from "next";

let supabaseHostname = "omxcrlghlusgapkkrtgd.supabase.co";
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  try {
    supabaseHostname = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;
  } catch (e) {
    console.error("Invalid NEXT_PUBLIC_SUPABASE_URL in config", e);
  }
}

const nextConfig: NextConfig = {
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
