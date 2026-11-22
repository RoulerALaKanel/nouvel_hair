/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURATION DU SALON — tout ce qui est à compléter est ici.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Nouvel Hair",

  /** TODO : remplacer par le vrai domaine avant la mise en ligne (sans « / » final). */
  url: "https://www.nouvelhair.ch",

  phone: "+41227541310",
  phoneDisplay: "+41 22 754 13 10",

  /** TODO : adresse e-mail du salon (laisser vide pour la masquer). */
  email: "",

  /** TODO : URL complète du compte Instagram, ex. "https://www.instagram.com/nouvelhair" (vide = masqué). */
  instagram: "",

  /**
   * TODO : lien de réservation en ligne (Salonkee, Planity, etc.).
   * Tant qu'il est vide, tous les boutons « Réserver » appellent le salon.
   */
  bookingUrl: "",

  address: {
    street: "349A Route du Mandement",
    postalCode: "1281",
    locality: "Russin",
    region: "GE",
    country: "CH",
  },

  /** Facultatif : coordonnées GPS exactes du salon (améliore le SEO local). Laisser null si inconnues. */
  geo: null as null | { lat: number; lng: number },

  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=349A+Route+du+Mandement,+1281+Russin,+Suisse",

  /** Horaires : jour 0 = dimanche … 6 = samedi. null = fermé. */
  hours: {
    0: null,
    1: null,
    2: ["09:00", "18:00"],
    3: ["09:00", "18:00"],
    4: ["09:00", "18:00"],
    5: ["09:00", "18:00"],
    6: ["08:00", "13:00"],
  } as Record<number, [string, string] | null>,

  areaServed: ["Russin", "Mandement", "Satigny", "Dardagny", "Genève"],

  /**
   * Photos de la galerie « Réalisations ». Ajoutez vos fichiers dans /public/images
   * puis listez-les ici. La mise en page s'adapte au nombre de photos.
   */
  gallery: [
    {
      src: "/images/coupe-courte-blond-cendre.webp",
      thumb: "/images/coupe-courte-blond-cendre-640.webp",
      width: 1299,
      height: 1300,
      alt: {
        fr: "Coupe courte pixie blond cendré avec une mèche cuivrée, réalisée chez Nouvel Hair à Russin",
        en: "Short ash-blonde pixie cut with a copper streak, created at Nouvel Hair in Russin",
        de: "Kurzer aschblonder Pixie-Schnitt mit kupferner Strähne, kreiert bei Nouvel Hair in Russin",
      },
    },
  ],

  /** Mentions légales — TODO : compléter. */
  legal: {
    companyName: "", // raison sociale exacte (registre du commerce)
    manager: "", // prénom et nom du/de la responsable
    uid: "", // numéro IDE (CHE-xxx.xxx.xxx), si existant
    host: "", // nom de l'hébergeur du site
  },
} as const;

export const hasBooking = site.bookingUrl.trim().length > 0;
export const bookingHref = hasBooking ? site.bookingUrl : `tel:${site.phone}`;
