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
