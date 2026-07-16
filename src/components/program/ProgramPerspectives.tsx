"use client"

import * as React from "react"

const perspectives = [
  {
    title: "Strategy",
    description: "Cum alegi direcția, prioritățile și compromisurile? Cum construiești o strategie care poate fi adaptată când contextul se schimbă?",
    color: "bg-brand-charcoal text-white",
    borderColor: "border-brand-charcoal"
  },
  {
    title: "Product",
    description: "Ce valoare creezi? De ce ar alege cineva oferta ta? Ce face produsul diferit, util sau mai valoros?",
    color: "bg-brand-orange text-white",
    borderColor: "border-brand-orange"
  },
  {
    title: "Market",
    description: "Cum ajungi la oameni și câștigi clienți? Cum se leagă piața, vânzările, distribuția, brandul și relațiile?",
    color: "bg-brand-yellow text-ink",
    borderColor: "border-brand-yellow"
  },
  {
    title: "Operations",
    description: "Cum transformi resursele în valoare? Ce pot susține oamenii, procesele, echipamentele și sistemele companiei?",
    color: "bg-brand-green text-ink",
    borderColor: "border-brand-green"
  },
  {
    title: "Finance",
    description: "Ce spun Revenue, Expenses, Profit, Cash Flow, Cash și Equity despre deciziile luate și despre capacitatea companiei de a continua?",
    color: "bg-brand-teal text-white",
    borderColor: "border-brand-teal"
  }
]

export function ProgramPerspectives() {
  return (
    <section className="w-full bg-surface py-20 md:py-32">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="max-w-[800px] mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
            O companie poate fi privită din cinci perspective.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Fiecare perspectivă are propria progresie. Participantul poate avansa mai repede într-o zonă și poate avea nevoie de experiențe suplimentare în alta. Profilul rezultat nu este o notă generală, ci o hartă a lucrurilor explorate și aplicate.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {perspectives.map((p, idx) => (
            <div key={idx} className={`p-8 rounded-[var(--radius-card)] border-t-4 ${p.borderColor} bg-canvas shadow-sm`}>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${p.color}`}>
                {p.title}
              </div>
              <p className="text-ink-muted leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
