"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import { headers } from "next/headers"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Check if profile exists and has completed onboarding
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("display_name")
      .eq("id", user.id)
      .single()

    if (!profile?.display_name) {
      redirect("/onboarding")
    }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function loginWithGoogle() {
  const supabase = await createClient()
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = host?.includes("localhost") || host?.includes("127.0.0.1") ? "http" : "https"
  const siteUrl = `${protocol}://${host}`
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url)
  }

  if (error) {
    redirect("/login?error=oauth_error")
  }
}
