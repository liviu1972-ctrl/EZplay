import React from 'react';
import { SpiralSidebar } from '@/components/curriculum/SpiralSidebar';
import Link from 'next/link';
import { getCachedGraph, getMasteryOverview } from '@/lib/curriculum/content-engine';
import { renderMarkdown } from '@/lib/curriculum/markdown-renderer';
import { SpiralContextLinks } from '@/components/curriculum/SpiralContextLinks';

export default function MasteryPage() {
  const pillars = ['Strategy', 'Product', 'Market', 'Operations', 'Finance'];

  // 1. Get Mastery general concepts
  const masteryOverview = getMasteryOverview();

  // 2. Get Mastery rounds
  const graph = getCachedGraph();
  const masteryRounds = graph.rounds.filter(r => r.level === 'MST');

  const toc = masteryRounds.map(r => ({
    id: r.slug,
    title: r.titlu_participant || r.id
  }));

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 max-w-[800px] mx-auto pb-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
          <span>/</span>
          <span className="text-ink font-medium">Mastery</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-4">
          Etapa terminală
        </div>
        <h1 className="text-4xl font-bold font-heading mb-4 tracking-tight">Mastery</h1>

        {toc.length > 0 && (
          <div className="xl:hidden mb-8 p-4 rounded-xl border border-brand-orange/20 bg-brand-orange/5">
            <SpiralContextLinks toc={toc} />
          </div>
        )}

        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand-orange hover:prose-a:text-brand-orange/80">
          
          {renderMarkdown(masteryOverview)}

          <h3 className="mt-12">Indexul de Round-uri Mastery</h3>
          <div className="flex flex-col gap-3 not-prose mt-6">
            {masteryRounds.map(round => (
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
          </div>

          <h3 className="mt-12">Lentilele Terminale</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
            {pillars.map(pillar => (
              <Link
                key={pillar}
                href={`/program/curriculum/mastery/lenses/${pillar.toLowerCase()}`}
                className="p-5 rounded-xl border border-brand-teal/30 bg-surface hover:bg-brand-teal/5 hover:border-brand-teal/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold font-heading text-ink group-hover:text-brand-teal transition-colors">
                    Lentila {pillar}
                  </h4>
                  <p className="text-sm text-ink-muted mt-1">
                    Criteriile terminale de stăpânire.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-teal/10 transition-colors">
                  <span className="text-brand-teal">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <SpiralSidebar toc={toc} />
    </div>
  );
}
