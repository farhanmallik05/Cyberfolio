'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Project } from '@/lib/projects';

const ProjectCard = dynamic(() => import('@/components/ui/ProjectCard').then(mod => mod.ProjectCard), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-mech-base/30 border border-mech-silver/10 animate-pulse rounded-sm" />
});

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="mt-32 pt-20 border-t border-mech-silver/10 md:pl-[48px] pr-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
        <div>
          <div className="text-xs font-orbitron text-mech-cyan tracking-[0.2em] uppercase mb-4">▸▸ 05 — Network Logs</div>
          <h2 className="font-orbitron text-3xl font-black text-white uppercase tracking-wide">Related Work</h2>
        </div>
        <Link href="/projects" className="font-orbitron text-sm text-mech-cyan hover:text-white transition-colors tracking-widest uppercase pb-1 border-b border-mech-cyan/30">
          View Full Ledger
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <div key={p.slug} className="h-[450px]">
            <ProjectCard
              slug={p.slug}
              title={p.title}
              description={p.description}
              techStack={p.tech}
              githubUrl={p.githubUrl || undefined}
              liveUrl={p.liveUrl || undefined}
              imagePath={p.thumbnail || undefined}
              category={p.category}
              year={p.year}
              status={p.status as any}
              caseStudy={p.caseStudy}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
