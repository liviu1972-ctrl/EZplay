import { SpiralSidebar } from '@/components/curriculum/SpiralSidebar';
import { SpiralContextLinks } from '@/components/curriculum/SpiralContextLinks';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCachedGraph } from '@/lib/curriculum/content-engine';
import { renderMarkdown } from '@/lib/curriculum/markdown-renderer';

export const dynamicParams = false;

export function generateStaticParams() {
  const pillars = ['finance', 'strategy', 'product', 'market', 'operations'];
  return pillars.map(pillar => ({ pillar }));
}

export default async function MasteryLensPage({ params }: { params: Promise<{ pillar: string }> }) {
  const resolvedParams = await params;
  const pillar = resolvedParams.pillar;
  
  const validPillars = ['finance', 'strategy', 'product', 'market', 'operations'];
  if (!validPillars.includes(pillar)) {
    notFound();
  }

  // Get lens from graph
  const graph = getCachedGraph();
  const lens = graph.lenses.find(l => l.pillar.toLowerCase() === pillar);

  if (!lens) {
    notFound();
  }

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 max-w-[800px] mx-auto pb-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
          <span>/</span>
          <Link href="/program/curriculum/mastery" className="hover:text-ink transition-colors">Mastery</Link>
          <span>/</span>
          <span className="text-ink font-medium">Lentila {lens.pillar}</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-semibold uppercase tracking-wider mb-4">
          Criterii terminale
        </div>
        <h1 className="text-4xl font-bold font-heading mb-6 tracking-tight">
          Lentila {lens.pillar}
        </h1>

        <div className="xl:hidden mb-8 p-4 rounded-xl border border-brand-orange/20 bg-brand-orange/5">
          <SpiralContextLinks currentPillar={lens.pillar} />
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand-orange hover:prose-a:text-brand-orange/80">
          {lens.standard_profunzime && (
            <>
              <h3>Standard de profunzime</h3>
              {renderMarkdown(lens.standard_profunzime)}
            </>
          )}

          {lens.corp_dovezi && (
            <>
              <h3 className="mt-12">Corp de dovezi</h3>
              {renderMarkdown(lens.corp_dovezi)}
            </>
          )}

          {!lens.standard_profunzime && !lens.corp_dovezi && (
            <p className="text-ink-muted italic">Conținutul lentilei nu a fost extras.</p>
          )}
        </div>
      </div>
      
      <SpiralSidebar currentPillar={lens.pillar} />
    </div>
  );
}
