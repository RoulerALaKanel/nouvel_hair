import { site } from "@/config/site";

export const locales = ["fr", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = { fr: "Français", en: "English", de: "Deutsch" };
export const ogLocale: Record<Locale, string> = { fr: "fr_CH", en: "en_GB", de: "de_CH" };

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Identifiants des pages internes, indépendants de la langue. */
export type ServiceKey = "coupe" | "coloration" | "balayage" | "soins";
export type PageKey = ServiceKey | "legal";
export const serviceKeys: ServiceKey[] = ["coupe", "coloration", "balayage", "soins"];

/** Slugs traduits : chaque langue a des URL dans sa propre langue (meilleur SEO local). */
export const slugs: Record<PageKey, Record<Locale, string>> = {
  coupe: { fr: "coupe", en: "haircut", de: "haarschnitt" },
  coloration: { fr: "coloration", en: "hair-colour", de: "haarfarbe" },
  balayage: { fr: "balayage", en: "balayage", de: "balayage" },
  soins: { fr: "soins", en: "hair-treatments", de: "haarpflege" },
  legal: { fr: "mentions-legales", en: "legal-notice", de: "impressum" },
};

export function pageKeyFromSlug(locale: Locale, slug: string): PageKey | null {
  const entry = (Object.keys(slugs) as PageKey[]).find((k) => slugs[k][locale] === slug);
  return entry ?? null;
}

/** Chemin relatif (avec slash final, cohérent avec trailingSlash). */
export function path(locale: Locale, page?: PageKey, hash?: string): string {
  const base = page ? `/${locale}/${slugs[page][locale]}/` : `/${locale}/`;
  return hash ? `${base}#${hash}` : base;
}

export function absolute(p: string): string {
  return `${site.url}${p}`;
}

/** hreflang pour une page donnée (undefined = accueil). */
export function alternates(locale: Locale, page?: PageKey) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l === "fr" ? "fr-CH" : l === "de" ? "de-CH" : "en"] = absolute(path(l, page));
  languages["x-default"] = absolute(path(defaultLocale, page));
  return { canonical: absolute(path(locale, page)), languages };
}
