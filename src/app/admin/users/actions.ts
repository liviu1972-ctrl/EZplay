"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"

export async function updateUserRole(userId: string, newRole: string) {
  // 1. Verify caller is admin
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    return { error: "Forbidden: Not an admin" }
  }

  // 2. Update role using service role key
  const adminSupabase = createAdminClient()
  const { error } = await adminSupabase
    .from("user_profiles")
    .update({ role: newRole })
    .eq("id", userId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/users")
  return { success: true }
}
