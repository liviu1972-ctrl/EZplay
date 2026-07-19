import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TocItem } from './SpiralSidebar';

export function SpiralContextLinks({ currentLevel, currentPillar, currentSlug, toc, defaultOpen = false }: { currentLevel?: number | 'MST', currentPillar?: string, currentSlug?: string, toc?: TocItem[], defaultOpen?: boolean }) {
  const pillars = ['Strategy', 'Product', 'Market', 'Operations', 'Finance'];
  const levels = [1, 2, 3, 4, 5];

  if (!currentLevel && !currentPillar && (!toc || toc.length === 0)) {
    return null;
  }

  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-ink outline-none">
        <span>Navigare contextuală</span>
        <span className="transition-transform group-open:rotate-180">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </summary>
      <div className="flex flex-col gap-6 pt-4 mt-3 border-t border-line/40">
        {/* Axis 3: Local TOC */}
      {toc && toc.length > 0 && (
        <div>
          <h3 className="text-xs font-bold tracking-wider text-ink-muted uppercase mb-3">
            Cuprins
          </h3>
          <div className="flex flex-col gap-1 border-l-2 border-line/40 ml-2 pl-3">
            {toc.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-medium py-1.5 transition-colors text-ink hover:text-brand-orange"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Axis 1: Same Level, Different Pillars */}
      {currentLevel && currentLevel !== 'MST' && (
        <div>
          <h3 className="text-xs font-bold tracking-wider text-ink-muted uppercase mb-3">
            Level {currentLevel} în alți piloni
          </h3>
          <div className="flex flex-col gap-1 border-l-2 border-line/40 ml-2 pl-3">
            {pillars.map(p => {
              const isActive = p.toLowerCase() === currentPillar?.toLowerCase();
              return (
                <Link
                  key={p}
                  href={`/program/curriculum/levels/${currentLevel}/pillars/${p.toLowerCase()}`}
                  className={cn(
                    "text-sm font-medium py-1.5 transition-colors relative",
                    isActive ? "text-brand-orange" : "text-ink hover:text-brand-orange"
                  )}
                >
                  {isActive && (
                    <div className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-orange" />
                  )}
                  {p}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Axis 2: Same Pillar, Different Levels */}
      {currentPillar && currentLevel !== 'MST' && (
        <div>
          <h3 className="text-xs font-bold tracking-wider text-ink-muted uppercase mb-3">
            Spirala {currentPillar}
          </h3>
          <div className="flex flex-col gap-1 border-l-2 border-line/40 ml-2 pl-3">
            {levels.map(l => {
              const isActive = l === currentLevel;
              return (
                <Link
                  key={l}
                  href={`/program/curriculum/levels/${l}/pillars/${currentPillar.toLowerCase()}`}
                  className={cn(
                    "text-sm font-medium py-1.5 transition-colors relative",
                    isActive ? "text-brand-orange" : "text-ink hover:text-brand-orange"
                  )}
                >
                  {isActive && (
                    <div className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-orange" />
                  )}
                  Level {l}
                </Link>
              );
            })}
            <Link
              href={`/program/curriculum/mastery/lenses/${currentPillar.toLowerCase()}`}
              className="text-sm font-medium py-1.5 transition-colors text-ink hover:text-brand-orange mt-2"
            >
              Lentila Mastery
            </Link>
          </div>
        </div>
      )}
      {/* Mastery Context */}
      {currentLevel === 'MST' && (
        <div>
          <h3 className="text-xs font-bold tracking-wider text-ink-muted uppercase mb-3">
            Nucleul Mastery
          </h3>
          <div className="flex flex-col gap-1 border-l-2 border-line/40 ml-2 pl-3">
            <Link
              href="/program/curriculum/mastery"
              className="text-sm font-medium py-1.5 transition-colors text-ink hover:text-brand-orange"
            >
              Înapoi la overview
            </Link>
            <div className="h-2" />
            {Array.from({ length: 13 }, (_, i) => i + 1).map(num => {
              const strNum = num.toString().padStart(2, '0');
              const id = `MST ${strNum}`;
              const slug = `mst-${strNum}`;
              const isActive = currentSlug === slug;
              return (
                <Link
                  key={slug}
                  href={`/program/curriculum/rounds/${slug}`}
                  className={cn(
                    "text-sm font-medium py-1.5 transition-colors relative",
                    isActive ? "text-brand-orange" : "text-ink hover:text-brand-orange"
                  )}
                >
                  {isActive && (
                    <div className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-orange" />
                  )}
                  {id}
                </Link>
              );
            })}
            <div className="h-2" />
            {pillars.map(p => (
              <Link
                key={p}
                href={`/program/curriculum/mastery/lenses/${p.toLowerCase()}`}
                className="text-sm font-medium py-1.5 transition-colors text-ink hover:text-brand-orange"
              >
                Lentila {p}
              </Link>
            ))}
          </div>
        </div>
      )}
      </div>
    </details>
  );
}
