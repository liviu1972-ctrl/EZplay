/**
 * EZPlay Cards Migration Script
 *
 * Reads the CSV, downloads images from ezplay.org,
 * resizes them to 4 variants, uploads to Supabase Storage,
 * and inserts all card data into the database.
 *
 * Run: pnpm migrate:cards
 */

import fs from "fs"
import path from "path"
import { createClient } from "@supabase/supabase-js"
import Papa from "papaparse"
import sharp from "sharp"

// Load .env.local manually
const envPath = path.resolve(".env.local")
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8")
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIdx = trimmed.indexOf("=")
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const value = trimmed.slice(eqIdx + 1).trim()
    if (key && value && !process.env[key]) {
      process.env[key] = value
    }
  }
}

// ── Config ────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const BUCKET = "cards"
const CSV_PATH = path.resolve("other info/carti ezplay versiunea 0.2.csv")

const IMAGE_SIZES = {
  micro: 80,
  thumb: 150,
  card: 400,
  full: 0, // 0 = original size, no resize
}

// ── Simple EN translations map ────────────────────────────────────────────────
// Auto-generated translations for card names and special effects

const NAME_TRANSLATIONS: Record<string, string> = {
  "Depozit mic închis": "Small Closed Warehouse",
  "Depozit mic compartimentat": "Small Compartmentalized Warehouse",
  "Depozit mic deschis": "Small Open Warehouse",
  "Depozit simplu accesibil": "Simple Accessible Warehouse",
  "Depozit cu etaj": "Two-Story Warehouse",
  "Depozit modular cu etaj": "Modular Two-Story Warehouse",
  "Depozit cu dubiță logistică": "Warehouse with Logistics Van",
  "Depozit cu transport propriu": "Warehouse with Own Transport",
  "Depozit cu mașină dedicată": "Warehouse with Dedicated Vehicle",
  "Depozit cu flotă mică": "Warehouse with Small Fleet",
  "Muncitor șantier": "Construction Site Worker",
  "Muncitor construcții": "Construction Worker",
  "Muncitoare secție": "Section Worker",
  "Muncitor producție": "Production Worker",
  "Supervizor fabrică": "Factory Supervisor",
  "Supervizor depozit": "Warehouse Supervisor",
  "Operator computer": "Computer Operator",
  "Operator date": "Data Operator",
  "Operatoare calculatoare": "Computer Operator (F)",
  "Operatoare date": "Data Operator (F)",
  "Motostivuitor cu operator": "Forklift with Operator",
  "Motostivuitor industrial": "Industrial Forklift",
  "Fabrică medie": "Medium Factory",
  "Depozit cu rampă vânzare": "Warehouse with Sales Ramp",
  "Utilaj semiautomat": "Semi-Automatic Equipment",
  "Automat de vânzare": "Vending Machine",
  "Sistem VR interactiv": "Interactive VR System",
  "Utilaje de linie producție": "Production Line Equipment",
  "Utilaj industrial avansat": "Advanced Industrial Equipment",
  "Utilaj cu flexibilitate ridicată": "High-Flexibility Equipment",
  "Sistem de eliminare bariere": "Barrier Removal System",
  "Minirobot logistic": "Logistics Mini-Robot",
  "Robot multifuncțional": "Multi-Function Robot",
  "Robot versatil de producție": "Versatile Production Robot",
  "Echipă operatori comenzi": "Order Operators Team",
  "Operator comenzi VR": "VR Order Operator",
  "Echipă mixtă șantier": "Mixed Construction Team",
  "Echipă vânzări integrată": "Integrated Sales Team",
  "Echipă mixtă producție-vânzare": "Mixed Production-Sales Team",
  "Echipă mixtă vânzare-producție": "Mixed Sales-Production Team",
  "Operator proiectare-vânzare": "Design-Sales Operator",
  "Manager vânzări": "Sales Manager",
  "Echipă proiectare-vânzare automatizată": "Automated Design-Sales Team",
  "Echipă robo-proiectare marketing": "Robo-Design Marketing Team",
  "Echipă vânzări performante": "High-Performance Sales Team",
  "Operatoare multidisciplinară": "Multidisciplinary Operator (F)",
  "Operatoare logistică": "Logistics Operator (F)",
  "Echipă achiziții optimizate": "Optimized Procurement Team",
  "Optimizare producție": "Production Optimization",
  "Control supraproducție": "Overproduction Control",
  "Optimizare marketing": "Marketing Optimization",
  "Strategii vânzări": "Sales Strategies",
  "Integrare producție-vânzări": "Production-Sales Integration",
  "Server centru date": "Data Center Server",
  "AI centralizat": "Centralized AI",
  "Optimizare operațională": "Operational Optimization",
  "Automatizare operațională": "Operational Automation",
  "Procese automatizate": "Automated Processes",
  "Eficienta": "Efficiency",
  "Criza supraproductie": "Overproduction Crisis",
  "Criza economica": "Economic Crisis",
  "Crestere economica": "Economic Growth",
  "Criza materii prime": "Raw Materials Crisis",
  "Concedieri masiv": "Mass Layoffs",
  "Vanzari active": "Active Sales",
  "Boom economic productie": "Production Economic Boom",
  "Boom economic vanzari": "Sales Economic Boom",
  "Bani ieftini in piata": "Cheap Money in the Market",
  "Obsedat de munca (productie)": "Work Obsessed (Production)",
  "Obsedat de munca (peste tot)": "Work Obsessed (Everywhere)",
  "Obsedata de munca (mkt si vanzari)": "Work Obsessed (Mkt & Sales)",
  "Dedicata si focalizata (mkt/vanzari)": "Dedicated & Focused (Mkt/Sales)",
  "Dedicat si focalizat (productie)": "Dedicated & Focused (Production)",
  "Dedicat (productie)": "Dedicated (Production)",
  "Obsedata de munca (tot ce misca)": "Work Obsessed (Everything)",
  "Dedicata si adaptabila": "Dedicated & Adaptable (F)",
  "Dedicat si adaptabil": "Dedicated & Adaptable",
  "Big Boss": "Big Boss",
}

const EFFECT_TRANSLATIONS: Record<string, string> = {
  "nu are": "none",
  "La achizitie mai poti achizitiona un alt activ corporal de valoare maxim 1 (se plateste costul lui)":
    "On purchase, you may acquire another tangible asset worth at most 1 (its cost is paid).",
  "La achizitie mai poti achizitiona un alt activ corporal de valoare maxim 2 (se plateste costul lui)":
    "On purchase, you may acquire another tangible asset worth at most 2 (its cost is paid).",
  "La achizitie mai poti achizitiona o alta resursa umana de valoare maxim 1 (se plateste costul ei)":
    "On purchase, you may acquire another human resource worth at most 1 (its cost is paid).",
  "La achizitie mai poti achizitiona o alta resursa umana de valoare maxim 2 (se plateste costul ei)":
    "On purchase, you may acquire another human resource worth at most 2 (its cost is paid).",
  "La achizitie mai poti achizitionao alta resursa umana de valoare maxim 2 (se plateste costul ei)":
    "On purchase, you may acquire another human resource worth at most 2 (its cost is paid).",
  "La achizitie poti renunta la o carte active corporale din mana platind 1 ban":
    "On purchase, you may discard a tangible asset card from your hand by paying 1 coin.",
  "La achizitie poti renunta la o carte active corporale din mana fara a mai plati 1 ban":
    "On purchase, you may discard a tangible asset card from your hand without paying 1 coin.",
  "La achizitie poti renunta la o carte din mana de orice fel fara a mai plati 1 ban":
    "On purchase, you may discard any card from your hand without paying 1 coin.",
  "La achizitie poti renunta la o carte resurse umane din mana platind 1 ban":
    "On purchase, you may discard a human resource card from your hand by paying 1 coin.",
  "La achizitie poti renunta la o carte active umane din mana fara a plati 1 ban":
    "On purchase, you may discard a human resource card from your hand without paying 1 coin.",
  "Achizitiile costa cu 1 mai putin, minim 1": "Purchases cost 1 less, minimum 1.",
  "Achizitiile costa cu 2 mai putin, minim 1": "Purchases cost 2 less, minimum 1.",
  "Toate cartile cu cheltuiala 2 au cheltuiala 1": "All cards with expense 2 have expense 1.",
  "Foloseste o carte din mana de doua ori": "Use a card from your hand twice.",
  "Poti renunta la o carte resurse umane fara a plati 1 ban":
    "You may discard a human resource card without paying 1 coin.",
  "Poti renunta la o carte resurse corporale fara a plati 1 ban":
    "You may discard a tangible asset card without paying 1 coin.",
  "Orice achizitie costa cu  1 ban mai putin": "Any purchase costs 1 coin less.",
  "Orice achizitie costa cu 1 ban mai putin": "Any purchase costs 1 coin less.",
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function translateName(ro: string): string {
  return NAME_TRANSLATIONS[ro] ?? ro
}

function translateEffect(ro: string): string {
  return EFFECT_TRANSLATIONS[ro.trim()] ?? ro
}

function getSlug(tipCarte: string, id: string): string {
  const prefix =
    tipCarte === "Standard" ? "s" : tipCarte === "Evenimente" ? "e" : "a"
  return `${prefix}${id}`
}

function getCardTypeSlug(tipCarte: string): string {
  if (tipCarte === "Standard") return "standard"
  if (tipCarte === "Evenimente") return "event"
  return "entrepreneur"
}

function getAssetTypeSlug(tipActiv: string): string {
  if (tipActiv === "Active corporale") return "tangible-assets"
  if (tipActiv === "Resurse umane") return "human-resources"
  if (tipActiv === "Active necorporale") return "intangible-assets"
  if (tipActiv === "Eveniment") return "event"
  return "entrepreneur"
}

function getCalculation(tipCalc: string): "additive" | "choice" {
  return tipCalc === "alegere" ? "choice" : "additive"
}

function getFormat(format: string): "portrait" | "landscape" {
  return format === "Landscape" ? "landscape" : "portrait"
}

function getStorageFolder(tipCarte: string): string {
  return tipCarte === "Evenimente" ? "events" : "base-game"
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`)
  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

async function resizeImage(
  buffer: Buffer,
  width: number
): Promise<Buffer> {
  if (width === 0) {
    // Full size — just convert to webp for consistency
    return sharp(buffer).webp({ quality: 90 }).toBuffer()
  }
  return sharp(buffer)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality: 90 })
    .toBuffer()
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
    )
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  })

  console.log("📖 Reading CSV...")
  const csvContent = fs.readFileSync(CSV_PATH, "utf-8")
  const { data: rows } = Papa.parse<Record<string, string>>(csvContent, {
    header: true,
    delimiter: ";",
    skipEmptyLines: true,
  })

  console.log(`✅ Found ${rows.length} cards\n`)

  // Fetch lookup tables
  const { data: cardTypes } = await supabase.from("card_types").select("id, slug")
  const { data: assetTypes } = await supabase.from("asset_types").select("id, slug")
  const { data: cardSets } = await supabase.from("card_sets").select("id, slug")

  const cardTypeMap = Object.fromEntries(
    (cardTypes ?? []).map((r) => [r.slug, r.id])
  )
  const assetTypeMap = Object.fromEntries(
    (assetTypes ?? []).map((r) => [r.slug, r.id])
  )
  const baseGameId = (cardSets ?? []).find((r) => r.slug === "base-game")?.id

  if (!baseGameId) throw new Error("base-game card set not found in DB. Run SQL migration first!")

  let successCount = 0
  let errorCount = 0

  for (const row of rows) {
    const tipCarte = row["Tip carte"]?.trim()
    const externalId = row["id"]?.trim()
    const imageUrl = row["Poza"]?.trim()
    const nameRo = row["Nume"]?.trim()
    const costRaw = row["Cost"]?.trim()
    const productionRaw = row["Productie"]?.trim()
    const marketingRaw = row["MKT"]?.trim()
    const expenseRaw = row["Cheltuiala"]?.trim()
    const tipActiv = row["Tip Activ"]?.trim()
    const tipCalc = row["Tip calcul"]?.trim()
    const efect = row["Efect special"]?.trim()
    const format = row["Format"]?.trim()

    const slug = getSlug(tipCarte, externalId)
    const nameEn = translateName(nameRo)
    const specialEffectRo = efect
    const specialEffectEn = translateEffect(efect)
    const folder = getStorageFolder(tipCarte)

    const cardTypeId = cardTypeMap[getCardTypeSlug(tipCarte)]
    const assetTypeId = assetTypeMap[getAssetTypeSlug(tipActiv)]

    const cost = costRaw === "n/a" ? null : parseInt(costRaw) || null
    const production = productionRaw === "n/a" ? null : parseInt(productionRaw) || null
    const marketing = marketingRaw === "n/a" ? null : parseInt(marketingRaw) || null
    const expense = expenseRaw === "n/a" ? null : parseInt(expenseRaw) || null

    try {
      console.log(`🃏 [${slug}] ${nameRo}`)

      // Download original image
      const originalBuffer = await downloadImage(imageUrl)

      // Upload 4 variants
      const imagePaths: Record<string, string> = {}
      for (const [sizeName, width] of Object.entries(IMAGE_SIZES)) {
        const resized = await resizeImage(originalBuffer, width)
        const storagePath = `${folder}/${sizeName}/${slug}.webp`

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(storagePath, resized, {
            contentType: "image/webp",
            upsert: true,
          })

        if (uploadError) {
          console.warn(`  ⚠️  Upload error for ${sizeName}: ${uploadError.message}`)
        } else {
          imagePaths[sizeName] = storagePath
          process.stdout.write(`  ✓ ${sizeName}(${width || "orig"}px) `)
        }
      }
      console.log()

      // Insert card into DB
      const { error: insertError } = await supabase.from("cards").upsert(
        {
          card_set_id: baseGameId,
          card_type_id: cardTypeId,
          asset_type_id: assetTypeId,
          external_id: externalId,
          slug,
          name_ro: nameRo,
          name_en: nameEn,
          special_effect_ro: specialEffectRo,
          special_effect_en: specialEffectEn,
          cost,
          production,
          marketing,
          expense,
          calculation: getCalculation(tipCalc),
          format: getFormat(format),
          image_micro: imagePaths["micro"],
          image_thumb: imagePaths["thumb"],
          image_card: imagePaths["card"],
          image_full: imagePaths["full"],
          is_active: true,
          sort_order: parseInt(externalId) || 0,
        },
        { onConflict: "slug" }
      )

      if (insertError) {
        console.error(`  ❌ DB error: ${insertError.message}`)
        errorCount++
      } else {
        console.log(`  ✅ Saved to DB`)
        successCount++
      }
    } catch (err) {
      console.error(`  ❌ Failed for ${slug}: ${(err as Error).message}`)
      errorCount++
    }
  }

  console.log("\n" + "═".repeat(50))
  console.log(`✅ Success: ${successCount} cards`)
  console.log(`❌ Errors:  ${errorCount} cards`)
  console.log("═".repeat(50))
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
