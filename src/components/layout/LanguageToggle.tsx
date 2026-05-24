"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"

export function LanguageToggle() {
  const router = useRouter()

  const setLanguage = (locale: Locale) => {
    document.cookie = `${LANGUAGE_COOKIE}=${locale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      } />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("ro")}>
          Română
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
