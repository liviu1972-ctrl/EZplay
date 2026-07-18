'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CatalogRound } from '@/types/curriculum';

interface RoundsCatalogProps {
  initialRounds: CatalogRound[];
}

const LEVELS = ['Toate', '1', '2', '3', '4', '5', 'Mastery'];
const PILLARS = ['Toate', 'Strategy', 'Product', 'Market', 'Operations', 'Finance'];

export default function RoundsCatalog({ initialRounds }: RoundsCatalogProps) {
  const [level, setLevel] = useState('Toate');
  const [pillar, setPillar] = useState('Toate');

  const filteredRounds = useMemo(() => {
    return initialRounds.filter(round => {
      const matchLevel = level === 'Toate' 
        ? true 
        : (level === 'Mastery' ? round.level === 'MST' : round.level.toString() === level);
      
      const matchPillar = pillar === 'Toate'
        ? true
        : round.pillar.toLowerCase() === pillar.toLowerCase();

      return matchLevel && matchPillar;
    });
  }, [initialRounds, level, pillar]);

  const hasFilters = level !== 'Toate' || pillar !== 'Toate';

  const handleReset = () => {
    setLevel('Toate');
    setPillar('Toate');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-end bg-black/5 p-4 rounded-xl">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label htmlFor="level-filter" className="text-sm font-semibold text-ink">
            Nivel (Level)
          </label>
          <select 
            id="level-filter"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-3 py-2 rounded-lg border border-black/10 bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            {LEVELS.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label htmlFor="pillar-filter" className="text-sm font-semibold text-ink">
            Pilon (Business Pillar)
          </label>
          <select 
            id="pillar-filter"
            value={pillar}
            onChange={(e) => setPillar(e.target.value)}
            className="px-3 py-2 rounded-lg border border-black/10 bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            {PILLARS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button 
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors mt-4 md:mt-0"
            aria-label="Resetează filtrele"
          >
            Resetare
          </button>
        )}
      </div>

      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Afișăm {filteredRounds.length} rezultate.
      </div>

      {/* Results Info */}
      <div className="text-sm text-ink-muted">
        Afișăm <span className="font-semibold text-ink">{filteredRounds.length}</span> rezultate din totalul de {initialRounds.length}.
      </div>

      {/* Catalog List */}
      <div className="flex flex-col gap-4">
        {filteredRounds.map((round) => (
          <Link 
            key={round.slug}
            href={round.destination}
            className="group flex flex-col md:flex-row gap-2 md:gap-4 md:items-center justify-between p-4 rounded-xl border border-black/5 bg-white hover:border-brand-orange hover:shadow-sm transition-all"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-ink-muted uppercase tracking-wider">{round.id}</span>
              <h3 className="text-base font-semibold text-ink group-hover:text-brand-orange transition-colors">
                {round.title}
              </h3>
            </div>
            <div className="flex flex-row md:flex-col gap-2 md:gap-1 items-start md:items-end text-sm">
              <span className="bg-black/5 px-2 py-1 rounded text-ink-muted text-xs">
                {round.level === 'MST' ? 'Mastery' : `L${round.level} × ${round.pillar.charAt(0).toUpperCase() + round.pillar.slice(1)}`}
              </span>
              <span className="text-brand-orange text-xs font-medium">
                {round.status}
              </span>
            </div>
          </Link>
        ))}

        {filteredRounds.length === 0 && (
          <div className="p-8 text-center bg-black/5 rounded-xl text-ink-muted">
            Nu există rezultate pentru combinația selectată.
          </div>
        )}
      </div>
    </div>
  );
}
