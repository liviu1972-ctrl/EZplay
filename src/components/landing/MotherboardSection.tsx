"use client"

import * as React from "react"
import { Cpu, MemoryStick, MonitorPlay } from "lucide-react"

interface MotherboardSectionProps {
  dict: any
}

export function MotherboardSection({ dict }: MotherboardSectionProps) {
  const [activeChip, setActiveChip] = React.useState<"cpu" | "ram" | "gpu">("cpu")

  const chips = {
    cpu: {
      icon: <Cpu className="w-12 h-12" />,
      title: dict.landing.motherboard.cpuTitle,
      desc: dict.landing.motherboard.cpuDesc,
      color: "text-brand-orange",
      bg: "bg-brand-orange/10",
      border: "border-brand-orange/50"
    },
    ram: {
      icon: <MemoryStick className="w-12 h-12" />,
      title: dict.landing.motherboard.ramTitle,
      desc: dict.landing.motherboard.ramDesc,
      color: "text-brand-blue",
      bg: "bg-brand-blue/10",
      border: "border-brand-blue/50"
    },
    gpu: {
      icon: <MonitorPlay className="w-12 h-12" />,
      title: dict.landing.motherboard.gpuTitle,
      desc: dict.landing.motherboard.gpuDesc,
      color: "text-brand-green",
      bg: "bg-brand-green/10",
      border: "border-brand-green/50"
    }
  }

  return (
    <section className="py-24 bg-zinc-900 text-zinc-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{dict.landing.motherboard.title}</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {dict.landing.motherboard.subtitle}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Visual representation of motherboard */}
          <div className="w-full md:w-1/2 relative aspect-square max-w-md mx-auto bg-zinc-800 rounded-2xl border-4 border-zinc-700 p-8 grid grid-cols-2 gap-4 shadow-2xl">
            {/* CPU Slot */}
            <button 
              onClick={() => setActiveChip("cpu")}
              className={`col-span-2 aspect-[2/1] rounded-xl border-2 flex items-center justify-center transition-all ${activeChip === "cpu" ? chips.cpu.border + " " + chips.cpu.bg + " shadow-[0_0_20px_rgba(249,115,22,0.3)]" : "border-zinc-600 bg-zinc-700/50 hover:border-zinc-500"}`}
            >
              <Cpu className={`w-16 h-16 ${activeChip === "cpu" ? chips.cpu.color : "text-zinc-500"}`} />
            </button>
            
            {/* RAM Slot */}
            <button 
              onClick={() => setActiveChip("ram")}
              className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${activeChip === "ram" ? chips.ram.border + " " + chips.ram.bg + " shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "border-zinc-600 bg-zinc-700/50 hover:border-zinc-500"}`}
            >
              <MemoryStick className={`w-12 h-12 ${activeChip === "ram" ? chips.ram.color : "text-zinc-500"}`} />
            </button>
            
            {/* GPU Slot */}
            <button 
              onClick={() => setActiveChip("gpu")}
              className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${activeChip === "gpu" ? chips.gpu.border + " " + chips.gpu.bg + " shadow-[0_0_20px_rgba(34,197,94,0.3)]" : "border-zinc-600 bg-zinc-700/50 hover:border-zinc-500"}`}
            >
              <MonitorPlay className={`w-12 h-12 ${activeChip === "gpu" ? chips.gpu.color : "text-zinc-500"}`} />
            </button>
            
            {/* Decorative traces */}
            <div className="absolute top-1/4 left-0 w-8 h-[2px] bg-zinc-600" />
            <div className="absolute top-3/4 right-0 w-8 h-[2px] bg-zinc-600" />
            <div className="absolute bottom-0 left-1/2 w-[2px] h-8 bg-zinc-600" />
          </div>
          
          {/* Active Info */}
          <div className="w-full md:w-1/2 min-h-[250px] flex flex-col justify-center">
            <div className={`p-6 rounded-2xl border ${chips[activeChip].border} ${chips[activeChip].bg} backdrop-blur-sm transition-all animate-in fade-in slide-in-from-right-4 duration-500`}>
              <div className={`mb-4 ${chips[activeChip].color}`}>
                {chips[activeChip].icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{chips[activeChip].title}</h3>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {chips[activeChip].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
