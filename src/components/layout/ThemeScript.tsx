/**
 * COLOR_SYSTEM.md §8 — "The theme attribute must be set before first paint to
 * avoid a flash."
 *
 * Runs synchronously in `<head>`, before any paint. Reads the stored preference
 * and applies `data-theme`; absent a stored preference it applies nothing, so
 * `prefers-color-scheme` in tokens.css governs. That is the documented default.
 *
 * If this script fails, the site follows `prefers-color-scheme`, which
 * INTERACTION.md §9 names as the correct fallback.
 */
export const THEME_STORAGE_KEY = 'theme';

const SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
