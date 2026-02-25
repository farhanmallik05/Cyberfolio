"use client";

import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { MechPanel } from "./MechPanel";
import { Github, ExternalLink, Box } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    imagePath?: string;
}

export function ProjectCard({ title, description, techStack, githubUrl, liveUrl, imagePath }: ProjectCardProps) {
    const mouseX = useMotionValue(200);
    const mouseY = useMotionValue(200);

    const rotateX = useTransform(mouseY, [0, 400], [7, -7]);
    const rotateY = useTransform(mouseX, [0, 400], [-7, 7]);

    function handleMouseMove(event: React.MouseEvent) {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
    }

    function handleMouseLeave() {
        mouseX.set(200);
        mouseY.set(200);
    }

    const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(0, 174, 239, 0.15), transparent 80%)`;

    return (
        <motion.div
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                style={{ rotateX, rotateY }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative group cursor-pointer h-full"
            >
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                    style={{ background }}
                />

                <MechPanel className="h-full flex flex-col overflow-hidden relative" border glowHover={false}>

                    {/* Scanning Line overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: "200%" }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            className="w-full h-8 bg-gradient-to-b from-transparent via-mech-cyan/20 to-transparent shadow-[0_4px_10px_rgba(15,211,255,0.3)]"
                        />
                    </div>

                    {/* Image Region: 3D Inner Scene */}
                    <div className="relative h-48 w-full bg-mech-base border-b border-mech-silver/10 overflow-hidden flex items-center justify-center group-hover:bg-mech-panel/50 transition-colors">
                        {imagePath ? (
                            <img src={imagePath} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        ) : (
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Wireframe grid */}
                                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(15,211,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(15,211,255,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />
                                {/* 3D Box Wireframe Effect */}
                                <motion.div
                                    className="relative z-10 text-mech-cyan/40 group-hover:text-mech-cyan transition-colors"
                                    animate={{ rotateY: 360, rotateX: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <Box className="w-16 h-16" />
                                </motion.div>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 flex gap-2 z-20">
                            {githubUrl && (
                                <a href={githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-mech-base/80 backdrop-blur-md border border-mech-silver/20 hover:border-mech-cyan hover:bg-mech-cyan/10 transition-colors">
                                    <Github className="w-4 h-4 text-mech-silver group-hover:text-mech-white" />
                                </a>
                            )}
                            {liveUrl && (
                                <a href={liveUrl} target="_blank" rel="noreferrer" className="p-2 bg-mech-base/80 backdrop-blur-md border border-mech-silver/20 hover:border-mech-blue hover:bg-mech-blue/10 transition-colors">
                                    <ExternalLink className="w-4 h-4 text-mech-silver group-hover:text-mech-white" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Content Region */}
                    <div className="p-6 flex flex-col flex-1 gap-4 bg-gradient-to-b from-mech-navy/40 to-mech-base/60">
                        <div className="flex items-center justify-between">
                            <h3 className="font-orbitron font-bold text-xl text-mech-white group-hover:text-mech-cyan transition-colors uppercase tracking-wide">
                                {title}
                            </h3>
                            <div className="w-2 h-2 rounded-full bg-mech-blue shadow-[0_0_8px_rgba(0,174,239,0.8)] animate-pulse" />
                        </div>

                        <p className="font-inter text-sm text-mech-silver flex-1 leading-relaxed">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-mech-silver/10">
                            {techStack.map(tech => (
                                <span key={tech} className="text-xs font-orbitron tracking-wider px-2 py-1 bg-mech-cyan/10 text-mech-cyan border border-mech-cyan/20">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Circuit Traces */}
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-mech-cyan/30 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-mech-blue/30 pointer-events-none" />

                </MechPanel>
            </motion.div>
        </motion.div>
    );
}
