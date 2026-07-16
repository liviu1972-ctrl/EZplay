"use client"

import * as React from "react"
import { Map, GitMerge } from "lucide-react"

export function ProgramPathFreedom() {
  return (
    <section className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          <div className="flex flex-col items-start">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
              Un început comun.<br className="hidden md:inline" /> Mai multe direcții posibile.
            </h2>
            
            <div className="space-y-6 text-lg text-ink-muted leading-relaxed">
              <p>
                După onboarding, participanții nu trebuie să păstreze același nivel în toate cele cinci perspective și nici să urmeze o ordine universală. Unele Founder Rounds cer experiențe anterioare pentru că problema depinde cu adevărat de ele. Altele oferă libertatea de a alege tema sau provocarea următoare.
              </p>
              <p>
                Programul poate recomanda un traseu fără să transforme recomandarea într-o obligație arbitrară.
              </p>
            </div>
          </div>
          
          <div className="bg-canvas border border-line p-8 rounded-[var(--radius-panel)] shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-line pb-4">
              <Map className="w-6 h-6 text-brand-teal" />
              <h3 className="font-heading text-xl font-bold text-ink">
                Exemplu de traseu
              </h3>
            </div>
            <p className="text-ink-muted leading-relaxed mb-8">
              Un participant poate fi atras de Finance, dar poate descoperi că o provocare avansată are nevoie și de Operations sau Product. Harta programului trebuie să facă aceste legături vizibile și ușor de înțeles.
            </p>
            
            {/* Visual map abstract */}
            <div className="bg-surface rounded-xl p-6 border border-line flex items-center justify-center min-h-[160px] text-brand-teal/50">
              <GitMerge className="w-16 h-16" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
