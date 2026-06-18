import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import projectsDataFallback from '@/data/projects.json';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('status', 'published')
        .order('year', { ascending: false });

    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      return NextResponse.json(projectsDataFallback.map((p: any) => ({...p, techStack: p.tech})));
    }
    
    if (!data || data.length === 0) {
      return NextResponse.json(projectsDataFallback.map((p: any) => ({...p, techStack: p.tech})));
    }

    const formattedProjects = data.map(p => ({
        ...p,
        githubUrl: p.github_url,
        liveUrl: p.live_url,
        techStack: p.tech_stack || []
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('Error in projects API route:', error);
    return NextResponse.json(projectsDataFallback.map((p: any) => ({...p, techStack: p.tech})));
  }
}
