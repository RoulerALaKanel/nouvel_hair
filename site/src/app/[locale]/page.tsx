import type { Metadata } from "next";
import { site, hasBooking, bookingHref } from "@/config/site";
import { getDictionary } from "@/content";
import { prices, formatCHF, minPrice } from "@/content/prices";
import { alternates, isLocale, path, serviceKeys, type Locale } from "@/lib/i18n";
import { faqSchema } from "@/lib/schema";
import Shell from "@/components/Shell";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import { HoursList, OpenBadge } from "@/components/OpenStatus";
import { Arrow, FaqList, JsonLd, PhoneIcon, SectionHead } from "@/components/ui";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: { absolute: t.meta.homeTitle },
    description: t.meta.homeDescription,
    alternates: alternates(locale),
    openGraph: { title: t.meta.homeTitle, description: t.meta.homeDescription, url: path(locale) },
  };
}

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const hero = site.gallery[0];
  const statusLabels = {
    days: t.contact.days,
    openNow: t.contact.openNow,
    opensToday: t.contact.opensToday,
    opensTomorrow: t.contact.opensTomorrow,
    opensDay: t.contact.opensDay,
  };
  const bookExt = hasBooking ? { target: "_blank", rel: "noopener" } : {};

  return (
    <Shell locale={locale}>
      <JsonLd data={faqSchema(t.faq.items)} />

      {/* ───────────── HERO ───────────── */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-6 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-28 lg:pt-12">
          <div className="relative z-10">
            <h1>
              <span className="eyebrow">{t.hero.eyebrow}</span>
              <span className="h-display mt-7 block text-[clamp(3.2rem,9vw,7.6rem)] leading-[0.92]">
                {t.hero.titleA}{" "}
                <em className="font-normal text-bronze">
                  {t.hero.titleEm.replace(/\.$/, "")}
                  <span className="text-copper">.</span>
                </em>
              </span>
            </h1>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-muted">{t.hero.lead}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={bookingHref} {...bookExt} className="btn btn-dark">
                {t.nav.book} <Arrow />
              </a>
              <a href="#prices" className="btn btn-ghost">
                {t.hero.ctaSecondary}
              </a>
            </div>
            <div className="mt-10">
              <OpenBadge hours={site.hours} labels={statusLabels} />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            {/* Arche : rappel du miroir de salon */}
            <div className="absolute -right-10 -top-6 hidden h-[88%] w-[78%] rounded-t-full border border-sand lg:block" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-sand-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.src}
                srcSet={`${hero.thumb} 640w, ${hero.src} ${hero.width}w`}
                sizes="(min-width: 1024px) 45vw, 92vw"
                alt={hero.alt[locale]}
                width={hero.width}
                height={hero.height}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[center_30%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <p className="absolute bottom-24 right-6 max-w-[12rem] text-right text-[11px] font-semibold uppercase leading-relaxed tracking-[0.28em] text-paper sm:bottom-8">
                {t.hero.caption}
              </p>
            </div>
            <a
              href={`tel:${site.phone}`}
              className="absolute -bottom-6 left-0 flex items-center gap-4 rounded-full bg-paper py-3 pl-3 pr-6 shadow-[0_18px_40px_-20px_rgba(25,24,22,.45)] transition hover:-translate-y-0.5 sm:-left-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper">
                <PhoneIcon />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{t.hero.cardLabel}</span>
                <span className="h-display text-lg tabular-nums">{site.phoneDisplay}</span>
              </span>
            </a>
          </div>
        </div>

        {/* Bandeau défilant */}
        <div className="overflow-hidden border-y border-ink bg-ink py-5 text-paper" aria-hidden>
          <div className="flex w-max animate-marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center">
                {[...t.marquee, ...t.marquee].map((w, i) => (
                  <span key={i} className="flex items-center">
                    <span className="h-display px-8 text-3xl italic sm:text-4xl">{w}</span>
                    <span className="text-sm text-copper">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── PRESTATIONS ───────────── */}
      <section id="services" className="bg-cream px-4 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />
          <ol className="border-t border-ink/15">
            {serviceKeys.map((key, i) => {
              const c = t.serviceContent[key];
              return (
                <li key={key} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }} className="border-b border-ink/15">
                  <a
                    href={path(locale, key)}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-8 transition-[padding] duration-500 ease-out-soft sm:grid-cols-[4rem_1.1fr_1.4fr_auto] sm:gap-x-8 lg:py-10 lg:hover:pl-4"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-bronze">0{i + 1}</span>
                    <h3 className="h-display text-[clamp(2rem,4.6vw,3.6rem)] leading-none transition group-hover:italic group-hover:text-bronze">
                      {c.name}
                    </h3>
                    <p className="col-span-3 row-start-2 max-w-md text-[15px] leading-relaxed text-muted sm:col-span-1 sm:row-start-auto">
                      {c.short}
                    </p>
                    <span className="col-start-3 row-start-1 flex items-center gap-4 sm:col-start-auto sm:row-start-auto">
                      <span className="hidden whitespace-nowrap text-[13px] text-muted md:inline">
                        {t.services.from} <span className="h-display text-base text-ink">{formatCHF(minPrice(key))}</span>
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                        <Arrow className="transition duration-500 group-hover:-rotate-45" />
                        <span className="sr-only">
                          {t.services.more} : {c.name}
                        </span>
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ───────────── RÉALISATIONS ───────────── */}
      <section id="work" className="px-4 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={t.gallery.eyebrow} title={t.gallery.title} intro={t.gallery.intro} align="center" />
          <Gallery
            photos={site.gallery.map((p) => ({ ...p, alt: p.alt[locale] }))}
            labels={{ close: t.gallery.close, enlarge: t.gallery.enlarge }}
          />
          {site.instagram && (
            <p className="mt-12 text-center">
              <a href={site.instagram} target="_blank" rel="noopener" className="btn btn-ghost">
                {t.gallery.instagram} <Arrow />
              </a>
            </p>
          )}
        </div>
      </section>

      {/* ───────────── TARIFS ───────────── */}
      <section id="prices" className="border-t border-line bg-paper px-4 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow={t.prices.eyebrow} title={t.prices.title} intro={t.prices.intro} />
          <Pricing
            labels={{ all: t.prices.all, filterLabel: t.prices.filterLabel }}
            groups={serviceKeys.map((key) => ({
              key,
              name: t.serviceContent[key].name,
              href: path(locale, key),
              rows: prices[key].map((r) => ({
                label: r.label[locale],
                detail: r.detail?.[locale],
                amount: `${r.from ? `${t.prices.from} ` : ""}${formatCHF(r.amount)}`,
              })),
            }))}
          />
          <p className="mt-10 text-[13px] text-muted" data-reveal>
            {t.prices.note}
          </p>
        </div>
      </section>

      {/* ───────────── LE SALON ───────────── */}
      <section id="salon" className="overflow-hidden bg-cream px-4 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/*
            TODO : remplacer ce panneau par une vraie photo du salon
            (ex. /images/salon.webp) dès qu'elle est disponible.
          */}
          <div data-reveal className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute inset-0 rounded-t-full bg-gradient-to-b from-sand via-[#a98a69] to-bronze" />
            <div className="absolute inset-5 rounded-t-full border border-paper/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-paper">
              <span className="h-display text-[9rem] italic leading-none">N</span>
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.36em]">{t.about.signature}</span>
            </div>
            <div className="absolute -bottom-8 -right-4 max-w-[16rem] bg-ink p-6 text-paper sm:-right-10">
              <p className="h-display text-lg italic leading-snug">“{t.about.quote}”</p>
            </div>
          </div>
          <div data-reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="h-display mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02]">{t.about.title}</h2>
            {t.about.paragraphs.map((p) => (
              <p key={p} className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <a href="#contact" className="btn btn-dark mt-10">
              {t.about.cta} <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section id="faq" className="px-4 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
          </div>
          <FaqList items={t.faq.items} />
        </div>
      </section>

      {/* ───────────── CONTACT ───────────── */}
      <section id="contact" className="bg-ink px-4 py-24 text-paper sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.intro} tone="dark" />
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <div className="grid gap-12 sm:grid-cols-2" data-reveal>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">{t.contact.address}</h3>
                <address className="h-display mt-4 text-2xl not-italic leading-snug">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.locality}
                  <br />
                  {t.contact.country}
                </address>
                <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener" className="btn mt-6 border border-sand/50 !px-5 !py-3 text-paper hover:bg-sand hover:text-ink">
                  {t.contact.route} <Arrow />
                </a>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">{t.contact.appointment}</h3>
                <a href={`tel:${site.phone}`} className="h-display mt-4 block text-2xl tabular-nums hover:text-sand">
                  {site.phoneDisplay}
                </a>
                <p className="mt-2 text-[14px] text-sand-soft/70">{t.contact.appointmentNote}</p>
                {hasBooking && (
                  <a href={site.bookingUrl} target="_blank" rel="noopener" className="btn btn-light mt-6 !px-5 !py-3">
                    {t.nav.book} <Arrow />
                  </a>
                )}
              </div>
              {site.email && (
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">{t.contact.email}</h3>
                  <a href={`mailto:${site.email}`} className="h-display mt-4 block break-all text-xl hover:text-sand">
                    {site.email}
                  </a>
                </div>
              )}
              {site.instagram && (
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">{t.contact.follow}</h3>
                  <a href={site.instagram} target="_blank" rel="noopener" className="h-display mt-4 block text-xl hover:text-sand">
                    Instagram ↗
                  </a>
                </div>
              )}
            </div>

            <div data-reveal className="rounded-3xl border border-white/10 p-7 sm:p-10">
              <h3 className="h-display text-3xl">{t.contact.hoursTitle}</h3>
              <div className="mb-6 mt-3">
                <OpenBadge hours={site.hours} labels={statusLabels} tone="dark" />
              </div>
              <HoursList hours={site.hours} labels={statusLabels} closed={t.contact.closed} />
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
