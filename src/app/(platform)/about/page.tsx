import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"

export default async function AboutPage() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">{dict.nav.about}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl text-muted-foreground">
          {dict.dashboard?.placeholderPhase2 || "Secțiune în curs de dezvoltare (Faza 2)"}
        </p>
      </div>
    </div>
  )
}
