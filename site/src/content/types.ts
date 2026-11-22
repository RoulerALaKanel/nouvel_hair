import type { ServiceKey } from "@/lib/i18n";

export type QA = { q: string; a: string };

export type ServiceContent = {
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  body: string[];
  steps: { title: string; text: string }[];
  faq: QA[];
};

export type Dictionary = {
  meta: { homeTitle: string; homeDescription: string; keywords: string[] };
  nav: {
    home: string;
    services: string;
    work: string;
    prices: string;
    salon: string;
    faq: string;
    contact: string;
    book: string;
    call: string;
    menuOpen: string;
    menuClose: string;
    language: string;
    skip: string;
  };
  hero: {
    eyebrow: string;
    titleA: string;
    titleEm: string;
    lead: string;
    ctaSecondary: string;
    caption: string;
    cardLabel: string;
  };
  marquee: string[];
  services: { eyebrow: string; title: string; intro: string; from: string; more: string };
  serviceContent: Record<ServiceKey, ServiceContent>;
  gallery: { eyebrow: string; title: string; intro: string; instagram: string; close: string; enlarge: string };
  prices: { eyebrow: string; title: string; intro: string; all: string; filterLabel: string; note: string; from: string };
  about: { eyebrow: string; title: string; paragraphs: string[]; quote: string; cta: string; signature: string };
  faq: { eyebrow: string; title: string; items: QA[] };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    address: string;
    country: string;
    route: string;
    appointment: string;
    appointmentNote: string;
    follow: string;
    email: string;
    hoursTitle: string;
    /** index 0 = dimanche */
    days: string[];
    closed: string;
    /** {time} et {day} sont remplacés dynamiquement */
    openNow: string;
    opensToday: string;
    opensTomorrow: string;
    opensDay: string;
  };
  servicePage: {
    breadcrumbHome: string;
    pricesTitle: string;
    stepsTitle: string;
    faqTitle: string;
    otherServices: string;
    ctaTitle: string;
    ctaText: string;
    back: string;
  };
  legal: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    operator: string;
    manager: string;
    phone: string;
    email: string;
    uid: string;
    toComplete: string;
    privacyTitle: string;
    privacy: string[];
    hostSentence: (host: string) => string;
    ipTitle: string;
    ip: string;
  };
  footer: { tagline: string; legal: string; rights: string };
};
