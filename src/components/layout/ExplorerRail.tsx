"use client"

// This component renders the Explorer Rail, a collapsible vertical side navigation.

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  ChevronRight, 
  ChevronLeft, 
  Compass, 
  Map, 
  BookOpen, 
  Briefcase, 
  Building2, 
  Beaker 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ExplorerRailProps {
  dict: any
}

export function ExplorerRail({ dict }: ExplorerRailProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/program", label: dict.nav?.program || "Programul", icon: Compass },
    { href: "/how-we-learn", label: dict.nav?.howWeLearn || "Cum învățăm", icon: BookOpen },
    { href: "/experiences", label: dict.nav?.experiences || "Experiențe", icon: Map },
    { href: "/for/organizations", label: dict.nav?.forOrganizations || "Pentru organizații", icon: Building2 },
    { href: "/research", label: dict.nav?.research || "Cercetare", icon: Beaker },
  ]

  return (
    <div
      className={cn(
        "hidden md:flex flex-col border-r border-line bg-surface transition-all duration-300 z-40 sticky top-16 h-[calc(100vh-4rem)]",
        isExpanded ? "w-72" : "w-[72px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-line min-h-[64px]">
        {isExpanded && (
          <span className="font-heading font-bold text-ink truncate ml-2">
            Explorer
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mx-auto"
          aria-label={isExpanded ? "Restrânge Explorer" : "Extinde Explorer"}
        >
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!isExpanded ? item.label : undefined}
              className={cn(
                "flex items-center px-4 py-3 mx-2 rounded-md transition-colors",
                isActive
                  ? "bg-brand-orange/10 text-brand-orange"
                  : "text-ink-muted hover:bg-surface-soft hover:text-ink",
                !isExpanded && "justify-center px-0"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", !isExpanded ? "mx-auto" : "mr-3")} />
              {isExpanded && (
                <span className="truncate font-medium text-sm">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </div>
      
      <div className="p-4 border-t border-line text-center">
        {isExpanded ? (
          <div className="text-xs text-ink-muted font-mono">
            v{process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"}
          </div>
        ) : (
          <div className="text-[10px] text-ink-muted font-mono" title="Version">
            {process.env.NEXT_PUBLIC_APP_VERSION || "1.0"}
          </div>
        )}
      </div>
    </div>
  )
}
