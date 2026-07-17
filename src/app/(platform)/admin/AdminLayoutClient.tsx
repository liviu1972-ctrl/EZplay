"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/dashboard/Sidebar"

interface AdminLayoutClientProps {
  dict: any
  profile: any
  children: React.ReactNode
}

export function AdminLayoutClient({ dict, profile, children }: AdminLayoutClientProps) {
  const searchParams = useSearchParams()
  const isMinimal = searchParams.get("minimal") === "true"

  if (isMinimal) {
    return (
      <main className="w-full min-h-screen">
        {children}
      </main>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar dict={dict} profile={profile} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
