"use client";

import { useEffect, useState } from "react";

type Hours = Record<number, [string, string] | null>;
type Labels = {
  days: string[];
  openNow: string;
  opensToday: string;
  opensTomorrow: string;
  opensDay: string;
};

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Heure actuelle à Genève, quel que soit le fuseau du visiteur. */
function zurichNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zurich",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const o: Record<string, string> = {};
  parts.forEach((p) => (o[p.type] = p.value));
  return {
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday),
    min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10),
  };
}

export function computeStatus(hours: Hours, l: Labels) {
  const n = zurichNow();
  const today = hours[n.day];
  if (today && n.min >= toMin(today[0]) && n.min < toMin(today[1]))
    return { open: true, day: n.day, text: l.openNow.replace("{time}", today[1]) };
  if (today && n.min < toMin(today[0]))
    return { open: false, day: n.day, text: l.opensToday.replace("{time}", today[0]) };
  for (let i = 1; i <= 7; i++) {
    const d = (n.day + i) % 7;
    const h = hours[d];
    if (h) {
      const tpl = i === 1 ? l.opensTomorrow : l.opensDay;
      return {
        open: false,
        day: n.day,
        text: tpl.replace("{time}", h[0]).replace("{day}", l.days[d].toLowerCase()),
      };
    }
  }
  return null;
}

/** Calculé côté navigateur uniquement (évite un statut figé au moment du build). */
export function useOpenStatus(hours: Hours, labels: Labels) {
  const [status, setStatus] = useState<ReturnType<typeof computeStatus>>(null);
  useEffect(() => {
    const update = () => {
      try {
        setStatus(computeStatus(hours, labels));
      } catch {
        /* Intl indisponible : on n'affiche rien */
      }
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return status;
}

export function OpenBadge({ hours, labels, tone = "light" }: { hours: Hours; labels: Labels; tone?: "light" | "dark" }) {
  const s = useOpenStatus(hours, labels);
  return (
    <p
      aria-live="polite"
      className={`flex min-h-5 items-center gap-2.5 text-[13px] ${tone === "dark" ? "text-sand-soft/80" : "text-muted"}`}
    >
      {s && (
        <>
          <span className="relative flex h-2 w-2">
            {s.open && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${s.open ? "bg-emerald-500" : "bg-copper"}`} />
          </span>
          {s.text}
        </>
      )}
    </p>
  );
}

export function HoursList({ hours, labels, closed }: { hours: Hours; labels: Labels; closed: string }) {
  const s = useOpenStatus(hours, labels);
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <ul className="divide-y divide-white/10">
      {order.map((d) => {
        const h = hours[d];
        const isToday = s?.day === d;
        return (
          <li
            key={d}
            aria-current={isToday ? "date" : undefined}
            className={`flex items-baseline gap-3 py-3 text-[15px] ${isToday ? "text-paper" : "text-sand-soft/70"}`}
          >
            <span className={isToday ? "text-sand" : ""}>{labels.days[d]}</span>
            <span className="leader" />
            {h ? (
              <span className="tabular-nums">
                {h[0]} – {h[1]}
              </span>
            ) : (
              <span className="opacity-60">{closed}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
