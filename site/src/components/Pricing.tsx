"use client";

import { useState } from "react";

export type PriceGroup = {
  key: string;
  name: string;
  href: string;
  rows: { label: string; detail?: string; amount: string }[];
};

export default function Pricing({
  groups,
  labels,
}: {
  groups: PriceGroup[];
  labels: { all: string; filterLabel: string };
}) {
  const [filter, setFilter] = useState<string>("all");
  const tabs = [{ key: "all", name: labels.all }, ...groups.map((g) => ({ key: g.key, name: g.name }))];
  const single = filter !== "all";

  return (
    <>
      <div role="group" aria-label={labels.filterLabel} className="-mx-4 mb-12 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:px-0" data-reveal>
        {tabs.map((t) => {
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(t.key)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition duration-300 ${
                active ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      <div className={`grid gap-x-16 gap-y-4 ${single ? "max-w-2xl" : "md:grid-cols-2"}`}>
        {groups.map((g, i) => (
          <div
            key={g.key}
            hidden={single && filter !== g.key}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${(i % 2) * 120}ms` }}
            className="border-t border-ink/15 pb-8 pt-7"
          >
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3 className="h-display text-3xl">{g.name}</h3>
              <a href={g.href} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze underline-offset-4 hover:underline">
                ↗
                <span className="sr-only">{g.name}</span>
              </a>
            </div>
            <ul>
              {g.rows.map((r) => (
                <li key={r.label} className="group flex items-baseline gap-3 py-2.5 text-[15px]">
                  <span>
                    {r.label}
                    {r.detail && <small className="mt-0.5 block text-[13px] text-muted">{r.detail}</small>}
                  </span>
                  <span className="leader transition group-hover:border-copper group-hover:opacity-70" />
                  <span className="h-display whitespace-nowrap text-[17px] transition group-hover:text-copper">{r.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
