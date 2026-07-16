"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ProgramHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
      <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
        
        <div className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange mb-8">
          Primul program educațional EZPLAY
        </div>
        
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
          Un program care crește <br className="hidden md:inline" />
          odată cu participantul.
        </h1>
        
        <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[72ch]">
          Programul EZPLAY pentru tineri nu este o succesiune de lecții pe care toți trebuie să le parcurgă în aceeași ordine. Este o rețea de experiențe în care participantul decide, observă, reflectează, înțelege și aplică din nou — cu mai multă autonomie și complexitate pe măsură ce avansează.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8" render={<Link href="/experiences/introduction" />}>
            Descoperă primul pas
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/how-we-learn" />}>
            Vezi cum învățăm
          </Button>
        </div>

        <div className="p-4 rounded-xl border border-line-strong bg-surface-soft text-sm text-ink-muted">
          <strong>Notă:</strong> Programul este în dezvoltare. Arhitectura curriculară există ca direcție de lucru, iar primele experiențe și Founder Rounds sunt construite și testate progresiv.
        </div>

      </div>
    </section>
  )
}
