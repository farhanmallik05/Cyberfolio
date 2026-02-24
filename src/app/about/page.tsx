"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion } from "framer-motion";
import { Search, ShieldAlert, Database, GraduationCap, Briefcase } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-6xl mx-auto relative z-10">

            {/* Background purely for styling */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_50%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8"
            >
                <div className="flex items-center gap-4 border-b border-neon-blue/30 pb-4">
                    <ShieldAlert className="w-8 h-8 text-neon-blue animate-pulse" />
                    <h1 className="text-3xl font-orbitron font-bold text-white tracking-widest uppercase">
                        Encrypted Dossier <span className="text-neon-blue">::</span> Profile Data
                    </h1>
                </div>

                {/* Scanning line animation overlay */}
                <div className="relative overflow-hidden w-full h-[1px]">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-neon-magenta to-transparent"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">

                    {/* Left panel - User Info overview */}
                    <GlassPanel neonBorder className="p-6 md:col-span-1 h-fit flex flex-col gap-6">
                        <div className="relative w-full aspect-square bg-cyber-surface border border-neon-blue/20 rounded overflow-hidden group">
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-cyber-base flex items-center justify-center">
                                <Search className="w-12 h-12 text-neon-blue/50" />
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.1)_50%)] bg-[length:100%_4px]" />
                            </div>
                            <motion.div
                                className="absolute inset-0 bg-neon-blue/20"
                                initial={{ y: "-100%" }}
                                animate={{ y: "100%" }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="space-y-4 font-orbitron text-sm">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/50">SUBJECT</span>
                                <span className="text-neon-blue">FARHAN MALLIK</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/50">CLASSSIFICATION</span>
                                <span className="text-neon-magenta">ARCHITECT</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/50">FOCUS</span>
                                <span className="text-neon-green">AI & AUTOMATION</span>
                            </div>
                        </div>
                    </GlassPanel>

                    {/* Right panel - Timeline Data / Positioning */}
                    <div className="md:col-span-2 flex flex-col gap-8">
                        <GlassPanel className="p-8 border-l-4 border-l-neon-purple shadow-[inset_0_0_20px_rgba(106,0,255,0.1)]">
                            <h3 className="font-orbitron text-xl mb-4 text-neon-purple flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                EXECUTIVE SUMMARY
                            </h3>
                            <p className="font-inter text-foreground/80 leading-relaxed">
                                An emerging AI automation architect designing intelligent digital systems. Focused on building highly efficient automation workflows, secure web architectures, and scalable AI integrations. Operates outside of generic templates, engineering bespoke, high-performance environments.
                            </p>
                        </GlassPanel>

                        {/* Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Experience */}
                            <div className="space-y-6">
                                <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-neon-magenta" />
                                    EXPERIENCE LOG
                                </h3>
                                <div className="relative pl-6 border-l border-neon-magenta/30 space-y-8">

                                    <div className="relative">
                                        <div className="absolute w-3 h-3 bg-neon-magenta rounded-full -left-[30px] top-1 shadow-[0_0_10px_#FF2CFB]" />
                                        <h4 className="font-bold text-white mb-1">Hacktoberfest Open Source Contributor</h4>
                                        <span className="text-xs font-orbitron text-neon-magenta/70 block mb-2">2023 - 2024</span>
                                        <p className="text-sm text-foreground/70">Engineered core modules and optimized codebase for open-source AI projects.</p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute w-3 h-3 bg-neon-magenta rounded-full -left-[30px] top-1 shadow-[0_0_10px_#FF2CFB]" />
                                        <h4 className="font-bold text-white mb-1">Hackathon Finalist</h4>
                                        <span className="text-xs font-orbitron text-neon-magenta/70 block mb-2">MULTIPLE EVENTS</span>
                                        <p className="text-sm text-foreground/70">Developed and pitched production-grade web systems under strict deadlines.</p>
                                    </div>

                                </div>
                            </div>

                            {/* Education */}
                            <div className="space-y-6">
                                <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-3">
                                    <GraduationCap className="w-5 h-5 text-neon-blue" />
                                    ACADEMIC RECORD
                                </h3>
                                <div className="relative pl-6 border-l border-neon-blue/30 space-y-8">

                                    <div className="relative">
                                        <div className="absolute w-3 h-3 bg-neon-blue rounded-full -left-[30px] top-1 shadow-[0_0_10px_#00F0FF]" />
                                        <h4 className="font-bold text-white mb-1">B.Tech Computer Science</h4>
                                        <span className="text-xs font-orbitron text-neon-blue/70 block mb-2">GRADUATING 2028</span>
                                        <p className="text-sm text-foreground/70">Focusing on Algorithms, Systems Architecture, and Artificial Intelligence.</p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute w-3 h-3 bg-neon-blue rounded-full -left-[30px] top-1 shadow-[0_0_10px_#00F0FF]" />
                                        <h4 className="font-bold text-white mb-1">High School (10th & 12th)</h4>
                                        <span className="text-xs font-orbitron text-neon-blue/70 block mb-2">COMPLETED</span>
                                        <p className="text-sm text-foreground/70">Foundational sciences and mathematics core.</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
