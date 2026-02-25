"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { GlassPanel } from "./GlassPanel";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    imagePath?: string;
}

export function ProjectCard({ title, description, techStack, githubUrl, liveUrl, imagePath }: ProjectCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(0, 240, 255, 0.15), transparent 80%)`;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            className="relative group cursor-pointer h-full"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{ background }}
            />

            <GlassPanel className="h-full flex flex-col overflow-hidden relative" neonBorder>

                {/* Scanning Line overlay */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "200%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-8 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent"
                    />
                </div>

                {/* Image Region */}
                <div className="relative h-48 w-full bg-cyber-base border-b border-neon-blue/20 overflow-hidden flex items-center justify-center">
                    {imagePath ? (
                        <img src={imagePath} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,240,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
                    )}
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-black/50 backdrop-blur-md rounded border border-white/10 hover:border-neon-magenta hover:text-neon-magenta transition-colors">
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                        {liveUrl && (
                            <a href={liveUrl} target="_blank" rel="noreferrer" className="p-2 bg-black/50 backdrop-blur-md rounded border border-white/10 hover:border-neon-green hover:text-neon-green transition-colors">
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Content Region */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                    <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-neon-blue transition-colors">
                        {title}
                    </h3>
                    <p className="font-inter text-sm text-foreground/70 flex-1">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {techStack.map(tech => (
                            <span key={tech} className="text-xs font-inter px-2 py-1 rounded bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </GlassPanel>
        </motion.div>
    );
}
