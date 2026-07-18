import React from 'react';
import { getCachedGraph, mapToCatalogRound } from '@/lib/curriculum/content-engine';
import RoundsCatalog from '@/components/curriculum/RoundsCatalog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Founder Rounds | EZPLAY',
  description: 'Catalogul complet al Founder Rounds din programul EZPLAY.',
};

export default function RoundsPage() {
  const graph = getCachedGraph();
  const catalogRounds = graph.rounds.map(mapToCatalogRound);

  return (
    <div className="w-full max-w-4xl pt-2 pb-16">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-ink-muted mb-4 font-medium uppercase tracking-wider">
          <span>Program</span>
          <span>/</span>
          <span>Curriculum</span>
          <span>/</span>
          <span className="text-ink">Founder Rounds</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-ink leading-tight mb-4">
          Catalog Founder Rounds
        </h1>
        <p className="text-lg text-ink-muted leading-relaxed">
          Descoperă structura completă a celor 191 de Founder Rounds care alcătuiesc programul educațional. Explorează inventarul pe axe de expertiză și niveluri de profunzime.
        </p>
      </header>

      <RoundsCatalog initialRounds={catalogRounds} />
    </div>
  );
}
