---
status: Working
version: "0.1"
updated: 2026-07-17
canonical_for: technical routes and access rules
---

# Rute și Acces

(Auditat pe branch `dev`, commit `338dab3`)

## Inventarul Rutelor

Observat din output-ul generat de compilare (`pnpm build`) și analizat static în `middleware.ts`.

### 1. Rute Publice (Informaționale și de Platformă)
- `/`, `/about`, `/contact`, `/development`
- `/experiences`, `/experiences/introduction`
- `/for/organizations`, `/for/parents`, `/for/young-people`
- `/how-we-learn`, `/platform`, `/program`, `/research`, `/tools`

### 2. Rute de Autentificare
- `/login`
- `/register`
- `/auth/callback` (pentru logarea OAuth și confirmarea emailului)

### 3. Rute Protejate (Necesită Autentificare Supabase)
Aceste rute sunt blocate la nivel de rețea prin `middleware.ts`. Fără o sesiune validă, utilizatorul este redirecționat spre `/login`.
- `/dashboard`, `/dashboard/profile`, `/dashboard/settings`
- `/onboarding`
- `/ezplay` (EZPLAY Deckbuilder, jocul de bază)

### 4. Rute Administrative (Necesită rol de 'admin')
- `/admin`, `/admin/cards`, `/admin/users`
Accesul se face prin interogarea `user_profiles.role` în interiorul `middleware.ts`. Fără rolul `"admin"`, utilizatorul este deviat către `/dashboard`.

### 5. Rute API
- `/api/cards/upload` (Punct terminal pentru acțiuni din panoul de admin / operații backend).
  > [!WARNING]
  > **Risc de Securitate Critic**: Endpoint-ul `POST /api/cards/upload` nu verifică sesiunea sau rolul în handler și nu este inclus între rutele private din middleware. Folosește clientul cu `service_role`, ceea ce permite scrierea neautorizată în bucket-ul `cards`. Aceasta este o vulnerabilitate cu prioritate ridicată ce trebuie abordată separat, dar nu va fi reparată în acest task.

## Limite de Acces și Middleware
- **Onboarding Obligatoriu**: Rutele protejate sunt condiționate de flag-ul `onboarding_completed`. **Nealiniere observată**: Middleware-ul aplică verificarea `onboarding_completed` și unor rute publice care nu se află în lista sa restrânsă de excepții. De exemplu, lista include `/how-it-works`, deși ruta curentă a site-ului este `/how-we-learn`.
- **Internaționalizare (i18n)**: Rutele sunt deservite ținând cont de un cookie de limbă (`LANGUAGE_COOKIE` = `NEXT_LOCALE`), setat implicit pe `ro` din `middleware.ts` cu o valabilitate de 1 an.

> [!NOTE]
> Protecția la nivel de rute este complet delegată middleware-ului, ceea ce înseamnă că protecția intervine înainte ca pagina să fie redată de React. Verificările de autorizare pe nivel de acces de date sunt acoperite de RLS (Supabase Row Level Security).
