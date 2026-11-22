import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import fr from "./fr";
import en from "./en";
import de from "./de";

const dictionaries: Record<Locale, Dictionary> = { fr, en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
