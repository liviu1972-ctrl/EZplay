"use client"

import * as React from "react"
import { Users } from "lucide-react"

export function ProgramTarget() {
  return (
    <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 flex flex-col items-start">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
              Pentru tineri curioși să vadă ce se întâmplă după o decizie.
            </h2>
            
            <div className="space-y-6 text-lg text-ink-muted leading-relaxed">
              <p>
                Nucleul programului este proiectat pentru elevi din clasele a V-a–a X-a. În timp, aceeași fundație poate susține experiențe adaptate pentru participanți mai mici sau mai mari.
              </p>
              <p>
                Vârsta contează, dar nu spune întreaga poveste. Doi participanți de aceeași vârstă pot avea niveluri diferite de experiență, autonomie, motivație și înțelegere. De aceea, programul urmărește ceea ce participantul poate face și explica, nu doar clasa în care se află.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-4 bg-surface p-8 rounded-[var(--radius-panel)] border border-line shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-line pb-4">
              <Users className="w-6 h-6 text-brand-orange" />
              <h3 className="font-heading text-xl font-bold text-ink">
                Cerințe de intrare
              </h3>
            </div>
            <p className="text-ink-muted leading-relaxed mb-6">
              Pentru primele experiențe sunt utile operațiile matematice de bază și curiozitatea de a încerca. Participantul nu trebuie să cunoască deja business, contabilitate sau economie.
            </p>
            <div className="p-4 bg-brand-yellow/10 border-l-4 border-brand-yellow text-ink font-medium">
              Nu trebuie să ai deja o idee de afacere. Trebuie să fii pregătit să iei o decizie.
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
