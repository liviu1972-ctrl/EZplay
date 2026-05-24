import * as React from "react"
import Link from "next/link"

interface FooterProps {
  dict: any
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-bold text-brand-green text-xl">EZPlay</h3>
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
          <p>© {new Date().getFullYear()} EZPlay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
