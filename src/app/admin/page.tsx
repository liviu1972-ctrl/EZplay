import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShieldAlert, GraduationCap } from "lucide-react"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch all users to calculate stats
  const { data: users } = await supabase
    .from("user_profiles")
    .select("role, onboarding_completed")

  const totalUsers = users?.length || 0
  const totalAdmins = users?.filter(u => u.role === "admin" || u.role === "superadmin").length || 0
  const completedOnboarding = users?.filter(u => u.onboarding_completed).length || 0

  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{dict.admin.title}</h1>
        <p className="text-muted-foreground mt-2">
          {dict.admin.subtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Utilizatori</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Administratori</CardTitle>
            <ShieldAlert className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdmins}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Onboarding Completat</CardTitle>
            <GraduationCap className="w-4 h-4 text-brand-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOnboarding}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalUsers > 0 ? Math.round((completedOnboarding / totalUsers) * 100) : 0}% din total
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Include the User Management Component */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{dict.admin.usersList}</CardTitle>
          </CardHeader>
          <CardContent>
             {/* This could be a separate client component for data fetching and role editing */}
             <div className="text-sm text-muted-foreground">
               Vezi secțiunea de management utilizatori. (Pentru a edita roluri, accesează sub-pagina /admin/users)
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
