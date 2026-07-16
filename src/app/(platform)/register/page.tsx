import Link from "next/link"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { RegisterForm } from "./RegisterForm"
import { Globe, ArrowLeft, AlertCircle } from "lucide-react"

export default async function RegisterPage() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="flex w-full min-h-screen bg-canvas flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Înapoi la site
      </Link>
      
      <div className="w-full max-w-[440px] bg-surface p-8 md:p-10 rounded-[var(--radius-panel)] border border-line shadow-sm my-16">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-6">
            <Globe className="w-4 h-4" />
            Platforma digitală ezplay.org
          </div>
          <h1 className="font-heading text-3xl font-bold text-ink tracking-tight mb-2">
            {dict.auth.register.title}
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed">
            {dict.auth.register.subtitle}
          </p>
        </div>

        <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-lg text-xs text-brand-orange-dark mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Înregistrarea publică este limitată.</strong> Dacă ești minor, ai nevoie de un părinte, tutore sau adult responsabil din organizația ta pentru a primi un cont.
          </p>
        </div>
        
        <RegisterForm dict={dict} />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-ink-muted">
            {dict.auth.register.haveAccount}{" "}
            <Link
              href="/login"
              className="font-bold text-brand-teal hover:underline underline-offset-4"
            >
              {dict.auth.register.loginLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
