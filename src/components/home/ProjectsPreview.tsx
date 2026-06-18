"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FolderGit2, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/github-api';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { MechButton } from '@/components/ui/MechButton';
import Link from 'next/link';
import styles from './ProjectsPreview.module.css';

interface ProjectsPreviewProps {
  initialProjects: Project[];
}

export function ProjectsPreview({ initialProjects }: ProjectsPreviewProps) {
  const [projects] = useState<Project[]>(initialProjects || []);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current || projects.length === 0) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reduced) return;

    // Force a refresh after layout potentially shifts due to project loading
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainerRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      const xTranslate = -(scrollWidth - windowWidth + 100);

      gsap.to(scrollContainerRef.current, {
        x: xTranslate,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={sectionRef} className={styles.section} id="projects-preview">
      <div className={styles.titleWrapper}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-orbitron text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <FolderGit2 className="text-neon" />
              Project_Deployments
            </h2>
            <p className="text-dim text-sm font-mono uppercase tracking-[0.2em] mt-2">
              Selected neural system architectures
            </p>
          </div>
          <Link href="/projects" className="hidden md:block">
            <MechButton variant="secondary" icon={<ArrowRight size={16} />}>
              View All
            </MechButton>
          </Link>
        </div>
      </div>

      <div ref={scrollContainerRef} className={styles.scrollContainer}>
        {projects.map((project, i) => (
          <div key={i} className={styles.projectCardWrapper}>
            <ProjectCard {...project} />
          </div>
        ))}
        {/* End Spacer */}
        <div className="w-[400px] flex items-center justify-center">
            <Link href="/projects">
              <div className="flex flex-col items-center gap-4 text-dim hover:text-neon transition-colors cursor-pointer group">
                  <div className="p-6 rounded-full border border-dashed border-dim group-hover:border-neon">
                      <ArrowRight size={32} />
                  </div>
                  <span className="font-orbitron text-xs tracking-widest uppercase">Load_More</span>
              </div>
            </Link>
        </div>
      </div>
    </section>
  );
}
