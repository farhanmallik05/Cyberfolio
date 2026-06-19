import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 3600; // Cache Supabase queries for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://farhanmallik.netlify.app';

  // Core pages
  const staticRoutes: MetadataRoute.Sitemap = [
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
    '/newsletter',
    '/store'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const supabase = await createClient();
    const { data: projects, error } = await supabase
      .from('portfolio_projects')
      .select('slug, created_at')
      .eq('status', 'published');

    if (error) {
      console.error('Error fetching projects for sitemap:', error);
      return staticRoutes;
    }

    const projectRoutes: MetadataRoute.Sitemap = (projects || []).map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error('Unexpected error generating sitemap:', error);
    return staticRoutes;
  }
}
