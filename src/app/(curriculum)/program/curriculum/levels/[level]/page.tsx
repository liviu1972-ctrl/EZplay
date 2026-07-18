import React from 'react';
import { SpiralSidebar } from '@/components/curriculum/SpiralSidebar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLevelOverview } from '@/lib/curriculum/content-engine';
import { renderMarkdown } from '@/lib/curriculum/markdown-renderer';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { level: '1' },
    { level: '2' },
    { level: '3' },
    { level: '4' },
    { level: '5' },
  ];
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = await params;
  const levelStr = resolvedParams.level;
  const level = parseInt(levelStr, 10);
  
  if (isNaN(level) || level < 1 || level > 5) {
    notFound();
  }

  const pillars = ['Strategy', 'Product', 'Market', 'Operations', 'Finance'];

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 max-w-[800px] mx-auto pb-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
          <span>/</span>
          <Link href="/program/curriculum/levels" className="hover:text-ink transition-colors">Niveluri</Link>
          <span>/</span>
          <span className="text-ink font-medium">Level {level}</span>
        </div>

        <h1 className="text-4xl font-bold font-heading mb-4 tracking-tight">Level {level}</h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand-orange hover:prose-a:text-brand-orange/80">
          {renderMarkdown(getLevelOverview(level))}

          <h3>Concepte în Level {level} pe piloni</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
            {pillars.map(pillar => (
              <Link 
                href={`/program/curriculum/levels/${level}/pillars/${pillar.toLowerCase()}`}
                key={pillar}
                className="p-5 rounded-xl border border-line/60 bg-surface hover:border-brand-orange/50 transition-colors group flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold font-heading text-ink group-hover:text-brand-orange transition-colors">
                    {pillar}
                  </h4>
                  <p className="text-sm text-ink-muted mt-1">Intersecția cu Level {level}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                  <span className="text-brand-orange">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <SpiralSidebar currentLevel={level} />
    </div>
  );
}
