import React from 'react';
import Link from 'next/link';

export default function LevelsIndexPage() {
  const levels = [
    { num: 1, desc: 'Clasele II-IV. Alegeri simple și primele relații cauzale.' },
    { num: 2, desc: 'Clasele V-VI. Firmă simplă, mai multe perioade și cauze conectate.' },
    { num: 3, desc: 'Clasele VII-VIII. Model de business, date, alternative și compromisuri.' },
    { num: 4, desc: 'Clasele IX-X. Managementul creșterii, scalare și organizare.' },
    { num: 5, desc: 'Clasele XI-XII. Leadership avansat asupra unei companii complexe.' },
  ];

  return (
    <div className="flex-1 max-w-[800px] mx-auto pb-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
        <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
        <span>/</span>
        <span className="text-ink font-medium">Niveluri</span>
      </div>

      <h1 className="text-4xl font-bold font-heading mb-6 tracking-tight">Nivelurile Curriculare</h1>
      <p className="text-lg text-ink-muted mb-12 max-w-[650px] leading-relaxed">
        Curriculumul EZPLAY este structurat în cinci niveluri de complexitate, urmate de etapa terminală Mastery.
        Fiecare nivel traversează cei cinci Business Pillars (Strategy, Product, Market, Operations, Finance).
      </p>

      <div className="flex flex-col gap-6">
        {levels.map(level => (
          <Link
            key={level.num}
            href={`/program/curriculum/levels/${level.num}`}
            className="group block p-6 rounded-2xl bg-surface border border-line/60 hover:border-brand-orange/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold font-heading text-ink group-hover:text-brand-orange transition-colors">
                Level {level.num}
              </h2>
              <span className="text-brand-orange text-xl opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
            </div>
            <p className="text-ink-muted">{level.desc}</p>
          </Link>
        ))}

        <Link
          href="/program/curriculum/mastery"
          className="group block p-6 rounded-2xl bg-brand-orange/5 border border-brand-orange/30 hover:border-brand-orange/60 transition-colors mt-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold font-heading text-ink group-hover:text-brand-orange transition-colors">
              Mastery
            </h2>
            <span className="text-brand-orange text-xl opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
          </div>
          <p className="text-ink-muted">
            Independent de vârstă. Etapă terminală integrată; decizii ambigue și cu miză ridicată.
          </p>
        </Link>
      </div>
    </div>
  );
}
