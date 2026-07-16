"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, LayoutTemplate } from "lucide-react"

export function S11Tools() {
  return (
    <section className="w-full bg-surface-strong py-20 md:py-32">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md aspect-square bg-canvas rounded-[var(--radius-panel)] border-2 border-line shadow-sm overflow-hidden flex items-center justify-center">
              {/* Abstract representation of the tools */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-surface-soft)_0%,transparent_100%)] opacity-50" />
              <div className="relative z-10 flex flex-col items-center text-brand-orange">
                <LayoutTemplate className="w-24 h-24 mb-6 opacity-80" />
                <div className="flex gap-2">
                  <div className="w-16 h-24 bg-surface border border-line-strong rounded-md shadow-sm transform -rotate-12 translate-x-4" />
                  <div className="w-16 h-24 bg-surface border-2 border-brand-orange rounded-md shadow-md z-10" />
                  <div className="w-16 h-24 bg-surface border border-line-strong rounded-md shadow-sm transform rotate-12 -translate-x-4" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
              Instrumente care fac deciziile vizibile.
            </h2>
            
            <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-10">
              <p>
                Deckbuilder-ul EZPLAY transformă o companie într-un sistem de resurse, clienți, costuri, investiții și alegeri. Tableau Builder explorează un nivel mai avansat al aceleiași fundații. Alte simulări și configurații pot susține în timp teme și experiențe diferite.
              </p>
              <p>
                Instrumentele sunt importante. Dar ele își ating scopul atunci când ajută participantul să observe, să întrebe și să decidă mai bine.
              </p>
            </div>
            
            <Link 
              href="/tools" 
              className="inline-flex items-center text-brand-orange font-bold text-lg hover:text-brand-orange/80 transition-colors group"
            >
              Descoperă instrumentele și simulările
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
