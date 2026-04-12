"use client";

import { motion } from "framer-motion";
import styles from "./skills.module.css";
import { SkillConstellation } from "@/components/skills/SkillConstellation";
import { ConstellationLegend } from "@/components/skills/ConstellationLegend";

export default function Skills() {
    return (
        <div 
            className={`min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 w-full ${styles.pageContainer}`}
        >

            {/* Background grid */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-10">
                <div className={styles.backgroundGrid} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold tracking-[0.3em] uppercase">
                        Skill <span className="text-neon">Constellation</span>
                    </h1>
                    <p className="font-inter text-dim max-w-2xl mx-auto">
                        A neural map of active capabilities and interconnected system protocols. Hover nodes to visualize dependency pathways.
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent w-full max-w-md mx-auto mt-4" />
                </div>

                {/* Main Constellation Map */}
                <div className="relative mt-8">
                    <SkillConstellation />
                </div>

                {/* Legend & Info */}
                <div className="max-w-4xl mx-auto">
                    <ConstellationLegend />
                    
                    <div className="mt-8 text-center space-y-2">
                        <p className="font-mono text-[10px] text-dim uppercase tracking-[0.2em]">
                            System Status: Optimized // All Modules Synchronized
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
