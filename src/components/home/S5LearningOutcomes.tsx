"use client"

import * as React from "react"
import { ShieldAlert, LineChart, Target, Layers, ArrowUpRight } from "lucide-react"

const outcomes = [
  {
    title: "Greșeala devine feedback",
    description: "O decizie care nu funcționează nu închide experiența. Arată ce merită înțeles și schimbat la următoarea încercare.",
    icon: ShieldAlert,
    color: "text-brand-orange"
  },
  {
    title: "Finance devine inteligibil",
    description: "Profitul, Cash-ul și Cash Flow-ul nu sunt doar treaba contabilului. Ele spun povestea deciziilor unei companii.",
    icon: LineChart,
    color: "text-brand-teal"
  },
  {
    title: "Decizia nu așteaptă informația perfectă",
    description: "Participantul învață să aleagă folosind ceea ce știe, să observe ce lipsește și să își adapteze strategia.",
    icon: Target,
    color: "text-brand-yellow"
  },
  {
    title: "Compania este un sistem",
    description: "Product, Market, Operations, Finance și Strategy nu funcționează separat. O alegere într-o zonă schimbă întregul rezultat.",
    icon: Layers,
    color: "text-brand-blue"
  },
  {
    title: "Curajul se construiește prin acțiune",
    description: "Încrederea nu vine din promisiunea că totul va merge bine, ci din experiența că poți observa, învăța și continua.",
    icon: ArrowUpRight,
    color: "text-brand-green"
  }
]

export function S5LearningOutcomes() {
  return (
    <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="max-w-[700px] mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-6">
            Nu urmărim răspunsul perfect.<br className="hidden md:inline" /> Urmărim o decizie mai bună.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Antreprenoriatul nu înseamnă să știi totul înainte să începi. Înseamnă să observi, să întrebi, să compari, să alegi și să îți asumi următorul pas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {outcomes.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col bg-surface border border-line p-8 rounded-[var(--radius-card)] hover:shadow-sm hover:border-line-strong transition-all"
            >
              <div className={`w-12 h-12 rounded-full bg-surface-soft flex items-center justify-center mb-6 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-ink mb-3">
                {item.title}
              </h3>
              <p className="text-ink-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
