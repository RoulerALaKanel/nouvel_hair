import { site, hasBooking, bookingHref } from "@/config/site";
import { getDictionary } from "@/content";
import { locales, localeNames, path, type Locale, type PageKey } from "@/lib/i18n";
import Header from "./Header";
import { CalendarIcon, PhoneIcon } from "./ui";

/** Habillage commun à toutes les pages : en-tête, pied de page, barre d'action mobile. */
export default function Shell({
  locale,
  page,
  children,
}: {
  locale: Locale;
  page?: PageKey;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);
  const home = path(locale);
  const links = [
    { href: `${home}#services`, label: t.nav.services },
    { href: `${home}#work`, label: t.nav.work },
    { href: `${home}#prices`, label: t.nav.prices },
    { href: `${home}#salon`, label: t.nav.salon },
    { href: `${home}#faq`, label: t.nav.faq },
    { href: `${home}#contact`, label: t.nav.contact },
  ];
  const langLinks = locales.map((l) => ({ locale: l, href: path(l, page), label: localeNames[l] }));
  const year = new Date().getFullYear();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        {t.nav.skip}
      </a>
      <Header
        locale={locale}
        homeHref={home}
        links={links}
        langLinks={langLinks}
        cta={{ href: bookingHref, label: t.nav.book, external: hasBooking }}
        labels={{ menuOpen: t.nav.menuOpen, menuClose: t.nav.menuClose, language: t.nav.language }}
      />

      <main id="main">{children}</main>

      <footer className="bg-ink pb-28 text-sand-soft/70 lg:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 border-t border-white/10 px-4 py-10 text-center text-[12px] tracking-[0.08em] sm:px-8 lg:flex-row lg:justify-between lg:text-left">
          <a href={home} className="h-display text-xl tracking-[0.14em] text-paper">
            NOUVEL HAIR
          </a>
          <p>
            {t.footer.tagline} · {site.address.street}, {site.address.postalCode} {site.address.locality}
          </p>
          <p>
            © {year} {site.name} ·{" "}
            <a href={path(locale, "legal")} className="underline-offset-4 hover:text-paper hover:underline">
              {t.footer.legal}
            </a>
          </p>
        </div>
      </footer>

      {/* Barre d'action fixe sur mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
        <div className="flex gap-3">
          <a href={`tel:${site.phone}`} className={`btn flex-1 !px-4 ${hasBooking ? "btn-ghost" : "btn-dark"}`} aria-label={`${t.nav.call} ${site.phoneDisplay}`}>
            <PhoneIcon /> {t.nav.call}
          </a>
          {hasBooking && (
            <a href={site.bookingUrl} target="_blank" rel="noopener" className="btn btn-dark flex-1 !px-4">
              <CalendarIcon /> {t.nav.book}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
