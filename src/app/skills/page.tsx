"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { motion } from "framer-motion";
import { Code2, Cpu, Wrench, Layers, type LucideIcon } from "lucide-react";

type SkillCategory = {
    title: string;
    icon: LucideIcon;
    skills: { name: string; level: number }[];
};

const skillCategories: SkillCategory[] = [
    {
        title: "Core Mechanics",
        icon: Code2,
        skills: [
            { name: "Python Systems", level: 90 },
            { name: "TypeScript / JS Engine", level: 85 },
            { name: "React / Next.js Frameworks", level: 48 },
            { name: "UI Architecture (Tailwind)", level: 75 },
        ]
    },
    {
        title: "AI Integration",
        icon: Cpu,
        skills: [
            { name: "LLM Orchestration", level: 20 },
            { name: "n8n Automation Workflows", level: 45 },
            { name: "Prompt Architecture", level: 95 },
            { name: "Containerization (Docker)", level: 65 },
        ]
    },
    {
        title: "Infrastructure",
        icon: Wrench,
        skills: [
            { name: "Linux OS / Bash Scripts", level: 45 },
            { name: "Version Control (Git)", level: 70 },
            { name: "Cloud Databases (Supabase)", level: 85 },
            { name: "Vercel / Edge Deployments", level: 65 },
        ]
    },
    {
        title: "Interface Design",
        icon: Layers,
        skills: [
            { name: "Figma Component Libs", level: 90 },
            { name: "UX Wireframing", level: 85 },
            { name: "Mechanical Motion Design", level: 65 },
            { name: "Asset Composition", level: 70 },
        ]
    }
];

export default function Skills() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 w-full">

            {/* Background grid */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(15, 211, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 211, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold tracking-widest uppercase">
                        Module <span className="text-mech-cyan">Diagnostics</span>
                    </h1>
                    <p className="font-inter text-mech-silver max-w-2xl mx-auto">
                        Evaluating functional capabilities and technological proficiency across installed system modules.
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-mech-cyan/30 to-transparent w-full max-w-md mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group h-full"
                        >
                            <MechPanel
                                className="p-6 md:p-8 h-full bg-gradient-to-b from-mech-panel/80 to-mech-navy/50 backdrop-blur-md"
                                border
                                glowHover
                            >
                                <div className="flex items-center gap-4 mb-8 border-b border-mech-silver/10 pb-4">
                                    <div className="p-2 bg-mech-cyan/10 rounded-sm border border-mech-cyan/30 group-hover:bg-mech-cyan/20 transition-colors">
                                        <category.icon className="w-6 h-6 text-mech-cyan" />
                                    </div>
                                    <h2 className="text-xl font-orbitron font-bold text-mech-white tracking-wide uppercase">{category.title}</h2>
                                </div>

                                <div className="space-y-6">
                                    {category.skills.map(skill => (
                                        <div key={skill.name} className="space-y-2 relative">
                                            <div className="flex justify-between font-inter text-sm">
                                                <span className="text-mech-silver group-hover:text-mech-white transition-colors">{skill.name}</span>
                                                <span className="text-mech-cyan font-orbitron text-xs">{skill.level}%</span>
                                            </div>

                                            {/* Progress Bar Container */}
                                            <div className="h-1.5 w-full bg-mech-base rounded-sm overflow-hidden border border-mech-silver/10 shadow-[inner_0_0_10px_rgba(0,0,0,0.5)]">
                                                <motion.div
                                                    className="h-full bg-mech-blue shadow-[0_0_8px_rgba(0,174,239,0.8)]"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </MechPanel>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
