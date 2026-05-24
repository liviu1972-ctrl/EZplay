/**
 * @file config.ts
 *
 * [AI] Configuration for supported locales in the application.
 * Defines supported locales ('ro', 'en') and the default locale.
 *
 * [HUMAN] This file sets the languages available on the website (Romanian and English)
 * and chooses Romanian as the default one.
 */

export const i18n = {
  defaultLocale: "ro",
  locales: ["ro", "en"],
} as const;

export type Locale = (typeof i18n.locales)[number];
export const LANGUAGE_COOKIE = "ezplay_language";
