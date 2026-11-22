# Nouvel Hair — site vitrine (Next.js + React + Tailwind CSS)

## Lancer
```bash
npm install
npm run dev      # http://localhost:3000/fr/
npm run build    # génère le site statique dans out/
```
Le dossier `out/` se dépose tel quel chez n'importe quel hébergeur (Infomaniak, Netlify, Vercel, OVH…).

## À compléter avant mise en ligne → `src/config/site.ts`
- `url` : le vrai domaine (canonical, sitemap, Open Graph, hreflang en dépendent)
- `email`, `instagram`, `bookingUrl` (vide = masqué / boutons « Réserver » → appel)
- `legal` : raison sociale, responsable, n° IDE, hébergeur
- `geo` : coordonnées GPS du salon (facultatif, SEO local)
- `gallery` : ajouter des photos dans `public/images/` puis les lister

## Où modifier quoi
| Quoi | Fichier |
|---|---|
| Tarifs (mis à jour partout + données Google) | `src/content/prices.ts` |
| Textes FR / EN / DE | `src/content/fr.ts`, `en.ts`, `de.ts` |
| Couleurs, polices | `src/app/globals.css` (`@theme`) |
| URL traduites des pages | `src/lib/i18n.ts` (`slugs`) |

## SEO inclus
- Pages pré-rendues en HTML statique, 3 langues avec URL traduites + `hreflang` + `x-default`
- 4 pages dédiées par prestation (coupe, coloration, balayage, soins) pour le référencement local
- Données structurées : `HairSalon` (horaires, adresse, catalogue de prix), `Service`, `FAQPage`, `BreadcrumbList`, `WebSite`
- `sitemap.xml` multilingue, `robots.txt`, `manifest.webmanifest`, image Open Graph 1200×630
- Polices auto-hébergées (aucun appel à Google côté visiteur), images WebP, pas de cookies

## Après la mise en ligne
1. Déclarer le site dans Google Search Console et y soumettre `/sitemap.xml`
2. Créer / mettre à jour la fiche **Google Business Profile** du salon avec l'URL du site (c'est le levier n°1 du SEO local)
3. Idéalement, configurer chez l'hébergeur une redirection 301 de `/` vers `/fr/`
