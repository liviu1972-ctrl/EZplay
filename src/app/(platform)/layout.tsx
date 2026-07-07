import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro";
  const dict = await getDictionary(lang);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar dict={dict} user={user} />
      <main className="flex-1">
        {children}
      </main>
      <Footer dict={dict} />
    </div>
  );
}
