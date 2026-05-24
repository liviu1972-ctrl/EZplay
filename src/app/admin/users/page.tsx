import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { UsersTableClient } from "./UsersTableClient"

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch all users
  const { data: users, error } = await supabase
    .from("user_profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
  }

  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{dict.admin.usersList}</h1>
        <p className="text-muted-foreground mt-2">
          Gestionează utilizatorii și rolurile acestora.
        </p>
      </div>

      <UsersTableClient users={users || []} dict={dict} currentUserId={user.id} />
    </div>
  )
}
