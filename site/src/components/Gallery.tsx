"use client";

import { useRef, useState } from "react";

export type Photo = { src: string; thumb: string; width: number; height: number; alt: string };

export default function Gallery({ photos, labels }: { photos: Photo[]; labels: { close: string; enlarge: string } }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Photo | null>(null);

  const open = (p: Photo) => {
    setCurrent(p);
    dlg.current?.showModal?.();
  };

  // Mise en page : 1 photo = grand format ; 2+ = grille éditoriale asymétrique.
  const layout =
    photos.length === 1
      ? "grid-cols-1"
      : photos.length === 2
        ? "sm:grid-cols-2"
        : "grid-cols-2 lg:grid-cols-3 [&>*:first-child]:row-span-2 [&>*:first-child]:col-span-2 lg:[&>*:first-child]:col-span-1";

  return (
    <>
      <div className={`grid gap-3 sm:gap-5 ${layout}`}>
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => open(p)}
            aria-label={`${labels.enlarge} : ${p.alt}`}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            className={`group relative block cursor-zoom-in overflow-hidden bg-sand-soft ${
              photos.length === 1 ? "mx-auto aspect-[4/5] w-full max-w-sm rounded-t-full" : "aspect-[4/5]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.thumb}
              alt={p.alt}
              width={p.width}
              height={p.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-[1.2s] ease-out-soft group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dlg}
        className="lightbox m-auto max-h-[92vh] max-w-[92vw] overflow-visible bg-transparent p-0"
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
        aria-label={current?.alt}
      >
        <form method="dialog" className="absolute -top-12 right-0">
          <button className="py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-paper">{labels.close} ✕</button>
        </form>
        {current && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.src} alt={current.alt} className="block max-h-[86vh] max-w-[92vw] object-contain" />
        )}
      </dialog>
    </>
  );
}
