import * as React from "react"
import { PlayCircle, MessageSquare, Briefcase, TrendingUp } from "lucide-react"

interface FounderLoopSectionProps {
  dict: any
}

export function FounderLoopSection({ dict }: FounderLoopSectionProps) {
  const steps = [
    {
      icon: <PlayCircle className="w-8 h-8 text-brand-blue" />,
      title: dict.landing.founderLoop.step1Title,
      desc: dict.landing.founderLoop.step1Desc,
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-brand-orange" />,
      title: dict.landing.founderLoop.step2Title,
      desc: dict.landing.founderLoop.step2Desc,
    },
    {
      icon: <Briefcase className="w-8 h-8 text-brand-teal" />,
      title: dict.landing.founderLoop.step3Title,
      desc: dict.landing.founderLoop.step3Desc,
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-brand-green" />,
      title: dict.landing.founderLoop.step4Title,
      desc: dict.landing.founderLoop.step4Desc,
    },
  ]

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{dict.landing.founderLoop.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.landing.founderLoop.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-6 bg-background rounded-2xl shadow-sm border text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-muted rounded-xl mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
              
              {/* Connector line for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-border -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
