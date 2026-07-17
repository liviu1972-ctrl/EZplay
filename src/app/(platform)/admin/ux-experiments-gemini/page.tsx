"use client";

import React from "react";
import TheDeckFan from "@/components/experiments/gemini/TheDeckFan";
import TheFlipReveal from "@/components/experiments/gemini/TheFlipReveal";
import TheStoryCombo from "@/components/experiments/gemini/TheStoryCombo";
import TheParallaxDepth from "@/components/experiments/gemini/TheParallaxDepth";
import TheGlowingFocus from "@/components/experiments/gemini/TheGlowingFocus";
import TheBoardConnection from "@/components/experiments/gemini/TheBoardConnection";
import TheCinematicVideoCard from "@/components/experiments/gemini/TheCinematicVideoCard";
import TheExpandingAccordion from "@/components/experiments/gemini/TheExpandingAccordion";
import TheFloatingReservoir from "@/components/experiments/gemini/TheFloatingReservoir";
import TheCircularCarousel from "@/components/experiments/gemini/TheCircularCarousel";

export default function UXExperimentsGeminiPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#373435] pb-32">
      <header className="py-12 text-center bg-[#FFFDF8] border-b border-[#D7D0C2] mb-16 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Laborator UX Gemini: Energie Tactilă
        </h1>
        <p className="text-lg text-[#5E5A54] max-w-2xl mx-auto">
          Explorare vizuală a celor 10 concepte interactive (30% energie tactilă) folosind aseturile WebP din EZplay.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-32">
        <Section title="1. The Deck Fan (Amestec și Răsfirare)" description="Hover pentru a răsfira stiva de cărți și a revela diversitatea bordurilor (Uman, Corporal, Eveniment).">
          <TheDeckFan />
        </Section>

        <Section title="2. The Flip Reveal (Rotire 3D)" description="Hover peste cărți pentru a dezvălui artwork-ul ascuns (concepte abstracte).">
          <TheFlipReveal />
        </Section>

        <Section title="3. The Story Combo (Text Interactiv)" description="Treci cu mouse-ul peste cuvintele cheie din text pentru a vedea cum se adaptează fereastra vizuală.">
          <TheStoryCombo />
        </Section>

        <Section title="4. The Parallax Depth Showcase" description="Scroll pentru a vedea efectul de adâncime (parallax) între cărțile corporale.">
          <TheParallaxDepth />
        </Section>

        <Section title="5. The Glowing Focus (Magnetic Hover)" description="Mută cursorul printre cărți pentru a le aprinde (glow) proporțional cu distanța.">
          <TheGlowingFocus />
        </Section>

        <Section title="6. The Board Connection (Linii SVG)" description="Conectarea a două elemente printr-o linie animată.">
          <TheBoardConnection />
        </Section>

        <Section title="7. The Cinematic Video Card" description="Hover peste carte pentru a porni tutorialul video.">
          <TheCinematicVideoCard />
        </Section>

        <Section title="8. The Expanding Accordion" description="Hover pentru a extinde detaliile resurselor umane.">
          <TheExpandingAccordion />
        </Section>

        <Section title="9. The Floating Reservoir (Levitație)" description="Active intangibile plutind. Hover pentru a stabiliza.">
          <TheFloatingReservoir />
        </Section>

        <Section title="10. The Circular Carousel (Wheel)" description="Navighează printr-un spectru complet de cărți.">
          <TheCircularCarousel />
        </Section>
      </main>
    </div>
  );
}

function Section({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
  return (
    <section className="flex flex-col border border-[#D7D0C2] rounded-3xl bg-[#FFFDF8] overflow-hidden shadow-sm relative">
      <div className="p-6 md:p-8 border-b border-[#D7D0C2] bg-white relative z-10">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-[#5E5A54]">{description}</p>
      </div>
      <div className="p-8 md:p-16 flex items-center justify-center min-h-[500px] relative overflow-hidden" 
           style={{ backgroundImage: 'radial-gradient(circle, #D7D0C2 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        {children}
      </div>
    </section>
  );
}
