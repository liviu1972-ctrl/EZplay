"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, PlayCircle, MessageSquare, BookOpen, Target, ArrowUpCircle } from "lucide-react"

const elements = [
  { text: "simulare și decizie", icon: PlayCircle },
  { text: "Founder Debrief", icon: MessageSquare },
  { text: "Learning Input", icon: BookOpen },
  { text: "Business Challenge", icon: Target },
  { text: "Level Up", icon: ArrowUpCircle },
]

export function S7BeyondGame() {
  return (
    <section className="w-full bg-surface py-20 md:py-32">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          <div className="flex flex-col items-start order-2 lg:order-1">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
              Jocul creează situația.<br className="hidden md:inline" /> Programul creează învățarea.
            </h2>
            
            <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-10 max-w-[65ch]">
              <p>
                EZPLAY folosește jocuri, simulări și scenarii pentru a face deciziile vizibile. Dar experiența educațională nu se oprește atunci când se termină partida.
              </p>
              <p>
                Facilitatorul ajută participanții să analizeze ce s-a întâmplat. Informația relevantă explică problema. O nouă provocare cere aplicare. Progresul apare atunci când participantul poate folosi ceea ce a descoperit.
              </p>
            </div>
            
            <Link 
              href="/program#founder-rounds" 
              className="inline-flex items-center text-brand-orange font-bold text-lg hover:text-brand-orange/80 transition-colors group"
            >
              Vezi cum este construit un Founder Round
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-canvas border border-line rounded-[var(--radius-panel)] p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-ink mb-6 text-center border-b border-line pb-4">
                Structura experienței
              </h3>
              <ul className="space-y-4">
                {elements.map((el, idx) => (
                  <li key={idx} className="flex items-center gap-4 bg-surface-soft p-4 rounded-xl border border-line/50">
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0 shadow-sm">
                      <el.icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="font-medium text-ink">{el.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
