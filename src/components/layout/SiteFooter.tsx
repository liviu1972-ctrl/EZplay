"use client"

// This component renders the global Site Footer.

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

interface SiteFooterProps {
  dict: any
}

export function SiteFooter({ dict }: SiteFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink text-surface border-t border-line py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/logo_ezplay.svg"
              alt="EZPLAY Logo"
              width={115}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-surface-soft text-sm mt-4">
            {dict.nav?.aboutEzplay || "Educație antreprenorială prin experiență. Un program dedicat viitorilor fondatori."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading font-bold text-surface">Descoperă</h3>
          <Link href="/program" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Programul</Link>
          <Link href="/program/curriculum" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Atlas curricular</Link>
          <Link href="/experiences/introduction" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Experiența introductivă</Link>
          <Link href="/how-we-learn" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Cum învățăm</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading font-bold text-surface">Ecosistem</h3>
          <Link href="/for/organizations" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Pentru organizații</Link>
          <Link href="/research" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Cercetare</Link>
          <Link href="/about" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Despre EZPLAY</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-heading font-bold text-surface">Legal & Suport</h3>
          <Link href="/terms" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Termeni și Condiții</Link>
          <Link href="/privacy" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Politica de Confidențialitate</Link>
          <Link href="/contact" className="text-surface-soft hover:text-brand-orange text-sm transition-colors">Contact</Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-12 pt-8 border-t border-surface/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-surface-soft/60">
        <p>&copy; {currentYear} EZPLAY. Toate drepturile rezervate.</p>
        <div className="flex gap-4">
          <span>Construit cu metodologie experientială</span>
        </div>
      </div>
    </footer>
  )
}
