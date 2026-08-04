import type { MetadataRoute } from 'next';

const ROUTES = ['', '/work', '/about', '/workflow', '/resume', '/connect'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `https://jigargajjar.dev${path}` }));
}
