"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function S8IntroExperience() {
  return (
    <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        
        <div className="bg-brand-charcoal text-white rounded-[var(--radius-panel)] p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-start">
            <div className="inline-flex items-center rounded-full border border-surface/20 bg-surface/10 px-3 py-1 text-sm font-medium text-surface mb-8">
              Primul pas
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8">
              Joacă. Observă. Discută.
            </h2>
            
            <div className="space-y-6 text-lg text-surface-soft/90 leading-relaxed max-w-[65ch] mb-12">
              <p>
                Înaintea unui Founder Round complet, participantul trebuie să cunoască instrumentul și modul de lucru EZPLAY. Experiența introductivă combină jocul cu un Founder Debrief: participanții învață regulile, iau primele decizii și discută ce au observat despre propriile strategii.
              </p>
              <p>
                Formatul este gândit pentru grupuri organizate în jurul unor mese de câte aproximativ patru participanți, cu un facilitator pentru una sau maximum două mese.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base border-0" render={<Link href="/experiences/introduction" />}>
                Descoperă experiența introductivă
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base border-surface/30 text-surface hover:bg-surface/10 hover:text-white" render={<Link href="/for/organizations" />}>
                Solicită o discuție pentru organizația ta
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
