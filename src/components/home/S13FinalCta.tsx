"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function S13FinalCta() {
  return (
    <section className="w-full bg-brand-orange py-20 md:py-32">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8 max-w-[800px]">
          Creează primul context în care un tânăr poate descoperi antreprenoriatul prin experiență.
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-12 max-w-[700px]">
          Dacă reprezinți o școală, un club, un ONG sau o comunitate, spune-ne cu cine lucrezi și ce vrei să construiești. Vom începe de la participanți și de la experiența care le poate fi cu adevărat utilă.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto rounded-full bg-white text-brand-orange hover:bg-surface text-base h-14 px-8 shadow-sm" render={<Link href="/for/organizations" />}>
            Adu o experiență EZPLAY în comunitatea ta
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-white/30 text-white hover:bg-white/10" render={<Link href="/contact" />}>
            Contactează EZPLAY
          </Button>
        </div>
        
      </div>
    </section>
  )
}
