import { NextResponse } from 'next/server';
import { fetchGithubProjects } from '@/lib/github-api';

export async function GET() {
  try {
    const projects = await fetchGithubProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error in GitHub projects API route:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
