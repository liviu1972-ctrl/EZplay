"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const perspectives = [
  {
    title: "Strategy",
    description: "Direcția, alegerile, prioritățile și felul în care compania își construiește avantajul.",
    color: "bg-brand-charcoal text-white",
    borderColor: "border-brand-charcoal"
  },
  {
    title: "Product",
    description: "Valoarea ofertei, diferențierea, calitatea și motivele pentru care cineva ar alege-o.",
    color: "bg-brand-orange text-white",
    borderColor: "border-brand-orange"
  },
  {
    title: "Market",
    description: "Capacitatea companiei de a ajunge la oameni, de a câștiga clienți și de a construi relații cu piața.",
    color: "bg-brand-yellow text-ink",
    borderColor: "border-brand-yellow"
  },
  {
    title: "Operations",
    description: "Oamenii, procesele, resursele și sistemele prin care compania creează și livrează valoare.",
    color: "bg-brand-green text-ink",
    borderColor: "border-brand-green"
  },
  {
    title: "Finance",
    description: "Felul în care deciziile se transformă în Revenue, Expenses, Profit, Cash Flow, Cash și Equity.",
    color: "bg-brand-teal text-white",
    borderColor: "border-brand-teal"
  }
]

export function S6PerspectiveSystem() {
  return (
    <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-6">
              Cinci perspective. Aceeași companie.
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-8">
              Programul privește compania din cinci perspective conectate. Participantul poate avansa diferit în fiecare dintre ele și poate descoperi treptat cum se influențează reciproc.
            </p>
            <Link 
              href="/program" 
              className="inline-flex items-center text-brand-orange font-bold text-lg hover:text-brand-orange/80 transition-colors group"
            >
              Descoperă arhitectura programului
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {perspectives.map((perspective, index) => (
              <div 
                key={index} 
                className={`p-6 md:p-8 rounded-[var(--radius-card)] border-2 ${perspective.borderColor} bg-canvas flex flex-col hover:-translate-y-1 hover:shadow-sm transition-transform`}
              >
                <div className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${perspective.color}`}>
                  {perspective.title}
                </div>
                <p className="text-ink-muted leading-relaxed font-medium">
                  {perspective.description}
                </p>
              </div>
            ))}
            {/* Diagram placeholder or filler box */}
            <div className="hidden sm:flex p-6 md:p-8 rounded-[var(--radius-card)] border border-dashed border-line bg-surface-soft items-center justify-center min-h-[160px]">
              <span className="text-ink-muted/50 font-medium text-sm text-center">
                Sistemul conectează deciziile
              </span>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
