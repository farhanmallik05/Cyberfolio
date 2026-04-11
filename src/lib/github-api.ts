
export interface Repository {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars: number;
}

const GITHUB_USERNAME = "farhanmallik05";
const BASE_URL = "https://api.github.com";

export async function fetchGithubProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos: Repository[] = await response.ok ? await response.json() : [];

    // Filter out forks and non-project repos if necessary
    // For now, take top 6 by stars or most recent
    const filteredRepos = repos
      .filter(repo => !repo.name.startsWith('.') && repo.name !== GITHUB_USERNAME)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10);

    return filteredRepos.map(repo => ({
      title: repo.name.replace(/-/g, ' ').toUpperCase(),
      description: repo.description || "Experimental system module. No transmission data provided.",
      techStack: repo.language ? [repo.language, ...repo.topics.slice(0, 2)] : repo.topics.slice(0, 3) || ["System"],
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || undefined,
      stars: repo.stargazers_count
    }));
  } catch (error) {
    console.error("Error fetching projects from GitHub:", error);
    return [];
  }
}

export async function fetchGithubReadme(): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${GITHUB_USERNAME}/contents/README.md`);
    if (!response.ok) return "";
    
    const data = await response.json();
    const content = atob(data.content);
    return content;
  } catch (error) {
    console.error("Error fetching GitHub profile README:", error);
    return "";
  }
}
