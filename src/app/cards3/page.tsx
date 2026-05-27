import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { Cards3Client } from "./Cards3Client"

export const metadata = {
  title: "Simulare Joc — EZPlay",
  description: "Simulează o partidă completă de EZPlay solo. Învață mecanicile jocului, construiește-ți firma și descoperă cum să câștigi.",
}

export default async function Cards3Page() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)
  const supabase = await createClient()

  const { data: cards } = await supabase
    .from("cards")
    .select(`
      *,
      card_types (id, slug, name_ro, name_en),
      asset_types (id, slug, name_ro, name_en),
      card_sets (id, slug, name_ro, name_en)
    `)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <Cards3Client
          allCards={(cards || []) as any[]}
          lang={lang}
          dict={dict}
        />
      </div>
    </div>
  )
}
