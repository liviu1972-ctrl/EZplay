"use client"

// This component renders the global navigation header for EZPLAY.org

import * as React from "react"
import Link from "next/link"
import { Menu, LogOut, LayoutDashboard } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from "@/components/ui/sheet"
import { LanguageToggle } from "./LanguageToggle"
import { ThemeToggle } from "./ThemeToggle"
import { createClient } from "@/lib/supabase/client"

interface SiteHeaderProps {
  dict: any
  user?: any
}

export function SiteHeader({ dict, user }: SiteHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollYRef = React.useRef(0)
  const isProgrammaticRef = React.useRef(false)
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    lastScrollYRef.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current

      // If it's a programmatic scroll (e.g. anchor link click), don't hide the header
      if (isProgrammaticRef.current) {
        lastScrollYRef.current = currentScrollY
        return
      }

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

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isScrollTrigger = target.closest("a") || target.closest("button")
      
      if (isScrollTrigger) {
        isProgrammaticRef.current = true
        setIsVisible(true)
        
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
        clickTimeoutRef.current = setTimeout(() => {
          isProgrammaticRef.current = false
        }, 1000)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("click", handleGlobalClick, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleGlobalClick)
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  // Helper to render links
  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const linkClass = mobile
      ? "block px-2 py-2 text-lg font-medium hover:text-brand-orange transition-colors"
      : "flex items-center text-sm font-medium text-ink-muted hover:text-ink transition-colors"

    return (
      <>
        <Link href="/program" className={linkClass}>
          {dict.nav?.program || "Programul"}
        </Link>
        <Link href="/how-we-learn" className={linkClass}>
          {dict.nav?.howWeLearn || "Cum învățăm"}
        </Link>
        <Link href="/experiences" className={linkClass}>
          {dict.nav?.experiences || "Experiențe"}
        </Link>
        <Link href="/for/organizations" className={linkClass}>
          {dict.nav?.forOrganizations || "Pentru organizații"}
        </Link>
        <Link href="/research" className={linkClass}>
          {dict.nav?.research || "Cercetare"}
        </Link>
        <Link 
          href="/program/curriculum" 
          className={cn(
            mobile 
              ? "flex items-center px-2 py-1.5 text-lg font-medium transition-colors hover:bg-[#0D2427]/10 rounded-md group"
              : "flex items-center text-sm font-medium transition-colors px-3 py-0.5 -ml-3 rounded-md text-ink-muted hover:bg-[#0D2427]/10 hover:text-ink group"
          )}
        >
          Atlas curricular
          <span className="w-1.5 h-1.5 rounded-full bg-[#A68A64] ml-1.5 inline-block group-hover:scale-125 transition-transform"></span>
        </Link>
        <Link href="/about" className={linkClass}>
          {dict.nav?.aboutEzplay || "Despre EZPLAY"}
        </Link>
      </>
    )
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/60 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="w-full flex h-16 items-center px-4 md:px-8 relative">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-start px-4 md:px-6 lg:px-8">
          <div className="flex gap-6 lg:gap-10 ml-[5px]">
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
            <nav className="hidden xl:flex gap-6 items-center">
              <NavLinks />
            </nav>
          </div>
        </div>
        <div className="absolute right-4 md:right-8 flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <div className="h-6 w-px bg-line mx-2" />
            
            {user ? (
              <>
                <Button className="bg-brand-teal text-white hover:bg-brand-teal/90 rounded-full px-6" render={<Link href="/ezplay" />}>
                  {dict.nav?.enterPlatform || "Intră în platformă"}
                </Button>
                <Button variant="outline" render={<Link href="/dashboard" />}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  {dict.nav?.dashboard || "Dashboard"}
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {dict.nav?.logout || "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" render={<Link href="/login" />}>
                  {dict.nav?.login || "Autentificare"}
                </Button>
                <Button className="bg-brand-teal text-white hover:bg-brand-teal/90 rounded-full px-6" render={<Link href="/platform" />}>
                  {dict.nav?.enterPlatform || "Intră în platformă"}
                </Button>
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger render={
              <Button
                variant="ghost"
                className="px-2 xl:hidden"
                size="icon"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            } />
            <SheetContent side="right" className="flex flex-col gap-4 bg-canvas border-l border-line">
              <SheetHeader>
                <SheetTitle className="sr-only">Meniu de navigare</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-4">
                <NavLinks mobile />
                {/* Auth for Mobile */}
                <div className="mt-8 flex flex-col gap-4 pt-4 border-t border-line md:hidden">
                  <div className="flex items-center justify-between">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                  {user ? (
                    <>
                      <Button className="w-full justify-start bg-brand-teal text-white hover:bg-brand-teal/90 rounded-full" render={<Link href="/ezplay" />}>
                        {dict.nav?.enterPlatform || "Intră în platformă"}
                      </Button>
                      <Button variant="outline" className="w-full justify-start" render={<Link href="/dashboard" />}>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        {dict.nav?.dashboard || "Dashboard"}
                      </Button>
                      <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
                        <LogOut className="w-4 h-4 mr-2" />
                        {dict.nav?.logout || "Logout"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" className="w-full justify-start" render={<Link href="/login" />}>
                        {dict.nav?.login || "Autentificare"}
                      </Button>
                      <Button className="w-full justify-start bg-brand-teal text-white hover:bg-brand-teal/90 rounded-full" render={<Link href="/platform" />}>
                        {dict.nav?.enterPlatform || "Intră în platformă"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
