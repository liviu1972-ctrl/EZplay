"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Reference {
  title: string
  description: string
  reason: string
  route: string
}

export function ReferencesClient({ references }: { references: Reference[] }) {
  const [openInNewWindow, setOpenInNewWindow] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 bg-muted/30 p-4 rounded-lg border border-border/50">
        <Checkbox 
          id="new-window" 
          checked={openInNewWindow} 
          onCheckedChange={(checked) => setOpenInNewWindow(checked as boolean)}
        />
        <Label htmlFor="new-window" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Deschide în fereastră separată (mod vizualizare publică)
        </Label>
      </div>

      <div className="grid gap-6">
        {references.map((ref) => (
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
              <Link 
                href={openInNewWindow ? `${ref.route}?minimal=true` : ref.route}
                target={openInNewWindow ? "_blank" : undefined}
                rel={openInNewWindow ? "noopener noreferrer" : undefined}
              >
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
