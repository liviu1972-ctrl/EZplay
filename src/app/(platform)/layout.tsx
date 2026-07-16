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
    <div className="min-h-screen w-full bg-surface-soft dark:bg-[#121110] flex flex-col text-ink">
      <SiteHeader dict={dict} user={user} />
      <div className="flex flex-1 w-full relative pt-16">
        <div className="hidden md:flex flex-col bg-surface border-r border-line z-40">
          <ExplorerRail dict={dict} />
        </div>
        <div className="flex-1 flex justify-center w-full">
          <div className="w-full max-w-[1440px] flex flex-col bg-canvas shadow-[0_0_25px_rgba(0,0,0,0.03)] dark:shadow-[0_0_25px_rgba(0,0,0,0.2)] border-x border-line/60 relative">
            <main className="flex-1 w-full">
              {children}
            </main>
            <SiteFooter dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
