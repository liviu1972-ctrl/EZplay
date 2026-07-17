"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, User, Settings, ShieldAlert, LogOut, Menu, Layers, Archive } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface SidebarProps {
  dict: any
  profile: any
}

export function Sidebar({ dict, profile }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const navItems = [
    { href: "/dashboard", label: dict.nav.dashboard, icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/profile", label: dict.nav.profile, icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: dict.nav.settings, icon: <Settings className="w-5 h-5" /> },
  ]

  if (profile?.role === "admin" || profile?.role === "superadmin") {
    navItems.push({
      href: "/admin",
      label: dict.nav.admin,
      icon: <ShieldAlert className="w-5 h-5 text-destructive" />
    })
    navItems.push({
      href: "/admin/cards",
      label: dict.nav.adminCards || "Administrare Cărți",
      icon: <Layers className="w-5 h-5 text-brand-orange" />
    })
    navItems.push({
      href: "/admin/references",
      label: "Referințe",
      icon: <Archive className="w-5 h-5 text-zinc-400" />
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-[60px] items-center px-6">
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
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === item.href
                  ? "bg-brand-green/10 text-brand-green"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold uppercase">
            {profile?.display_name?.charAt(0) || "U"}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{profile?.display_name}</span>
            <span className="text-xs text-muted-foreground capitalize">{profile?.role}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          {dict.nav.logout}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <div className="hidden md:flex h-screen w-64 flex-col border-r bg-background/95 backdrop-blur">
        <SidebarContent />
      </div>
      <div className="md:hidden flex h-16 items-center border-b px-4 bg-background/95 backdrop-blur sticky top-0 z-40">
        <Sheet>
          <SheetTrigger render={
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          } />
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <Link href="/" className="ml-4 flex items-center">
          <Image
            src="/logo_ezplay.svg"
            alt="EZPlay Logo"
            width={115}
            height={40}
            className="h-8 w-auto dark:brightness-0 dark:invert"
            priority
          />
        </Link>
      </div>
    </>
  )
}
