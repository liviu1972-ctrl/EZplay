/**
 * @file layout.tsx
 *
 * [AI] Root layout file configuring the app-wide HTML wrapper, setting up the Inter Google Font
 * variable class, and defining global metadata for the EZPlay Platform.
 *
 * [HUMAN] This is the main structure for all pages on the website. It loads the text fonts,
 * registers the global styles, and sets up metadata like the website title.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

import { AuthProvider } from "@/features/ezplay/platform/auth/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EZPlay — Învață antreprenoriat prin joc și simulare",
  description: "Un ecosistem educațional digital unde tinerii experimentează decizii de business reale.",
};

import type { Viewport } from 'next';
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro";

  return (
    <html
      lang={lang}
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

