import { ar } from "./ar";

export const translations = {
  ar,
};

export type Language = keyof typeof translations;

export const defaultLanguage: Language = "ar";

export function t(key: string, lang: Language = defaultLanguage): string {
  const translation = translations[lang];
  return translation[key] || key;
}
