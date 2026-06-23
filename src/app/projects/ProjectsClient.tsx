'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Flip } from 'gsap/all';
import gsap from 'gsap';
import Fuse from 'fuse.js';
import { FilterBar } from '@/components/projects/FilterBar';
import { Code2, Search } from 'lucide-react';
import { GlitchText } from '@/components/ui/GlitchText';
import { ProjectCard } from '@/components/ui/ProjectCard';

                                                                               // eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const categories = ['All', 'Web Dev', 'Automation', 'AI', 'Design', 'Open Source'];

  // Initialize Fuse.js
  const fuse = useMemo(() => new Fuse(initialProjects, {
    keys: ['title', 'description', 'tech', 'category'],
    threshold: 0.3,
  }), [initialProjects]);

  useEffect(() => {
    // Register Flip securely on client
    gsap.registerPlugin(Flip);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    // Capture state before updating
    const items = gsap.utils.toArray('.project-item') as HTMLElement[];
    const state = Flip.getState(items);

    let result = initialProjects;

    // Search filter
    if (searchQuery) {
      result = fuse.search(searchQuery).map(r => r.item);
    }

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(project => project.category === activeCategory);
    }

    setFilteredProjects(result);

    // Animate layout shift after React state updates the DOM
    requestAnimationFrame(() => {
      if (!gridRef.current) return;
      const newItems = gsap.utils.toArray('.project-item') as HTMLElement[];
      
      Flip.from(state, {
        targets: newItems,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
        onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.4 })
      });
    });
  }, [activeCategory, searchQuery, fuse]);

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <Code2 className="w-8 h-8 text-mech-cyan" />
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            <GlitchText text="Neural Ledger" />
          </h1>
        </div>
        <p className="font-inter text-mech-silver max-w-2xl text-lg mt-4 md:pl-[48px]">
          A verifiable archive of engineered solutions, ranging from immersive web experiences to self-healing automation architectures.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 md:pl-[48px] pr-4">
        <FilterBar 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />
        
        <div className="relative w-full md:w-64 group z-20">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-mech-silver group-focus-within:text-mech-cyan transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-mech-silver/20 rounded-sm leading-5 bg-mech-base/50 placeholder-mech-silver/50 focus:outline-none focus:bg-mech-base focus:border-mech-cyan focus:ring-1 focus:ring-mech-cyan sm:text-sm font-inter transition-colors text-white"
            placeholder="Search stack, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-0 pointer-events-none rounded-sm bg-gradient-to-r from-mech-cyan/0 via-mech-cyan/0 to-mech-cyan/0 group-focus-within:from-mech-cyan/10 group-focus-within:via-mech-cyan/5 group-focus-within:to-transparent" />
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px] md:pl-[48px]">
        {filteredProjects.map((project) => (
          <div key={project.slug} className="project-item h-[450px]">
             <ProjectCard
                slug={project.slug}
                title={project.title}
                description={project.description}
                techStack={project.tech}
                githubUrl={project.githubUrl || undefined}
                liveUrl={project.liveUrl || undefined}
                imagePath={project.thumbnail || undefined}
                isFeatured={project.featured}
                featuredColor="#00F5FF"
                category={project.category}
                year={project.year}
                                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                status={project.status as any}
                caseStudy={project.caseStudy}
             />
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-mech-silver/20 bg-mech-base/30 rounded-sm">
            <Search className="w-12 h-12 text-mech-silver/40 mb-4" />
            <h3 className="font-orbitron text-xl text-white mb-2 tracking-widest uppercase">No Match Found</h3>
            <p className="text-mech-silver font-inter">Try adjusting your category or search parameters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
