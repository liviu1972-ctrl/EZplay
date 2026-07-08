"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function updateOnboardingProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const displayName = formData.get("display_name") as string
  const bio = formData.get("bio") as string
  
  // Extract selected skills from formData
  // For multiple checkboxes, we can iterate over formData entries or use a specific format
  const skillInterests: string[] = []
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("skill_") && value === "on") {
      skillInterests.push(key.replace("skill_", ""))
    }
  }

  const { error } = await supabase
    .from("user_profiles")
    .update({
      display_name: displayName,
      bio: bio || null,
      skill_interests: skillInterests,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}
