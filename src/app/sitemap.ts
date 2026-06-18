import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://farhanmallik.netlify.app';

  // Core pages
  const routes = [
    '',
    '/hire',
    '/services',
    '/projects',
    '/blog',
    '/tools',
    '/about',
    '/skills',
    '/contact',
    '/resume',
    '/newsletter'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // You can later expand this by dynamically fetching blog posts or projects from Supabase
  // and mapping them to the sitemap format.

  return [...routes];
}
