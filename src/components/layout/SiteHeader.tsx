"use client"

// This component renders the global navigation header for EZPLAY.org

import * as React from "react"
import Link from "next/link"
import { Menu, LogOut, LayoutDashboard } from "lucide-react"
import { useRouter } from "next/navigation"

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
        <Link href="/about" className={linkClass}>
          {dict.nav?.aboutEzplay || "Despre EZPLAY"}
        </Link>
      </>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 lg:gap-10">
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
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <div className="h-6 w-px bg-line mx-2" />
            
            {user ? (
              <>
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
