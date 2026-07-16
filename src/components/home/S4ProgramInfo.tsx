"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function S4ProgramInfo() {
  return (
    <section className="w-full bg-surface py-20 md:py-32">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start">
            <div className="inline-flex items-center rounded-full border border-line-strong bg-surface-soft px-3 py-1 text-sm font-medium text-ink-muted mb-6">
              În dezvoltare
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
              Un program pentru tineri care vor să descopere cum se iau deciziile în business.
            </h2>
            
            <div className="space-y-6 text-lg text-ink-muted leading-relaxed max-w-[65ch]">
              <p>
                Primul program EZPLAY este construit în jurul unor experiențe educaționale numite Founder Rounds. Fiecare Round pornește de la o temă, o situație și o provocare. Participantul joacă, reflectează, primește informația relevantă și o pune la lucru într-o problemă nouă.
              </p>
              <p>
                Programul are un început comun, dar nu obligă toți participanții să urmeze același traseu pentru totdeauna. Pe măsură ce cresc experiența și autonomia, apar alegeri, conexiuni și provocări diferite.
              </p>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base" render={<Link href="/program" />}>
                Descoperă Programul EZPLAY
              </Button>
              <Link 
                href="/experiences" 
                className="inline-flex items-center text-ink-muted font-medium hover:text-ink transition-colors group mt-4 sm:mt-0 sm:ml-4"
              >
                Vezi experiențele
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Sidebar Info */}
          <div className="lg:col-span-5 xl:col-span-4 bg-surface-soft p-8 rounded-[var(--radius-panel)] border border-line">
            <h3 className="font-heading text-xl font-bold text-ink mb-4">
              Pentru cine
            </h3>
            <p className="text-ink-muted leading-relaxed">
              Nucleul programului este proiectat pentru elevi din clasele a V-a–a X-a. Experiențele pot fi adaptate în timp pentru participanți mai mici sau mai mari, în funcție de nivel, motivație și context.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}
