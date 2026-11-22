"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  homeHref: string;
  links: { href: string; label: string }[];
  langLinks: { locale: Locale; href: string; label: string }[];
  cta: { href: string; label: string; external: boolean };
  labels: { menuOpen: string; menuClose: string; language: string };
};

export default function Header({ locale, homeHref, links, langLinks, cta, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ctaProps = cta.external ? { target: "_blank", rel: "noopener" } : {};

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-line bg-paper/90 shadow-[0_8px_30px_-18px_rgba(25,24,22,.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-paper/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-8 lg:py-5">
        <a href={homeHref} className="group leading-none" aria-label="Nouvel Hair">
          <span className="h-display block text-[22px] tracking-[0.14em] sm:text-2xl">NOUVEL HAIR</span>
          <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.32em] text-muted">
            Russin · Genève
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[12px] font-medium uppercase tracking-[0.14em] text-ink/80 transition hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-copper after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch locale={locale} langLinks={langLinks} label={labels.language} />
          <a href={cta.href} {...ctaProps} className="btn btn-dark hidden !px-5 !py-3 sm:inline-flex">
            {cta.label}
          </a>
          <button
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.menuClose : labels.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`absolute h-px w-6 bg-ink transition duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
            />
            <span
              className={`absolute h-px w-6 bg-ink transition duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-30 overflow-y-auto bg-paper px-4 pb-32 pt-6 lg:hidden"
      >
        <nav className="flex flex-col">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="h-display flex items-baseline justify-between border-b border-line py-5 text-4xl"
            >
              {l.label}
              <span className="font-sans text-xs tracking-[0.2em] text-muted">0{i + 1}</span>
            </a>
          ))}
        </nav>
        <a href={cta.href} {...ctaProps} className="btn btn-dark mt-10 w-full" onClick={() => setOpen(false)}>
          {cta.label}
        </a>
      </div>
    </header>
  );
}

function LangSwitch({
  locale,
  langLinks,
  label,
}: {
  locale: Locale;
  langLinks: Props["langLinks"];
  label: string;
}) {
  return (
    <ul aria-label={label} className="flex items-center text-[11px] font-semibold uppercase tracking-[0.14em]">
      {langLinks.map((l, i) => (
        <li key={l.locale} className="flex items-center">
          {i > 0 && <span aria-hidden className="mx-1.5 text-line">/</span>}
          <a
            href={l.href}
            hrefLang={l.locale}
            lang={l.locale}
            title={l.label}
            aria-current={l.locale === locale ? "page" : undefined}
            className={`py-2 transition ${l.locale === locale ? "text-ink" : "text-muted hover:text-ink"}`}
          >
            {l.locale}
          </a>
        </li>
      ))}
    </ul>
  );
}
