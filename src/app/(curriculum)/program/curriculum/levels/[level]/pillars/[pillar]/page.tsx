import React from 'react';
import { SpiralSidebar } from '@/components/curriculum/SpiralSidebar';
import { SpiralContextLinks } from '@/components/curriculum/SpiralContextLinks';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCachedGraph, getIntersectionOverview } from '@/lib/curriculum/content-engine';
import { renderMarkdown } from '@/lib/curriculum/markdown-renderer';

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { level: string; pillar: string }[] = [];
  const pillars = ['finance', 'strategy', 'product', 'market', 'operations'];
  for (const pillar of pillars) {
    for (let l = 1; l <= 5; l++) {
      params.push({ level: l.toString(), pillar });
    }
  }
  return params;
}

export default async function IntersectionPage({ params }: { params: Promise<{ level: string, pillar: string }> }) {
  const resolvedParams = await params;
  const levelStr = resolvedParams.level;
  const level = parseInt(levelStr, 10);
  const pillar = resolvedParams.pillar;
  
  if (isNaN(level) || level < 1 || level > 5) {
    notFound();
  }

  const validPillars = ['finance', 'strategy', 'product', 'market', 'operations'];
  if (!validPillars.includes(pillar)) {
    notFound();
  }

  // Get overview content directly using content engine
  const overview = getIntersectionOverview(pillar, level);

  // Get rounds for this intersection
  const graph = getCachedGraph();
  const intersectionRounds = graph.rounds.filter(r => 
    r.level === levelStr && r.pillar.toLowerCase() === pillar
  );

  const toc = intersectionRounds.map(r => ({
    id: r.slug,
    title: r.titlu_participant || r.id
  }));

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 max-w-[800px] mx-auto pb-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
          <span>/</span>
          <Link href="/program/curriculum/levels" className="hover:text-ink transition-colors">Niveluri</Link>
          <span>/</span>
          <Link href={`/program/curriculum/levels/${level}`} className="hover:text-ink transition-colors">Level {level}</Link>
          <span>/</span>
          <span className="text-ink font-medium capitalize">{pillar}</span>
        </div>

        <h1 className="text-4xl font-bold font-heading mb-6 tracking-tight capitalize">
          {pillar} Level {level}
        </h1>

        <div className="xl:hidden mb-8 p-4 rounded-xl border border-brand-orange/20 bg-brand-orange/5">
          <SpiralContextLinks currentLevel={level} currentPillar={pillar} toc={toc} />
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand-orange hover:prose-a:text-brand-orange/80">
          {renderMarkdown(overview.registries)}

          <h3 className="mt-12">Founder Rounds</h3>
          <div className="flex flex-col gap-3 not-prose mt-6">
            {intersectionRounds.map(round => (
              <div key={round.id} id={round.slug} className="p-4 rounded-xl border border-line/60 bg-surface flex items-start justify-between scroll-mt-24">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-line/50 text-ink-muted">
                      {round.id}
                    </span>
                  </div>
                  <h4 className="font-bold font-heading text-ink">
                    {round.titlu_participant || round.id}
                  </h4>
                  {round.descriere_participant && (
                    <p className="text-sm text-ink-muted mt-1">{round.descriere_participant}</p>
                  )}
                </div>
              </div>
            ))}
            {intersectionRounds.length === 0 && (
              <p className="text-ink-muted italic">Nu există runde extrase pentru acest nivel și pilon.</p>
            )}
          </div>
        </div>
      </div>
      
      <SpiralSidebar currentLevel={level} currentPillar={pillar} toc={toc} />
    </div>
  );
}
