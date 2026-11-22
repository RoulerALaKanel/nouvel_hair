import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nouvel Hair — Salon de coiffure à Russin",
    short_name: "Nouvel Hair",
    start_url: "/fr/",
    display: "browser",
    background_color: "#fdfbf7",
    theme_color: "#191816",
    icons: [{ src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
