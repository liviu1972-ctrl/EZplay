"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, BookOpenCheck } from "lucide-react"

export function S10Research() {
  return (
    <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-brand-teal mb-6">
              Experiența deschide întrebarea. Cercetarea ne ajută să construim răspunsul.
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
              Construim cu curiozitate.<br className="hidden lg:inline" /> Verificăm cu rigoare.
            </h2>
            
            <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-10">
              <p>
                Programul folosește principii din curriculum spiral, educație bazată pe competențe, mastery learning, învățare bazată pe probleme și învățare prin experiență. Aceste repere ne ajută să proiectăm, dar nu validează automat ceea ce construim.
              </p>
              <p>
                De aceea separăm sursele externe, ipotezele EZPLAY și observațiile din experiențele reale. Publicăm ce ne influențează deciziile, ce limite are cercetarea și ce trebuie încă testat.
              </p>
            </div>
            
            <Link 
              href="/research" 
              className="inline-flex items-center text-brand-teal font-bold text-lg hover:text-brand-teal/80 transition-colors group"
            >
              Explorează cercetarea EZPLAY
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-surface border border-line rounded-[var(--radius-panel)] p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-brand-teal/10 flex items-center justify-center mb-6 text-brand-teal">
                <BookOpenCheck className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-ink mb-4">
                Transparență educațională
              </h3>
              <p className="text-ink-muted mb-6">
                Descoperă baza teoretică care susține mecanicile și metodele din Founder Rounds.
              </p>
              <div className="w-full border-t border-line pt-6 flex justify-between text-sm font-medium text-ink-muted">
                <span>Surse externe</span>
                <span>Ipoteze interne</span>
                <span>Teste reale</span>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
