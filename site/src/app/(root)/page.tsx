/**
 * Page racine « / » : redirige vers la langue du navigateur (FR par défaut).
 * Sur un hébergeur avec règles de redirection (Netlify, Vercel…), on peut aussi faire
 * une redirection 301 serveur de « / » vers « /fr/ ».
 */
const script = `(function(){var l=(navigator.languages&&navigator.languages[0]||navigator.language||'fr').slice(0,2).toLowerCase();var t=l==='de'?'/de/':l==='en'?'/en/':'/fr/';location.replace(t+location.hash);})();`;

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/fr/" />
      </noscript>
      <p style={{ fontFamily: "system-ui", padding: 24 }}>
        <a href="/fr/">Nouvel Hair — Français</a> · <a href="/en/">English</a> · <a href="/de/">Deutsch</a>
      </p>
    </>
  );
}
