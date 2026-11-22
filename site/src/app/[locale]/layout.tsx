import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Manrope } from "next/font/google";
import { site } from "@/config/site";
import { getDictionary } from "@/content";
import { isLocale, locales, ogLocale } from "@/lib/i18n";
import { salonSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui";
import Reveal from "@/components/Reveal";
import "../globals.css";

// Polices auto-hébergées au build : aucune requête vers Google côté visiteur (LPD/RGPD).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#fdfbf7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    keywords: t.meta.keywords,
    formatDetection: { telephone: true, address: true },
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
    openGraph: {
      siteName: site.name,
      locale: ogLocale[locale],
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    other: {
      "geo.region": "CH-GE",
      "geo.placename": "Russin",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={locale === "fr" ? "fr-CH" : locale === "de" ? "de-CH" : "en"} className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        {/* Active les animations d'apparition uniquement quand JS est disponible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={[salonSchema(locale, t), websiteSchema(locale)]} />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
