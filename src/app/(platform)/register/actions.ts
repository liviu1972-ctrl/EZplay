"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const displayName = formData.get("display_name") as string

  console.log("Register action triggered for:", email, displayName)
  
  let signUpData: any = null
  try {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    })

    console.log("Supabase signUp response - data:", !!data, "error:", error?.message)

    if (error) {
      return { error: error.message }
    }
    signUpData = data
  } catch (err: any) {
    console.error("Uncaught exception in register action:", err)
    return { error: err.message || "A apărut o eroare neașteptată." }
  }

  // After registration, redirect to onboarding if user is created
  // In some cases (like email confirmation required), user might be null or session might be null.
  if (signUpData?.session) {
    revalidatePath("/", "layout")
    redirect("/onboarding")
  } else {
    // If email confirmation is required, we redirect to a check-email page or show message
    // For now, redirect to login with a message (can be handled via search params)
    redirect("/login?message=Check your email to verify your account")
  }
}
