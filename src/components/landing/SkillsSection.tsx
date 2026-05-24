import * as React from "react"
import { Target, Lightbulb, Settings, DollarSign, Compass } from "lucide-react"

interface SkillsSectionProps {
  dict: any
}

export function SkillsSection({ dict }: SkillsSectionProps) {
  const skills = [
    {
      icon: <Target className="w-6 h-6 text-brand-orange" />,
      title: dict.landing.skills.market,
      desc: dict.landing.skills.marketDesc,
      bg: "bg-brand-orange/10",
      border: "border-brand-orange/20"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-brand-yellow" />,
      title: dict.landing.skills.product,
      desc: dict.landing.skills.productDesc,
      bg: "bg-brand-yellow/10",
      border: "border-brand-yellow/20"
    },
    {
      icon: <Settings className="w-6 h-6 text-brand-teal" />,
      title: dict.landing.skills.operations,
      desc: dict.landing.skills.operationsDesc,
      bg: "bg-brand-teal/10",
      border: "border-brand-teal/20"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-brand-green" />,
      title: dict.landing.skills.finance,
      desc: dict.landing.skills.financeDesc,
      bg: "bg-brand-green/10",
      border: "border-brand-green/20"
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-blue" />,
      title: dict.landing.skills.strategy,
      desc: dict.landing.skills.strategyDesc,
      bg: "bg-brand-blue/10",
      border: "border-brand-blue/20"
    },
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{dict.landing.skills.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.landing.skills.subtitle}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center p-6 rounded-2xl border ${skill.border} w-full md:w-[calc(33.333%-1rem)] min-w-[250px] max-w-[320px] bg-background shadow-sm hover:shadow-md transition-shadow`}>
              <div className={`p-4 rounded-full ${skill.bg} mb-4`}>
                {skill.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
