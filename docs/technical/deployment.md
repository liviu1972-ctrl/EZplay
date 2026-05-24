---
[AI] This document covers the deployment pipeline. It details the required environment variables (.env.local), GitHub repository setup, Vercel configuration, and deployment workflow.
[HUMAN] This document explains how we launch the application on Vercel so it can be accessed on the internet. It lists the private configuration keys we need to copy to Vercel and how every code save on GitHub automatically updates the live website.
---

# Deployment Guide — EZPlay

## 1. Environment Variables

To run the application, you must define the following variables.

### Local Config (`.env.local`)
Create a file named `.env.local` in the project root folder. **Never commit this file to GitHub!** It is already ignored by default in `.gitignore`.

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR_ANON_KEY]"

# Admin / Server Secret Key (used only in Server Components / API)
SUPABASE_SERVICE_ROLE_KEY="[YOUR_SERVICE_ROLE_KEY]"
```

*   `NEXT_PUBLIC_` prefix makes variables accessible to browser code.
*   `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS policies. It must remain secret.

---

## 2. GitHub Connection

1.  Initialize git locally if not already done:
    ```bash
    git init
    git add .
    git commit -m "feat: init foundation setup"
    ```
2.  Link your local repository to the GitHub repository:
    ```bash
    git remote add origin https://github.com/liviu1972-ctrl/ezplay.git
    git branch -M main
    git push -u origin main
    ```

---

## 3. Vercel Dashboard Configuration

Deploy the project on Vercel:

1.  Log in to [Vercel](https://vercel.com) using your GitHub account (`liviu1972-ctrl`).
2.  Click **Add New...** -> **Project**.
3.  Import the repository `ezplay`.
4.  Framework Preset: Select **Next.js**.
5.  Open the **Environment Variables** section and add the three variables listed in section 1.
6.  Click **Deploy**.
7.  Vercel will build the project and assign a preview URL (e.g., `ezplay-xyz.vercel.app`).

---

## 4. Production Deployment Workflow

Once the project is linked, deployment is automated:

1.  Make your changes locally.
2.  Commit changes: `git commit -m "feat: added new feature"`
3.  Push to main branch: `git push origin main`
4.  Vercel will detect the push and automatically deploy the updates to production.
