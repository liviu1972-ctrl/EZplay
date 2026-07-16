"use client"

import * as React from "react"
import { useTransition, useState } from "react"
import { register } from "./actions"
import { loginWithGoogle } from "../login/actions"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface RegisterFormProps {
  dict: any
}

export function RegisterForm({ dict }: RegisterFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await register(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-5">
          <div className="space-y-2">
            <label htmlFor="display_name" className="text-sm font-bold text-ink">{dict.auth.register.displayName}</label>
            <input
              id="display_name"
              name="display_name"
              type="text"
              placeholder="Ex: Ana Popescu"
              required
              disabled={isPending}
              className="w-full p-3 rounded-lg border border-line bg-canvas focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-ink">{dict.auth.login.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nume@exemplu.ro"
              required
              disabled={isPending}
              className="w-full p-3 rounded-lg border border-line bg-canvas focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-bold text-ink">{dict.auth.login.password}</label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={isPending}
              className="w-full p-3 rounded-lg border border-line bg-canvas focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
            />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg">{error}</p>}
          <Button type="submit" disabled={isPending} className="w-full h-12 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 rounded-lg text-base font-bold">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {dict.auth.register.button}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-line" />
        </div>
        <div className="relative flex justify-center text-xs uppercase font-bold">
          <span className="bg-surface px-4 text-ink-muted">
            sau
          </span>
        </div>
      </div>
      <form action={loginWithGoogle}>
        <Button variant="outline" type="submit" className="w-full h-12 border-line-strong text-ink hover:bg-canvas rounded-lg font-bold" disabled={isPending}>
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          {dict.auth.login.googleButton}
        </Button>
      </form>
    </div>
  )
}
