import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    homeTitle: "Nouvel Hair — Hair salon in Russin (Geneva) | Cuts, colour, balayage",
    homeDescription:
      "Hair salon in Russin, in Geneva’s Mandement wine country: women’s, men’s and children’s cuts, colour, balayage and treatments. By appointment on +41 22 754 13 10, Tuesday to Saturday.",
    keywords: [
      "hairdresser Russin",
      "hair salon Geneva countryside",
      "hairdresser Mandement",
      "balayage Geneva",
      "hair colour Geneva",
      "hairdresser Satigny",
    ],
  },
  nav: {
    home: "Home",
    services: "Services",
    work: "Our work",
    prices: "Prices",
    salon: "The salon",
    faq: "FAQ",
    contact: "Contact",
    book: "Book an appointment",
    call: "Call",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Language",
    skip: "Skip to content",
  },
  hero: {
    eyebrow: "Hair salon · Russin, Geneva",
    titleA: "The art of revealing",
    titleEm: "your style.",
    lead: "A moment for yourself, with care in every detail. An approach to hairdressing where style, gentleness and craftsmanship meet, in the heart of the Mandement.",
    ctaSecondary: "See prices",
    caption: "Your beauty, simply",
    cardLabel: "By appointment",
  },
  marquee: ["Haircut", "Colour", "Balayage", "Treatments", "Russin", "Mandement", "Geneva"],
  services: {
    eyebrow: "Services",
    title: "Hair that feels like you.",
    intro: "Services designed to reveal your personality and take care of your hair.",
    from: "from",
    more: "Discover",
  },
  serviceContent: {
    coupe: {
      name: "Haircut",
      short: "A tailored cut that suits your wishes, your face shape and your lifestyle.",
      metaTitle: "Women’s, men’s & children’s haircuts in Russin | Nouvel Hair",
      metaDescription:
        "Tailored haircuts at Nouvel Hair in Russin (Geneva): women from CHF 70, men CHF 45, children CHF 30. Personal advice, by appointment Tuesday to Saturday.",
      h1: "Haircuts in Russin, Geneva",
      lead: "Short, medium or long: a cut designed for you that is easy to style every day.",
      body: [
        "Every cut starts with listening. We look at your hair type, its density, any cowlicks and the shape of your face to suggest a cut that truly suits you.",
        "Women, men and children are all welcome at the salon, in Geneva’s Mandement area, just minutes from Satigny and Dardagny.",
      ],
      steps: [
        { title: "Consultation", text: "Your wishes, your habits and how much time you want to spend on your hair." },
        { title: "Shampoo & cut", text: "A precise cut, adapted to the texture and natural movement of your hair." },
        { title: "Styling", text: "Careful styling and a few tips so you can recreate it easily at home." },
      ],
      faq: [
        {
          q: "How much is a haircut at Nouvel Hair?",
          a: "A women’s cut (shampoo, cut, styling) is CHF 70, a men’s cut CHF 45 and a cut for children under 12 CHF 30. These are indicative prices; the exact price is confirmed at the salon.",
        },
        { q: "Do you cut children’s hair?", a: "Yes, children under 12 are welcome, at CHF 30." },
      ],
    },
    coloration: {
      name: "Colour",
      short: "Luminous, harmonious shades to enhance your hair and cover greys.",
      metaTitle: "Hair colour in Russin (Geneva) | Nouvel Hair",
      metaDescription:
        "Hair colour, roots and toner at Nouvel Hair in Russin: roots CHF 75, full colour CHF 95, gloss CHF 45. Tailored colour, by appointment.",
      h1: "Hair colour in Russin, Geneva",
      lead: "Refresh your natural colour, cover grey hair or try a new shade: colour that flatters your skin tone.",
      body: [
        "Before every colour, we take time to look at your base, any previous colour and the shade you have in mind. The goal: a luminous, even result that grows out beautifully.",
        "Between colour appointments, a toner or gloss restores shine and neutralises unwanted tones.",
      ],
      steps: [
        { title: "Colour consultation", text: "We assess your base and choose a shade that flatters your skin tone." },
        { title: "Application", text: "Roots or full colour, applied with precision." },
        { title: "Finish", text: "Rinse, treatment and styling, with tips to make your colour last." },
      ],
      faq: [
        {
          q: "How much does hair colour cost?",
          a: "Roots are CHF 75, a full colour CHF 95 and a toner or gloss CHF 45. The final price depends on the length and density of your hair.",
        },
        {
          q: "How often should I touch up my roots?",
          a: "It depends on how fast your hair grows and the contrast with your natural colour. We will recommend a suitable rhythm during your appointment.",
        },
      ],
    },
    balayage: {
      name: "Balayage",
      short: "Natural-looking highlights, dimension and light, with soft regrowth.",
      metaTitle: "Balayage & highlights in Russin (Geneva) | Nouvel Hair",
      metaDescription:
        "Balayage, highlights and bleach at Nouvel Hair in Russin (Geneva): balayage from CHF 160, highlights from CHF 130. Natural, tailored lightening, by appointment.",
      h1: "Balayage & highlights in Russin, Geneva",
      lead: "Hand-painted lightening that adds light and depth, like after a summer in the sun.",
      body: [
        "Balayage gradually lightens selected strands for a natural effect. Regrowth is soft, with no harsh line, so appointments can be further apart than with a classic colour.",
        "Bolder highlights, bright blonde or a full bleach: we adapt the technique to your base and the result you want, while protecting the quality of your hair as much as possible.",
      ],
      steps: [
        { title: "Consultation", text: "Together we define the intensity, area and placement of the highlights." },
        { title: "Lightening", text: "Balayage or highlights, painted by hand strand by strand." },
        { title: "Toner & care", text: "A toner to fine-tune the shade, then a treatment to protect the hair." },
      ],
      faq: [
        {
          q: "How much is a balayage?",
          a: "Balayage starts at CHF 160, highlights at CHF 130 and a full bleach at CHF 180. The price depends on length and density; you will receive an exact quote at the salon.",
        },
        {
          q: "How long does a balayage appointment take?",
          a: "It depends on the length of your hair and the result you want. We will give you an estimate when you book.",
        },
      ],
    },
    soins: {
      name: "Treatments",
      short: "A gentle moment to nourish, repair and bring shine back to your hair.",
      metaTitle: "Hair treatments & smoothing in Russin | Nouvel Hair",
      metaDescription:
        "Deep treatments, repair treatments, smoothing and hair botox at Nouvel Hair in Russin (Geneva), from CHF 35. Nourished, shiny, easy-to-style hair.",
      h1: "Hair treatments in Russin, Geneva",
      lead: "Dry, damaged or frizzy hair? The right treatment restores softness, shine and suppleness.",
      body: [
        "Colour, heat styling, sun and hard water all put hair under strain. Our deep and repair treatments nourish the hair fibre and strengthen the lengths.",
        "For smoother, shinier hair for several weeks, smoothing or hair botox reduces frizz and makes everyday styling easier.",
      ],
      steps: [
        { title: "Assessment", text: "We identify what your hair needs: hydration, nourishment or repair." },
        { title: "Treatment", text: "A tailored treatment, left on long enough to work in depth." },
        { title: "Result", text: "Softer, shinier hair, and a routine to follow at home." },
      ],
      faq: [
        {
          q: "Which treatment is best for damaged hair?",
          a: "The repair treatment (CHF 50) targets weakened hair; the deep treatment (CHF 35) nourishes and hydrates. We will advise you at the salon depending on the condition of your hair.",
        },
        {
          q: "How much is smoothing or hair botox?",
          a: "Smoothing and hair botox start at CHF 150, depending on the length and density of your hair.",
        },
      ],
    },
  },
  gallery: {
    eyebrow: "Our work",
    title: "Our work.",
    intro: "A few styles created at the salon.",
    instagram: "More of our work on Instagram",
    close: "Close",
    enlarge: "Enlarge photo",
  },
  prices: {
    eyebrow: "Prices",
    title: "Clear prices, no surprises.",
    intro: "Indicative prices in Swiss francs. The final price depends on the length and density of your hair.",
    all: "All",
    filterLabel: "Filter prices",
    note: "You will receive an exact quote at the salon before every service.",
    from: "from",
  },
  about: {
    eyebrow: "The Nouvel Hair experience",
    title: "A moment just for you.",
    paragraphs: [
      "Because every person is unique, your experience at Nouvel Hair begins with listening. We take the time to understand what you want and imagine a style that feels like you.",
      "Welcome to your beauty break in Russin, among the vineyards of the Mandement.",
    ],
    quote: "A great hairstyle is one in which you feel like yourself.",
    cta: "Contact us",
    signature: "Nouvel Hair · Russin",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Good to know.",
    items: [
      {
        q: "How do I book an appointment?",
        a: "Call us on +41 22 754 13 10, or drop by the salon at 349A Route du Mandement in Russin. The salon works by appointment.",
      },
      {
        q: "What are the opening hours?",
        a: "Tuesday to Friday from 9 am to 6 pm, and Saturday from 8 am to 1 pm. The salon is closed on Sundays and Mondays.",
      },
      {
        q: "Where is the salon?",
        a: "At 349A Route du Mandement, 1281 Russin, in the Geneva countryside, near Satigny and Dardagny.",
      },
      {
        q: "Are the listed prices final?",
        a: "They are indicative. The final price depends on the length and density of your hair; you will receive an exact quote at the salon before every service.",
      },
      {
        q: "Do you style women, men and children?",
        a: "Yes: women’s cuts from CHF 70, men CHF 45 and children under 12 CHF 30.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "See you soon at Nouvel Hair.",
    intro: "For any question or to book an appointment, get in touch with the salon.",
    address: "Address",
    country: "Switzerland",
    route: "Directions",
    appointment: "Appointments",
    appointmentNote: "By phone or directly at the salon",
    follow: "Follow us",
    email: "Email",
    hoursTitle: "Opening hours",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    closed: "Closed",
    openNow: "Open now, until {time}",
    opensToday: "Closed, opens today at {time}",
    opensTomorrow: "Closed, opens tomorrow at {time}",
    opensDay: "Closed, opens {day} at {time}",
  },
  servicePage: {
    breadcrumbHome: "Home",
    pricesTitle: "Prices",
    stepsTitle: "How it works",
    faqTitle: "Your questions",
    otherServices: "Our other services",
    ctaTitle: "Ready for a change?",
    ctaText: "Book an appointment and we will take the time to talk it through together.",
    back: "Back to home",
  },
  legal: {
    metaTitle: "Legal notice | Nouvel Hair",
    metaDescription: "Legal notice and privacy policy of the Nouvel Hair website, hair salon in Russin.",
    title: "Legal notice",
    operator: "Website operator",
    manager: "Person in charge",
    phone: "Phone",
    email: "Email",
    uid: "UID number",
    toComplete: "to be completed",
    privacyTitle: "Data protection",
    privacy: [
      "This website has no forms, no analytics and no tracking cookies. Fonts are hosted with the website: no data is sent to third-party services when you visit.",
      "When you call or write to us to book, your details are used only to answer your request and manage your appointment. They are not shared with third parties.",
      "Under the Swiss Federal Act on Data Protection (FADP), you can ask to access, correct or delete your data by contacting us using the details above.",
    ],
    hostSentence: (host) =>
      `As with any website, the hosting provider (${host}) may record technical connection data (IP address, date and time of the visit) to keep the site secure and running properly.`,
    ipTitle: "Intellectual property",
    ip: "The texts, photographs and graphics on this website belong to Nouvel Hair or are used with their owners’ permission. Any reproduction without permission is prohibited.",
  },
  footer: { tagline: "Hair salon in Russin, Geneva", legal: "Legal notice", rights: "All rights reserved" },
};

export default en;
