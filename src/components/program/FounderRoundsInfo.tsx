"use client"

import * as React from "react"

const elements = [
  {
    title: "Business Run",
    text: "Participanții conduc propriile companii simulate, iau decizii și văd consecințele într-un context construit pentru tema Round-ului."
  },
  {
    title: "Founder Debrief",
    text: "Grupul analizează ce s-a întâmplat, ce strategii au apărut, ce presupuneri au influențat deciziile și ce întrebări merită urmărite."
  },
  {
    title: "Learning Input",
    text: "Participantul primește conceptele, exemplele și instrumentele de care are nevoie. Formatul poate fi o explicație, un material scris, video, documentație sau o combinație."
  },
  {
    title: "Business Challenge",
    text: "Echipa folosește ceea ce a observat și învățat pentru a lua o decizie sau pentru a rezolva o problemă nouă."
  },
  {
    title: "Level Up",
    text: "Rezultatul devine feedback pentru progres. Skill XP, nivelurile și deblocările vor fi definite și validate împreună cu Founder Rounds reale."
  }
]

export function FounderRoundsInfo() {
  return (
    <section className="w-full bg-canvas py-20 md:py-32 border-t border-line" id="founder-rounds">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="max-w-[800px] mb-16">
          <div className="text-sm font-bold uppercase tracking-wider text-brand-teal mb-6">
            Experiența centrală
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
            Fiecare Round începe cu o problemă care merită înțeleasă.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Founder Round este experiența educațională principală a programului. Fiecare Round urmărește o temă și câteva capacități clare. Participanții intră într-o situație simulată, observă ce au produs deciziile lor, primesc instrumentele relevante și rezolvă o provocare nouă.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {elements.map((el, index) => (
            <div 
              key={index} 
              className="flex flex-col bg-surface border border-line p-8 rounded-[var(--radius-card)] hover:border-brand-teal transition-colors"
            >
              <h3 className="font-heading font-bold text-xl text-brand-teal mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {el.title}
              </h3>
              <p className="text-ink-muted leading-relaxed">
                {el.text}
              </p>
            </div>
          ))}
        </div>
        
        <div className="p-6 md:p-8 bg-brand-charcoal text-white rounded-[var(--radius-panel)] border-l-4 border-brand-yellow">
          <p className="font-heading text-xl md:text-2xl font-bold">
            Founder Round nu testează doar ce își amintește participantul. Urmărește ce poate face cu ceea ce a înțeles.
          </p>
        </div>
        
      </div>
    </section>
  )
}
