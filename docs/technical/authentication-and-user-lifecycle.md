---
status: Working
version: "0.1"
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
- Verificat static în cod: Exista un înlocuitor pentru login simulat care a fost suprimat. În prezent formularele reale din UI comunică cu backend-ul Supabase.
- Suportă funcționalitățile obișnuite bazate pe adrese de email / parole, iar un endpoint de callback `/auth/callback` a fost observat în build pentru soluționarea sesiunilor OAuth.

### 2. Onboarding (`/onboarding`)
- Utilizatorii nou înregistrați sunt deviați automat de `middleware.ts` către `/onboarding` până ce un update confirmă `onboarding_completed = true` în tabela de profil de utilizator (`user_profiles`).

### 3. Profilul Utilizatorului (`/dashboard/profile`)
- Datele non-autentificare ale utilizatorului, rolurile și progresul sunt agregate prin componenta `UserProfile.tsx` din secțiunea de `platform/user/`.

## Roluri și Permisiuni
- Se definesc roluri explicit pe nivel de bază de date în coloana `role` din tabela `user_profiles`. 
- Implicit rolul este de participant, iar utilizatorii cu rolul `admin` primesc trecere prin rutele administrative `/admin/*`.
- Acest atribut de acces se verifică înaintea fiecărei tranziții de pagină server-side (în `middleware.ts`).

## Limitări și Lucruri Neconfirmate
- **Planificat/Neconfirmat**: Funcționalitatea absolută end-to-end (resetare de parolă, finalizare onboarding, propagarea rolului) nu a putut fi verificată funcțional deoarece lipsește o instanță de test accesibilă local și o baterie de teste E2E sau scenarii de test. Totul a fost documentat doar ca `observat în cod`.
