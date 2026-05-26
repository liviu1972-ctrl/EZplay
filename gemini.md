# Rules of Engagement & Workflow Guidelines for AI Agent (Gemini)

This file defines the workflow preferences and development guidelines agreed upon with the developer. **Every AI agent session must read this file upon startup and strictly follow these rules.**

---

## 1. Local Development First (Strict Rule)
*   **All development modifications must be done locally.**
*   Work must be kept on the local **`dev`** branch (or appropriate local feature branches).
*   **NEVER** switch to the `main` branch, merge changes into `main`, or push to `origin/main` unless the user **explicitly** instructs you to do so.

---

## 2. Local Verification
*   After making any code changes, **always** run the local Next.js development server:
    *   Command: `pnpm dev`
*   Ask the user to verify the changes locally at `http://localhost:3000` before proceeding.
*   Optionally run `pnpm build` locally to verify that there are no static analysis, TypeScript, or Next.js build errors.

---

## 3. Supabase & Database Schema Workflow
*   DDL changes or database schema modifications must be written as migration files first under `supabase/migrations/`.
*   Verify connections locally or run checks before proposing schema changes to the remote Supabase project.

---

## 4. Documentation Integrity
*   Keep technical and application documentation up to date inside the `docs/` folder whenever features or schemas change.
*   Ensure RLS policies and triggers are properly documented.
