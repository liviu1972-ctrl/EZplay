"use client";

import React from "react";
import dynamic from "next/dynamic";

// Card Effects (1-5)
const CardVortex = dynamic(() => import("@/components/experiments/claude/CardVortex"), { ssr: false });
const CardMorphGrid = dynamic(() => import("@/components/experiments/claude/CardMorphGrid"), { ssr: false });
const CardShuffleRain = dynamic(() => import("@/components/experiments/claude/CardShuffleRain"), { ssr: false });
const CardTimeline = dynamic(() => import("@/components/experiments/claude/CardTimeline"), { ssr: false });
const CardMagneticStack = dynamic(() => import("@/components/experiments/claude/CardMagneticStack"), { ssr: false });

// Artwork Effects (6-15)
const ArtworkMosaic = dynamic(() => import("@/components/experiments/claude/ArtworkMosaic"), { ssr: false });
const ArtworkParticleField = dynamic(() => import("@/components/experiments/claude/ArtworkParticleField"), { ssr: false });
const ArtworkBeforeAfter = dynamic(() => import("@/components/experiments/claude/ArtworkBeforeAfter"), { ssr: false });
const ArtworkOrbit = dynamic(() => import("@/components/experiments/claude/ArtworkOrbit"), { ssr: false });
const CoinCascade = dynamic(() => import("@/components/experiments/claude/CoinCascade"), { ssr: false });
const ArtworkWaveReveal = dynamic(() => import("@/components/experiments/claude/ArtworkWaveReveal"), { ssr: false });
const IconDashboard = dynamic(() => import("@/components/experiments/claude/IconDashboard"), { ssr: false });
const ArtworkKenBurns = dynamic(() => import("@/components/experiments/claude/ArtworkKenBurns"), { ssr: false });
const ArtworkHexGrid = dynamic(() => import("@/components/experiments/claude/ArtworkHexGrid"), { ssr: false });
const ArtworkCinemaReel = dynamic(() => import("@/components/experiments/claude/ArtworkCinemaReel"), { ssr: false });

const experiments = [
  // Card Effects
  { title: "1. Card Vortex (Spirală 3D)", description: "12 cărți rotindu-se într-un vortex. Hover pentru a le distribui într-un grid. Fiecare carte se înclină după poziția cursorului.", Component: CardVortex, category: "card" },
  { title: "2. Card Morph Grid (Flip + Lightbox)", description: "Grid de cărți cu spatele în sus. Click pentru flip 3D + expansiune glassmorphism. Click din nou pentru a închide.", Component: CardMorphGrid, category: "card" },
  { title: "3. Card Shuffle Rain (Ploaie de Cărți)", description: "Cărțile cad ca ploaia cu rotații aleatorii. Se adună la fund. Apasă Shuffle pentru a le relansa.", Component: CardShuffleRain, category: "card" },
  { title: "4. Card Timeline (Linie Temporală)", description: "Timeline orizontal scrollabil cu cărți corporale deasupra liniei și umane dedesubt. Scroll pentru a le vedea crescând.", Component: CardTimeline, category: "card" },
  { title: "5. Card Magnetic Stack (Stivă Elastică)", description: "6 cărți stivuite. Mișcă mouse-ul — cărțile urmăresc cursorul cu întârziere elastică progresivă. Click pentru explozie.", Component: CardMagneticStack, category: "card" },
  // Artwork Effects
  { title: "6. Artwork Mosaic (Spotlight)", description: "Mozaic de 12 artwork-uri. Hover activează spotlight: imaginea crește și primește umbra categoriei; restul se desaturează.", Component: ArtworkMosaic, category: "artwork" },
  { title: "7. Artwork Particle Field (Câmp Magnetic)", description: "15 artwork-uri plutind sinusoidal. Cursorul le respinge magnetic. Fizică la 60fps cu requestAnimationFrame.", Component: ArtworkParticleField, category: "artwork" },
  { title: "8. Artwork Before/After (Slider Comparativ)", description: "Slider draggable: stânga grayscale, dreapta color vibrant. Logo EZPLAY pe divisor.", Component: ArtworkBeforeAfter, category: "artwork" },
  { title: "9. Artwork Orbit (Sistem Solar)", description: "Logo EZPLAY central cu 3 orbite: corporale (albastru), umane (portocaliu), necorporale (verde). Hover oprește orbita.", Component: ArtworkOrbit, category: "artwork" },
  { title: "10. Coin Cascade (Cascadă de Monede)", description: "Monede EZplay care cad cu fizică de bouncing. Fiecare impact creează un ring. Buton Reset pentru relansare.", Component: CoinCascade, category: "artwork" },
  { title: "11. Artwork Wave Reveal (Dezvăluire Val)", description: "8 artwork-uri ascunse de bare colorate. La scroll, barele alunecă în val (stânga→dreapta). După reveal, efect de respirație.", Component: ArtworkWaveReveal, category: "artwork" },
  { title: "12. Icon Dashboard (HUD Gaming)", description: "Dashboard faux-gaming cu iconuri EZplay, contoare animate și elementele financiare cu borduri pulsante. Estetică tech.", Component: IconDashboard, category: "artwork" },
  { title: "13. Artwork Ken Burns (Slideshow Cinematic)", description: "Slideshow cu zoom lent + pan (Ken Burns). Crossfade la 4 secunde. Text typewriter cu categoria. Navigare prin dots.", Component: ArtworkKenBurns, category: "artwork" },
  { title: "14. Artwork Hex Grid (Fagure)", description: "Artwork-uri în formă de hexagoane (clip-path). Hover face hexagonul să sară în față, vecinii se deplasează. Glow colorat.", Component: ArtworkHexGrid, category: "artwork" },
  { title: "15. Artwork Cinema Reel (Peliculă)", description: "Bandă de film cu perforații CSS și 10 artwork-uri. Auto-scroll. Hover oprește, drag pentru scrub. Efect vignette + sepia.", Component: ArtworkCinemaReel, category: "artwork" },
];

export default function UXExperimentsClaudePage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white pb-32">
      <header className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(45,147,167,0.15) 0%, rgba(15,15,20,0) 70%)"
        }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
               style={{ background: "linear-gradient(135deg, rgba(45,147,167,0.2), rgba(143,199,74,0.2))", border: "1px solid rgba(85,191,229,0.3)" }}>
            <span style={{ color: "#55BFE5" }}>●</span> Claude × EZPLAY
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
              style={{ background: "linear-gradient(135deg, #55BFE5, #8FC74A, #FEBD00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Laborator UX Claude
          </h1>
          <p className="text-lg max-w-3xl mx-auto px-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            15 componente experimentale — 5 cu cărți complete, 10 cu artwork-uri, monede, icoane și video.
            Energie tactilă 30%. Fiecare efect este unic și interactiv.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm" style={{ color: "#2D93A7" }}>
              <span className="w-3 h-3 rounded-full" style={{ background: "#2D93A7" }} />
              5 Card Effects
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "#FEBD00" }}>
              <span className="w-3 h-3 rounded-full" style={{ background: "#FEBD00" }} />
              10 Artwork Effects
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-24">
        {experiments.map((exp, i) => (
          <Section key={i} title={exp.title} description={exp.description} category={exp.category}>
            <exp.Component />
          </Section>
        ))}
      </main>
    </div>
  );
}

function Section({ title, description, category, children }: { title: string; description: string; category: string; children: React.ReactNode }) {
  const accentColor = category === "card" ? "#2D93A7" : "#FEBD00";

  return (
    <section className="relative rounded-2xl overflow-hidden"
             style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.08)` }}>
      <div className="px-6 md:px-8 py-5 flex items-center gap-4"
           style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
        <div className="w-1 h-8 rounded-full" style={{ background: accentColor }} />
        <div>
          <h2 className="text-xl font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{title}</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{description}</p>
        </div>
      </div>
      <div className="p-8 md:p-16 flex items-center justify-center min-h-[500px] relative overflow-hidden">
        {children}
      </div>
    </section>
  );
}
