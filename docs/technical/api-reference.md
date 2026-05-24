---
[AI] This document lists the backend endpoints and Supabase queries. It documents the OAuth callback route (/api/auth/callback), client-side Supabase updates (profile, settings, avatar storage upload), and custom database RPC functions.
[HUMAN] This document lists the technical links and database commands our program uses to read and save data. It explains where the program sends login tokens and how it updates profile information.
---

# API & RPC Reference — EZPlay

## 1. API Routes (Next.js App Router)

### `GET /api/auth/callback`
The OAuth callback endpoint registered in Google Cloud Console. Supabase redirects to this route after Google authentication.

*   **Query Parameters**:
    *   `code` (string): The authorization code returned by Supabase Auth server.
    *   `next` (string, optional): Redirect destination after successful login. Defaults to `/dashboard`.
*   **Behavior**:
    Exchanges the authorization code for a session token, sets the session cookies via the Middleware Client, and redirects the user to their next target destination (Onboarding if first login, otherwise Dashboard).

---

## 2. Common Supabase Operations

The following data-fetching operations are standardized across Phase 1:

### Profile Fetch (Server Component)
Used in Layouts and Dashboards to fetch the current user's profile role and display name.
```typescript
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (user) {
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();
}
```

### Avatar Upload (Client Component)
Uploads an image file to Supabase Storage and updates the user profile link.
```typescript
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

// 1. Upload to Storage bucket 'avatars'
const { data, error } = await supabase.storage
  .from("avatars")
  .upload(`${userId}/avatar.png`, file, {
    upsert: true,
  });

if (data) {
  // 2. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from("avatars")
    .getPublicUrl(`${userId}/avatar.png`);
    
  // 3. Save to profile
  await supabase
    .from("user_profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);
}
```

---

## 3. Database Functions (RPCs)

### `public.process_token_transaction(p_user_id UUID, p_token_type TEXT, p_delta INTEGER, p_reason TEXT)`
Triggers a safe transaction ledger update.
*   **Arguments**:
    *   `p_user_id`: Target user.
    *   `p_token_type`: `ezc` or `ezg`.
    *   `p_delta`: The change amount.
    *   `p_reason`: Ledger description.
*   **Behavior**:
    Updates the wallet balance within an ACID transaction and adds a matching line in `public.token_transactions`. Fails if the user's wallet doesn't have enough balance (preventing negative balances).
