import React from 'react';
import { SpiralSidebar } from '@/components/curriculum/SpiralSidebar';
import Link from 'next/link';

export default function RoundsIndexPage() {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 max-w-[800px] mx-auto pb-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
          <span>/</span>
          <span className="text-ink font-medium">Founder Rounds</span>
        </div>

        <h1 className="text-4xl font-bold font-heading mb-6 tracking-tight">Catalogul Founder Rounds</h1>
        <p className="text-lg text-ink-muted mb-12 leading-relaxed">
          Founder Round este experiența educațională principală a programului. Aici vei găsi catalogul public al provocărilor și deciziilor.
        </p>

        <div className="p-6 rounded-2xl bg-surface border border-brand-orange/20 bg-brand-orange/5">
          <div className="mb-4">
            <h2 className="text-xl font-bold font-heading text-brand-orange">Faza 2</h2>
            <p className="text-sm text-ink-muted mt-1">Catalogul detaliat va fi publicat în următoarea fază a programului.</p>
          </div>
        </div>
      </div>
      
      <SpiralSidebar />
    </div>
  );
}
