import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, AlertTriangle } from "lucide-react"

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

      <div className="grid gap-6">
        {REFERENCES.map((ref) => (
          <div key={ref.route} className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold">{ref.title}</h2>
                <p className="text-muted-foreground text-sm">{ref.description}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5" />
                Referință internă — necanonică
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border border-border/50 text-sm">
              <span className="font-semibold text-foreground">Motivul păstrării: </span>
              <span className="text-muted-foreground">{ref.reason}</span>
            </div>

            <div className="pt-2 flex justify-end">
              <Link href={ref.route}>
                <Button variant="outline" className="gap-2">
                  Deschide Referința
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
