"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useEffect, useState, useMemo } from "react";
import { getAllProjects, Project } from "@/lib/projects";
import { useRole, ROLE_META } from "@/context/RoleContext";
import { GitHubStatsBar } from "@/components/GitHubStatsBar";
import { FilterBar } from "@/components/projects/FilterBar";
import Fuse from "fuse.js";

export default function Projects() {
    const { activeRole } = useRole();
    const roleMeta = ROLE_META[activeRole];
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple artificial delay for boot sequence feel
        const timer = setTimeout(() => {
            setAllProjects(getAllProjects());
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const categories = useMemo(() => {
        const cats = new Set(allProjects.map(p => p.category));
        return ["All", ...Array.from(cats)];
    }, [allProjects]);

    const filteredProjects = useMemo(() => {
        let results = [...allProjects];

        // 1. Category Filter
        if (activeCategory !== "All") {
            results = results.filter(p => p.category === activeCategory);
        }

        // 2. Search Filter (Fuse.js)
        if (searchQuery) {
            const fuse = new Fuse(results, {
                keys: ["title", "tech", "description", "category"],
                threshold: 0.2 // More strict for technical accuracy
            });
            results = fuse.search(searchQuery).map(r => r.item);
        }

        // 3. Role-based sorting (if role isn't 'all')
        if (activeRole !== "all") {
             // Basic sort: featured first, then by year
             results.sort((a, b) => {
                 if (a.featured && !b.featured) return -1;
                 if (!a.featured && b.featured) return 1;
                 return b.year - a.year;
             });
        }

        return results;
    }, [allProjects, activeCategory, searchQuery, activeRole]);

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="flex flex-col items-center mb-12 w-full">
                    <div className="px-4 py-1 border border-mech-cyan/30 bg-mech-cyan/10 rounded-sm mb-4">
                        <span className="text-xs font-orbitron font-bold text-mech-cyan tracking-widest uppercase">PROJECT ARCHIVES</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase text-mech-white">
                        Mission <span className="text-mech-blue">Control</span>
                    </h1>
                    <p className="text-center font-inter text-mech-silver mt-4 max-w-2xl">
                        A definitive ledger of neural deployments, system architectures, and autonomous experiments.
                    </p>
                </div>

                <div className="mb-12">
                    <FilterBar 
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        onSearch={setSearchQuery}
                    />
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-2 border-mech-cyan border-t-transparent rounded-full animate-spin mb-4" />
                        <span className="font-orbitron text-mech-cyan animate-pulse tracking-widest text-sm uppercase">Accessing Database...</span>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full auto-rows-fr">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project, idx) => (
                                        <motion.div
                                            key={project.slug}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                            transition={{ 
                                                layout: { duration: 0.4, ease: "circOut" },
                                                opacity: { duration: 0.4 },
                                                delay: idx * 0.05
                                            }}
                                            className="h-full"
                                        >
                                            <ProjectCard 
                                                slug={project.slug}
                                                title={project.title}
                                                description={project.description}
                                                techStack={project.tech}
                                                githubUrl={project.githubUrl}
                                                liveUrl={project.liveUrl}
                                                imagePath={project.thumbnail}
                                                isFeatured={project.featured}
                                                featuredColor={roleMeta.color}
                                                category={project.category}
                                                status={project.status}
                                                caseStudy={project.caseStudy}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-32 text-center border border-dashed border-mech-silver/20 rounded-lg relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-mech-cyan/5 animate-pulse" />
                                        <div className="relative z-10">
                                            <div className="w-16 h-1 w-full bg-mech-cyan/20 absolute top-0 left-0 animate-scan-fast" />
                                            <p className="font-orbitron text-mech-cyan uppercase tracking-[0.4em] mb-4 text-sm animate-pulse">NO_MATCHING_INTEL_FOUND</p>
                                            <p className="font-mono text-mech-silver/40 text-[10px] uppercase">Verify query parameters or clear neural filters</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        <div className="mt-20 pt-10 border-t border-mech-silver/10">
                            <h2 className="text-center font-orbitron text-mech-silver/40 text-xs tracking-widest uppercase mb-8">Global Network Statistics</h2>
                            <GitHubStatsBar />
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}
