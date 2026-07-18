import React from 'react';
import Link from 'next/link';

export default function MapPage() {
  const pillars = ['Finance', 'Strategy', 'Product', 'Market', 'Operations'];
  const levels = [5, 4, 3, 2, 1]; // Top-down

  return (
    <div className="flex-1 max-w-[1200px] mx-auto pb-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
        <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
        <span>/</span>
        <span className="text-ink font-medium">Harta conectată</span>
      </div>

      <h1 className="text-4xl font-bold font-heading mb-6 tracking-tight">Harta conectată</h1>
      <p className="text-lg text-ink-muted mb-12 leading-relaxed max-w-[800px]">
        O privire de ansamblu asupra celor 25 de intersecții majore dintre Nivelurile de complexitate și Pilonii de afaceri EZPLAY. Selectează orice celulă pentru a explora detaliile acelei etape.
      </p>

      <div className="w-full overflow-x-auto pb-6">
        <div className="min-w-[800px]">
          {/* Header row */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1"></div>
            {pillars.map(pillar => (
              <div key={pillar} className="col-span-1 flex items-end justify-center pb-2">
                <Link 
                  href={`/program/curriculum/pillars/${pillar.toLowerCase()}`}
                  className="font-bold font-heading text-ink hover:text-brand-orange transition-colors"
                >
                  {pillar}
                </Link>
              </div>
            ))}
          </div>

          {/* Matrix body */}
          <div className="flex flex-col gap-2">
            {levels.map(level => (
              <div key={level} className="grid grid-cols-6 gap-2">
                <div className="col-span-1 flex items-center justify-end pr-4">
                  <Link 
                    href={`/program/curriculum/levels/${level}`}
                    className="font-bold font-heading text-ink-muted hover:text-brand-orange transition-colors"
                  >
                    Level {level}
                  </Link>
                </div>
                {pillars.map(pillar => (
                  <Link
                    key={`${level}-${pillar}`}
                    href={`/program/curriculum/levels/${level}/pillars/${pillar.toLowerCase()}`}
                    className="col-span-1 h-24 border border-line/60 bg-surface rounded-xl flex items-center justify-center hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <span className="text-sm font-medium text-ink-muted group-hover:text-brand-orange transition-colors">
                      {pillar} L{level}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mastery Lens Row */}
      <div className="w-full overflow-x-auto mt-8 border-t border-line/60 pt-8">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-1 flex items-center justify-end pr-4">
              <Link 
                href="/program/curriculum/mastery"
                className="font-bold font-heading text-ink-muted hover:text-brand-orange transition-colors"
              >
                Mastery
              </Link>
            </div>
            {pillars.map(pillar => (
              <Link
                key={`mastery-${pillar}`}
                href={`/program/curriculum/mastery/lenses/${pillar.toLowerCase()}`}
                className="col-span-1 h-16 border border-brand-teal/30 bg-brand-teal/5 rounded-xl flex items-center justify-center hover:border-brand-teal/60 hover:bg-brand-teal/10 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <span className="text-sm font-medium text-brand-teal group-hover:text-brand-teal/80 transition-colors">
                  Lentila {pillar}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
