import React from 'react';

import { MessageSquare, Twitter, Github, ArrowUpRight, Briefcase, GitPullRequest } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import jobsData from '@/data/jobs.json';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Community | Neural Architect | Farhan Mallik',
  description: 'Explore the Community page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  openGraph: {
    title: 'Community | Neural Architect',
    description: 'Explore the Community page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

async function getGoodFirstIssues() {
  try {
    // Fetching from a popular repo for demonstration, or we could search by author.
    // We'll search for open good first issues in the general web dev ecosystem to encourage contribution.
    const res = await fetch('https://api.github.com/search/issues?q=is:issue+is:open+label:"good first issue"+language:typescript&sort=updated&order=desc&per_page=5', {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch (e) {
    console.error("Failed to fetch issues", e);
    return [];
  }
}

export default async function CommunityPage() {
  const issues = await getGoodFirstIssues();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-16">
      
      {/* Link Tree Section */}
      <section className="flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-widest">
          THE <span className="text-[var(--neon)] mech-text-glow">COLLECTIVE</span>
        </h1>
        <p className="text-[var(--text-muted)] font-mono max-w-md">
          Join the network. Collaborate on open-source, discuss architecture, and find your next role.
        </p>

        <div className="w-full max-w-sm flex flex-col gap-4 mt-4">
          <a href="https://discord.gg/example" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-4 bg-[#5865F2]/10 border border-[#5865F2]/30 hover:border-[#5865F2] hover:bg-[#5865F2]/20 transition-all rounded-sm group">
            <div className="flex items-center gap-3 text-white font-heading font-bold tracking-widest">
              <MessageSquare className="text-[#5865F2]" /> DISCORD
            </div>
            <ArrowUpRight className="text-[#5865F2] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a href="https://twitter.com/farhanmallik" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-4 bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-all rounded-sm group">
            <div className="flex items-center gap-3 text-white font-heading font-bold tracking-widest">
              <Twitter className="text-[#1DA1F2]" /> TWITTER (X)
            </div>
            <ArrowUpRight className="text-[#1DA1F2] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a href="https://github.com/farhanmallik" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all rounded-sm group">
            <div className="flex items-center gap-3 text-white font-heading font-bold tracking-widest">
              <Github className="text-white" /> GITHUB
            </div>
            <ArrowUpRight className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Open Source Showcase */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-heading font-bold uppercase flex items-center gap-2 border-b border-[var(--border)] pb-4">
            <GitPullRequest className="text-[var(--neon)]" /> OPEN SOURCE
          </h2>
          <p className="text-[var(--text-muted)] font-mono text-xs">Recommended "Good First Issues" in the TS ecosystem.</p>
          
          <div className="flex flex-col gap-4">
            {issues.length > 0 ? issues.map((issue: any) => (
              <a key={issue.id} href={issue.html_url} target="_blank" rel="noopener noreferrer" className="group p-4 bg-[var(--bg2)] border border-[var(--border)] hover:border-[var(--neon)] transition-colors rounded-sm flex flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading font-bold text-white group-hover:text-[var(--neon)] transition-colors line-clamp-2 leading-tight">
                    {issue.title}
                  </h3>
                  <span className="font-mono text-[10px] text-[var(--neon)] border border-[var(--neon)]/30 px-2 py-1 flex-shrink-0">
                    #{issue.number}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-[var(--text-muted)] mt-2">
                  Repo: {issue.repository_url.split('/').slice(-2).join('/')}
                </div>
              </a>
            )) : (
              <div className="p-6 text-center border border-dashed border-[var(--border)] font-mono text-sm text-[var(--text-muted)]">
                No issues found or API rate limited.
              </div>
            )}
          </div>
        </section>

        {/* Tech Job Board */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-heading font-bold uppercase flex items-center gap-2 border-b border-[var(--border)] pb-4">
            <Briefcase className="text-[var(--neon)]" /> JOB BOARD
          </h2>
          <p className="text-[var(--text-muted)] font-mono text-xs">Curated technical roles across the network.</p>
          
          <div className="flex flex-col gap-4">
            {jobsData.map((job) => (
              <GlassPanel key={job.id} className="p-5 flex flex-col gap-4 hover:border-[var(--glass)] transition-all group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading font-bold text-lg group-hover:text-white transition-colors">{job.role}</h3>
                    <div className="font-mono text-sm text-[var(--neon)] mt-1">{job.company}</div>
                  </div>
                  <a href={job.url} target="_blank" rel="noopener noreferrer" aria-label="Apply to job" className="p-2 border border-[var(--border)] rounded hover:bg-[var(--neon)] hover:text-black hover:border-[var(--neon)] transition-all">
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] uppercase bg-black px-2 py-1 border border-[var(--border)] text-[var(--dim)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2 pt-4 border-t border-[var(--border)] font-mono text-[10px] uppercase text-[var(--dim)]">
                  <span>{job.location} • {job.type}</span>
                  <span>Posted: {job.datePosted}</span>
                </div>
              </GlassPanel>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
