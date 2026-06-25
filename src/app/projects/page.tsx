import ProjectsClient from './ProjectsClient';
import { createClient } from '@/utils/supabase/server';
import projectsDataFallback from '@/data/projects.json';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Projects | Neural Architect | Farhan Mallik',
  description: 'Explore the Projects page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  openGraph: {
    title: 'Projects | Neural Architect',
    description: 'Explore the Projects page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  },
};

export const revalidate = 0;

const mapFallback = () =>
    projectsDataFallback.map((p: Record<string, unknown>) => ({ ...p, techStack: p['tech'] }));

export default async function ProjectsPage() {
    let initialProjects: Record<string, unknown>[];

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .eq('status', 'published')
            .order('year', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            initialProjects = mapFallback();
        } else if (data && data.length > 0) {
            initialProjects = data.map(p => ({
                ...p,
                githubUrl: p.github_url,
                liveUrl: p.live_url,
                techStack: p.tech_stack || []
            }));
        } else {
            initialProjects = mapFallback();
        }
    } catch (err) {
        console.error('Failed to fetch projects:', err);
        initialProjects = mapFallback();
    }

    return <ProjectsClient initialProjects={initialProjects} />;
}
