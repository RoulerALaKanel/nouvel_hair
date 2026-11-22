import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export 100 % statique (dossier `out/`) : hébergeable partout, pages pré-rendues pour le SEO.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
