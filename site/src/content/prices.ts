import type { Locale, ServiceKey } from "@/lib/i18n";

type T = Record<Locale, string>;
export type PriceRow = { label: T; detail?: T; amount: number; from?: boolean };

/** Tarifs indicatifs en CHF — à modifier ici, ils se mettent à jour partout (pages + données Google). */
export const prices: Record<ServiceKey, PriceRow[]> = {
  coupe: [
    {
      label: { fr: "Femme", en: "Women", de: "Damen" },
      detail: {
        fr: "Shampoing, coupe, coiffage",
        en: "Shampoo, cut & styling",
        de: "Waschen, Schneiden, Styling",
      },
      amount: 70,
    },
    { label: { fr: "Homme", en: "Men", de: "Herren" }, amount: 45 },
    { label: { fr: "Enfant (– 12 ans)", en: "Children (under 12)", de: "Kinder (unter 12 Jahren)" }, amount: 30 },
    { label: { fr: "Brushing", en: "Blow-dry", de: "Föhnen" }, amount: 40 },
  ],
  coloration: [
    { label: { fr: "Racines", en: "Root colour", de: "Ansatzfarbe" }, amount: 75 },
    { label: { fr: "Coloration complète", en: "Full colour", de: "Komplette Coloration" }, amount: 95 },
    { label: { fr: "Patine / gloss", en: "Toner / gloss", de: "Tönung / Glossing" }, amount: 45 },
  ],
  balayage: [
    { label: { fr: "Balayage", en: "Balayage", de: "Balayage" }, amount: 160, from: true },
    { label: { fr: "Mèches", en: "Highlights", de: "Strähnen" }, amount: 130, from: true },
    {
      label: { fr: "Décoloration complète", en: "Full bleach", de: "Komplettblondierung" },
      amount: 180,
      from: true,
    },
  ],
  soins: [
    { label: { fr: "Soin profond", en: "Deep treatment", de: "Intensivpflege" }, amount: 35 },
    { label: { fr: "Soin réparateur", en: "Repair treatment", de: "Reparaturpflege" }, amount: 50 },
    {
      label: {
        fr: "Lissage / Botox capillaire",
        en: "Smoothing / hair botox",
        de: "Glättung / Haar-Botox",
      },
      amount: 150,
      from: true,
    },
  ],
};

export function minPrice(key: ServiceKey): number {
  return Math.min(...prices[key].map((p) => p.amount));
}

export function formatCHF(amount: number): string {
  return `CHF ${amount}.–`;
}

export const allAmounts = Object.values(prices).flat().map((p) => p.amount);
export const priceRange = `CHF ${Math.min(...allAmounts)}–${Math.max(...allAmounts)}`;
