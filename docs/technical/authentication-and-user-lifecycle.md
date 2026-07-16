---
status: Working
version: "0.2"
updated: 2026-07-17
canonical_for: technical authentication and user lifecycle
---

# Autentificare și Ciclul de Viață al Utilizatorului

(Auditat pe branch `dev`, commit `338dab3`)

## Tehnologie de Autentificare
- Integrarea se realizează prin **Supabase Auth** cu pachetul `@supabase/ssr`.
- Autentificarea combină generarea server-side a sesiunilor, actualizate prin `middleware.ts`.
- Gestiunea globală a contextului pe client se face prin `AuthContext.tsx` (`src/features/ezplay/platform/auth/`).

## Stadiile Ciclului de Viață

### 1. Înregistrare și Login (`/register`, `/login`)
- Verificat static în cod: exista un înlocuitor pentru login simulat care a fost eliminat. În prezent, formularele reale din UI comunică cu backend-ul Supabase.
- Formularele observate apelează operațiile Supabase pentru email și parolă. Ruta `/auth/callback` schimbă un cod de autentificare pentru sesiune; funcționarea completă a acestor fluxuri nu a fost testată.

### 2. Onboarding (`/onboarding`)
- Utilizatorii nou înregistrați sunt deviați automat de `middleware.ts` către `/onboarding` până ce un update confirmă `onboarding_completed = true` în tabela de profil de utilizator (`user_profiles`).
- **Nealiniere observată**: Deși middleware-ul verifică starea `onboarding_completed`, formularele de login și callback-ul OAuth decid statusul de onboarding pur pe baza existenței câmpului `display_name`. Această decuplare a surselor de adevăr reprezintă un risc de consistență a datelor.

### 3. Profilul Utilizatorului (`/dashboard/profile`)
- Datele non-autentificare ale utilizatorului, rolurile și progresul sunt agregate prin componenta `UserProfile.tsx` din secțiunea de `platform/user/`.

## Roluri și Permisiuni
- Se definesc roluri explicit pe nivel de bază de date în coloana `role` din tabela `user_profiles`. 
- **Nealiniere observată la roluri**: Nu există o demonstrație a rolului de "participant" în sursele versionate. Fișierul `types.ts` acceptă doar `standard`, `admin` și `premium`. Mai mult, deși layout-ul administrativ permite și rolul de `superadmin`, `middleware.ts` permite exclusiv rolul `admin` să acceseze rutele protejate administrative `/admin/*`.
- Middleware-ul verifică rolul pentru cererile administrative care îi corespund; layout-ul și unele acțiuni server-side aplică verificări separate. Aceste controale de rută nu înlocuiesc autorizarea datelor prin RLS.

## Limitări și Lucruri Neconfirmate
- **Neconfirmat**: funcționarea end-to-end pentru resetarea parolei, finalizarea onboarding-ului, OAuth, sesiuni și propagarea rolului nu a putut fi verificată deoarece lipsește o instanță de test accesibilă local și o suită de teste E2E. Aceste fluxuri sunt documentate numai ca `observate în cod`.
