"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function SectionIntro() {
  return (
    <section className="w-full bg-surface py-20 md:py-32">
      <div className="container max-w-[900px] mx-auto px-4 md:px-8">
        
        {/* Supratitlu */}
        <div className="text-sm md:text-base font-bold uppercase tracking-wider text-brand-orange mb-6">
          Cunoașterea contează. Experiența o pune în mișcare.
        </div>
        
        {/* H2 */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
          Programul nu începe cu un răspuns.<br className="hidden md:inline" /> Începe cu o situație.
        </h2>
        
        {/* Text */}
        <div className="space-y-6 text-lg text-ink-muted leading-relaxed max-w-[72ch] mb-12">
          <p>
            Ce faci când trebuie să alegi înainte să ai toate informațiile? Ce păstrezi, ce schimbi și la ce renunți? Cum reacționezi când o decizie care părea bună produce un rezultat neașteptat?
          </p>
          <p>
            În EZPLAY, participantul nu primește mai întâi toate concluziile. Intră într-o experiență, decide, vede ce se întâmplă și începe să pună întrebările potrivite. Teoria apare atunci când poate explica ceva trăit și poate ajuta la următoarea decizie.
          </p>
        </div>
        
        {/* Mesaj evidențiat */}
        <div className="border-l-4 border-brand-yellow pl-6 py-2 mb-12">
          <p className="font-heading text-xl md:text-2xl font-bold text-ink">
            Nu eliminăm cunoașterea. Îi dăm un context în care devine utilă.
          </p>
        </div>
        
        {/* CTA */}
        <Link 
          href="/how-we-learn" 
          className="inline-flex items-center text-brand-orange font-bold text-lg hover:text-brand-orange/80 transition-colors group"
        >
          Vezi cum învățăm
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>

      </div>
    </section>
  )
}
