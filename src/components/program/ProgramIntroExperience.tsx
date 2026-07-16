"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Play, CheckCircle2, MessageCircle, FastForward } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProgramIntroExperience() {
  const steps = [
    { label: "Învață instrumentul", icon: Play },
    { label: "Ia primele decizii", icon: CheckCircle2 },
    { label: "Observă rezultatele", icon: ArrowRight },
    { label: "Discută strategia", icon: MessageCircle },
    { label: "Pregătește-te pentru Founder Rounds", icon: FastForward }
  ]

  return (
    <section className="w-full bg-surface-strong py-20 md:py-32">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
              Toți încep prin experiență.
            </h2>
            
            <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-10 max-w-[65ch]">
              <p>
                Înainte de Founder Rounds, participantul parcurge o experiență introductivă: învață regulile instrumentului de simulare, joacă, observă rezultatele și participă la un Founder Debrief.
              </p>
              <p>
                Acest început comun creează limbajul și experiența de care participantul are nevoie pentru a înțelege provocările ulterioare. Nu acordă automat niveluri și nu încearcă să predea întregul program într-o singură sesiune.
              </p>
            </div>
            
            <Button size="lg" className="rounded-full bg-brand-charcoal text-white hover:bg-brand-charcoal/90 text-base" render={<Link href="/experiences/introduction" />}>
              Descoperă experiența introductivă
            </Button>
          </div>
          
          <div className="bg-canvas border border-line rounded-[var(--radius-panel)] p-8 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-ink mb-6 uppercase tracking-wider text-center border-b border-line pb-4">
              Fluxul inițial
            </h3>
            
            <div className="flex flex-col gap-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-line-strong shadow-sm relative z-10 group hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <span className="font-medium text-ink">{step.label}</span>
                </div>
              ))}
              {/* Connector line behind */}
              <div className="absolute top-0 bottom-0 left-[3.25rem] w-[2px] bg-brand-orange/20 -z-0 hidden md:block" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
