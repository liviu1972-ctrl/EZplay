import { CurriculumHeader } from "@/components/curriculum/CurriculumHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale } from "@/lib/i18n/config";

import { AtlasSidebar } from "@/components/curriculum/AtlasSidebar";
import { CurriculumMobileControls } from "@/components/curriculum/CurriculumMobileControls";

export const dynamic = 'force-static';

export default async function CurriculumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang: Locale = "ro";
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen w-full bg-[#0D2427] flex flex-col text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-surface px-4 py-2 text-brand-orange font-bold rounded shadow-md border border-line">
        Sari la conținutul principal
      </a>
      <CurriculumHeader dict={dict} />
      
      {/* 
        Container for the 3-column layout. 
        pt-16 accounts for the fixed SiteHeader.
      */}
      <CurriculumMobileControls />
      <div className="flex flex-1 w-full pt-16 md:pt-16 mx-auto max-w-[1600px] relative">
        <AtlasSidebar />
        
        <main id="main-content" className="flex-1 w-full flex flex-col bg-canvas shadow-sm border-x border-[#1A363A] font-serif text-ink">
          <div className="flex-1 px-4 md:px-12 lg:px-16 py-8">
            {children}
          </div>
          <SiteFooter dict={dict} />
        </main>
      </div>
    </div>
  );
}
