import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, hasBooking, bookingHref } from "@/config/site";
import { getDictionary } from "@/content";
import { prices, formatCHF } from "@/content/prices";
import type { Dictionary } from "@/content/types";
import {
  absolute,
  alternates,
  isLocale,
  locales,
  pageKeyFromSlug,
  path,
  serviceKeys,
  slugs,
  type Locale,
  type PageKey,
  type ServiceKey,
} from "@/lib/i18n";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Shell from "@/components/Shell";
import { Arrow, FaqList, JsonLd, PhoneIcon } from "@/components/ui";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    (Object.keys(slugs) as PageKey[]).map((k) => ({ locale, slug: slugs[k][locale] })),
  );
}

async function resolve(params: Props["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return null;
  const key = pageKeyFromSlug(locale, slug);
  return key ? { locale, key } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  const t = getDictionary(r.locale);
  const { title, description } =
    r.key === "legal"
      ? { title: t.legal.metaTitle, description: t.legal.metaDescription }
      : { title: t.serviceContent[r.key].metaTitle, description: t.serviceContent[r.key].metaDescription };
  return {
    title: { absolute: title },
    description,
    alternates: alternates(r.locale, r.key),
    openGraph: { title, description, url: path(r.locale, r.key) },
    ...(r.key === "legal" ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function Page({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();
  const { locale, key } = r;
  const t = getDictionary(locale);
  return <Shell locale={locale} page={key}>{key === "legal" ? <Legal t={t} /> : <Service locale={locale} k={key} t={t} />}</Shell>;
}

/* ───────────────────────── Page prestation ───────────────────────── */

function Service({ locale, k, t }: { locale: Locale; k: ServiceKey; t: Dictionary }) {
  const c = t.serviceContent[k];
  const others = serviceKeys.filter((s) => s !== k);
  const bookExt = hasBooking ? { target: "_blank", rel: "noopener" } : {};
  const crumbs = [
    { name: t.servicePage.breadcrumbHome, url: absolute(path(locale)) },
    { name: t.nav.services, url: absolute(path(locale, undefined, "services")) },
    { name: c.name, url: absolute(path(locale, k)) },
  ];

  return (
    <>
      <JsonLd data={[serviceSchema(locale, k, t), faqSchema(c.faq), breadcrumbSchema(crumbs)]} />

      <section className="px-4 pb-20 pt-8 sm:px-8 lg:pb-28 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-12 text-[12px] text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href={path(locale)} className="hover:text-ink">{t.servicePage.breadcrumbHome}</a>
              </li>
              <li aria-hidden>/</li>
              <li>
                <a href={`${path(locale)}#services`} className="hover:text-ink">{t.nav.services}</a>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{c.name}</li>
            </ol>
          </nav>

          <div className="grid items-end gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow">0{serviceKeys.indexOf(k) + 1} — {c.name}</p>
              <h1 className="h-display mt-6 text-[clamp(2.8rem,7.4vw,6.4rem)] leading-[0.95]">{c.h1}</h1>
              <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-muted">{c.lead}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={bookingHref} {...bookExt} className="btn btn-dark">
                  {t.nav.book} <Arrow />
                </a>
                <a href="#tarifs-prestation" className="btn btn-ghost">{t.servicePage.pricesTitle}</a>
              </div>
            </div>

            {/* Carte tarifs */}
            <aside id="tarifs-prestation" className="scroll-mt-28 rounded-t-[999px] bg-cream px-8 pb-10 pt-24 sm:px-12">
              <h2 className="h-display text-center text-3xl">{t.servicePage.pricesTitle}</h2>
              <ul className="mt-8">
                {prices[k].map((p) => (
                  <li key={p.label.fr} className="flex items-baseline gap-3 border-b border-ink/10 py-3 text-[15px] last:border-0">
                    <span>
                      {p.label[locale]}
                      {p.detail && <small className="block text-[13px] text-muted">{p.detail[locale]}</small>}
                    </span>
                    <span className="leader" />
                    <span className="h-display whitespace-nowrap text-[17px]">
                      {p.from ? `${t.prices.from} ` : ""}
                      {formatCHF(p.amount)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center text-[12px] leading-relaxed text-muted">{t.prices.note}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-4 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-6" data-reveal>
            {c.body.map((p, i) => (
              <p key={i} className={i === 0 ? "h-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug" : "text-[16px] leading-relaxed text-muted"}>
                {p}
              </p>
            ))}
          </div>
          <div data-reveal>
            <h2 className="eyebrow">{t.servicePage.stepsTitle}</h2>
            <ol className="mt-8 space-y-8">
              {c.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="h-display flex h-12 w-12 items-center justify-center rounded-full border border-sand text-lg italic text-bronze">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="h-display text-2xl">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <h2 className="h-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-tight">{t.servicePage.faqTitle}</h2>
          <FaqList items={c.faq} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink px-4 py-20 text-paper sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center" data-reveal>
          <h2 className="h-display text-[clamp(2.4rem,6vw,5rem)] leading-none">
            {t.servicePage.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sand-soft/75">{t.servicePage.ctaText}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={bookingHref} {...bookExt} className="btn btn-light">
              {t.nav.book} <Arrow />
            </a>
            <a href={`tel:${site.phone}`} className="btn border border-sand/50 text-paper hover:bg-sand hover:text-ink">
              <PhoneIcon /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="px-4 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="eyebrow">{t.servicePage.otherServices}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o}>
                <a href={path(locale, o)} className="group flex h-full flex-col justify-between gap-8 border border-line p-7 transition hover:border-ink">
                  <span className="h-display text-3xl transition group-hover:italic group-hover:text-bronze">{t.serviceContent[o].name}</span>
                  <span className="flex items-center justify-between text-[14px] text-muted">
                    <span className="max-w-[80%]">{t.serviceContent[o].short}</span>
                    <Arrow className="shrink-0 transition group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── Mentions légales ───────────────────────── */

function Legal({ t }: { t: Dictionary }) {
  const l = t.legal;
  const todo = (v: string) =>
    v || <span className="bg-sand-soft px-1 text-bronze">[{l.toComplete}]</span>;
  return (
    <section className="px-4 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl text-[15px] leading-relaxed text-muted">
        <h1 className="h-display mb-12 text-[clamp(2.6rem,6vw,4.4rem)] leading-none text-ink">{l.title}</h1>

        <h2 className="h-display mb-3 mt-10 text-2xl text-ink">{l.operator}</h2>
        <p>
          {site.name}
          {site.legal.companyName ? ` — ${site.legal.companyName}` : <> — {todo("")}</>}
          <br />
          {l.manager} : {todo(site.legal.manager)}
          <br />
          {site.address.street}, {site.address.postalCode} {site.address.locality}, {t.contact.country}
          <br />
          {l.phone} : <a href={`tel:${site.phone}`} className="text-ink underline">{site.phoneDisplay}</a>
          <br />
          {l.email} : {site.email ? <a href={`mailto:${site.email}`} className="text-ink underline">{site.email}</a> : todo("")}
          <br />
          {l.uid} : {todo(site.legal.uid)}
        </p>

        <h2 className="h-display mb-3 mt-10 text-2xl text-ink">{l.privacyTitle}</h2>
        <p className="mb-3">{l.privacy[0]}</p>
        <p className="mb-3">{l.hostSentence(site.legal.host || `[${l.toComplete}]`)}</p>
        {l.privacy.slice(1).map((p) => (
          <p key={p} className="mb-3">{p}</p>
        ))}

        <h2 className="h-display mb-3 mt-10 text-2xl text-ink">{l.ipTitle}</h2>
        <p>{l.ip}</p>
      </div>
    </section>
  );
}
