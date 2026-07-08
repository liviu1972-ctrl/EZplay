import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { Cards2Client } from "./Cards2Client"

export const metadata = {
  title: "Card Table — EZPlay",
  description: "Explore the EZPlay card decks laid out on a virtual game table. Click on stacks to reveal cards one by one.",
}

export default async function Cards2Page() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  const supabase = await createClient()

  // Fetch all active cards with joins
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

  const { data: cardTypes } = await supabase
    .from("card_types")
    .select("*")
    .order("sort_order", { ascending: true })

  const { data: assetTypes } = await supabase
    .from("asset_types")
    .select("*")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col space-y-4 mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-brand-orange to-brand-yellow bg-clip-text text-transparent">
            {dict.cards2?.title || "Masa de Joc"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.cards2?.subtitle || "Alege un teanc de cărți și descoperă-le una câte una."}
          </p>
        </div>

        <Cards2Client
          initialCards={(cards || []) as any[]}
          cardTypes={cardTypes || []}
          assetTypes={assetTypes || []}
          lang={lang}
          dict={dict}
        />
      </div>
    </div>
  )
}
