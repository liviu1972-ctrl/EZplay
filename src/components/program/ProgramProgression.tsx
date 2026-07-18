"use client"

import * as React from "react"
import { RepeatIcon, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ProgramProgression() {
  return (
    <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
              {/* Abstract spiral representation */}
              <div className="absolute inset-0 border-4 border-brand-orange/20 rounded-full" />
              <div className="absolute inset-4 border-4 border-brand-orange/40 rounded-full" />
              <div className="absolute inset-8 border-4 border-brand-orange/60 rounded-full" />
              <div className="absolute inset-12 border-4 border-brand-orange rounded-full flex items-center justify-center bg-canvas">
                <RepeatIcon className="w-10 h-10 text-brand-orange" />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8 flex flex-col items-start">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
              Conceptele importante revin.<br className="hidden md:inline" /> Dar nu se întorc niciodată la fel.
            </h2>
            
            <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-10">
              <p>
                Profitul poate apărea într-o experiență introductivă ca rezultat simplu. Mai târziu, participantul îl compară cu Cash-ul, investițiile, riscul, performanța și deciziile strategice. Fiecare revenire adaugă profunzime, variabile și autonomie.
              </p>
              <p>
                Acesta este sensul progresiei spiralate: nu bifăm o temă și o abandonăm. O reîntâlnim în contexte mai complexe și o conectăm cu celelalte perspective.
              </p>
            </div>
            
            <div className="p-4 bg-brand-charcoal text-white rounded-xl font-medium border-l-4 border-brand-orange mb-8">
              Nivelul nu este vârsta participantului. Nivelul arată cât de departe a ajuns într-o anumită perspectivă.
            </div>

            <Link 
              href="/program/curriculum"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90 transition-colors font-semibold"
            >
              Explorează harta programului
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  )
}
