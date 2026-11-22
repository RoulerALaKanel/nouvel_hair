/** Petits composants serveur partagés. */

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON sérialisé : on échappe "<" pour éviter toute fermeture de balise.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const center = align === "center";
  return (
    <div data-reveal className={`mb-14 max-w-2xl lg:mb-20 ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${tone === "dark" ? "!text-sand" : ""}`}>{eyebrow}</p>
      <h2 className="h-display mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02]">{title}</h2>
      {intro && (
        <p className={`mt-6 text-[16px] leading-relaxed ${tone === "dark" ? "text-sand-soft/75" : "text-muted"} ${center ? "mx-auto max-w-lg" : "max-w-lg"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="group" data-reveal>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
            <span className="h-display text-xl sm:text-2xl">{it.q}</span>
            <span
              aria-hidden
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-paper"
            >
              <span className="absolute h-px w-3.5 bg-current" />
              <span className="absolute h-3.5 w-px bg-current" />
            </span>
          </summary>
          <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-relaxed text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
