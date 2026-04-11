"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { motion } from "framer-motion";
import { Code2, Cpu, Wrench, Layers, type LucideIcon } from "lucide-react";
import styles from "./skills.module.css";
import skillData from "@/data/skills.json";
import { useRole, ROLE_META } from "@/context/RoleContext";
import { ROLE_TAG_MAP } from "@/data/role-tags-map";

const iconMap: Record<string, LucideIcon> = {
    "neural-core": Code2,
    "agentic-systems": Cpu,
    "operations-control": Wrench,
    "interface-matrix": Layers,
};

const skillCategories = skillData.categories.map(cat => ({
    ...cat,
    icon: iconMap[cat.id] || Code2
}));

export default function Skills() {
    const { activeRole } = useRole();
    const roleMeta = ROLE_META[activeRole];
    const roleTags = ROLE_TAG_MAP[activeRole];

    const isSkillRelevant = (skillName: string) => {
        if (activeRole === 'all') return true;
        const normalized = skillName.toLowerCase();
        return roleTags.some(tag => normalized.includes(tag));
    };

    const isCategoryRelevant = (category: typeof skillData.categories[0]) => {
        if (activeRole === 'all') return true;
        // Check if any skill in the category matches
        return category.skills.some(s => isSkillRelevant(s.name));
    };

    return (
        <div 
            className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 w-full"
            style={{ "--role-accent": activeRole !== 'all' ? roleMeta.color : undefined } as React.CSSProperties}
        >

            {/* Background grid */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
                <div className={styles.backgroundGrid} />
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
                            animate={{ 
                                opacity: isCategoryRelevant(category) ? 1 : 0.4, 
                                scale: 1,
                                filter: isCategoryRelevant(category) ? 'none' : 'grayscale(0.5) blur(0.5px)'
                            }}
                            transition={{ duration: 0.5 }}
                            className="group h-full"
                        >
                            <MechPanel
                                className={`p-6 md:p-8 h-full bg-gradient-to-b from-mech-panel/80 to-mech-navy/50 backdrop-blur-md ${
                                    activeRole !== 'all' && isCategoryRelevant(category) ? styles.rolePanelHighlight : ""
                                }`}
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
                                    {category.skills.map(skill => {
                                        const highlighted = isSkillRelevant(skill.name);
                                        return (
                                        <div key={skill.name} className="space-y-2 relative">
                                            <div className="flex justify-between font-inter text-sm">
                                                <span className={`transition-colors ${
                                                  highlighted ? (activeRole !== 'all' ? styles.highlightedText : 'text-mech-white') : 'text-mech-silver'
                                                }`}>
                                                  {skill.name}
                                                </span>
                                                <span className={`font-orbitron text-xs ${
                                                    highlighted && activeRole !== 'all' ? styles.highlightedText : 'text-mech-cyan'
                                                }`}>
                                                  {skill.level}%
                                                </span>
                                            </div>

                                            {/* Progress Bar Container */}
                                            <div className="h-1.5 w-full bg-mech-base rounded-sm overflow-hidden border border-mech-silver/10 shadow-[inner_0_0_10px_rgba(0,0,0,0.5)]">
                                                <motion.div
                                                    className={`h-full bg-mech-blue shadow-[0_0_8px_rgba(0,174,239,0.8)] transition-all duration-500 ${
                                                        highlighted && activeRole !== 'all' ? styles.dynamicProgress : ""
                                                    }`}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                                />
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </MechPanel>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
