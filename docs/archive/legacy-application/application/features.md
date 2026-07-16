---
[AI] This document lists all planned and implemented features of the EZPlay platform across the various phases, highlighting the Phase 1 Foundation features.
[HUMAN] This document lists the features of the website. It shows what is already active (like user registration, light/dark mode, cards browser, admin management, and profile settings) and what features will be added in future updates.
---

# Feature Roadmap — EZPlay

Here is the current state of features implemented in the EZPlay digital platform.

---

## Phase 1: Foundation (Currently Active)

*   **Authentification**:
    *   Secure signup and login using email/password.
    *   One-click login with **Google OAuth**.
    *   Automatic session management and cookie-based secure route protection.
*   **User Onboarding**:
    *   A 3-step setup wizard that guides new users to name their profile, choose learning interests, and upload a profile picture.
*   **Design & Theme**:
    *   Warm cream background style matching the ezplay.org website.
    *   Interactive decorative elements (motherboard chips you can click to see info).
    *   **Light & Dark Mode** toggle.
    *   **Bilingual interface** (Romanian and English toggle).
*   **Cards & Decks System**:
    *   **Public Deck Browser (`/cards`)**: Search and filter cards by set, card type, and asset type. Features an interactive grid of cards with a 3D hover/flip effect that reveals stats (cost, production, marketing, expenses), bilingual effects, and card details.
    *   **Admin Card Panel (`/admin/cards`)**: Complete interface for creating, editing, and toggling card active states.
    *   **Responsive Image Processing API (`/api/cards/upload`)**: Automates card image upload, resizing, and WebP format conversion using the `sharp` library (outputting `micro`, `thumb`, `card`, and `full` dimensions) before storing in Supabase Storage.
*   **Student Dashboard**:
    *   Welcome card showing user information.
    *   Token widget displaying Coins (EZC) and Gems (EZG) balances.
    *   Interactive skill radar chart visualizing development.
*   **Admin Panel**:
    *   Role-protected dashboard for system administrators.
    *   Complete user management directory where admins can search for users and change their roles.

---

## Phase 2: Game Library & Scenarios (Next Up)

*   **Scenario Builder**:
    *   Tools for facilitators to pre-configure business game setups (initial capital, target years, market volatility cards).
*   **Interactive Glossary**:
    *   A student study area to search and review business terms.

---

## Phase 3: Facilitator Panel (Future Update)

*   **Live Sessions**:
    *   Tools to host physical or virtual board game sessions.
*   **Token Ledger**:
    *   Facilitators can grant virtual coins and gems to players in real time during the class session.
*   **Leaderboard**:
    *   Visual representation of the highest-capitalized players.
