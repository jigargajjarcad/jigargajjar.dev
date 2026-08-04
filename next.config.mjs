/**
 * ARCHITECTURE.md §2 — static by default, no ISR, no request-time rendering.
 * §10 — AVIF first, WebP fallback.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
