import React from 'react';
import Link from 'next/link';

export default function PillarsIndexPage() {
  const pillars = [
    { id: 'strategy', name: 'Strategy', desc: 'Cum alegi direcția, prioritățile și compromisurile?' },
    { id: 'product', name: 'Product', desc: 'Ce valoare creezi și ce face produsul diferit?' },
    { id: 'market', name: 'Market', desc: 'Cum ajungi la oameni și câștigi clienți?' },
    { id: 'operations', name: 'Operations', desc: 'Cum transformi resursele în valoare? Oamenii și procesele.' },
    { id: 'finance', name: 'Finance', desc: 'Ce spun indicatorii despre sănătatea companiei?' },
  ];

  return (
    <div className="flex-1 max-w-[800px] mx-auto pb-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
        <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
        <span>/</span>
        <span className="text-ink font-medium">Business Pillars</span>
      </div>

      <h1 className="text-4xl font-bold font-heading mb-6 tracking-tight">Business Pillars</h1>
      <p className="text-lg text-ink-muted mb-12 max-w-[650px] leading-relaxed">
        Modelul de business EZPLAY este construit pe cinci piloni esențiali. Fiecare pilon are propria progresie (spirală), 
        prin care participantul dezvoltă o înțelegere din ce în ce mai profundă de la Level 1 la Level 5.
      </p>

      <div className="grid grid-cols-1 gap-6">
        {pillars.map(pillar => (
          <Link
            key={pillar.id}
            href={`/program/curriculum/pillars/${pillar.id}`}
            className="group flex flex-col sm:flex-row sm:items-center p-6 rounded-2xl bg-surface border border-line/60 hover:border-brand-orange/50 transition-colors gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex shrink-0 items-center justify-center border border-line/40 group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
              <span className="text-xl font-bold font-heading text-ink-muted group-hover:text-brand-orange transition-colors">
                {pillar.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold font-heading text-ink group-hover:text-brand-orange transition-colors mb-2">
                {pillar.name}
              </h2>
              <p className="text-ink-muted">{pillar.desc}</p>
            </div>
            <div className="shrink-0 text-brand-orange text-xl opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
              &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
