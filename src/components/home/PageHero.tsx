"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PageHero() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas py-16 md:py-24 lg:py-32">
      <div className="container relative z-10 flex flex-col items-center text-center max-w-[900px] mx-auto px-4 md:px-8">
        
        {/* Label */}
        <div className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange mb-8">
          Program de educație antreprenorială pentru tineri
        </div>
        
        {/* H1 */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-6">
          Descoperă antreprenoriatul. <br className="hidden md:inline" />
          <span className="text-brand-orange">Prin experiență.</span>
        </h1>
        
        {/* Intro */}
        <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[72ch]">
          EZPLAY dezvoltă programe în care tinerii iau decizii, observă consecințele, învață din greșeli și încearcă din nou. Jocurile, simulările și provocările creează un mediu sigur în care ideile despre business devin experiențe pe care le poți analiza, înțelege și folosi.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8" render={<Link href="/program" />}>
            Descoperă programul
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/for/organizations" />}>
            Adu EZPLAY în comunitatea ta
          </Button>
        </div>

        {/* Signature */}
        <div className="flex flex-col items-center gap-2">
          <div className="font-mono text-xs md:text-sm font-bold tracking-widest text-ink/40 uppercase">
            Where future founders start
          </div>
          <p className="text-xs text-ink-muted/70 max-w-[50ch]">
            Primul program EZPLAY este construit pentru tineri. Alte programe și publicuri vor fi dezvoltate în timp.
          </p>
        </div>

      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  )
}
