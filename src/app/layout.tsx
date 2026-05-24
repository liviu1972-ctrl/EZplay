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

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EZPlay — Învață antreprenoriat prin joc și simulare",
  description: "Un ecosistem educațional digital unde tinerii experimentează decizii de business reale.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro";
  const dict = await getDictionary(lang);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
          <Navbar dict={dict} user={user} />
          <main className="flex-1">
            {children}
          </main>
          <Footer dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}

