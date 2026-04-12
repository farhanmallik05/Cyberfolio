import projectsData from "@/data/projects.json";

export interface ProjectOverview {
    problem: string;
    role: string;
    outcomes: string[];
}

export interface ProjectProcess {
    phase: string;
    description: string;
    tools: string[];
}

export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    tech: string[];
    category: string;
    year: number;
    status: 'live' | 'in-progress' | 'archived';
    featured?: boolean;
    thumbnail?: string;
    liveUrl?: string;
    githubUrl?: string;
    caseStudy?: boolean;
    icon?: string;
    overview?: ProjectOverview;
    process?: ProjectProcess[];
}

export function getAllProjects(): Project[] {
    return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
    return (projectsData as Project[]).find(p => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
    return (projectsData as Project[]).filter(p => p.featured);
}
