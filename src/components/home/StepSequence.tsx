"use client"

import * as React from "react"

const steps = [
  {
    title: "Intră în situație",
    description: "Primești un context, resurse, obiective și limite. Nu există o singură cale evidentă.",
  },
  {
    title: "Ia decizia",
    description: "Alegi ce construiești, ce păstrezi, ce schimbi și ce risc îți asumi.",
  },
  {
    title: "Observă consecințele",
    description: "Rezultatul devine vizibil. Uneori confirmă strategia. Alteori arată ce nu ai luat în calcul.",
  },
  {
    title: "Reflectează și înțelege",
    description: "Compari deciziile, descoperi legături și folosești explicațiile care dau sens experienței.",
  },
  {
    title: "Aplică din nou",
    description: "Încerci o problemă nouă cu mai multă claritate, nu doar cu o definiție memorată.",
  }
]

export function StepSequence() {
  return (
    <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-[700px] mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
            Decide. Observă. Înțelege. Încearcă din nou.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Experiențele EZPLAY sunt construite în jurul unui ritm simplu: participantul face o alegere, observă rezultatul, reflectează, primește instrumentele de care are nevoie și aplică din nou ceea ce a descoperit.
          </p>
        </div>
        
        {/* Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-row md:flex-col gap-4 relative group">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[3rem] w-[calc(100%-1.5rem)] h-[2px] bg-line group-hover:bg-brand-orange/30 transition-colors z-0" />
              )}
              {/* Connector line for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute top-[3rem] left-6 w-[2px] h-[calc(100%-1.5rem)] bg-line group-hover:bg-brand-orange/30 transition-colors z-0" />
              )}
              
              <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-surface border-2 border-line flex items-center justify-center font-heading font-bold text-ink group-hover:border-brand-orange group-hover:text-brand-orange transition-colors">
                {index + 1}
              </div>
              
              <div className="pt-2 md:pt-4">
                <h3 className="font-heading font-bold text-lg text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
