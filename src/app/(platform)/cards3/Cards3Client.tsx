"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import {
  Settings, HelpCircle, RotateCcw, ChevronRight, X, Check,
  ShoppingCart, Trash2, SkipForward, Trophy, AlertTriangle,
  BookOpen, ChevronDown, ChevronUp, Crown, Layers, FlipHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  useGameEngine,
  DEFAULT_STARTING_SLUGS,
  type GameCard,
  type GameSettings,
} from "./useGameEngine"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://omxcrlghlusgapkkrtgd.supabase.co"

function getImageUrl(path: string | null | undefined) {
  if (!path) return null
  return `${SUPABASE_URL}/storage/v1/object/public/cards/${path}`
}

function getCardBack(card: GameCard) {
  if (card.card_types?.slug === "event") return "/images/cardbacks/base-game/cardback-event.webp"
  return "/images/cardbacks/base-game/cardback-standard.webp"
}

interface Props { allCards: GameCard[]; lang: string; dict: any }

// ── Stat Icon ──────────────────────────────────────────────────────────────
function StatIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  return (
    <Image src={`/images/game-icons/${name}.webp`} alt={name} width={24} height={24}
      className={className} style={{ objectFit: "contain" }} />
  )
}

// ── Small Card ─────────────────────────────────────────────────────────────
function MiniCard({
  card, onClick, selected = false, faceDown = false, dimmed = false, badge
}: {
  card: GameCard; onClick?: () => void; selected?: boolean;
  faceDown?: boolean; dimmed?: boolean; badge?: React.ReactNode
}) {
  const img = faceDown ? getCardBack(card) : (getImageUrl(card.image_card) || getCardBack(card))
  const isLandscape = card.format === "landscape"
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-xl overflow-hidden cursor-pointer select-none
        transition-all duration-200 shrink-0
        ${isLandscape ? "aspect-[4/3]" : "aspect-[3/4]"}
        ${selected ? "ring-2 ring-brand-orange scale-105 shadow-[0_0_14px_rgba(255,120,0,0.5)]" : "hover:scale-[1.04]"}
        ${dimmed ? "opacity-40 pointer-events-none" : ""}
        ${onClick ? "cursor-pointer" : "cursor-default"}
      `}
    >
      <Image src={img} alt={card.name_ro} fill sizes="120px" className="object-cover" />
      {badge && <div className="absolute top-1 right-1 z-10">{badge}</div>}
    </div>
  )
}

// ── Card Tooltip / Detail Panel ────────────────────────────────────────────
function CardDetail({ card, lang, onClose }: { card: GameCard; lang: string; onClose: () => void }) {
  const img = getImageUrl(card.image_card)
  const isLandscape = card.format === "landscape"
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 max-w-sm w-full shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-white text-lg">{lang === "ro" ? card.name_ro : card.name_en}</h3>
            <span className="text-xs text-zinc-500">{card.slug}</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        {img && (
          <div className={`relative w-full mx-auto mb-4 rounded-xl overflow-hidden ${isLandscape ? "aspect-[4/3]" : "aspect-[3/4] max-w-[200px]"}`}>
            <Image src={img} alt={card.name_ro} fill className="object-cover" sizes="240px" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {card.cost != null && <StatRow icon="cash" label="Cost" value={card.cost} />}
          {card.production != null && <StatRow icon="production" label="Producție" value={`+${card.production}`} />}
          {card.marketing != null && <StatRow icon="income" label="Marketing" value={`+${card.marketing}`} />}
          {card.expense != null && <StatRow icon="expenses" label="Cheltuieli" value={card.expense} />}
        </div>
        {card.special_effect_ro && (
          <p className="text-xs text-zinc-300 bg-zinc-800 rounded-lg p-3 leading-relaxed">
            {lang === "ro" ? card.special_effect_ro : card.special_effect_en}
          </p>
        )}
      </div>
    </div>
  )
}

function StatRow({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2">
      <StatIcon name={icon} className="w-5 h-5" />
      <div>
        <div className="text-[10px] text-zinc-500">{label}</div>
        <div className="text-sm font-bold text-white">{value}</div>
      </div>
    </div>
  )
}

// ── Setup Screen ───────────────────────────────────────────────────────────
function SetupScreen({ allCards, onStart, savedExists }: {
  allCards: GameCard[]; onStart: (s: GameSettings) => void; savedExists: boolean
}) {
  const [years, setYears] = useState(3)
  const [deckSlugs, setDeckSlugs] = useState<string[]>(DEFAULT_STARTING_SLUGS)
  const [showDeckPicker, setShowDeckPicker] = useState(false)

  const handleToggle = (slug: string) => {
    setDeckSlugs(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }

  const startable = allCards.find(c => c.card_types?.slug === "entrepreneur") != null

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-orange to-brand-yellow bg-clip-text text-transparent">
          Simulare Joc
        </h1>
        <p className="text-zinc-400 text-lg">Configurează partida și pornește firma ta virtuală!</p>
      </div>

      {savedExists && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-sm text-amber-200">Ai o partidă salvată. Poți continua sau începe un joc nou.</span>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-500 text-white shrink-0"
            onClick={() => onStart({ totalYears: years, startingDeck: deckSlugs })}>
            Continuă
          </Button>
        </div>
      )}

      {/* Years setting */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-orange" /> Configurare Partide
        </h3>
        <div className="flex items-center gap-4">
          <label className="text-sm text-zinc-400 w-32 shrink-0">Număr de ani:</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(y => (
              <button key={y} onClick={() => setYears(y)}
                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all
                  ${years === y ? "bg-brand-orange text-white shadow-lg" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>
                {y}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          Jocul durează {years * 4} ture ({years} {years === 1 ? "an" : "ani"} × 4 trimestre). Câștigă primul care ajunge la 20 bani sau cel cu cel mai mare Equity la final.
        </p>
      </div>

      {/* Deck setting */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-orange" /> Deck Inițial ({deckSlugs.length} cărți)
          </h3>
          <button onClick={() => setShowDeckPicker(p => !p)}
            className="text-sm text-brand-orange hover:underline flex items-center gap-1">
            {showDeckPicker ? "Ascunde" : "Modifică"}
            {showDeckPicker ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {deckSlugs.map(slug => {
            const card = allCards.find(c => c.slug === slug)
            return (
              <Badge key={slug} className="bg-zinc-800 text-zinc-300 border-zinc-700 text-xs">
                {card ? card.name_ro : slug}
              </Badge>
            )
          })}
        </div>

        {showDeckPicker && (
          <div className="border-t border-zinc-800 pt-4 max-h-64 overflow-y-auto space-y-1">
            <p className="text-xs text-zinc-500 mb-2">Alege cărți cu cost 0 pentru deck-ul de start:</p>
            {allCards
              .filter(c => c.card_types?.slug === "standard" || c.card_types?.slug === "entrepreneur")
              .filter(c => c.card_types?.slug !== "entrepreneur")
              .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
              .map(card => (
                <label key={card.slug}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
                  <input type="checkbox" checked={deckSlugs.includes(card.slug)}
                    onChange={() => handleToggle(card.slug)}
                    className="accent-brand-orange w-4 h-4" />
                  <span className="text-xs text-zinc-400 w-14 shrink-0">{card.slug}</span>
                  <span className="text-sm text-white">{card.name_ro}</span>
                  <span className="ml-auto text-xs text-zinc-500">Cost: {card.cost ?? 0}</span>
                </label>
              ))}
          </div>
        )}
      </div>

      <Button
        onClick={() => onStart({ totalYears: years, startingDeck: deckSlugs })}
        disabled={deckSlugs.length === 0}
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-brand-orange to-brand-yellow text-white rounded-2xl shadow-lg hover:opacity-90">
        🚀 {savedExists ? "Joc Nou" : "Pornește Jocul"}
      </Button>

      {!startable && (
        <p className="text-center text-xs text-red-400">
          Atenție: Nu există nicio carte de Antreprenor în baza de date. Cartea de Antreprenor e necesară pentru joc.
        </p>
      )}
    </div>
  )
}

// ── Stats Bar (header) ────────────────────────────────────────────────────
function StatsBar({ cash, equity, winTarget, year, quarter, phase }: {
  cash: number; equity: number; winTarget: number;
  year: number; quarter: number; phase: string
}) {
  const progress = Math.min(100, (cash / winTarget) * 100)
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center gap-6 mb-6">
      <div className="flex items-center gap-2">
        <StatIcon name="cash" className="w-7 h-7" />
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Cash</div>
          <div className={`text-xl font-black ${cash < 5 ? "text-red-400" : "text-white"}`}>{cash} ₿</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <StatIcon name="capitalization" className="w-7 h-7" />
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Equity</div>
          <div className="text-xl font-black text-teal-400">{equity} ₿</div>
        </div>
      </div>
      <div className="flex-1 min-w-[160px]">
        <div className="flex justify-between text-xs text-zinc-500 mb-1">
          <span>Progres spre câștig</span>
          <span>{cash}/{winTarget} ₿</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-orange to-brand-yellow rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="ml-auto text-right">
        <div className="text-xs text-zinc-500">An {year} · T{quarter}</div>
        <div className="text-sm font-bold text-zinc-300 capitalize">{phaseLabel(phase)}</div>
      </div>
    </div>
  )
}

function phaseLabel(phase: string) {
  const map: Record<string, string> = {
    calculate: "Calculează", action: "Alege acțiunea", buy: "Cumpără carte",
    eliminate: "Elimină carte", endturn: "Încheie tura", yearend: "Final de an",
    gameover: "Joc terminat",
  }
  return map[phase] || phase
}

// ── Calculation Panel ─────────────────────────────────────────────────────
function CalcPanel({ calc, profit }: {
  calc: { production: number; marketing: number; sales: number; expenses: number; profit: number }
  profit: number
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Calcul Trimestru</h4>
      <div className="space-y-2">
        <StatLine icon="production" label="Producție" value={calc.production} color="text-emerald-400" />
        <StatLine icon="income" label="Marketing" value={calc.marketing} color="text-blue-400" />
        <div className="border-t border-zinc-800 my-1" />
        <StatLine icon="sales" label="Vânzări" value={calc.sales} color="text-teal-400"
          hint="min(Producție, Marketing)" />
        <StatLine icon="expenses" label="Cheltuieli" value={calc.expenses} color="text-orange-400" negative />
        <div className="border-t border-zinc-800 my-1" />
        <StatLine icon="profit" label="Profit" value={calc.profit}
          color={calc.profit >= 0 ? "text-brand-yellow" : "text-red-400"}
          big />
      </div>
    </div>
  )
}

function StatLine({ icon, label, value, color, negative = false, big = false, hint }: {
  icon: string; label: string; value: number; color: string;
  negative?: boolean; big?: boolean; hint?: string
}) {
  return (
    <div className={`flex items-center gap-2 ${big ? "bg-zinc-800 rounded-lg px-2 py-2" : ""}`}>
      <StatIcon name={icon} className="w-5 h-5 shrink-0" />
      <span className={`flex-1 ${big ? "text-sm font-bold text-zinc-200" : "text-xs text-zinc-400"}`}>
        {label}
        {hint && <span className="ml-1 text-[10px] text-zinc-600">({hint})</span>}
      </span>
      <span className={`font-bold tabular-nums ${big ? "text-lg" : "text-sm"} ${color}`}>
        {negative ? "-" : value >= 0 && !negative ? (big && value > 0 ? "+" : "") : ""}{value}
      </span>
    </div>
  )
}

// ── Market Stacks ─────────────────────────────────────────────────────────
function MarketSection({ market, onBuy, buyMode, lang }: {
  market: GameCard[][]; onBuy?: (i: number) => void; buyMode: boolean; lang: string
}) {
  const [preview, setPreview] = useState<GameCard | null>(null)
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
        <ShoppingCart className="w-4 h-4" /> Piața Liberă
        {buyMode && <Badge className="bg-brand-orange/20 text-brand-orange border-brand-orange/40 text-[10px] animate-pulse">Alege o carte de cumpărat</Badge>}
      </h4>
      <div className="flex gap-3 flex-wrap">
        {market.map((stack, i) => {
          const top = stack[0]
          if (!top) return (
            <div key={i} className="w-20 aspect-[3/4] rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-zinc-600 text-xs">
              Gol
            </div>
          )
          const img = getImageUrl(top.image_card) || getCardBack(top)
          return (
            <div key={i} className="relative" title={top.name_ro}>
              {/* Back cards behind for depth */}
              {stack.length > 1 && (
                <div className="absolute inset-0 w-20 aspect-[3/4] rounded-xl overflow-hidden translate-x-1 translate-y-1 opacity-60">
                  <Image src={getCardBack(top)} alt="back" fill sizes="80px" className="object-cover" />
                </div>
              )}
              <div
                onClick={() => buyMode && onBuy ? onBuy(i) : setPreview(top)}
                className={`
                  relative w-20 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer
                  transition-all duration-200
                  ${buyMode ? "hover:scale-110 ring-2 ring-brand-orange/60 hover:ring-brand-orange" : "hover:scale-105"}
                `}>
                <Image src={img} alt={top.name_ro} fill sizes="80px" className="object-cover" />
                {/* Cost badge */}
                <div className="absolute bottom-1 left-1 bg-zinc-900/90 border border-zinc-700 rounded-md px-1.5 py-0.5 text-xs font-bold text-brand-yellow flex items-center gap-0.5">
                  <StatIcon name="cash" className="w-3 h-3" />{top.cost ?? 0}
                </div>
                <div className="absolute top-1 right-1 bg-zinc-900/80 text-zinc-400 rounded text-[10px] px-1">
                  ×{stack.length}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {preview && (
        <CardDetail card={preview} lang={lang} onClose={() => setPreview(null)} />
      )}
    </div>
  )
}

// ── Hand Section ──────────────────────────────────────────────────────────
function HandSection({ hand, entrepreneur, event, eliminateMode, onEliminate, lang }: {
  hand: GameCard[]; entrepreneur: GameCard | null; event: GameCard | null;
  eliminateMode: boolean; onEliminate?: (id: number) => void; lang: string
}) {
  const [preview, setPreview] = useState<GameCard | null>(null)
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
        <FlipHorizontal className="w-4 h-4" /> Cărți Jucate
        {eliminateMode && <Badge className="bg-red-500/20 text-red-400 border-red-500/40 text-[10px] animate-pulse">Alege o carte de eliminat (cost: 1 ₿)</Badge>}
      </h4>
      <div className="flex flex-wrap gap-3">
        {/* Entrepreneur — always shown */}
        {entrepreneur && (
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-20 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all"
              onClick={() => setPreview(entrepreneur)}>
              <Image src={getImageUrl(entrepreneur.image_card) || getCardBack(entrepreneur)} alt="Antreprenor"
                fill sizes="80px" className="object-cover" />
            </div>
            <span className="text-[10px] text-teal-400 flex items-center gap-0.5"><Crown className="w-3 h-3" />Antreprenor</span>
          </div>
        )}
        {/* Event if active */}
        {event && (
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-20 aspect-[3/4] rounded-xl overflow-hidden ring-2 ring-yellow-500/60 cursor-pointer hover:scale-105 transition-all"
              onClick={() => setPreview(event)}>
              <Image src={getImageUrl(event.image_card) || getCardBack(event)} alt="Eveniment"
                fill sizes="80px" className="object-cover" />
            </div>
            <span className="text-[10px] text-yellow-400">⚡ Eveniment</span>
          </div>
        )}
        {/* Hand cards */}
        {hand.map(card => {
          const img = getImageUrl(card.image_card) || getCardBack(card)
          return (
            <div key={card.id} className="flex flex-col items-center gap-1">
              <div
                onClick={() => eliminateMode && onEliminate ? onEliminate(card.id) : setPreview(card)}
                className={`
                  relative w-20 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all
                  ${eliminateMode ? "ring-2 ring-red-500/60 hover:ring-red-400 hover:scale-105" : "hover:scale-105"}
                `}>
                <Image src={img} alt={card.name_ro} fill sizes="80px" className="object-cover" />
              </div>
              {eliminateMode && (
                <button onClick={() => onEliminate?.(card.id)}
                  className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-0.5">
                  <Trash2 className="w-3 h-3" /> Elimină
                </button>
              )}
            </div>
          )
        })}
      </div>
      {preview && <CardDetail card={preview} lang={lang} onClose={() => setPreview(null)} />}
    </div>
  )
}

// ── Score History ─────────────────────────────────────────────────────────
function HistoryPanel({ history }: { history: any[] }) {
  const [open, setOpen] = useState(false)
  if (history.length === 0) return null
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(p => !p)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Fișa de Joc
        </h4>
        {open ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
      </button>
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center">
            <thead>
              <tr className="border-t border-zinc-800 bg-zinc-950">
                <th className="px-3 py-2 text-zinc-500 text-left">An/T</th>
                <th className="px-3 py-2 text-emerald-400">Prod.</th>
                <th className="px-3 py-2 text-blue-400">Mkt.</th>
                <th className="px-3 py-2 text-teal-400">Vânz.</th>
                <th className="px-3 py-2 text-orange-400">Chelt.</th>
                <th className="px-3 py-2 text-yellow-400">Profit</th>
                <th className="px-3 py-2 text-white">Cash</th>
              </tr>
            </thead>
            <tbody>
              {history.map((r, i) => {
                const isYearEnd = r.quarter === 4
                return (
                  <React.Fragment key={i}>
                    <tr className={`border-t border-zinc-800/50 ${isYearEnd ? "border-b-2 border-b-zinc-700" : ""}`}>
                      <td className="px-3 py-2 text-left text-zinc-400 font-mono">A{r.year}·T{r.quarter}</td>
                      <td className="px-3 py-2 text-emerald-400 font-bold">{r.production}</td>
                      <td className="px-3 py-2 text-blue-400 font-bold">{r.marketing}</td>
                      <td className="px-3 py-2 text-teal-400 font-bold">{r.sales}</td>
                      <td className="px-3 py-2 text-orange-400 font-bold">{r.expenses}</td>
                      <td className={`px-3 py-2 font-bold ${r.profit >= 0 ? "text-yellow-400" : "text-red-400"}`}>{r.profit}</td>
                      <td className="px-3 py-2 text-white font-bold">{r.cash}</td>
                    </tr>
                    {isYearEnd && (() => {
                      const yearQ = history.filter(q => q.year === r.year)
                      const rev = yearQ.reduce((s: number, q: any) => s + q.sales, 0)
                      const prof = yearQ.reduce((s: number, q: any) => s + q.profit, 0)
                      return (
                        <tr key={`y${r.year}`} className="bg-zinc-800/60">
                          <td className="px-3 py-1.5 text-left text-brand-orange font-bold text-[11px]">An {r.year} ∑</td>
                          <td colSpan={2} />
                          <td className="px-3 py-1.5 text-teal-300 font-black">{rev}</td>
                          <td />
                          <td className={`px-3 py-1.5 font-black ${prof >= 0 ? "text-yellow-300" : "text-red-400"}`}>{prof}</td>
                          <td />
                        </tr>
                      )
                    })()}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ── Year End Modal ─────────────────────────────────────────────────────────
function YearEndModal({ year, history, equity, onContinue }: {
  year: number; history: any[]; equity: number; onContinue: () => void
}) {
  const yearQ = history.filter(q => q.year === year)
  const revenue = yearQ.reduce((s: number, q: any) => s + q.sales, 0)
  const profit = yearQ.reduce((s: number, q: any) => s + q.profit, 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
        <div className="text-5xl">📊</div>
        <h2 className="text-2xl font-black text-white">Raport Anual — Anul {year}</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-800 rounded-xl p-4">
            <StatIcon name="sales" className="w-8 h-8 mx-auto mb-1" />
            <div className="text-xs text-zinc-500">Cifra de Afaceri</div>
            <div className="text-xl font-black text-teal-400">{revenue} ₿</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <StatIcon name="profit" className="w-8 h-8 mx-auto mb-1" />
            <div className="text-xs text-zinc-500">Profit Anual</div>
            <div className={`text-xl font-black ${profit >= 0 ? "text-yellow-400" : "text-red-400"}`}>{profit} ₿</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <StatIcon name="capitalization" className="w-8 h-8 mx-auto mb-1" />
            <div className="text-xs text-zinc-500">Capitalizare</div>
            <div className="text-xl font-black text-purple-400">{equity} ₿</div>
          </div>
        </div>
        <Button onClick={onContinue}
          className="w-full h-12 bg-gradient-to-r from-brand-orange to-brand-yellow text-white font-bold rounded-xl text-base">
          Continuă cu Anul {year + 1} →
        </Button>
      </div>
    </div>
  )
}

// ── Game Over Modal ─────────────────────────────────────────────────────────
function GameOverModal({ message, history, equity, cash, onNewGame }: {
  message: string | null; history: any[]; equity: number; cash: number; onNewGame: () => void
}) {
  const won = message?.includes("Felicitări")
  const bankrupt = message?.includes("Faliment")
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
        <div className="text-6xl">{won ? "🏆" : bankrupt ? "💸" : "🎯"}</div>
        <h2 className="text-2xl font-black text-white">{won ? "Victorie!" : bankrupt ? "Faliment!" : "Joc Terminat!"}</h2>
        <p className="text-zinc-400">{message}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-800 rounded-xl p-4">
            <StatIcon name="cash" className="w-8 h-8 mx-auto mb-1" />
            <div className="text-xs text-zinc-500">Cash Final</div>
            <div className="text-xl font-black text-white">{cash} ₿</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <StatIcon name="capitalization" className="w-8 h-8 mx-auto mb-1" />
            <div className="text-xs text-zinc-500">Equity Final</div>
            <div className="text-xl font-black text-teal-400">{equity} ₿</div>
          </div>
        </div>
        <Button onClick={onNewGame}
          className="w-full h-12 bg-gradient-to-r from-brand-orange to-brand-yellow text-white font-bold rounded-xl text-base">
          <RotateCcw className="w-5 h-5 mr-2" /> Joc Nou
        </Button>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function Cards3Client({ allCards, lang, dict }: Props) {
  const engine = useGameEngine(allCards)
  const { state, equity } = engine

  const savedExists = typeof window !== "undefined" && !!localStorage.getItem("ezplay_game_state")

  // Setup screen
  if (state.phase === "setup") {
    return (
      <SetupScreen
        allCards={allCards}
        onStart={engine.startGame}
        savedExists={savedExists}
      />
    )
  }

  const phase = state.phase
  const eliminateMode = phase === "eliminate"
  const buyMode = phase === "buy"

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-black bg-gradient-to-r from-brand-orange to-brand-yellow bg-clip-text text-transparent">
          Simulare Joc
        </h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline"
            className="bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white"
            onClick={engine.newGame}>
            <RotateCcw className="w-4 h-4 mr-1" /> Joc Nou
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <StatsBar cash={state.cash} equity={equity} winTarget={state.winTarget}
        year={state.year} quarter={state.quarter} phase={phase} />

      {/* Feedback message */}
      {state.message && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2 animate-fade-in
          ${state.message.includes("Nu ai") || state.message.includes("Faliment")
            ? "bg-red-500/15 border border-red-500/30 text-red-300"
            : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"}`}>
          {state.message.includes("Nu ai") ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column: Hand + Market */}
        <div className="lg:col-span-2 space-y-4">
          {/* Market */}
          <MarketSection
            market={state.market}
            onBuy={buyMode ? engine.buyCard : undefined}
            buyMode={buyMode}
            lang={lang}
          />

          {/* Deck / Discard info */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex-1">
              <Layers className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-[10px] text-zinc-500">Deck</div>
                <div className="text-sm font-bold text-white">{state.deck.length} cărți</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex-1">
              <RotateCcw className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-[10px] text-zinc-500">Discard Pile</div>
                <div className="text-sm font-bold text-white">{state.discardPile.length} cărți</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex-1">
              <Trash2 className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-[10px] text-zinc-500">Eliminate</div>
                <div className="text-sm font-bold text-white">{state.eliminatedCards.length} cărți</div>
              </div>
            </div>
          </div>

          {/* Hand */}
          <HandSection
            hand={state.hand}
            entrepreneur={state.entrepreneurCard}
            event={state.activeEvent}
            eliminateMode={eliminateMode}
            onEliminate={eliminateMode ? engine.eliminateCard : undefined}
            lang={lang}
          />

          {/* History */}
          <HistoryPanel history={state.history} />
        </div>

        {/* Right column: Calc + Actions */}
        <div className="space-y-4">
          <CalcPanel calc={state.calc} profit={state.calc.profit} />

          {/* Action buttons */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Acțiuni</h4>

            {phase === "calculate" && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-400">Verifică calculul trimestrului. Profitul de <strong className={state.calc.profit >= 0 ? "text-yellow-400" : "text-red-400"}>{state.calc.profit} ₿</strong> va fi {state.calc.profit >= 0 ? "adăugat la" : "scăzut din"} cash-ul tău.</p>
                <Button onClick={engine.confirmCalculation} className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold">
                  <Check className="w-4 h-4 mr-2" /> Confirmă Rezultatul
                </Button>
              </div>
            )}

            {phase === "action" && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-400">Alege o singură acțiune pentru această tură:</p>
                <Button onClick={engine.startBuy} className="w-full bg-emerald-700 hover:bg-emerald-600 text-white justify-start">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Cumpără o carte
                </Button>
                <Button onClick={engine.startEliminate}
                  disabled={state.cash < 1}
                  className="w-full bg-red-900 hover:bg-red-800 text-white justify-start disabled:opacity-40">
                  <Trash2 className="w-4 h-4 mr-2" /> Elimină o carte (1 ₿)
                </Button>
                <Button onClick={engine.skipAction} variant="outline"
                  className="w-full border-zinc-700 text-zinc-400 hover:text-white justify-start">
                  <SkipForward className="w-4 h-4 mr-2" /> Skip (nu fac nimic)
                </Button>
              </div>
            )}

            {(phase === "buy" || phase === "eliminate") && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-400">
                  {phase === "buy" ? "Click pe o carte din Piața Liberă pentru a o cumpăra." : "Click pe o carte din mâna ta pentru a o elimina."}
                </p>
                <Button onClick={() => engine.skipAction()} variant="outline"
                  className="w-full border-zinc-700 text-zinc-400 hover:text-white">
                  <X className="w-4 h-4 mr-2" /> Anulează
                </Button>
              </div>
            )}

            {phase === "endturn" && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-400">
                  {state.actionTaken === "buy" && `✅ Ai cumpărat o carte.`}
                  {state.actionTaken === "eliminate" && `✅ Ai eliminat o carte.`}
                  {state.actionTaken === "skip" && `⏭️ Ai sărit acțiunea.`}
                </p>
                <p className="text-xs text-zinc-400">Cash curent: <strong className="text-white">{state.cash} ₿</strong></p>
                <Button onClick={engine.endTurn}
                  className="w-full bg-gradient-to-r from-brand-orange to-brand-yellow text-white font-bold">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  {state.quarter === 4 ? "Încheie Anul →" : `Trimestrul ${state.quarter + 1} →`}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Year End Modal */}
      {phase === "yearend" && (
        <YearEndModal
          year={state.year}
          history={state.history}
          equity={equity}
          onContinue={engine.confirmYearEnd}
        />
      )}

      {/* Game Over Modal */}
      {phase === "gameover" && (
        <GameOverModal
          message={state.message}
          history={state.history}
          equity={equity}
          cash={state.cash}
          onNewGame={engine.newGame}
        />
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  )
}
