import React from 'react';
import { SpiralSidebar } from '@/components/curriculum/SpiralSidebar';
import Link from 'next/link';

export default function CurriculumOverviewPage() {

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 max-w-[800px] mx-auto pb-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/program" className="hover:text-ink transition-colors">Programul EZPLAY</Link>
          <span>/</span>
          <span className="text-ink font-medium">Curriculum</span>
        </div>

        <h1 className="text-4xl font-bold font-heading mb-6 tracking-tight">Curriculum Explorer</h1>
        <p className="text-lg text-ink-muted mb-12 max-w-[650px] leading-relaxed">
          Explorează structura Programului educațional EZPLAY, de la fundația Level 1 până la etapa terminală Mastery. Această hartă descrie competențele, experiențele și progresia prin cele cinci Business Pillars.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-surface border border-line/50 hover:border-line/80 transition-colors">
            <h3 className="text-xl font-bold mb-3 font-heading">Level 1–5 și Mastery</h3>
            <p className="text-sm text-ink-muted mb-4 leading-relaxed">
              O progresie structurată pe clase și experiență. Fiecare nivel crește în complexitate, autonomie și responsabilitate.
            </p>
            <Link href="/program/curriculum/levels" className="text-sm font-semibold text-brand-orange hover:text-brand-orange/80">
              Explorează nivelurile &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-line/50 hover:border-line/80 transition-colors">
            <h3 className="text-xl font-bold mb-3 font-heading">Business Pillars</h3>
            <p className="text-sm text-ink-muted mb-4 leading-relaxed">
              Strategy, Product, Market, Operations și Finance. Cei cinci piloni care compun modelul de business antreprenorial.
            </p>
            <Link href="/program/curriculum/pillars" className="text-sm font-semibold text-brand-orange hover:text-brand-orange/80">
              Explorează pilonii &rarr;
            </Link>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand-orange hover:prose-a:text-brand-orange/80">
          <h2>Arhitectura comună</h2>
          <p>
            Programul educațional EZPLAY nu este o succesiune liniară de lecții, ci o rețea de spirale. 
            Participantul revine asupra conceptelor importante în contexte din ce în ce mai complexe.
          </p>
          <ul>
            <li><strong>Curriculum spiral:</strong> Conceptele importante revin cu profunzime, complexitate și autonomie.</li>
            <li><strong>Educație bazată pe competențe:</strong> Destinația învățării este ceea ce participantul poate face, nu doar ce termeni a întâlnit.</li>
            <li><strong>Învățare experiențială:</strong> Participantul ia decizii, observă rezultatele, reflectează și aplică.</li>
          </ul>

        </div>
      </div>
      
      {/* Overview Spiral doesn't need to select a specific level or pillar, just shows the prompt */}
      <SpiralSidebar />
    </div>
  );
}
