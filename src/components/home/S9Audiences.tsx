"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, User, Users, Building } from "lucide-react"

const audiences = [
  {
    icon: User,
    color: "text-brand-orange bg-brand-orange/10",
    role: "Pentru tineri",
    title: "Vreau să descopăr EZPLAY",
    text: "Vezi ce fel de decizii vei lua, cum arată experiențele și de ce nu trebuie să știi deja totul despre business.",
    cta: "Descoperă experiența ta",
    href: "/for/young-people"
  },
  {
    icon: Users,
    color: "text-brand-teal bg-brand-teal/10",
    role: "Pentru părinți",
    title: "Vreau să înțeleg valoarea programului",
    text: "Descoperă ce urmărește programul, cum completează învățarea academică și ce nu promite EZPLAY.",
    cta: "Informații pentru părinți",
    href: "/for/parents"
  },
  {
    icon: Building,
    color: "text-brand-green bg-brand-green/10",
    role: "Pentru școli și organizații",
    title: "Vreau să creez acces pentru un grup",
    text: "Vezi cum poate fi organizată o experiență, ce oferă EZPLAY și ce informații avem nevoie să aflăm despre participanți.",
    cta: "EZPLAY pentru organizații",
    href: "/for/organizations"
  }
]

export function S9Audiences() {
  return (
    <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="max-w-[800px] mb-16 mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            O experiență bună pentru tineri are nevoie de adulți care îi creează loc.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((aud, index) => (
            <div 
              key={index} 
              className="flex flex-col bg-canvas border border-line p-8 rounded-[var(--radius-card)] h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${aud.color}`}>
                  <aud.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider text-ink-muted">
                  {aud.role}
                </span>
              </div>
              
              <h3 className="font-heading font-bold text-2xl text-ink mb-4">
                {aud.title}
              </h3>
              
              <p className="text-ink-muted leading-relaxed mb-8 flex-1">
                {aud.text}
              </p>
              
              <Link 
                href={aud.href} 
                className="inline-flex items-center font-bold text-brand-orange hover:text-brand-orange/80 transition-colors group mt-auto"
              >
                {aud.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
