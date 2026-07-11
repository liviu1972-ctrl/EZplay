// This component renders the global website footer including navigation links, legal information, and the current app version.

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

interface FooterProps {
  dict: any
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Image
              src="/logo_ezplay.svg"
              alt="EZPlay Logo"
              width={115}
              height={40}
              className="h-8 w-auto dark:brightness-0 dark:invert"
            />
            <p className="text-sm text-muted-foreground max-w-sm">
              {dict.landing?.hero?.tagline || "Ecosistemul educațional antreprenorial"}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-brand-orange transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-brand-orange transition-colors">
                  {dict.nav.howItWorks}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-brand-orange transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} EZPlay. All rights reserved.
            <span className="ml-2 text-xs text-muted-foreground/45 font-mono select-none">
              v{process.env.NEXT_PUBLIC_APP_VERSION}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
