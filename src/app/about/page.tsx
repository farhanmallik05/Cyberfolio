"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { motion } from "framer-motion";
import { Search, ShieldAlert, Database, GraduationCap, Briefcase } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-6xl mx-auto relative z-10 w-full">

            {/* Background purely for styling */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.05)_0%,transparent_50%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 w-full"
            >
                <div className="flex items-center gap-4 border-b border-mech-cyan/30 pb-4">
                    <ShieldAlert className="w-8 h-8 text-mech-cyan animate-pulse" />
                    <h1 className="text-3xl font-orbitron font-bold text-white tracking-widest uppercase">
                        Encrypted Dossier <span className="text-mech-cyan">::</span> Profile Data
                    </h1>
                </div>

                {/* Blueprint Header Decorator */}
                <div className="relative overflow-hidden w-full h-[1px]">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-mech-cyan to-transparent shadow-[0_0_8px_rgba(15,211,255,0.8)]"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 w-full">

                    {/* Left panel - User Info overview */}
                    <MechPanel border glowHover className="p-6 lg:col-span-1 h-fit flex flex-col gap-6">
                        <div className="relative w-full aspect-square bg-mech-base border border-mech-cyan/20 overflow-hidden group">
                            {/* Blueprint Grid inside image */}
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(15,211,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(15,211,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />

                            {/* Image Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Search className="w-12 h-12 text-mech-cyan/50" />
                            </div>

                            {/* Scanning line effect on image */}
                            <motion.div
                                className="absolute left-0 right-0 h-1 bg-mech-cyan/40 shadow-[0_0_15px_rgba(15,211,255,0.8)] z-10"
                                initial={{ top: "-10%" }}
                                animate={{ top: "110%" }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Holographic overlay */}
                            <div className="absolute inset-0 bg-mech-blue/10 mix-blend-overlay" />
                        </div>

                        <div className="space-y-4 font-orbitron text-sm">
                            <div className="flex justify-between border-b border-mech-silver/10 pb-2">
                                <span className="text-mech-silver/60">SUBJECT</span>
                                <span className="text-mech-cyan tracking-wider">FARHAN MALLIK</span>
                            </div>
                            <div className="flex justify-between border-b border-mech-silver/10 pb-2">
                                <span className="text-mech-silver/60">CLASSIFICATION</span>
                                <span className="text-mech-blue tracking-wider">ARCHITECT</span>
                            </div>
                            <div className="flex justify-between border-b border-mech-silver/10 pb-2">
                                <span className="text-mech-silver/60">CLEARANCE</span>
                                <span className="text-mech-cyan tracking-wider">LEVEL 9 (MAX)</span>
                            </div>
                        </div>
                    </MechPanel>

                    {/* Right panel - Timeline Data / Positioning */}
                    <div className="lg:col-span-2 flex flex-col gap-8 w-full">
                        <MechPanel className="p-8 border-l-4 border-l-mech-cyan" glowHover={false}>
                            <h3 className="font-orbitron text-xl mb-4 text-mech-cyan flex items-center gap-2 uppercase tracking-wide">
                                <Database className="w-5 h-5" />
                                Executive Summary
                            </h3>
                            <p className="font-inter text-mech-silver leading-relaxed">
                                An emerging AI automation architect designing intelligent digital systems. Focused on building highly efficient automation workflows, secure web architectures, and scalable AI integrations. Operates outside of generic templates, engineering bespoke, high-performance environments built on mechanical precision.
                            </p>
                        </MechPanel>

                        {/* Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-4">

                            {/* Generic Connector Lines behind components */}
                            <div className="absolute top-0 bottom-0 left-1/2 hidden md:block w-px bg-mech-silver/10" />

                            {/* Experience */}
                            <div className="space-y-6 relative">
                                <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-3 tracking-widest uppercase">
                                    <Briefcase className="w-5 h-5 text-mech-blue" />
                                    Experience Log
                                </h3>
                                <div className="relative pl-6 border-l border-mech-silver/30 space-y-10 mt-6">

                                    <div className="relative group">
                                        <div className="absolute w-3 h-3 bg-mech-base border-2 border-mech-blue rounded-full -left-[30px] top-1 group-hover:bg-mech-blue transition-colors shadow-[0_0_10px_rgba(0,174,239,0.5)]" />
                                        <div className="absolute w-4 h-px bg-mech-silver/30 -left-[24px] top-2" />
                                        <h4 className="font-bold text-mech-white mb-1 group-hover:text-mech-cyan transition-colors">Hacktoberfest Contributor</h4>
                                        <span className="text-xs font-orbitron text-mech-blue block mb-2 tracking-wider">2023 - 2024</span>
                                        <p className="text-sm text-mech-silver">Engineered core modules and optimized codebase for open-source AI projects.</p>
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute w-3 h-3 bg-mech-base border-2 border-mech-blue rounded-full -left-[30px] top-1 group-hover:bg-mech-blue transition-colors shadow-[0_0_10px_rgba(0,174,239,0.5)]" />
                                        <div className="absolute w-4 h-px bg-mech-silver/30 -left-[24px] top-2" />
                                        <h4 className="font-bold text-mech-white mb-1 group-hover:text-mech-cyan transition-colors">Hackathon Finalist</h4>
                                        <span className="text-xs font-orbitron text-mech-blue block mb-2 tracking-wider">MULTIPLE EVENTS</span>
                                        <p className="text-sm text-mech-silver">Developed and pitched production-grade web systems under strict deadlines.</p>
                                    </div>

                                </div>
                            </div>

                            {/* Education */}
                            <div className="space-y-6 relative">
                                <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-3 tracking-widest uppercase">
                                    <GraduationCap className="w-5 h-5 text-mech-cyan" />
                                    Academic Record
                                </h3>
                                <div className="relative pl-6 border-l border-mech-silver/30 space-y-10 mt-6 md:pl-8">

                                    <div className="relative group">
                                        <div className="absolute w-3 h-3 bg-mech-base border-2 border-mech-cyan rounded-full -left-[30px] md:-left-[38px] top-1 group-hover:bg-mech-cyan transition-colors shadow-[0_0_10px_rgba(15,211,255,0.5)]" />
                                        <div className="absolute w-4 md:w-6 h-px bg-mech-silver/30 -left-[24px] md:-left-[32px] top-2" />
                                        <h4 className="font-bold text-mech-white mb-1 group-hover:text-mech-cyan transition-colors">B.Tech Computer Science</h4>
                                        <span className="text-xs font-orbitron text-mech-cyan block mb-2 tracking-wider">GRADUATING 2028</span>
                                        <p className="text-sm text-mech-silver">Focusing on Algorithms, Systems Architecture, and Artificial Intelligence.</p>
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute w-3 h-3 bg-mech-base border-2 border-mech-cyan rounded-full -left-[30px] md:-left-[38px] top-1 group-hover:bg-mech-cyan transition-colors shadow-[0_0_10px_rgba(15,211,255,0.5)]" />
                                        <div className="absolute w-4 md:w-6 h-px bg-mech-silver/30 -left-[24px] md:-left-[32px] top-2" />
                                        <h4 className="font-bold text-mech-white mb-1 group-hover:text-mech-cyan transition-colors">Higher Secondary</h4>
                                        <span className="text-xs font-orbitron text-mech-cyan block mb-2 tracking-wider">COMPLETED</span>
                                        <p className="text-sm text-mech-silver">Foundational sciences and mathematics core principles.</p>
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
