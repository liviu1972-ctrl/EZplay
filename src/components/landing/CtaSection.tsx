import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CtaSectionProps {
  dict: any
}

export function CtaSection({ dict }: CtaSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-brand-green/5 dark:bg-brand-green/10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{dict.landing.cta.title}</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          {dict.landing.cta.subtitle}
        </p>
        <Button size="lg" className="h-14 px-8 text-lg bg-brand-orange text-white hover:bg-brand-orange/90" render={
          <Link href="/register">
            {dict.landing.cta.button}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        } />
      </div>
    </section>
  )
}
