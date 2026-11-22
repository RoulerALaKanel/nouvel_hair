import { site, hasBooking } from "@/config/site";
import { prices, priceRange } from "@/content/prices";
import type { Dictionary, QA } from "@/content/types";
import { absolute, path, serviceKeys, type Locale, type ServiceKey } from "./i18n";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const salonId = `${site.url}/#salon`;

function openingHours() {
  // Regroupe les jours ayant les mêmes horaires.
  const groups = new Map<string, string[]>();
  for (let d = 0; d < 7; d++) {
    const h = site.hours[d];
    if (!h) continue;
    const k = h.join("-");
    groups.set(k, [...(groups.get(k) ?? []), dayNames[d]]);
  }
  return [...groups.entries()].map(([k, days]) => {
    const [opens, closes] = k.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
  });
}

export function salonSchema(locale: Locale, t: Dictionary) {
  const sameAs = [site.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": salonId,
    name: site.name,
    description: t.meta.homeDescription,
    url: absolute(path(locale)),
    image: [absolute("/og-image.jpg"), absolute(site.gallery[0].src)],
    logo: absolute("/icon-512.png"),
    telephone: site.phone,
    ...(site.email ? { email: site.email } : {}),
    priceRange,
    currenciesAccepted: "CHF",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    ...(site.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } }
      : {}),
    hasMap: site.mapsDirectionsUrl,
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: openingHours(),
    knowsLanguage: ["fr"],
    ...(sameAs.length ? { sameAs } : {}),
    ...(hasBooking
      ? {
          potentialAction: {
            "@type": "ReserveAction",
            target: { "@type": "EntryPoint", urlTemplate: site.bookingUrl },
          },
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.prices.eyebrow,
      itemListElement: serviceKeys.map((key) => ({
        "@type": "OfferCatalog",
        name: t.serviceContent[key].name,
        url: absolute(path(locale, key)),
        itemListElement: offers(locale, key),
      })),
    },
  };
}

function offers(locale: Locale, key: ServiceKey) {
  return prices[key].map((p) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: p.label[locale] },
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "CHF",
      ...(p.from ? { minPrice: p.amount } : { price: p.amount }),
    },
  }));
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: absolute(path(locale)),
    name: site.name,
    inLanguage: locale,
    publisher: { "@id": salonId },
  };
}

export function faqSchema(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function serviceSchema(locale: Locale, key: ServiceKey, t: Dictionary) {
  const c = t.serviceContent[key];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.name,
    serviceType: c.name,
    description: c.metaDescription,
    url: absolute(path(locale, key)),
    provider: { "@id": salonId },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    offers: offers(locale, key),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
