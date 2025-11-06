// Centralized locale configuration
export const LOCALES = ["en", "ar"] as const;
export const DEFAULT_LOCALE = "en" as const;

export type Locale = (typeof LOCALES)[number];
