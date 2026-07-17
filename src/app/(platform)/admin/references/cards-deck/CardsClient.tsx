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

interface CardsClientProps {
  initialCards: any[]
  cardTypes: any[]
  assetTypes: any[]
  lang: string
  dict: any
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://omxcrlghlusgapkkrtgd.supabase.co"

// Stack category configuration — single source of truth for colors, icons and card backs
const STACK_CONFIG: Record<string, {
  icon: React.ElementType
  color: string
  bgGradient: string
  borderColor: string
  glowColor: string
  cardBack: string
  badgeVariant: string
}> = {
  "tangible-assets": {
    icon: Factory,
    color: "text-emerald-400",
    bgGradient: "from-emerald-950/80 to-emerald-900/40",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-standard.webp",
    badgeVariant: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  "human-resources": {
    icon: Users,
    color: "text-orange-400",
    bgGradient: "from-orange-950/80 to-orange-900/40",
    borderColor: "border-orange-500/30",
    glowColor: "shadow-orange-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-standard.webp",
    badgeVariant: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  "intangible-assets": {
    icon: Lightbulb,
    color: "text-blue-400",
    bgGradient: "from-blue-950/80 to-blue-900/40",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-standard.webp",
    badgeVariant: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  "event": {
    icon: Zap,
    color: "text-yellow-400",
    bgGradient: "from-yellow-950/80 to-yellow-900/40",
    borderColor: "border-yellow-500/30",
    glowColor: "shadow-yellow-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-event.webp",
    badgeVariant: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  "entrepreneur": {
    icon: Crown,
    color: "text-teal-400",
    bgGradient: "from-teal-950/80 to-teal-900/40",
    borderColor: "border-teal-500/30",
    glowColor: "shadow-teal-500/20",
    cardBack: "/images/cardbacks/base-game/cardback-standard.webp",
    badgeVariant: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  },
}

// Stable ordering for stacks
const STACK_ORDER = ["tangible-assets", "human-resources", "intangible-assets", "event", "entrepreneur"]

export function CardsClient({ initialCards, cardTypes, assetTypes, lang, dict }: CardsClientProps) {
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

  // Build a public Supabase Storage URL for a card image path
  const getImageUrl = useCallback((path: string | null) => {
    if (!path) return "/placeholder-card.png"
    return `${SUPABASE_URL}/storage/v1/object/public/cards/${path}`
  }, [])

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

  const renderStack = useCallback((slug: string) => {
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
        <div className={`relative w-full mx-auto ${slug === "entrepreneur" ? "max-w-[220px]" : "max-w-[150px]"}`}>
          {/* Main clickable stack button */}
          <button
            onClick={() => handleStackClick(slug)}
            disabled={count === 0}
            className={`
              relative w-full ${slug === "entrepreneur" ? "aspect-[220/150]" : "aspect-[3/4]"}
              rounded-2xl cursor-pointer transition-all duration-300
              ${isActive ? `ring-2 ring-offset-2 ring-offset-background ${config.borderColor.replace('border-', 'ring-')} scale-[0.97]` : "hover:scale-[1.03]"}
              ${count === 0 ? "opacity-30 cursor-not-allowed" : ""}
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange
            `}
            style={{ perspective: "600px" }}
          >
            {/* Stacked card layers (bottom to top) */}
            {Array.from({ length: Math.min(count, 5) }).map((_, i) => {
              const isTopCard = i === Math.min(count, 5) - 1;
              const showFace = isActive && isTopCard && revealedCard;
              const imgSrc = showFace ? getImageUrl(revealedCard.image_card) : config.cardBack;

              return (
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
                    src={imgSrc}
                    alt={showFace ? "Card face" : "Card back"}
                    fill
                    sizes="200px"
                    className={slug === "entrepreneur" ? "object-fill" : "object-cover"}
                  />
                </div>
              );
            })}
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
              : (dict.cards2?.cardPlural || "Cărți")}
          </span>
        </div>
      </div>
    )
  }, [stacks, activeStack, shufflingStack, revealedCard, handleStackClick, handleShuffle, getImageUrl, getStackName, dict])

  return (
    <div className="space-y-10">
      {/* ΓöÇΓöÇ CARD STACKS ΓöÇΓöÇ */}
      <div className="space-y-10 md:space-y-14">
        {/* Row 1: Portrait stacks (4 decks) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {STACK_ORDER.filter(slug => slug !== "entrepreneur").map(renderStack)}
        </div>

        {/* Row 2: Landscape cards (Entrepreneur) — centered, natural width */}
        <div className="flex justify-center items-center w-full">
          <div className="w-[220px]">
            {STACK_ORDER.filter(slug => slug === "entrepreneur").map(renderStack)}
          </div>
        </div>
      </div>

      {/* ΓöÇΓöÇ REVEAL ZONE ΓöÇΓöÇ */}
      {activeStack && revealedCard && (
        <div id="reveal-zone" className="relative bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 backdrop-blur-md border border-zinc-800/60 rounded-3xl p-6 md:p-10 shadow-2xl animate-card-fade-in">
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
              className={`w-full cursor-pointer shrink-0 ${
                revealedCard.format === "landscape"
                  ? "max-w-[320px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[450px]"
                  : "max-w-[280px] md:max-w-[320px] lg:max-w-[360px]"
              }`}
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
                    className={revealedCard.format === "landscape" ? "object-fill" : "object-cover"}
                    priority
                  />
                  
                  {/* DEBUG ZONES FOR POSITIONING */}
                  {!isFlipped && (
                    <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
                      {revealedCard.format === "portrait" ? (
                        <>
                          {revealedCard.cost !== null && (
                            <div className="absolute w-12 h-12 rounded-full group flex items-center justify-center cursor-help pointer-events-auto" style={{ top: '4%', left: '6%' }}>
                              <div className="absolute top-full mt-2 w-max px-3 py-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-xl text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 z-50">
                                <Coins className="w-4 h-4 text-brand-yellow" />
                                <span className="text-xs font-bold">{dict.cards?.cost || "Cost"}: {revealedCard.cost}</span>
                              </div>
                            </div>
                          )}
                          {revealedCard.production !== null && (
                            <div className="absolute w-12 h-12 rounded-full group flex items-center justify-center cursor-help pointer-events-auto" style={{ top: '58%', left: '6%' }}>
                              <div className="absolute bottom-full mb-2 w-max px-3 py-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-xl text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 z-50">
                                <Wrench className="w-4 h-4 text-brand-green" />
                                <span className="text-xs font-bold">{dict.cards?.production || "Producție"}: +{revealedCard.production}</span>
                              </div>
                            </div>
                          )}
                          {revealedCard.marketing !== null && (
                            <div className="absolute w-12 h-12 rounded-full group flex items-center justify-center cursor-help pointer-events-auto" style={{ top: '58%', left: revealedCard.production !== null ? '28%' : '6%' }}>
                              <div className="absolute bottom-full mb-2 w-max px-3 py-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-xl text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 z-50">
                                <Megaphone className="w-4 h-4 text-brand-orange" />
                                <span className="text-xs font-bold">{dict.cards?.marketing || "Marketing"}: +{revealedCard.marketing}</span>
                              </div>
                            </div>
                          )}
                          {revealedCard.expense !== null && (
                            <div className="absolute w-12 h-12 rounded-full group flex items-center justify-center cursor-help pointer-events-auto" style={{ top: '58%', right: '6%' }}>
                              <div className="absolute bottom-full mb-2 w-max px-3 py-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-xl text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 z-50">
                                <DollarSign className="w-4 h-4 text-brand-teal" />
                                <span className="text-xs font-bold">{dict.cards?.expense || "Cheltuială"}: {revealedCard.expense}</span>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {/* La antreprenor (landscape) afișăm mereu Producție, MKT și Cheltuială */}
                          <div className="absolute w-12 h-12 rounded-full group flex items-center justify-center cursor-help pointer-events-auto" style={{ bottom: '8%', left: '5%' }}>
                            <div className="absolute bottom-full mb-2 w-max px-3 py-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-xl text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 z-50">
                              <Wrench className="w-4 h-4 text-brand-green" />
                              <span className="text-xs font-bold">{dict.cards?.production || "Producție"}: +{revealedCard.production ?? 0}</span>
                            </div>
                          </div>
                          
                          <div className="absolute w-12 h-12 rounded-full group flex items-center justify-center cursor-help pointer-events-auto" style={{ bottom: '8%', left: '16%' }}>
                            <div className="absolute bottom-full mb-2 w-max px-3 py-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-xl text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 z-50">
                              <Megaphone className="w-4 h-4 text-brand-orange" />
                              <span className="text-xs font-bold">{dict.cards?.marketing || "Marketing"}: +{revealedCard.marketing ?? 0}</span>
                            </div>
                          </div>

                          <div className="absolute w-12 h-12 rounded-full group flex items-center justify-center cursor-help pointer-events-auto" style={{ bottom: '8%', left: '48%' }}>
                            <div className="absolute bottom-full mb-2 w-max px-3 py-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-xl text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 z-50">
                              <DollarSign className="w-4 h-4 text-brand-teal" />
                              <span className="text-xs font-bold">{dict.cards?.expense || "Cheltuială"}: {revealedCard.expense ?? 0}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
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
                    className={revealedCard.format === "landscape" ? "object-fill" : "object-cover"}
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
                  <Badge className={`text-[10px] font-semibold border px-2 py-0.5 ${STACK_CONFIG[revealedCard.asset_types.slug]?.badgeVariant ?? "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"}`}>
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
                {(revealedCard.production !== null || revealedCard.format === "landscape") && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800/60">
                    <Wrench className="w-5 h-5 text-brand-green shrink-0" />
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">{dict.cards?.production || "Producție"}</div>
                      <div className="font-bold text-white text-base">+{revealedCard.production ?? 0}</div>
                    </div>
                  </div>
                )}
                {(revealedCard.marketing !== null || revealedCard.format === "landscape") && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800/60">
                    <Megaphone className="w-5 h-5 text-brand-orange shrink-0" />
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">{dict.cards?.marketing || "Marketing"}</div>
                      <div className="font-bold text-white text-base">+{revealedCard.marketing ?? 0}</div>
                    </div>
                  </div>
                )}
                {(revealedCard.expense !== null || revealedCard.format === "landscape") && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800/60">
                    <DollarSign className="w-5 h-5 text-brand-teal shrink-0" />
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">{dict.cards?.expense || "Cheltuială"}</div>
                      <div className="font-bold text-white text-base">{revealedCard.expense ?? 0}</div>
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

      {/* ΓöÇΓöÇ GRID ZONE: all cards in the active stack ΓöÇΓöÇ */}
      {activeStack && stacks[activeStack] && (
        <div className="mt-12 space-y-4 animate-card-fade-in border-t border-zinc-800/50 pt-10">
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
                  className={`group relative cursor-pointer transition-all duration-300 rounded-2xl ${
                    isSelected 
                      ? 'opacity-100 scale-105 z-10 shadow-2xl' 
                      : 'opacity-40 hover:opacity-100 hover:scale-[1.03] hover:z-10'
                  }`}
                  onClick={() => {
                    setStackIndices(prev => ({ ...prev, [activeStack]: index }));
                    setIsFlipped(false);
                    // Smooth scroll back to reveal area, centered
                    document.getElementById('reveal-zone')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  <div className={`relative w-full ${isLandscape ? "aspect-[4/3]" : "aspect-[3/4]"} rounded-2xl overflow-hidden shadow-xl`}>
                    <Image
                      src={getImageUrl(card.image_card)}
                      alt={lang === "ro" ? card.name_ro : card.name_en}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className={isLandscape ? "object-fill" : "object-cover"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  )
}

