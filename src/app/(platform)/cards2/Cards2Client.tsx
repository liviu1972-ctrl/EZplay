"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import Image from "next/image"
import {
  Factory,
  Users,
  Lightbulb,
  Zap,
  Crown,
  ChevronLeft,
  ChevronRight,
  X,
  Coins,
  Settings as Wrench,
  Megaphone,
  DollarSign,
  Sparkles,
  Shuffle,
  Layers,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Cards2ClientProps {
  initialCards: any[]
  cardTypes: any[]
  assetTypes: any[]
  lang: string
  dict: any
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://omxcrlghlusgapkkrtgd.supabase.co"

// Stack category configuration
const STACK_CONFIG: Record<string, {
  icon: React.ElementType
  color: string
  bgGradient: string
  borderColor: string
  glowColor: string
  cardBack: string
}> = {
  "tangible-assets": {
    icon: Factory,
    color: "text-emerald-400",
    bgGradient: "from-emerald-950/80 to-emerald-900/40",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-standard.webp",
  },
  "human-resources": {
    icon: Users,
    color: "text-orange-400",
    bgGradient: "from-orange-950/80 to-orange-900/40",
    borderColor: "border-orange-500/30",
    glowColor: "shadow-orange-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-standard.webp",
  },
  "intangible-assets": {
    icon: Lightbulb,
    color: "text-blue-400",
    bgGradient: "from-blue-950/80 to-blue-900/40",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-standard.webp",
  },
  "event": {
    icon: Zap,
    color: "text-yellow-400",
    bgGradient: "from-yellow-950/80 to-yellow-900/40",
    borderColor: "border-yellow-500/30",
    glowColor: "shadow-yellow-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-event.webp",
  },
  "entrepreneur": {
    icon: Crown,
    color: "text-teal-400",
    bgGradient: "from-teal-950/80 to-teal-900/40",
    borderColor: "border-teal-500/30",
    glowColor: "shadow-teal-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-standard.webp",
  },
}

// Stable ordering for stacks
const STACK_ORDER = ["tangible-assets", "human-resources", "intangible-assets", "event", "entrepreneur"]

export function Cards2Client({ initialCards, cardTypes, assetTypes, lang, dict }: Cards2ClientProps) {
  // Active stack slug (null = no stack selected)
  const [activeStack, setActiveStack] = useState<string | null>(null)
  // Per-stack card index tracking (persists across close/reopen)
  const [stackIndices, setStackIndices] = useState<Record<string, number>>({})
  // Flip state for the revealed card
  const [isFlipped, setIsFlipped] = useState(false)
  // Shuffle animation trigger
  const [shufflingStack, setShufflingStack] = useState<string | null>(null)
  // Shuffled card orders (overrides base grouping when shuffled)
  const [shuffledStacks, setShuffledStacks] = useState<Record<string, any[]>>({})

  // Get image URL helper
  const getImageUrl = (path: string | null) => {
    if (!path) return "/placeholder-card.png"
    return `${SUPABASE_URL}/storage/v1/object/public/cards/${path}`
  }

  // Group cards by asset_types.slug (base ordering)
  const baseStacks = useMemo(() => {
    const grouped: Record<string, any[]> = {}
    for (const slug of STACK_ORDER) {
      grouped[slug] = []
    }
    for (const card of initialCards) {
      const slug = card.asset_types?.slug
      if (slug && grouped[slug]) {
        grouped[slug].push(card)
      }
    }
    return grouped
  }, [initialCards])

  // Effective stacks: use shuffled version if available, otherwise base
  const stacks = useMemo(() => {
    const result: Record<string, any[]> = {}
    for (const slug of STACK_ORDER) {
      result[slug] = shuffledStacks[slug] || baseStacks[slug] || []
    }
    return result
  }, [baseStacks, shuffledStacks])

  // Get stack display name
  const getStackName = useCallback((slug: string) => {
    const asset = assetTypes.find((a: any) => a.slug === slug)
    if (!asset) return slug
    return lang === "ro" ? asset.name_ro : asset.name_en
  }, [assetTypes, lang])

  // Handle stack click — always advances to next card
  const handleStackClick = useCallback((slug: string) => {
    if (stacks[slug].length === 0) return
    const currentIdx = stackIndices[slug] ?? -1
    const maxIdx = stacks[slug].length - 1
    const nextIdx = currentIdx >= maxIdx ? 0 : currentIdx + 1
    setStackIndices(prev => ({ ...prev, [slug]: nextIdx }))
    setActiveStack(slug)
    setIsFlipped(false)
  }, [stacks, stackIndices])

  // Navigate within the active stack
  const handlePrev = useCallback(() => {
    if (!activeStack) return
    setIsFlipped(false)
    setStackIndices(prev => ({
      ...prev,
      [activeStack]: Math.max(0, (prev[activeStack] ?? 0) - 1)
    }))
  }, [activeStack])

  const handleNext = useCallback(() => {
    if (!activeStack) return
    const maxIdx = stacks[activeStack].length - 1
    setIsFlipped(false)
    setStackIndices(prev => ({
      ...prev,
      [activeStack]: Math.min(maxIdx, (prev[activeStack] ?? 0) + 1)
    }))
  }, [activeStack, stacks])

  // Close reveal zone (index persists for next click)
  const handleCloseReveal = useCallback(() => {
    setActiveStack(null)
    setIsFlipped(false)
  }, [])

  // Shuffle — Fisher-Yates shuffle that actually reorders the cards
  const handleShuffle = useCallback((slug: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const arr = [...(baseStacks[slug] || [])]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setShuffledStacks(prev => ({ ...prev, [slug]: arr }))
    setStackIndices(prev => ({ ...prev, [slug]: -1 })) // reset so next click shows first shuffled card
    setShufflingStack(slug)
    setTimeout(() => setShufflingStack(null), 600)
  }, [baseStacks])

  // Currently revealed card (derived from per-stack index)
  const revealedIndex = activeStack ? (stackIndices[activeStack] ?? 0) : 0
  const revealedCard = activeStack ? stacks[activeStack]?.[revealedIndex] : null
  const totalInStack = activeStack ? stacks[activeStack]?.length : 0

  return (
    <div className="space-y-10">
      {/* ── CARD STACKS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {STACK_ORDER.map((slug) => {
          const config = STACK_CONFIG[slug]
          const Icon = config.icon
          const cards = stacks[slug]
          const count = cards.length
          const isActive = activeStack === slug
          const isShuffling = shufflingStack === slug

          return (
            <div
              key={slug}
              className="flex flex-col items-center gap-3"
            >
              {/* Stack visual wrapper — relative container for button + overlay controls */}
              <div className="relative w-full max-w-[200px] mx-auto">
                {/* Main clickable stack button */}
                <button
                  onClick={() => handleStackClick(slug)}
                  disabled={count === 0}
                  className={`
                    relative w-full aspect-[3/4]
                    rounded-2xl cursor-pointer transition-all duration-300
                    ${isActive ? `ring-2 ring-offset-2 ring-offset-background ${config.borderColor.replace('border-', 'ring-')} scale-[0.97]` : "hover:scale-[1.03]"}
                    ${count === 0 ? "opacity-30 cursor-not-allowed" : ""}
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange
                  `}
                  style={{ perspective: "600px" }}
                >
                  {/* Stacked card layers (bottom to top) */}
                  {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                    <div
                      key={i}
                      className={`
                        absolute inset-0 rounded-2xl overflow-hidden
                        shadow-[0_4px_12px_rgba(0,0,0,0.5)]
                        transition-transform duration-300
                        ${isShuffling ? "animate-shuffle" : ""}
                      `}
                      style={{
                        transform: `translateY(${-i * 3}px) translateX(${i * 1}px) rotate(${(i - 2) * 0.8}deg)`,
                        zIndex: i,
                      }}
                    >
                      <Image
                        src={config.cardBack}
                        alt="Card back"
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </button>

                {/* Count badge — outside main button, positioned over it */}
                <div className={`
                  pointer-events-none
                  absolute -top-2 -right-2 z-20
                  w-8 h-8 rounded-full flex items-center justify-center
                  bg-zinc-900 border-2 ${config.borderColor}
                  text-xs font-bold ${config.color}
                  shadow-lg ${config.glowColor}
                `}>
                  {count}
                </div>

                {/* Shuffle button — outside main button, positioned over it */}
                {count > 1 && (
                  <button
                    onClick={(e) => handleShuffle(slug, e)}
                    className={`
                      absolute -bottom-1 -left-1 z-20
                      w-7 h-7 rounded-full flex items-center justify-center
                      bg-zinc-900/90 border border-zinc-700/60
                      text-zinc-400 hover:text-white hover:bg-zinc-800
                      transition-all shadow-md
                    `}
                    title={dict.cards2?.shuffle || "Amestecă"}
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Stack label */}
              <div className="text-center space-y-1">
                <div className={`flex items-center justify-center gap-1.5 ${config.color}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{getStackName(slug)}</span>
                </div>
                <span className="text-[11px] text-zinc-500">
                  {count} {count === 1
                    ? (dict.cards2?.cardSingular || "carte")
                    : (dict.cards2?.cardPlural || "cărți")}
                </span>
              </div>
            </div>

          )
        })}
      </div>

      {/* ── REVEAL ZONE ── */}
      {activeStack && revealedCard && (
        <div className="relative bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 backdrop-blur-md border border-zinc-800/60 rounded-3xl p-6 md:p-10 shadow-2xl animate-fade-in">
          {/* Close button */}
          <button
            onClick={handleCloseReveal}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Stack navigation header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={revealedIndex === 0}
              className="h-9 w-9 rounded-full bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="text-center">
              <div className={`flex items-center gap-2 ${STACK_CONFIG[activeStack].color}`}>
                {React.createElement(STACK_CONFIG[activeStack].icon, { className: "w-5 h-5" })}
                <span className="font-bold text-lg">{getStackName(activeStack)}</span>
              </div>
              <span className="text-xs text-zinc-500">
                {revealedIndex + 1} / {totalInStack}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={revealedIndex === totalInStack - 1}
              className="h-9 w-9 rounded-full bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Card + Details */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
            {/* Card Image with flip */}
            <div
              className="w-full max-w-[280px] md:max-w-[300px] cursor-pointer shrink-0"
              style={{ perspective: "1000px" }}
              onClick={() => setIsFlipped(f => !f)}
            >
              <div
                className={`relative w-full ${revealedCard.format === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"} transition-transform duration-500 ease-out`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front (card artwork) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl bg-zinc-950 shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={getImageUrl(revealedCard.image_card)}
                    alt={lang === "ro" ? revealedCard.name_ro : revealedCard.name_en}
                    fill
                    sizes="300px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Back (card back image) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl bg-zinc-950 shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src={STACK_CONFIG[activeStack]?.cardBack || "/images/cardbacks/base-game/cardback-standard.webp"}
                    alt="Card Back"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-zinc-950/75 backdrop-blur-sm border-t border-white/10 text-center">
                    <span className="text-[10px] font-mono tracking-wider text-brand-orange uppercase font-semibold">
                      {revealedCard.slug}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                      {lang === "ro" ? revealedCard.name_ro : revealedCard.name_en}
                    </h4>
                  </div>
                </div>
              </div>

              <p className="text-center text-[11px] text-zinc-500 mt-3 italic">
                {dict.cards2?.clickToFlip || "Click pe carte pentru a o întoarce"}
              </p>
            </div>

            {/* Card Details Panel */}
            <div className="flex-1 max-w-lg space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider px-2 py-0.5">
                  {revealedCard.slug}
                </Badge>
                <Badge className="bg-zinc-900 border-zinc-800 text-zinc-300 border px-2 py-0.5 text-[10px]">
                  {lang === "ro" ? revealedCard.card_types?.name_ro : revealedCard.card_types?.name_en}
                </Badge>
                {revealedCard.asset_types && (
                  <Badge className={`text-[10px] font-semibold border px-2 py-0.5 ${getAssetBadgeVariant(revealedCard.asset_types.slug)}`}>
                    {lang === "ro" ? revealedCard.asset_types.name_ro : revealedCard.asset_types.name_en}
                  </Badge>
                )}
              </div>

              {/* Card Name */}
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {lang === "ro" ? revealedCard.name_ro : revealedCard.name_en}
                </h2>
                {lang === "ro" && revealedCard.name_en && (
                  <p className="text-sm text-zinc-400 italic">
                    English: {revealedCard.name_en}
                  </p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {revealedCard.cost !== null && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800/60">
                    <Coins className="w-5 h-5 text-brand-yellow shrink-0" />
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">{dict.cards?.cost || "Cost"}</div>
                      <div className="font-bold text-white text-base">{revealedCard.cost}</div>
                    </div>
                  </div>
                )}
                {revealedCard.production !== null && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800/60">
                    <Wrench className="w-5 h-5 text-brand-green shrink-0" />
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">{dict.cards?.production || "Producție"}</div>
                      <div className="font-bold text-white text-base">+{revealedCard.production}</div>
                    </div>
                  </div>
                )}
                {revealedCard.marketing !== null && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800/60">
                    <Megaphone className="w-5 h-5 text-brand-orange shrink-0" />
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">{dict.cards?.marketing || "Marketing"}</div>
                      <div className="font-bold text-white text-base">+{revealedCard.marketing}</div>
                    </div>
                  </div>
                )}
                {revealedCard.expense !== null && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800/60">
                    <DollarSign className="w-5 h-5 text-brand-teal shrink-0" />
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">{dict.cards?.expense || "Cheltuială"}</div>
                      <div className="font-bold text-white text-base">{revealedCard.expense}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Special Effect */}
              <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-5 space-y-2">
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-orange" />
                  {dict.cards?.specialEffect || "Efect Special"}
                </div>
                <p className="text-sm leading-relaxed text-zinc-200">
                  {lang === "ro" ? revealedCard.special_effect_ro : revealedCard.special_effect_en}
                </p>
                {lang === "ro" && revealedCard.special_effect_en && revealedCard.special_effect_en !== revealedCard.special_effect_ro && (
                  <div className="border-t border-zinc-800/80 pt-2.5 mt-2.5">
                    <div className="text-[10px] text-zinc-500 font-semibold mb-1">Translation:</div>
                    <p className="text-xs leading-relaxed text-zinc-400 italic">
                      {revealedCard.special_effect_en}
                    </p>
                  </div>
                )}
              </div>

              {/* Metadata footer */}
              <div className="border-t border-zinc-800/60 pt-4 flex flex-wrap justify-between text-xs text-zinc-500">
                <div className="flex gap-4">
                  {revealedCard.card_sets && (
                    <span>
                      {dict.cards?.set || "Set"}: <strong className="text-zinc-300">{lang === "ro" ? revealedCard.card_sets.name_ro : revealedCard.card_sets.name_en}</strong>
                    </span>
                  )}
                  {revealedCard.calculation && (
                    <span>
                      {dict.cards?.calculation || "Calcul"}: <strong className="text-zinc-300 capitalize">{revealedCard.calculation === "additive" ? (dict.cards?.calcAdditive || "Aditiv") : (dict.cards?.calcChoice || "La alegere")}</strong>
                    </span>
                  )}
                </div>
                <span>
                  {dict.cards?.format || "Format"}: <strong className="text-zinc-300 capitalize">{revealedCard.format}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── GRID ZONE (COMBINED FROM CARDS 1) ── */}
      {activeStack && stacks[activeStack] && (
        <div className="mt-12 space-y-4 animate-fade-in border-t border-zinc-800/50 pt-10">
          <div className="flex flex-col gap-1 mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {dict.cards2?.allCards || "Toate Cărțile din Set"} ({stacks[activeStack].length})
            </h3>
            <p className="text-sm text-zinc-400">
              {dict.cards2?.clickToReveal || "Apasă pe o carte pentru a o vizualiza detaliat mai sus."}
            </p>
          </div>
          
          <div className={`grid grid-cols-2 sm:grid-cols-3 ${stacks[activeStack][0]?.format === 'landscape' ? 'md:grid-cols-4' : 'lg:grid-cols-5'} gap-4 md:gap-6`}>
            {stacks[activeStack].map((card: any, index: number) => {
              const isLandscape = card.format === "landscape";
              const isSelected = index === revealedIndex;
              
              return (
                <div
                  key={card.id || index}
                  className={`relative cursor-pointer transition-all duration-300 rounded-2xl ${
                    isSelected 
                      ? 'ring-2 ring-brand-orange ring-offset-4 ring-offset-zinc-950 scale-105 z-10' 
                      : 'hover:scale-[1.03] opacity-60 hover:opacity-100 hover:z-10'
                  }`}
                  onClick={() => {
                    setStackIndices(prev => ({ ...prev, [activeStack]: index }));
                    setIsFlipped(false);
                    // Smooth scroll back to reveal area
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                >
                  <div className={`relative w-full ${isLandscape ? "aspect-[4/3]" : "aspect-[3/4]"} rounded-2xl overflow-hidden shadow-xl border ${isSelected ? 'border-brand-orange/50' : 'border-zinc-800'}`}>
                    <Image
                      src={getImageUrl(card.image_card)}
                      alt={lang === "ro" ? card.name_ro : card.name_en}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-2.5 bg-zinc-950/85 backdrop-blur-sm border-t border-white/10 text-center flex flex-col items-center justify-center">
                      <span className="text-[9px] font-mono tracking-wider text-brand-orange uppercase font-semibold mb-0.5">
                        {card.slug}
                      </span>
                      <h4 className="text-[11px] font-bold text-white line-clamp-1 leading-tight">
                        {lang === "ro" ? card.name_ro : card.name_en}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes shuffle {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-3deg); }
          50% { transform: translateY(5px) rotate(2deg); }
          75% { transform: translateY(-5px) rotate(-1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-shuffle {
          animation: shuffle 0.5s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

// Helper for asset badge color variants
function getAssetBadgeVariant(slug: string): string {
  switch (slug) {
    case "tangible-assets":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "human-resources":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "intangible-assets":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "event":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "entrepreneur":
      return "bg-teal-500/20 text-teal-400 border-teal-500/30"
    default:
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
  }
}
