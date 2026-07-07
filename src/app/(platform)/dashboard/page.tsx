import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Diamond } from "lucide-react"

export default async function DashboardPage() {
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

  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .single()

  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {dict.dashboard.welcome.replace("{name}", profile?.display_name || "User")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {dict.dashboard.statusRole.replace("{role}", profile?.role || "Builder")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-brand-orange/5 border-brand-orange/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              {dict.dashboard.ezc}
            </CardTitle>
            <Coins className="w-4 h-4 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-orange">
              {wallet?.ezc_balance || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {dict.dashboard.balance}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-brand-blue/5 border-brand-blue/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              {dict.dashboard.ezg}
            </CardTitle>
            <Diamond className="w-4 h-4 text-brand-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-blue">
              {wallet?.ezg_balance || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {dict.dashboard.balance}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.skillsOverview}</CardTitle>
            <CardDescription>{dict.dashboard.placeholderPhase2}</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center border-t border-dashed bg-muted/20">
            <p className="text-muted-foreground text-sm">Radar chart coming in Phase 2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.recentActivity}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {dict.dashboard.noActivity}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
