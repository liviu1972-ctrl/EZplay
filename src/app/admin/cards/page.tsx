import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { CardsAdminClient } from "./CardsAdminClient"

export const metadata = {
  title: "Administrare Cărți — EZPlay",
  description: "Panou de gestiune și creare cărți de joc",
}

export default async function AdminCardsPage() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  const supabase = await createClient()

  // Fetch cards, types, assets, and sets
  const { data: cards } = await supabase
    .from("cards")
    .select(`
      *,
      card_types (id, slug, name_ro, name_en),
      asset_types (id, slug, name_ro, name_en),
      card_sets (id, slug, name_ro, name_en)
    `)
    .order("sort_order", { ascending: true })

  const { data: cardTypes } = await supabase
    .from("card_types")
    .select("*")
    .order("sort_order", { ascending: true })

  const { data: assetTypes } = await supabase
    .from("asset_types")
    .select("*")

  const { data: cardSets } = await supabase
    .from("card_sets")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brand-orange to-brand-yellow bg-clip-text text-transparent">
          {lang === "ro" ? "Administrare Cărți" : "Cards Management"}
        </h1>
        <p className="text-muted-foreground">
          {lang === "ro" 
            ? "Gestionează cărțile de joc din sistem, editează-le atributele și încarcă imagini noi." 
            : "Manage game cards in the system, edit their attributes, and upload new images."}
        </p>
      </div>

      <CardsAdminClient
        initialCards={(cards || []) as any[]}
        cardTypes={cardTypes || []}
        assetTypes={assetTypes || []}
        cardSets={cardSets || []}
        lang={lang}
        dict={dict}
      />
    </div>
  )
}
