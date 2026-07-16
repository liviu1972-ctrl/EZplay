import { SiteHeader } from "@/components/layout/SiteHeader";
import { ExplorerRail } from "@/components/layout/ExplorerRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
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
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader dict={dict} user={user} />
      <div className="flex flex-1 w-full relative">
        <ExplorerRail dict={dict} />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 w-full">
            {children}
          </main>
          <SiteFooter dict={dict} />
        </div>
      </div>
    </div>
  );
}
