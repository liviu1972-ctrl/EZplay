/**
 * @file get-dictionary.ts
 *
 * [AI] Utility function to load JSON dictionaries dynamically based on the current locale.
 * Supports Romanian ('ro') and English ('en'). Defaults to Romanian.
 *
 * [HUMAN] This file helps load the correct translations (Romanian or English)
 * depending on which language the user has chosen.
 */

import type { Locale } from "./config";

const dictionaries = {
  ro: () => import("./dictionaries/ro.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.ro();
};
