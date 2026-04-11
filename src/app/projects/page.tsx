"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useEffect, useState } from "react";
import { fetchGithubProjects, Project } from "@/lib/github-api";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await fetchGithubProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to load projects:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadProjects();
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="flex flex-col items-center mb-16 w-full">
                    <div className="px-4 py-1 border border-mech-cyan/30 bg-mech-cyan/10 rounded-sm mb-4">
                        <span className="text-xs font-orbitron font-bold text-mech-cyan tracking-widest uppercase">CLASSIFIED DATA</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase text-mech-white">
                        Project <span className="text-mech-blue">Deployments</span>
                    </h1>
                    <p className="text-center font-inter text-mech-silver mt-4 max-w-2xl">
                        Real-time intelligence operations synchronized from neural repositories.
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-mech-cyan/30 to-transparent w-full max-w-md mx-auto mt-6" />
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-2 border-mech-cyan border-t-transparent rounded-full animate-spin mb-4" />
                        <span className="font-orbitron text-mech-cyan animate-pulse tracking-widest text-sm uppercase">Synchronizing Repositories...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
                        {projects.length > 0 ? (
                            projects.map((project, idx) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="h-full"
                                >
                                    <ProjectCard {...project} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center border border-dashed border-mech-silver/20 rounded-lg">
                                <p className="font-orbitron text-mech-silver uppercase tracking-widest">No Active Deployments Found</p>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
