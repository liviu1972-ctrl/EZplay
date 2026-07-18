import React from 'react';
import Link from 'next/link';
import { getGlossaryTerms } from '@/lib/curriculum/content-engine';

export const dynamicParams = false;

export default function GlossaryPage() {
  const terms = getGlossaryTerms();

  return (
    <div className="flex-1 max-w-[800px] mx-auto pb-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
        <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
        <span>/</span>
        <span className="text-ink font-medium">Glosar</span>
      </div>

      <h1 className="text-4xl font-bold font-heading mb-6 tracking-tight">Glosar Curricular</h1>
      <p className="text-lg text-ink-muted mb-12 leading-relaxed">
        Termenii necesari pentru citirea programului și înțelegerea modelului educațional EZPLAY.
        Extrași automat din sursele canonice (economic-model.md, architecture.md).
      </p>

      <div className="flex flex-col gap-8">
        {terms.map((item, idx) => (
          <div key={idx} className="border-l-2 border-brand-orange pl-4 py-1">
            <h3 className="text-xl font-bold font-heading mb-2">{item.term}</h3>
            <p className="text-ink-muted whitespace-pre-wrap">{item.definition}</p>
          </div>
        ))}
        {terms.length === 0 && (
          <p className="text-ink-muted italic">Nu s-au putut extrage termenii din surse.</p>
        )}
      </div>
    </div>
  );
}
