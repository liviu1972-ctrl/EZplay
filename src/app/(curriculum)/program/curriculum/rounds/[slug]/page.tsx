import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPublishedDetailedSlugs, getRoundBySlug, isPublishedDetailedRound } from '@/lib/curriculum/content-engine';
import { PUBLIC_STATUS } from '@/types/curriculum';
import { renderMarkdown } from '@/lib/curriculum/markdown-renderer';
import { SpiralContextLinks } from '@/components/curriculum/SpiralContextLinks';

export const dynamicParams = false;

interface RoundPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPublishedDetailedSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: RoundPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const round = getRoundBySlug(resolvedParams.slug);
  if (!round || !isPublishedDetailedRound(round.slug)) {
    return { title: 'Not Found | EZPLAY' };
  }
  return {
    title: `${round.id} - ${round.titlu_participant || 'Founder Round'} | EZPLAY`,
    description: round.descriere_participant || 'Detaliile Founder Round-ului curent.',
  };
}

export default async function RoundPage({ params }: RoundPageProps) {
  const resolvedParams = await params;
  const round = getRoundBySlug(resolvedParams.slug);

  if (!round || !isPublishedDetailedRound(round.slug)) {
    notFound();
  }

  const intersectionHref = round.level === 'MST' 
    ? `/program/curriculum/mastery`
    : `/program/curriculum/levels/${round.level}/pillars/${round.pillar.toLowerCase()}`;

  const breadcrumbIntersectionText = round.level === 'MST' 
    ? 'Mastery' 
    : `L${round.level} × ${round.pillar.charAt(0).toUpperCase() + round.pillar.slice(1)}`;

  const currentLevelNum = round.level === 'MST' ? 'MST' : Number(round.level);
  const hasPedagogic = !!(round.titlu_pedagogic || round.descriere_pedagogica);
  const hasStructural = !!(round.intrebare || round.competenta || round.prerechizite || round.continuitate);

  return (
    <div className="w-full flex flex-col xl:flex-row gap-8 lg:gap-12 relative items-start">
      
      <article className="flex-1 max-w-3xl pt-2 pb-16">
        <header className="mb-10">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-muted mb-4 font-medium uppercase tracking-wider">
            <Link href="/program" className="hover:text-ink transition-colors">Program</Link>
            <span>/</span>
            <Link href="/program/curriculum" className="hover:text-ink transition-colors">Curriculum</Link>
            <span>/</span>
            <Link href="/program/curriculum/rounds" className="hover:text-ink transition-colors">Founder Rounds</Link>
            <span>/</span>
            <span className="text-ink">{round.id}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link 
              href={intersectionHref}
              className="bg-black/5 px-3 py-1 rounded text-ink-muted text-xs hover:bg-black/10 transition-colors"
            >
              {breadcrumbIntersectionText}
            </Link>
            <span className="text-brand-orange text-xs font-bold uppercase tracking-wider border border-brand-orange/20 bg-brand-orange/5 px-3 py-1 rounded">
              {PUBLIC_STATUS}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-heading text-ink leading-tight mb-4">
            {round.titlu_participant || round.id}
          </h1>
        </header>

        <div className="space-y-12">
          {/* Registrul Participant */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-heading text-ink border-b border-black/10 pb-2">
              Perspectiva Participantului
            </h2>
            
            <div className="space-y-6">
              {round.descriere_participant && (
                <div className="prose prose-p:text-lg prose-p:text-ink-muted prose-p:leading-relaxed">
                  {renderMarkdown(round.descriere_participant)}
                </div>
              )}
            </div>
          </section>

          {/* Registrul Pedagogic */}
          {hasPedagogic && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-heading text-ink border-b border-black/10 pb-2">
              Registrul Pedagogic
            </h2>
            
            <div className="space-y-6">
              {round.titlu_pedagogic && (
                <div>
                  <h3 className="text-sm font-bold text-ink-muted uppercase tracking-wider mb-2">Titlu Pedagogic</h3>
                  <div className="text-ink font-medium">
                    {renderMarkdown(round.titlu_pedagogic)}
                  </div>
                </div>
              )}

              {round.descriere_pedagogica && (
                <div>
                  <h3 className="text-sm font-bold text-ink-muted uppercase tracking-wider mb-2">Descriere Pedagogică</h3>
                  <div className="prose prose-p:text-ink-muted prose-p:leading-relaxed">
                    {renderMarkdown(round.descriere_pedagogica)}
                  </div>
                </div>
              )}
            </div>
          </section>
          )}

          {/* Atribute Structurale - Prezentare editoriala continua (nu grid/card) */}
          {hasStructural && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-heading text-ink border-b border-black/10 pb-2">
              Atribute Structurale
            </h2>
            
            <div className="space-y-8 mt-6">
              {round.intrebare && (
                <div>
                  <h3 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Întrebarea Fondatorului</h3>
                  <div className="text-ink font-medium text-lg leading-relaxed">
                    {renderMarkdown(round.intrebare)}
                  </div>
                </div>
              )}

              {round.competenta && (
                <div>
                  <h3 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Competență Urmărită</h3>
                  <div className="prose prose-p:text-ink-muted prose-p:leading-relaxed">
                    {renderMarkdown(round.competenta)}
                  </div>
                </div>
              )}

              {round.prerechizite && (
                <div>
                  <h3 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Prerechizite</h3>
                  <div className="prose prose-p:text-ink-muted prose-p:leading-relaxed">
                    {renderMarkdown(round.prerechizite)}
                  </div>
                </div>
              )}

              {round.continuitate && (
                <div>
                  <h3 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Continuitate</h3>
                  <div className="prose prose-p:text-ink-muted prose-p:leading-relaxed">
                    {renderMarkdown(round.continuitate)}
                  </div>
                </div>
              )}
            </div>
          </section>
          )}
        </div>
      </article>

      {/* Sidebar cu Spirala contextuala */}
      <aside className="w-full xl:w-72 flex-shrink-0 xl:sticky xl:top-24 mt-12 xl:mt-0">
        <SpiralContextLinks 
          currentLevel={currentLevelNum} 
          currentPillar={round.pillar} 
          currentSlug={round.slug}
        />
      </aside>

    </div>
  );
}
