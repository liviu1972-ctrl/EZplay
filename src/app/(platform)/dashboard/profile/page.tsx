import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function ProfilePage() {
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
        <h1 className="text-3xl font-bold tracking-tight">{dict.nav.profile}</h1>
        <p className="text-muted-foreground mt-2">
          Gestionează detaliile profilului tău public.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="w-24 h-24 mx-auto border-4 border-background shadow-sm">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback className="text-3xl bg-brand-orange text-white">
                  {profile?.display_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{profile?.display_name}</CardTitle>
            <CardDescription className="capitalize font-medium text-brand-green">
              {profile?.role || "Builder"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-sm text-muted-foreground mt-2">
              Membru din {new Date(profile?.created_at || "").toLocaleDateString(lang)}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Despre mine</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Biografie</h3>
              <p className="text-sm">
                {profile?.bio || "Nicio biografie adăugată încă."}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Domenii de interes</h3>
              <div className="flex flex-wrap gap-2">
                {profile?.skill_interests?.map((skill: string) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium uppercase tracking-wider">
                    {skill}
                  </span>
                )) || <span className="text-sm">Nu ai selectat interese.</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
