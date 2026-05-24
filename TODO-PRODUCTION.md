# TODO List — Lansare în Producție (EZPlay)

Acest fișier conține configurări importante de branding, securitate și infrastructură care trebuie realizate înainte de lansarea oficială a platformei în producție.

## Autentificare & Branding (Google OAuth)

- [ ] **Configurare Custom Domain în Supabase**
  * Activare Add-on *Custom Domain* în setările Supabase (*Project Settings -> Add-ons*).
  * Creare record CNAME în DNS (ex: `auth.ezplay.org` -> `omxcrlghlusgapkkrtgd.supabase.co`).
  * Actualizare URL în Supabase pentru a folosi noul subdomeniu.

- [ ] **Actualizare Redirect URIs în Google Cloud Console**
  * Înlocuire URL implicit de callback cu cel personalizat: `https://auth.ezplay.org/auth/v1/callback`
  * Adăugare `ezplay.org` la *Authorized Domains*.

- [ ] **Verificarea Brandului în Google Cloud Console**
  * Completare ecran consimțământ (*OAuth consent screen*) cu Logo-ul EZPlay, link-urile de Termeni și Condiții și Politica de Confidențialitate.
  * Trimiterea aplicației spre verificare la Google pentru a elimina avertismentul de „Testing/Aplicație neverificată” și a afișa corect numele brandului.

- [ ] **Configurare Mediu de Producție în `.env` pe Vercel**
  * Setare `NEXT_PUBLIC_SITE_URL` la `https://ezplay.org` (sau domeniul final de producție).

- [ ] **Configurare Provider SMTP Custom**
  * Legare serviciu email de producție (ex. Resend, Sendgrid, Postmark) în Supabase (*Authentication -> Providers -> Email*) pentru a ridica limitele de trimitere emailuri.
