"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from "@/components/ui/sheet"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export function CurriculumHeader({ dict }: { dict?: any }) {
  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollYRef = React.useRef(0)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    lastScrollYRef.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current

      if (currentScrollY < 100) {
        setIsVisible(true)
      } else {
        if (currentScrollY > lastScrollY + 5) {
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY - 5) {
          setIsVisible(true)
        }
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const linkClass = mobile
      ? "block px-2 py-2 text-lg font-medium hover:text-brand-orange transition-colors"
      : "flex items-center text-sm font-medium text-ink-muted hover:text-ink transition-colors"

    return (
      <>
        <Link href="/program" className={linkClass}>
          {dict?.nav?.program || "Programul EZPLAY"}
        </Link>
        <Link href="/how-we-learn" className={linkClass}>
          {dict?.nav?.howWeLearn || "Cum învățăm"}
        </Link>
        <Link href="/experiences" className={linkClass}>
          {dict?.nav?.experiences || "Experiențe"}
        </Link>
        <Link href="/for/organizations" className={linkClass}>
          {dict?.nav?.forOrganizations || "Pentru organizații"}
        </Link>
        <Link href="/research" className={linkClass}>
          {dict?.nav?.research || "Cercetare"}
        </Link>
        <Link href="/about" className={linkClass}>
          {dict?.nav?.aboutEzplay || "Despre EZPLAY"}
        </Link>
      </>
    )
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/60 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="w-full flex h-16 items-center px-4 md:px-8 relative">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-4">
          <div className="flex gap-6 lg:gap-10 items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_ezplay.svg"
                alt="EZPLAY Logo"
                width={115}
                height={40}
                className="h-8 w-auto dark:brightness-0 dark:invert"
                priority
              />
            </Link>
            <div className="hidden md:flex">
              <Button variant="ghost" className="text-sm font-medium" render={<Link href="/program" />}>
                Programul EZPLAY
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            <Sheet>
              <SheetTrigger render={
                <Button variant="outline" className="flex items-center gap-2 rounded-full px-4">
                  <Menu className="h-4 w-4" />
                  <span className="hidden sm:inline">Meniu</span>
                </Button>
              } />
              <SheetContent side="right" className="flex flex-col gap-4 bg-canvas border-l border-line z-[100]">
                <SheetHeader>
                  <SheetTitle className="sr-only">Meniu de navigare globală</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-4">
                  <NavLinks mobile />
                  <div className="mt-8 flex flex-col gap-4 pt-4 border-t border-line md:hidden">
                    <div className="flex items-center justify-between">
                      <LanguageToggle />
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
