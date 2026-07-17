import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, AlertTriangle } from "lucide-react"
import { ReferencesClient } from "./ReferencesClient"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Referințe Interne — Admin",
  description: "Catalog de referințe interactive necanonice.",
  robots: {
    index: false,
    follow: false,
  },
}

const REFERENCES = [
  {
    title: "Explorarea pachetului EZPLAY Deckbuilder",
    description: "Pagina istorică de explorare a cărților, restaurată ca referință vizuală interactivă.",
    reason: "Păstrarea teancurilor, comportamentului de shuffle, reveal-ului cărților și tranzițiilor vizuale din pagina legacy.",
    route: "/admin/references/cards-deck",
  },
  {
    title: "Laborator UX Gemini - Energie Tactilă",
    description: "Componente experimentale pentru testarea interacțiunilor dinamice (hover, parallax, swipe, scroll) cu asseturile EZplay.",
    reason: "Testarea și validarea deciziei de design de a folosi 30% energie tactilă în interfața publică.",
    route: "/admin/ux-experiments-gemini",
  },
  {
    title: "Laborator UX Claude — 15 Efecte Avansate",
    description: "5 efecte cu cărți + 10 cu artwork-uri, monede, icoane și video. Vortex 3D, fizică magnetică, Ken Burns, peliculă de cinema.",
    reason: "Comparație directă agent-la-agent: diversitatea efectelor și calitatea animațiilor cu aceleași asset-uri EZPLAY.",
    route: "/admin/ux-experiments-claude",
  },
]

export default function ReferencesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Reference Lab</h1>
          <p className="text-muted-foreground mt-2">
            Zonă internă pentru interacțiuni, prototipuri și pagini istorice care inspiră dezvoltarea, fără a face parte din produsul curent.
          </p>
        </div>
      </div>

      <ReferencesClient references={REFERENCES} />
    </div>
  )
}
