"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { SpiralContextLinks } from './SpiralContextLinks';

// We will pass the current Level and Pillar to it if applicable
export interface TocItem {
  id: string;
  title: string;
}

export function SpiralSidebar({ currentLevel, currentPillar, toc }: { currentLevel?: number, currentPillar?: string, toc?: TocItem[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] shrink-0 border-l border-line/60 bg-surface h-[calc(100vh-64px)] overflow-y-auto sticky top-16 hidden xl:flex flex-col py-6">
      {currentLevel || currentPillar || (toc && toc.length > 0) ? (
        <div className="px-6">
          <SpiralContextLinks currentLevel={currentLevel} currentPillar={currentPillar} toc={toc} defaultOpen={true} />
        </div>
      ) : (
        <div className="px-6">
          <p className="text-sm text-ink-muted">
            Selectează un Level sau Business Pillar pentru a explora conexiunile.
          </p>
        </div>
      )}
    </aside>
  );
}
