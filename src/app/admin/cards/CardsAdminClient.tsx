"use client"

import * as React from "react"
import { useState, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { 
  Plus, 
  Search, 
  Edit, 
  Check, 
  X, 
  Upload, 
  Coins, 
  Settings as Wrench, 
  Megaphone, 
  DollarSign, 
  Loader2, 
  Layout, 
  RotateCw,
  Eye
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"

interface CardsAdminClientProps {
  initialCards: any[]
  cardTypes: any[]
  assetTypes: any[]
  cardSets: any[]
  lang: string
  dict: any
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://omxcrlghlusgapkkrtgd.supabase.co"

export function CardsAdminClient({ initialCards, cardTypes, assetTypes, cardSets, lang, dict }: CardsAdminClientProps) {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Table filters state
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [assetFilter, setAssetFilter] = useState("all")
  const [setFilter, setSetFilter] = useState("all")

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(false)
  const [editingCard, setEditingCard] = useState<any | null>(null) // null = Create Mode

  // Form values
  const [formData, setFormData] = useState({
    slug: "",
    external_id: "",
    name_ro: "",
    name_en: "",
    special_effect_ro: "",
    special_effect_en: "",
    cost: "",
    production: "",
    marketing: "",
    expense: "",
    calculation: "additive",
    format: "portrait",
    card_type_id: "",
    asset_type_id: "",
    card_set_id: "",
    sort_order: 0,
    is_active: true,
  })

  // Selected file for upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Image URL helper
  const getImageUrl = (path: string | null) => {
    if (!path) return "/placeholder-card.png"
    return `${SUPABASE_URL}/storage/v1/object/public/cards/${path}`
  }

  // Filtered cards list
  const filteredCards = useMemo(() => {
    return initialCards.filter((card) => {
      const q = search.toLowerCase()
      const matchesSearch = 
        !search.trim() ||
        card.name_ro?.toLowerCase().includes(q) ||
        card.name_en?.toLowerCase().includes(q) ||
        card.slug?.toLowerCase().includes(q) ||
        card.external_id?.toLowerCase().includes(q)

      const matchesType = typeFilter === "all" || card.card_types?.slug === typeFilter
      const matchesAsset = assetFilter === "all" || card.asset_types?.slug === assetFilter
      const matchesSet = setFilter === "all" || card.card_sets?.slug === setFilter

      return matchesSearch && matchesType && matchesAsset && matchesSet
    })
  }, [initialCards, search, typeFilter, assetFilter, setFilter])

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingCard(null)
    setSelectedFile(null)
    setImagePreview(null)
    setFormData({
      slug: "",
      external_id: "",
      name_ro: "",
      name_en: "",
      special_effect_ro: "",
      special_effect_en: "",
      cost: "",
      production: "",
      marketing: "",
      expense: "",
      calculation: "additive",
      format: "portrait",
      card_type_id: cardTypes[0]?.id?.toString() || "",
      asset_type_id: assetTypes[0]?.id?.toString() || "",
      card_set_id: cardSets[0]?.id?.toString() || "",
      sort_order: initialCards.length + 1,
      is_active: true,
    })
    setIsModalOpen(true)
  }

  // Open modal for Edit
  const handleOpenEdit = (card: any) => {
    setEditingCard(card)
    setSelectedFile(null)
    setImagePreview(card.image_card ? getImageUrl(card.image_card) : null)
    setFormData({
      slug: card.slug || "",
      external_id: card.external_id || "",
      name_ro: card.name_ro || "",
      name_en: card.name_en || "",
      special_effect_ro: card.special_effect_ro || "",
      special_effect_en: card.special_effect_en || "",
      cost: card.cost !== null ? card.cost.toString() : "",
      production: card.production !== null ? card.production.toString() : "",
      marketing: card.marketing !== null ? card.marketing.toString() : "",
      expense: card.expense !== null ? card.expense.toString() : "",
      calculation: card.calculation || "additive",
      format: card.format || "portrait",
      card_type_id: card.card_type_id?.toString() || "",
      asset_type_id: card.asset_type_id?.toString() || "",
      card_set_id: card.card_set_id?.toString() || "",
      sort_order: card.sort_order || 0,
      is_active: card.is_active ?? true,
    })
    setIsModalOpen(true)
  }

  // Image Selection Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Form Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug when writing external_id or card type
    if (name === "external_id") {
      const type = cardTypes.find((t) => t.id.toString() === formData.card_type_id)
      const prefix = type?.slug === "standard" ? "s" : type?.slug === "event" ? "e" : "a"
      setFormData((prev) => ({ ...prev, slug: `${prefix}${value.trim()}` }))
    }
  }

  // Handle Select Changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Re-generate slug if card type changed
    if (name === "card_type_id") {
      const type = cardTypes.find((t) => t.id.toString() === value)
      const prefix = type?.slug === "standard" ? "s" : type?.slug === "event" ? "e" : "a"
      setFormData((prev) => ({ ...prev, slug: `${prefix}${prev.external_id.trim()}` }))
    }
  }

  // Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imagePaths: Record<string, string> = {}

      // 1. Upload image if selected
      if (selectedFile) {
        setUploadProgress(true)
        const fileData = new FormData()
        fileData.append("file", selectedFile)
        fileData.append("slug", formData.slug)
        
        // Find set slug for folder name
        const set = cardSets.find((s) => s.id.toString() === formData.card_set_id)
        fileData.append("folder", set?.slug || "base-game")

        const uploadRes = await fetch("/api/cards/upload", {
          method: "POST",
          body: fileData,
        })

        if (!uploadRes.ok) {
          const err = await uploadRes.json()
          throw new Error(err.error || "Failed to upload image")
        }

        const uploadData = await uploadRes.json()
        imagePaths = uploadData.paths
        setUploadProgress(false)
      }

      // Convert number inputs
      const parseStat = (val: string) => (val.trim() === "" ? null : parseInt(val))

      const cardPayload: any = {
        slug: formData.slug.trim(),
        external_id: formData.external_id.trim(),
        name_ro: formData.name_ro.trim(),
        name_en: formData.name_en.trim(),
        special_effect_ro: formData.special_effect_ro.trim() || null,
        special_effect_en: formData.special_effect_en.trim() || null,
        cost: parseStat(formData.cost),
        production: parseStat(formData.production),
        marketing: parseStat(formData.marketing),
        expense: parseStat(formData.expense),
        calculation: formData.calculation,
        format: formData.format,
        card_type_id: parseInt(formData.card_type_id),
        asset_type_id: parseInt(formData.asset_type_id),
        card_set_id: parseInt(formData.card_set_id),
        sort_order: formData.sort_order,
        is_active: formData.is_active,
      }

      // Merge newly uploaded image paths
      if (selectedFile && imagePaths.card) {
        cardPayload.image_micro = imagePaths.micro
        cardPayload.image_thumb = imagePaths.thumb
        cardPayload.image_card = imagePaths.card
        cardPayload.image_full = imagePaths.full
      }

      // 2. Insert or Update in Supabase
      if (editingCard) {
        // Update
        const { error: updateError } = await supabase
          .from("cards")
          .update(cardPayload)
          .eq("id", editingCard.id)

        if (updateError) throw updateError
      } else {
        // Create (upsert on slug)
        const { error: insertError } = await supabase
          .from("cards")
          .upsert(cardPayload, { onConflict: "slug" })

        if (insertError) throw insertError
      }

      setIsModalOpen(false)
      router.refresh()
      
      // Success alert
      alert(editingCard ? "Carte actualizată cu succes!" : "Carte adăugată cu succes!")
    } catch (err: any) {
      console.error(err)
      alert(`Eroare la salvare: ${err.message}`)
    } finally {
      setIsSubmitting(false)
      setUploadProgress(false)
    }
  }

  // Quick toggle active status directly in table
  const handleToggleActive = async (cardId: number, currentVal: boolean) => {
    try {
      const { error } = await supabase
        .from("cards")
        .update({ is_active: !currentVal })
        .eq("id", cardId)

      if (error) throw error
      router.refresh()
    } catch (err: any) {
      alert(`Eroare: ${err.message}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Filter / Action Header ── */}
      <div className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/80 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap md:flex-nowrap gap-3 items-center w-full md:max-w-3xl">
          {/* Search */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Caută cod, nume..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 bg-background/50 border-border/60"
            />
          </div>

          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || "all")}>
            <SelectTrigger className="w-[140px] h-10 bg-background/50 border-border/60">
              <SelectValue placeholder="Tip Carte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate Tipurile</SelectItem>
              {cardTypes.map((t) => (
                <SelectItem key={t.id} value={t.slug}>{t.name_ro}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Asset Filter */}
          <Select value={assetFilter} onValueChange={(val) => setAssetFilter(val || "all")}>
            <SelectTrigger className="w-[155px] h-10 bg-background/50 border-border/60">
              <SelectValue placeholder="Tip Activ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate Activele</SelectItem>
              {assetTypes.map((a) => (
                <SelectItem key={a.id} value={a.slug}>{a.name_ro}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Set Filter */}
          <Select value={setFilter} onValueChange={(val) => setSetFilter(val || "all")}>
            <SelectTrigger className="w-[140px] h-10 bg-background/50 border-border/60">
              <SelectValue placeholder="Pachet/Set" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate Seturile</SelectItem>
              {cardSets.map((s) => (
                <SelectItem key={s.id} value={s.slug}>{s.name_ro}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Create Button */}
        <Button onClick={handleOpenCreate} className="bg-brand-orange text-white hover:bg-brand-orange/90 w-full md:w-auto h-10 gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          Adaugă Carte
        </Button>
      </div>

      {/* ── Table Grid ── */}
      <div className="border border-border/80 rounded-2xl overflow-hidden bg-card/45 backdrop-blur-sm shadow-md">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[80px]">Cod</TableHead>
              <TableHead className="w-[60px]">Imagine</TableHead>
              <TableHead>Nume RO</TableHead>
              <TableHead>Nume EN</TableHead>
              <TableHead className="w-[100px]">Tip Carte</TableHead>
              <TableHead className="w-[130px]">Tip Activ</TableHead>
              <TableHead className="w-[120px] text-center">Stats</TableHead>
              <TableHead className="w-[70px] text-center">Activ</TableHead>
              <TableHead className="w-[80px] text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                  Nu s-a găsit nicio carte conform criteriilor.
                </TableCell>
              </TableRow>
            ) : (
              filteredCards.map((card) => (
                <TableRow key={card.id} className="hover:bg-muted/30">
                  {/* Slug / Cod */}
                  <TableCell className="font-mono text-xs font-semibold">{card.slug}</TableCell>
                  
                  {/* Thumbnail Image */}
                  <TableCell>
                    <div className="relative w-9 h-12 rounded border border-border/60 overflow-hidden bg-zinc-900 flex items-center justify-center">
                      <Image
                        src={getImageUrl(card.image_thumb)}
                        alt={card.name_ro}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                  </TableCell>

                  {/* Name RO */}
                  <TableCell className="font-semibold">{card.name_ro}</TableCell>

                  {/* Name EN */}
                  <TableCell className="text-muted-foreground italic text-xs">{card.name_en}</TableCell>

                  {/* Card Type Badge */}
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px] capitalize">
                      {card.card_types?.name_ro}
                    </Badge>
                  </TableCell>

                  {/* Asset Type Badge */}
                  <TableCell>
                    {card.asset_types && (
                      <span className="text-xs text-muted-foreground">
                        {card.asset_types.name_ro}
                      </span>
                    )}
                  </TableCell>

                  {/* Stats values */}
                  <TableCell>
                    <div className="flex gap-2 justify-center text-xs">
                      {card.cost !== null && (
                        <span className="flex items-center text-brand-yellow font-bold" title="Cost">
                          <Coins className="w-3.5 h-3.5 mr-0.5" />
                          {card.cost}
                        </span>
                      )}
                      {card.production !== null && (
                        <span className="flex items-center text-brand-green font-bold" title="Producție">
                          <Wrench className="w-3.5 h-3.5 mr-0.5" />
                          +{card.production}
                        </span>
                      )}
                      {card.marketing !== null && (
                        <span className="flex items-center text-brand-orange font-bold" title="Marketing">
                          <Megaphone className="w-3.5 h-3.5 mr-0.5" />
                          +{card.marketing}
                        </span>
                      )}
                      {card.expense !== null && (
                        <span className="flex items-center text-brand-teal font-bold" title="Cheltuială">
                          <DollarSign className="w-3.5 h-3.5 mr-0.5" />
                          {card.expense}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Active toggle */}
                  <TableCell className="text-center">
                    <Checkbox
                      checked={card.is_active ?? true}
                      onCheckedChange={() => handleToggleActive(card.id, card.is_active ?? true)}
                    />
                  </TableCell>

                  {/* Edit action */}
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(card)} className="h-8 w-8 hover:text-brand-orange">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── CREATE / EDIT MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-950 border border-zinc-800 text-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-850 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {editingCard ? `Editează Cartea: ${formData.slug}` : "Adaugă Carte Nouă"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-850"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Image Upload Area */}
                <div className="md:col-span-1 flex flex-col space-y-3 items-center justify-center border border-dashed border-zinc-800 rounded-xl p-4 bg-zinc-900/50">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Imagine Carte</span>
                  
                  <div className="relative w-full max-w-[150px] aspect-[3/4] rounded-lg border border-zinc-700 bg-zinc-950 overflow-hidden flex items-center justify-center">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center p-2 flex flex-col items-center justify-center text-zinc-500 text-xs">
                        <Upload className="w-8 h-8 mb-2 text-zinc-600" />
                        Apasă pe butonul de mai jos pentru a alege
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full bg-zinc-900 border-zinc-800 text-xs text-zinc-300 hover:text-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? "Schimbă Imaginea" : "Alege Fișier"}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <span className="text-[10px] text-zinc-500 text-center">Format acceptat: PNG/JPG/WebP. Se vor genera automat cele 4 dimensiuni optimizate.</span>
                </div>

                {/* Main Fields */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Card Type Select */}
                    <div className="space-y-1.5">
                      <Label className="text-zinc-400 text-xs font-semibold">Tip Carte</Label>
                      <Select 
                        value={formData.card_type_id} 
                        onValueChange={(val) => handleSelectChange("card_type_id", val || "")}
                      >
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-10 text-white">
                          <SelectValue placeholder="Alege Tip" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-950 border-zinc-850 text-white">
                          {cardTypes.map((t) => (
                            <SelectItem key={t.id} value={t.id.toString()}>{t.name_ro}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Asset Type Select */}
                    <div className="space-y-1.5">
                      <Label className="text-zinc-400 text-xs font-semibold">Tip Activ</Label>
                      <Select 
                        value={formData.asset_type_id} 
                        onValueChange={(val) => handleSelectChange("asset_type_id", val || "")}
                      >
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-10 text-white">
                          <SelectValue placeholder="Alege Activ" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-950 border-zinc-850 text-white">
                          {assetTypes.map((a) => (
                            <SelectItem key={a.id} value={a.id.toString()}>{a.name_ro}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Card Set */}
                    <div className="col-span-2 space-y-1.5">
                      <Label className="text-zinc-400 text-xs font-semibold">Set / Extensie</Label>
                      <Select 
                        value={formData.card_set_id} 
                        onValueChange={(val) => handleSelectChange("card_set_id", val || "")}
                      >
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-10 text-white">
                          <SelectValue placeholder="Alege Set" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-950 border-zinc-850 text-white">
                          {cardSets.map((s) => (
                            <SelectItem key={s.id} value={s.id.toString()}>{s.name_ro}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* External ID */}
                    <div className="space-y-1.5">
                      <Label className="text-zinc-400 text-xs font-semibold">ID / Cod (Ex. 101)</Label>
                      <Input
                        name="external_id"
                        value={formData.external_id}
                        onChange={handleInputChange}
                        required
                        className="bg-zinc-900 border-zinc-800 h-10 text-white placeholder:text-zinc-600"
                        placeholder="101"
                      />
                    </div>
                  </div>

                  {/* Slug Preview */}
                  <div className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>Slug generat:</span>
                    <span className="text-brand-orange font-bold">{formData.slug || "n/a"}</span>
                  </div>

                  {/* Card Names */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-zinc-400 text-xs font-semibold">Nume (Română)</Label>
                      <Input
                        name="name_ro"
                        value={formData.name_ro}
                        onChange={handleInputChange}
                        required
                        className="bg-zinc-900 border-zinc-800 h-10 text-white placeholder:text-zinc-600"
                        placeholder="Ex. Supervizor fabrică"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-zinc-400 text-xs font-semibold">Name (English)</Label>
                      <Input
                        name="name_en"
                        value={formData.name_en}
                        onChange={handleInputChange}
                        required
                        className="bg-zinc-900 border-zinc-800 h-10 text-white placeholder:text-zinc-600"
                        placeholder="Ex. Factory Supervisor"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats values inputs */}
              <div className="space-y-2 border-t border-zinc-900 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Statistici Carte (Lasă gol dacă nu se aplică)</h4>
                
                <div className="grid grid-cols-4 gap-4">
                  {/* Cost */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-900/80">
                    <Label className="text-brand-yellow text-xs font-bold flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5" />
                      Cost
                    </Label>
                    <Input
                      name="cost"
                      type="number"
                      value={formData.cost}
                      onChange={handleInputChange}
                      className="bg-zinc-950 border-zinc-800 h-9 text-white"
                      placeholder="n/a"
                    />
                  </div>

                  {/* Production */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-900/80">
                    <Label className="text-brand-green text-xs font-bold flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5" />
                      Producție
                    </Label>
                    <Input
                      name="production"
                      type="number"
                      value={formData.production}
                      onChange={handleInputChange}
                      className="bg-zinc-950 border-zinc-800 h-9 text-white"
                      placeholder="n/a"
                    />
                  </div>

                  {/* Marketing */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-900/80">
                    <Label className="text-brand-orange text-xs font-bold flex items-center gap-1">
                      <Megaphone className="w-3.5 h-3.5" />
                      Marketing
                    </Label>
                    <Input
                      name="marketing"
                      type="number"
                      value={formData.marketing}
                      onChange={handleInputChange}
                      className="bg-zinc-950 border-zinc-800 h-9 text-white"
                      placeholder="n/a"
                    />
                  </div>

                  {/* Expense */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-900/80">
                    <Label className="text-brand-teal text-xs font-bold flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      Cheltuială
                    </Label>
                    <Input
                      name="expense"
                      type="number"
                      value={formData.expense}
                      onChange={handleInputChange}
                      className="bg-zinc-950 border-zinc-800 h-9 text-white"
                      placeholder="n/a"
                    />
                  </div>
                </div>
              </div>

              {/* Special Effects translation area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-900 pt-4">
                <div className="space-y-1.5">
                  <Label className="text-zinc-400 text-xs font-semibold">Efect Special (Română)</Label>
                  <Textarea
                    name="special_effect_ro"
                    value={formData.special_effect_ro}
                    onChange={handleInputChange}
                    rows={3}
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 resize-none text-xs leading-relaxed"
                    placeholder="Descrie efectul special din joc..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-zinc-400 text-xs font-semibold">Special Effect (English)</Label>
                  <Textarea
                    name="special_effect_en"
                    value={formData.special_effect_en}
                    onChange={handleInputChange}
                    rows={3}
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 resize-none text-xs leading-relaxed"
                    placeholder="Describe the special effect in english..."
                  />
                </div>
              </div>

              {/* Mechanics & Configuration */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-900 pt-4 items-center">
                {/* Calculation */}
                <div className="space-y-1.5">
                  <Label className="text-zinc-400 text-xs font-semibold flex items-center gap-1">
                    <RotateCw className="w-3 h-3" />
                    Calcul Tip
                  </Label>
                  <Select 
                    value={formData.calculation} 
                    onValueChange={(val) => handleSelectChange("calculation", val || "additive")}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 h-9 text-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border-zinc-850 text-white">
                      <SelectItem value="additive" className="text-xs">Aditiv (+)</SelectItem>
                      <SelectItem value="choice" className="text-xs">Alegere (SAU)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Format */}
                <div className="space-y-1.5">
                  <Label className="text-zinc-400 text-xs font-semibold flex items-center gap-1">
                    <Layout className="w-3 h-3" />
                    Format layout
                  </Label>
                  <Select 
                    value={formData.format} 
                    onValueChange={(val) => handleSelectChange("format", val || "portrait")}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 h-9 text-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border-zinc-850 text-white">
                      <SelectItem value="portrait" className="text-xs">Portrait (3:4)</SelectItem>
                      <SelectItem value="landscape" className="text-xs">Landscape (4:3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Order */}
                <div className="space-y-1.5">
                  <Label className="text-zinc-400 text-xs font-semibold">Ordine Sortare</Label>
                  <Input
                    name="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={handleInputChange}
                    className="bg-zinc-900 border-zinc-800 h-9 text-white"
                  />
                </div>

                {/* Is Active Status checkbox */}
                <div className="flex items-center gap-2 pt-5">
                  <Checkbox
                    id="is_active_input"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => 
                      setFormData((prev) => ({ ...prev, is_active: checked === true }))
                    }
                  />
                  <Label htmlFor="is_active_input" className="text-zinc-300 text-xs font-semibold cursor-pointer">
                    Carte activă în joc
                  </Label>
                </div>
              </div>

            </form>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-850 bg-zinc-900/20 flex gap-3 justify-end">
              <Button 
                variant="ghost" 
                className="border border-zinc-800 text-zinc-400 hover:text-white"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Anulează
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || uploadProgress}
                className="bg-brand-orange text-white hover:bg-brand-orange/90 gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {uploadProgress ? "Se încarcă pozele..." : "Se salvează..."}
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Salvează Cartea
                  </>
                )}
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
