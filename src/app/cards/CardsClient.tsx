"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import Image from "next/image"
import { 
  Search, 
  Coins, 
  Settings as Wrench, 
  Megaphone, 
  DollarSign, 
  RotateCw, 
  Layout, 
  Maximize2,
  X,
  Layers,
  Sparkles,
  HelpCircle,
  Undo
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CardsClientProps {
  initialCards: any[]
  cardTypes: any[]
  assetTypes: any[]
  lang: string
  dict: any
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://omxcrlghlusgapkkrtgd.supabase.co"

export function CardsClient({ initialCards, cardTypes, assetTypes, lang, dict }: CardsClientProps) {
  const [search, setSearch] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedAsset, setSelectedAsset] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("order")
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  const [isGlobalFaceDown, setIsGlobalFaceDown] = useState<boolean>(true)
  const [selectedCardForModal, setSelectedCardForModal] = useState<any | null>(null)

  // Get image URL helper
  const getImageUrl = (path: string | null) => {
    if (!path) return "/placeholder-card.png"
    return `${SUPABASE_URL}/storage/v1/object/public/cards/${path}`
  }

  // Get card back image URL helper
  const getCardBackUrl = (card: any) => {
    const setSlug = card.card_sets?.slug || "base-game"
    const typeSlug = card.card_types?.slug || "standard"
    
    // Configurable mapping of backs based on set and card type
    const backsMap: Record<string, Record<string, string>> = {
      "base-game": {
        "event": "/images/cardbacks/base-game/cardback-event.webp",
        "standard": "/images/cardbacks/base-game/cardback-standard.webp",
        "default": "/images/cardbacks/base-game/cardback-standard.webp",
      }
    }
    
    const setBacks = backsMap[setSlug] || backsMap["base-game"]
    return setBacks[typeSlug] || setBacks["default"]
  }

  // Toggle card flip
  const toggleFlip = (cardId: number, e: React.MouseEvent) => {
    // Prevent flip if clicking on expand button
    if ((e.target as HTMLElement).closest(".expand-btn")) return
    
    setFlippedCards(prev => {
      const current = prev[cardId] !== undefined ? prev[cardId] : !isGlobalFaceDown
      return {
        ...prev,
        [cardId]: !current
      }
    })
  }

  // Handle global flip toggle
  const handleGlobalFlipToggle = () => {
    setIsGlobalFaceDown(prev => !prev)
    setFlippedCards({}) // Reset all individual overrides
  }

  // Reset filters
  const resetFilters = () => {
    setSearch("")
    setSelectedType("all")
    setSelectedAsset("all")
    setSortBy("order")
    setIsGlobalFaceDown(true)
    setFlippedCards({})
  }

  // Filtered and sorted cards
  const filteredCards = useMemo(() => {
    let result = [...initialCards]

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(card => {
        return (
          card.name_ro?.toLowerCase().includes(q) ||
          card.name_en?.toLowerCase().includes(q) ||
          card.special_effect_ro?.toLowerCase().includes(q) ||
          card.special_effect_en?.toLowerCase().includes(q) ||
          card.slug?.toLowerCase().includes(q)
        )
      })
    }

    // Card Type Filter
    if (selectedType !== "all") {
      result = result.filter(card => card.card_types?.slug === selectedType)
    }

    // Asset Type Filter
    if (selectedAsset !== "all") {
      result = result.filter(card => card.asset_types?.slug === selectedAsset)
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "cost-asc") {
        return (a.cost ?? 999) - (b.cost ?? 999)
      }
      if (sortBy === "cost-desc") {
        return (b.cost ?? -999) - (a.cost ?? -999)
      }
      if (sortBy === "name") {
        const nameA = lang === "ro" ? a.name_ro : a.name_en
        const nameB = lang === "ro" ? b.name_ro : b.name_en
        return nameA.localeCompare(nameB)
      }
      // default: sort order
      return (a.sort_order ?? 0) - (b.sort_order ?? 0)
    })

    return result
  }, [initialCards, search, selectedType, selectedAsset, sortBy, lang])

  // Get color schemes for cards depending on their asset/card type
  const getCardHeaderColor = (card: any) => {
    const assetSlug = card.asset_types?.slug
    switch (assetSlug) {
      case "tangible-assets":
        return "border-l-4 border-brand-green"
      case "human-resources":
        return "border-l-4 border-brand-orange"
      case "intangible-assets":
        return "border-l-4 border-brand-blue"
      case "event":
        return "border-l-4 border-brand-yellow"
      default:
        return "border-l-4 border-brand-teal"
    }
  }

  const getAssetBadgeVariant = (slug: string) => {
    switch (slug) {
      case "tangible-assets":
        return "bg-brand-green/20 text-brand-green border-brand-green/30"
      case "human-resources":
        return "bg-brand-orange/20 text-brand-orange border-brand-orange/30"
      case "intangible-assets":
        return "bg-brand-blue/20 text-brand-blue border-brand-blue/30"
      case "event":
        return "bg-brand-yellow/20 text-brand-yellow border-brand-yellow/30"
      default:
        return "bg-brand-teal/20 text-brand-teal border-brand-teal/30"
    }
  }

  return (
    <div className="space-y-8">
      {/* ── Filters Bar ── */}
      <div className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/80 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={dict.cards?.searchPlaceholder || "Search by name or effect..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11 bg-background/50 border-border/60 focus-visible:ring-brand-orange"
          />
          {search && (
            <button 
              onClick={() => setSearch("")} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto items-center justify-end">
          {/* Card Type Select */}
          <Select value={selectedType} onValueChange={(val) => setSelectedType(val || "all")}>
            <SelectTrigger className="w-[160px] h-11 bg-background/50 border border-border/60">
              <SelectValue placeholder={dict.cards?.filterType || "Tip Carte"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dict.cards?.filterAllTypes || "Toate Tipurile"}</SelectItem>
              {cardTypes.map((type) => (
                <SelectItem key={type.id} value={type.slug}>
                  {lang === "ro" ? type.name_ro : type.name_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Asset Type Select */}
          <Select value={selectedAsset} onValueChange={(val) => setSelectedAsset(val || "all")}>
            <SelectTrigger className="w-[170px] h-11 bg-background/50 border border-border/60">
              <SelectValue placeholder={dict.cards?.filterAsset || "Tip Activ"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dict.cards?.filterAllAssets || "Toate Activele"}</SelectItem>
              {assetTypes.map((asset) => (
                <SelectItem key={asset.id} value={asset.slug}>
                  {lang === "ro" ? asset.name_ro : asset.name_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort By Select */}
          <Select value={sortBy} onValueChange={(val) => setSortBy(val || "order")}>
            <SelectTrigger className="w-[160px] h-11 bg-background/50 border border-border/60">
              <SelectValue placeholder="Sortare" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">Implicit (ID)</SelectItem>
              <SelectItem value="name">Nume (A-Z)</SelectItem>
              <SelectItem value="cost-asc">Cost: Mic → Mare</SelectItem>
              <SelectItem value="cost-desc">Cost: Mare → Mic</SelectItem>
            </SelectContent>
          </Select>

          {/* Global View Mode Toggle */}
          <Button
            variant="outline"
            onClick={handleGlobalFlipToggle}
            className="h-11 bg-background/50 border border-border/60 hover:text-brand-orange transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-brand-orange" />
            <span className="text-xs">
              {isGlobalFaceDown ? dict.cards?.viewFaceUp || "Cu fața" : dict.cards?.viewFaceDown || "Cu spatele"}
            </span>
          </Button>

          {(search || selectedType !== "all" || selectedAsset !== "all" || sortBy !== "order" || !isGlobalFaceDown) && (
            <Button variant="ghost" size="icon" onClick={resetFilters} className="h-11 w-11 shrink-0 text-muted-foreground hover:text-foreground" title="Resetează filtrele">
              <Undo className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ── Active Filters Summary ── */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <div>
          Au fost găsite <span className="font-semibold text-foreground">{filteredCards.length}</span> cărți
        </div>
        <div className="hidden sm:block text-xs italic">
          {dict.cards?.tapToFlip || "Apasă pe o carte pentru a o întoarce"}
        </div>
      </div>

      {/* ── Cards Grid ── */}
      {filteredCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-muted-foreground/60" />
          <p className="text-lg text-muted-foreground max-w-md">
            {dict.cards?.empty || "Nu s-au găsit cărți care să corespundă criteriilor."}
          </p>
          <Button variant="outline" onClick={resetFilters}>
            Resetează filtrele
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => {
            const isFlipped = flippedCards[card.id] !== undefined ? flippedCards[card.id] : !isGlobalFaceDown
            const isLandscape = card.format === "landscape"

            return (
              <div
                key={card.id}
                className="group relative cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
                style={{ perspective: "1000px" }}
                onClick={(e) => toggleFlip(card.id, e)}
              >
                {/* 3D Card Container (purely handles rotation/perspective, no background/border to prevent flattening) */}
                <div
                  className={`relative w-full transition-transform duration-500 ease-out ${
                    isLandscape ? "aspect-[4/3]" : "aspect-[3/4]"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* SIDE A: CARD BACK (0deg, displayed by default) */}
                  <div
                    className={`absolute inset-0 w-full h-full flex flex-col justify-between rounded-2xl bg-zinc-950 shadow-[0_8px_16px_rgba(0,0,0,0.4)] overflow-hidden ${
                      isFlipped ? "pointer-events-none" : "pointer-events-auto"
                    }`}
                    style={{ 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={getCardBackUrl(card)}
                        alt="Card Back"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                        priority={card.sort_order < 110}
                      />
                      
                      {/* Premium Semi-transparent Banner showing card ID and name */}
                      <div className="absolute bottom-0 inset-x-0 p-3 bg-zinc-950/75 backdrop-blur-sm border-t border-white/10 text-center flex flex-col justify-center items-center">
                        <span className="text-[10px] font-mono tracking-wider text-brand-orange uppercase font-semibold">
                          {card.slug}
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                          {lang === "ro" ? card.name_ro : card.name_en}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* SIDE B: CARD FRONT (180deg, artwork or detailed stats) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-2xl bg-zinc-950 shadow-[0_8px_16px_rgba(0,0,0,0.4)] overflow-hidden ${
                      isFlipped ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {/* Artwork View */}
                    <div className="relative w-full h-full">
                      <Image
                        src={getImageUrl(card.image_card)}
                        alt={lang === "ro" ? card.name_ro : card.name_en}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                      />
                      
                      {/* Interactive Expand button (Bottom Right) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCardForModal(card)
                        }}
                        className="expand-btn absolute bottom-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all scale-100 md:scale-90 md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-100 shadow-md z-10"
                        title={dict.cards?.details || "Mărește"}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── LIGHTBOX / DETAILS MODAL ── */}
      {selectedCardForModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCardForModal(null)}
        >
          <div 
            className="bg-zinc-950 border border-zinc-800 text-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedCardForModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left side: Large Card Image */}
            <div className="w-full md:w-1/2 bg-zinc-900 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-zinc-800">
              <div className={`relative w-full max-w-[320px] aspect-[3/4] shadow-2xl rounded-2xl overflow-hidden border border-zinc-700/50`}>
                <Image
                  src={getImageUrl(selectedCardForModal.image_card)}
                  alt={lang === "ro" ? selectedCardForModal.name_ro : selectedCardForModal.name_en}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right side: Detailed Information */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider px-2 py-0.5">
                    {selectedCardForModal.slug}
                  </Badge>
                  <Badge className="bg-zinc-900 border-zinc-800 text-zinc-300 border px-2 py-0.5 text-[10px]">
                    {lang === "ro" ? selectedCardForModal.card_types?.name_ro : selectedCardForModal.card_types?.name_en}
                  </Badge>
                  {selectedCardForModal.asset_types && (
                    <Badge className={`text-[10px] font-semibold border px-2 py-0.5 ${getAssetBadgeVariant(selectedCardForModal.asset_types.slug)}`}>
                      {lang === "ro" ? selectedCardForModal.asset_types.name_ro : selectedCardForModal.asset_types.name_en}
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {lang === "ro" ? selectedCardForModal.name_ro : selectedCardForModal.name_en}
                  </h2>
                  {lang === "ro" && selectedCardForModal.name_en && (
                    <p className="text-sm text-zinc-400 italic">
                      English: {selectedCardForModal.name_en}
                    </p>
                  )}
                </div>

                {/* Stats Table */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {selectedCardForModal.cost !== null && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-850">
                      <Coins className="w-5 h-5 text-brand-yellow shrink-0" />
                      <div>
                        <div className="text-xs text-zinc-500 font-medium">{dict.cards?.cost || "Cost"}</div>
                        <div className="font-bold text-white text-base">{selectedCardForModal.cost}</div>
                      </div>
                    </div>
                  )}

                  {selectedCardForModal.production !== null && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-850">
                      <Wrench className="w-5 h-5 text-brand-green shrink-0" />
                      <div>
                        <div className="text-xs text-zinc-500 font-medium">{dict.cards?.production || "Producție"}</div>
                        <div className="font-bold text-white text-base">+{selectedCardForModal.production}</div>
                      </div>
                    </div>
                  )}

                  {selectedCardForModal.marketing !== null && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-850">
                      <Megaphone className="w-5 h-5 text-brand-orange shrink-0" />
                      <div>
                        <div className="text-xs text-zinc-500 font-medium">{dict.cards?.marketing || "Marketing"}</div>
                        <div className="font-bold text-white text-base">+{selectedCardForModal.marketing}</div>
                      </div>
                    </div>
                  )}

                  {selectedCardForModal.expense !== null && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-850">
                      <DollarSign className="w-5 h-5 text-brand-teal shrink-0" />
                      <div>
                        <div className="text-xs text-zinc-500 font-medium">{dict.cards?.expense || "Cheltuială"}</div>
                        <div className="font-bold text-white text-base">{selectedCardForModal.expense}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Effect detail */}
                <div className="bg-zinc-900/80 border border-zinc-850 rounded-2xl p-5 space-y-2 mt-4">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                    {dict.cards?.specialEffect || "Efect Special"}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {lang === "ro" ? selectedCardForModal.special_effect_ro : selectedCardForModal.special_effect_en}
                  </p>
                  {lang === "ro" && selectedCardForModal.special_effect_en && selectedCardForModal.special_effect_en !== selectedCardForModal.special_effect_ro && (
                    <div className="border-t border-zinc-800/80 pt-2.5 mt-2.5">
                      <div className="text-[10px] text-zinc-500 font-semibold mb-1">Translation:</div>
                      <p className="text-xs leading-relaxed text-zinc-400 italic">
                        {selectedCardForModal.special_effect_en}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Game Metadata details */}
              <div className="border-t border-zinc-800/80 pt-4 flex flex-wrap justify-between text-xs text-zinc-500">
                <div className="flex gap-4">
                  {selectedCardForModal.card_sets && (
                    <span>
                      {dict.cards?.set || "Set"}: <strong className="text-zinc-300">{lang === "ro" ? selectedCardForModal.card_sets.name_ro : selectedCardForModal.card_sets.name_en}</strong>
                    </span>
                  )}
                  {selectedCardForModal.calculation && (
                    <span>
                      {dict.cards?.calculation || "Calcul"}: <strong className="text-zinc-300 capitalize">{selectedCardForModal.calculation === "additive" ? "Aditiv" : "La alegere"}</strong>
                    </span>
                  )}
                </div>
                <span>
                  {dict.cards?.format || "Format"}: <strong className="text-zinc-300 capitalize">{selectedCardForModal.format}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
