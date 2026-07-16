"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ProgramCta() {
  return (
    <section className="w-full bg-brand-charcoal py-20 md:py-32">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8 max-w-[800px]">
          Începe cu experiența care creează limbajul comun.
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-12 max-w-[700px]">
          Experiența introductivă le permite participanților să cunoască jocul, să ia primele decizii și să analizeze ce s-a întâmplat. De aici poate începe parcursul către Founder Rounds.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8 shadow-sm border-0" render={<Link href="/experiences/introduction" />}>
            Descoperă experiența introductivă
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-white/30 text-white hover:bg-white/10" render={<Link href="/for/organizations" />}>
            Adu Programul EZPLAY în organizația ta
          </Button>
        </div>
        
      </div>
    </section>
  )
}
