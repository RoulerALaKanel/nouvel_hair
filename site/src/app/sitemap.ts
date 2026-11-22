import type { MetadataRoute } from "next";
import { absolute, alternates, locales, path, serviceKeys, type PageKey } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: (PageKey | undefined)[] = [undefined, ...serviceKeys, "legal"];
  const now = new Date();
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: absolute(path(locale, page)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === undefined ? 1 : page === "legal" ? 0.2 : 0.8,
      alternates: { languages: alternates(locale, page).languages },
    })),
  );
}
