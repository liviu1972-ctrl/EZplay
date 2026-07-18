import { SpiralSidebar } from '@/components/curriculum/SpiralSidebar';
import { SpiralContextLinks } from '@/components/curriculum/SpiralContextLinks';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCachedGraph, getPillarOverview } from '@/lib/curriculum/content-engine';
import { renderMarkdown } from '@/lib/curriculum/markdown-renderer';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { pillar: 'strategy' },
    { pillar: 'product' },
    { pillar: 'market' },
    { pillar: 'operations' },
    { pillar: 'finance' },
  ];
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const resolvedParams = await params;
  const pillar = resolvedParams.pillar;
  
  const validPillars = ['strategy', 'product', 'market', 'operations', 'finance'];
  if (!validPillars.includes(pillar)) {
    notFound();
  }

  // Removed unused status calculation

  const pillarName = pillar.charAt(0).toUpperCase() + pillar.slice(1);

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 max-w-[800px] mx-auto pb-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
          <span>/</span>
          <Link href="/program/curriculum/pillars" className="hover:text-ink transition-colors">Business Pillars</Link>
          <span>/</span>
          <span className="text-ink font-medium">{pillarName}</span>
        </div>

        <h1 className="text-4xl font-bold font-heading mb-4 tracking-tight">Spirala {pillarName}</h1>
        
        <div className="xl:hidden mb-8 p-4 rounded-xl border border-brand-orange/20 bg-brand-orange/5">
          <SpiralContextLinks currentPillar={pillarName} />
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand-orange hover:prose-a:text-brand-orange/80">
          {getPillarOverview(pillar).definition && (
            <>
              {renderMarkdown(getPillarOverview(pillar).definition)}
            </>
          )}

          {getPillarOverview(pillar).progression && (
            <>
              <h3>Definiția progresiei</h3>
              {renderMarkdown(getPillarOverview(pillar).progression)}
            </>
          )}
          
          {getPillarOverview(pillar).relationships && (
            <>
              <h3>Relația cu celelalte spirale</h3>
              {renderMarkdown(getPillarOverview(pillar).relationships)}
            </>
          )}

          <h3>Progresia pe niveluri</h3>
          <div className="flex flex-col gap-4 not-prose mt-6">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-xl border border-line/60 bg-surface">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center border border-line/40">
                  <span className="text-2xl font-bold font-heading text-ink-muted">L{level}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold font-heading mb-1">Level {level}</h4>
                </div>
                <Link 
                  href={`/program/curriculum/levels/${level}/pillars/${pillar}`}
                  className="shrink-0 px-4 py-2 text-sm font-semibold rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                >
                  Vezi intersecția
                </Link>
              </div>
            ))}
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-xl border border-brand-orange/30 bg-brand-orange/5 mt-4">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-brand-orange/20 flex items-center justify-center border border-brand-orange/30">
                <span className="text-xl font-bold font-heading text-brand-orange">MST</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold font-heading text-ink mb-1">Lentila Mastery</h4>
              </div>
              <Link 
                href={`/program/curriculum/mastery/lenses/${pillar}`}
                className="shrink-0 px-4 py-2 text-sm font-semibold rounded-lg bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors"
              >
                Vezi Lentila
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <SpiralSidebar currentPillar={pillarName} />
    </div>
  );
}
