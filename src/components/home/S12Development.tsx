"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function S12Development() {
  return (
    <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
      <div className="container max-w-[900px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        
        <div className="inline-flex items-center rounded-full border border-line-strong bg-surface px-3 py-1 text-sm font-medium text-ink-muted mb-8">
          EZPLAY este în dezvoltare
        </div>
        
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
          Nu construim în spatele unei uși închise.
        </h2>
        
        <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-12 max-w-[72ch]">
          <p>
            Dezvoltăm programul, Founder Rounds, instrumentele și platforma împreună cu experiențele pe care le putem observa în realitate. Căutăm participanți curioși, părinți, educatori, facilitatori, antreprenori, cercetători și organizații care vor să contribuie cu timp, context, întrebări și feedback serios.
          </p>
          <p>
            A contribui nu înseamnă că orice idee devine automat parte din EZPLAY. Înseamnă că experiența și responsabilitatea pot avea un rol real în felul în care proiectul evoluează.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto rounded-full bg-ink text-surface hover:bg-ink/90 text-base h-14 px-8" render={<Link href="/development" />}>
            Construiește EZPLAY împreună cu noi
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/development#roadmap" />}>
            Vezi ce dezvoltăm
          </Button>
        </div>
        
      </div>
    </section>
  )
}
