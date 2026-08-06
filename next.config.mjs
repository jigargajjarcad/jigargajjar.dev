/**
 * ARCHITECTURE.md §2 — static by default, no ISR, no request-time rendering.
 * §10 — AVIF first, WebP fallback.
 * §13 — deployment: HSTS, a strict CSP, and the `www` to apex redirect.
 *
 * Headers and redirects live here rather than in a `vercel.json` for two
 * reasons. They apply to `next start`, so they are testable locally rather than
 * only observable in production; and they travel with the application, which is
 * the portability position ADR-007 takes — a migration should be a build-and-
 * deploy change, not an application change.
 */

/**
 * §13 — "A strict Content Security Policy is possible precisely because there
 * are no third-party origins to allow." Every fetch directive is therefore
 * `'self'`, and the zero-third-party constraint in §10 is what makes that
 * hold rather than being an aspiration.
 *
 * **`'unsafe-inline'` on scripts and styles is a real weakening and is stated
 * rather than hidden.** The framework inlines its hydration payload and the
 * theme script must run before first paint to avoid a flash; both are inline by
 * construction. Removing it needs per-request nonces, which require dynamic
 * rendering and would contradict §2's static-by-default rule. The origin
 * restrictions above are what §13's "strict" refers to — no external script,
 * style, font, image, or connection can load at all.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CSP },
  // Two years, subdomains included, preload-eligible (§13 — HTTPS enforced).
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // The site uses no device APIs. Denying them costs nothing and removes the
  // surface entirely.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },

  async headers() {
    return [
      { source: '/:path*', headers: SECURITY_HEADERS },
      {
        // Fonts and the résumé PDF are content-addressed by name and change only
        // when regenerated deliberately, so they are safe to cache hard.
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // The PDF is regenerated from `/resume`; a day is short enough that a
        // refresh propagates quickly and long enough to be worth caching.
        source: '/resume.pdf',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, must-revalidate' }],
      },
    ];
  },

  async redirects() {
    return [
      {
        // §13 — `www` redirects to apex. Permanent, because the apex is the
        // canonical origin every `<link rel="canonical">` already points at.
        source: '/:path*',
        has: [{ type: 'host', value: 'www.jigargajjar.dev' }],
        destination: 'https://jigargajjar.dev/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
