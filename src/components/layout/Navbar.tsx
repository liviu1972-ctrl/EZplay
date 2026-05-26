"use client"

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
} from "@/components/ui/sheet"
import { LanguageToggle } from "./LanguageToggle"
import { ThemeToggle } from "./ThemeToggle"
import { createClient } from "@/lib/supabase/client"

interface NavbarProps {
  dict: any
  user?: any
}

export function Navbar({ dict, user }: NavbarProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo_ezplay.svg"
              alt="EZPlay Logo"
              width={115}
              height={40}
              className="h-8 w-auto dark:brightness-0 dark:invert"
              priority
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict.nav.about}
            </Link>
            <Link
              href="/how-it-works"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict.nav.howItWorks}
            </Link>
            <Link
              href="/cards"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict.nav.cards}
            </Link>
            <Link
              href="/cards2"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict.nav.cardTable || "Masa de Joc"}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <div className="h-6 w-px bg-border mx-2" />
            
            {user ? (
              <>
                <Button variant="outline" render={<Link href="/dashboard" />}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  {dict.nav.dashboard}
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {dict.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" render={<Link href="/login" />}>
                  {dict.nav.login}
                </Button>
                <Button className="bg-brand-orange text-white hover:bg-brand-orange/90" render={<Link href="/register" />}>
                  {dict.nav.register}
                </Button>
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger render={
              <Button
                variant="ghost"
                className="px-2 md:hidden"
                size="icon"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            } />
            <SheetContent side="right" className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  href="/about"
                  className="px-2 py-1 text-lg font-medium hover:text-brand-green transition-colors"
                >
                  {dict.nav.about}
                </Link>
                <Link
                  href="/how-it-works"
                  className="px-2 py-1 text-lg font-medium hover:text-brand-green transition-colors"
                >
                  {dict.nav.howItWorks}
                </Link>
                <Link
                  href="/cards"
                  className="px-2 py-1 text-lg font-medium hover:text-brand-green transition-colors"
                >
                  {dict.nav.cards}
                </Link>
                <Link
                  href="/cards2"
                  className="px-2 py-1 text-lg font-medium hover:text-brand-green transition-colors"
                >
                  {dict.nav.cardTable || "Masa de Joc"}
                </Link>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-4">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                
                {user ? (
                  <>
                    <Button variant="outline" className="w-full" render={<Link href="/dashboard" />}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      {dict.nav.dashboard}
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      {dict.nav.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" render={<Link href="/login" />}>
                      {dict.nav.login}
                    </Button>
                    <Button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90" render={<Link href="/register" />}>
                      {dict.nav.register}
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
