# GitHub Copilot Instructions — EZPlay

When assisting with code development in this project, you must adhere to the following rules:

1. **Local Branch Rule**:
   - Keep all changes on the local `dev` branch.
   - Do NOT commit, checkout, or push to the `main` branch unless the user explicitly commands it.

2. **Verification Workflow**:
   - Always run the local development server (`pnpm dev`) for testing.
   - Instruct the user to inspect changes locally at `http://localhost:3000`.
   - Run `pnpm build` locally to verify that there are no static analysis, TypeScript, or Next.js build errors.

3. **Supabase Schema Workflow**:
   - Save all database schema changes under `supabase/migrations/` as migration files.

4. **User Asset Transfer Directory**:
   - The directory `public/images/transfer images from user/` is for the user to provide files to the AI.
   - You can read, process, move, or delete **files** inside this folder, but **NEVER delete the folder itself**.

