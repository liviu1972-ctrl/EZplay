import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { OnboardingWizard } from "./OnboardingWizard"

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch current profile to pre-fill the form if possible
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profile?.onboarding_completed) {
    redirect("/dashboard")
  }

  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-12">
      <OnboardingWizard dict={dict} initialProfile={profile} />
    </div>
  )
}
