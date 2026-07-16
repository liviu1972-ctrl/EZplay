"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"

export function ProgramMeasurement() {
  return (
    <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        
        <div className="bg-canvas border border-line rounded-[var(--radius-panel)] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="md:col-span-7 lg:col-span-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
                Progresul trebuie câștigat prin aplicare, nu prin prezență.
              </h2>
              
              <div className="space-y-4 text-lg text-ink-muted leading-relaxed">
                <p>
                  Founder Skills și Skill XP vor face vizibil progresul în Strategy, Product, Market, Operations și Finance. Ele nu vor recompensa simplul timp petrecut în platformă, numărul de clickuri sau finalizarea mecanică a unei activități.
                </p>
                <p>
                  Până la validarea Round-urilor, profilul poate arăta zonele care urmează să fie explorate, fără să pretindă că pragurile și nivelurile sunt deja definitive.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-start gap-3 p-4 bg-brand-charcoal text-white rounded-xl">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-brand-yellow" />
                <p className="text-sm font-medium">
                  Sistemul de progres este în dezvoltare și va fi calibrat prin experiențe reale, nu doar prin formule proiectate în avans.
                </p>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  )
}
