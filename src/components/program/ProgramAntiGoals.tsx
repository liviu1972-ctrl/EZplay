"use client"

import * as React from "react"
import { X } from "lucide-react"

const antiGoals = [
  "Nu promitem că fiecare participant va deveni antreprenor.",
  "Nu cerem construirea imediată a unei afaceri reale.",
  "Nu oferim rețete garantate pentru succes financiar.",
  "Nu confundăm educația financiară cu promisiunea îmbogățirii.",
  "Nu folosim competiția ca unic instrument de evaluare.",
  "Nu reducem progresul la note, clasamente sau popularitate."
]

export function ProgramAntiGoals() {
  return (
    <section className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-12 text-center">
          Nu pregătim o singură definiție a succesului.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-16">
          {antiGoals.map((goal, index) => (
            <div key={index} className="flex items-start gap-4 p-4 lg:p-6 bg-canvas border border-line rounded-xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-brand-charcoal/5 flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-4 h-4 text-brand-charcoal" />
              </div>
              <p className="text-ink-muted leading-relaxed font-medium">
                {goal}
              </p>
            </div>
          ))}
        </div>
        
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-xl md:text-2xl font-heading font-bold text-ink leading-relaxed">
            Programul poate fi valoros pentru un viitor fondator, intraprenor, lider de echipă sau pentru orice tânăr care vrea să înțeleagă mai bine decizia, resursele și consecințele.
          </p>
        </div>
        
      </div>
    </section>
  )
}
