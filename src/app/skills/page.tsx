"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion } from "framer-motion";
import { Code2, Cpu, Wrench, Layers, type LucideIcon } from "lucide-react";

type SkillCategory = {
    title: string;
    icon: LucideIcon;
    color: string;
    shadow: string;
    skills: { name: string; level: number }[];
};

const skillCategories: SkillCategory[] = [
    {
        title: "Core Dev",
        icon: Code2,
        color: "text-neon-blue",
        shadow: "shadow-[inset_0_0_20px_rgba(0,240,255,0.15)]",
        skills: [
            { name: "Python", level: 90 },
            { name: "JavaScript / TypeScript", level: 85 },
            { name: "React / Next.js", level: 88 },
            { name: "HTML / CSS / Tailwind", level: 95 },
        ]
    },
    {
        title: "AI & Automation",
        icon: Cpu,
        color: "text-neon-magenta",
        shadow: "shadow-[inset_0_0_20px_rgba(255,44,251,0.15)]",
        skills: [
            { name: "Gen AI Integration", level: 80 },
            { name: "n8n Workflows", level: 92 },
            { name: "Prompt Engineering", level: 85 },
            { name: "Docker", level: 75 },
        ]
    },
    {
        title: "Tools & Infrastructure",
        icon: Wrench,
        color: "text-neon-green",
        shadow: "shadow-[inset_0_0_20px_rgba(57,255,20,0.15)]",
        skills: [
            { name: "Linux / Bash", level: 85 },
            { name: "Git / GitHub", level: 90 },
            { name: "Supabase / Firebase", level: 75 },
            { name: "Vercel Deployment", level: 88 },
        ]
    },
    {
        title: "Design & UX",
        icon: Layers,
        color: "text-neon-purple",
        shadow: "shadow-[inset_0_0_20px_rgba(106,0,255,0.15)]",
        skills: [
            { name: "Figma Prototyping", level: 80 },
            { name: "UI/UX Architecture", level: 85 },
            { name: "Motion Design", level: 70 },
            { name: "Canva", level: 90 },
        ]
    }
];

export default function Skills() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10">

            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-4 tracking-widest uppercase">
                    Skill <span className="text-neon-blue">Matrix</span>
                </h1>
                <p className="text-center font-inter text-foreground/60 mb-16 max-w-2xl mx-auto">
                    Analyzing functional capabilities and proficiency levels across technological domains.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <GlassPanel
                                className={`p-6 md:p-8 h-full transition-transform duration-300 group-hover:-translate-y-2 ${category.shadow}`}
                                neonBorder
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    {(() => { const Icon = category.icon; return <Icon className={`w-8 h-8 ${category.color}`} />; })()}
                                    <h2 className="text-2xl font-orbitron font-bold">{category.title}</h2>
                                </div>

                                <div className="space-y-6">
                                    {category.skills.map(skill => (
                                        <div key={skill.name} className="space-y-2">
                                            <div className="flex justify-between font-inter text-sm">
                                                <span className="text-white/90">{skill.name}</span>
                                                <span className={category.color}>{skill.level}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-cyber-base rounded-full overflow-hidden border border-white/5">
                                                <motion.div
                                                    className={`h-full bg-current ${category.color}`}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
