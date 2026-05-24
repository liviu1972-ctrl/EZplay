import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  dict: any
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40 text-center">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-brand-orange bg-brand-orange/10 mb-8">
          {dict.landing.hero.tagline}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
          {dict.landing.hero.title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          {dict.landing.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto bg-brand-green text-white hover:bg-brand-green/90" render={
            <Link href="/register">
              {dict.landing.hero.ctaStart}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          } />
          <Button size="lg" variant="outline" className="w-full sm:w-auto" render={
            <Link href="/about">
              {dict.landing.hero.ctaLearn}
            </Link>
          } />
        </div>
      </div>
      
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/20 rounded-full blur-3xl -z-10 opacity-50 dark:opacity-20" />
    </section>
  )
}
