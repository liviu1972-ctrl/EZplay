import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { LanguageToggle } from "@/components/layout/LanguageToggle"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{dict.settings.title}</h1>
        <p className="text-muted-foreground mt-2">
          {dict.settings.subtitle}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{dict.settings.profileInfo}</CardTitle>
            <CardDescription>Actualizează informațiile tale de bază</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="display_name">Nume afișat</Label>
              <Input id="display_name" defaultValue={profile?.display_name || ""} disabled />
              <p className="text-xs text-muted-foreground">Contactează un admin pentru a schimba numele.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user.email} disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.settings.preferences}</CardTitle>
            <CardDescription>Alege cum vrei să experimentezi aplicația</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">{dict.settings.theme}</Label>
                <p className="text-sm text-muted-foreground">Schimbă aspectul vizual (Luminos/Întunecat/Sistem)</p>
              </div>
              <ThemeToggle />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">{dict.settings.language}</Label>
                <p className="text-sm text-muted-foreground">Alege limba interfeței (Română/Engleză)</p>
              </div>
              <LanguageToggle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
