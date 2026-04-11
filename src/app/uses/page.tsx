"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { motion } from "framer-motion";
import { 
    Terminal, 
    Box, 
    Layers, 
    Monitor, 
    Zap, 
    Clock, 
    ExternalLink 
} from "lucide-react";
import usesData from "@/data/uses.json";

export default function UsesPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 max-w-6xl mx-auto relative z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-12 w-full"
            >
                {/* Header Subsystem */}
                <div className="space-y-4 border-b border-mech-cyan/20 pb-8">
                    <div className="flex items-center gap-4">
                        <Terminal className="w-8 h-8 text-mech-cyan animate-pulse" />
                        <h1 className="text-3xl font-orbitron font-bold text-white tracking-widest uppercase">
                            Neural_Armory <span className="text-mech-cyan">::</span> Sys_Config
                        </h1>
                    </div>
                    <p className="font-mono text-sm text-mech-silver/60">
                        AUDITING HARDWARE AND SOFTWARE SUBSYSTEMS... LAST_AUDIT: {usesData.lastUpdated}
                    </p>
                </div>

                {/* Categories */}
                <div className="space-y-16">
                    {usesData.categories.map((category, catIdx) => (
                        <div key={category.id} className="space-y-8">
                            <div className="flex items-center gap-4 group">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-mech-cyan/20 to-transparent" />
                                <h2 className="font-orbitron text-xs text-mech-cyan tracking-[0.4em] uppercase opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {category.name}
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-mech-cyan/20 to-transparent" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, itemIdx) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (catIdx * 0.1) + (itemIdx * 0.05) }}
                                        className="group block h-full"
                                        aria-label={`View details for ${item.name}`}
                                    >
                                        <MechPanel border className="p-6 h-full flex flex-col justify-between group-hover:bg-mech-cyan/5 transition-all duration-300">
                                            <div>
                                                <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-mech-cyan transition-colors tracking-widest mb-3 uppercase">
                                                    {item.name}
                                                </h3>
                                                <p className="font-inter text-sm text-mech-silver/60 leading-relaxed mb-6">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-mech-silver/5">
                                                <span className="font-mono text-[9px] text-mech-silver/30 uppercase tracking-[0.2em]">
                                                    UPLINK_AVAIL
                                                </span>
                                                <ExternalLink className="w-4 h-4 text-mech-cyan/30 group-hover:text-mech-cyan transition-colors" />
                                            </div>
                                        </MechPanel>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Sub-Info */}
                <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-mech-silver/10">
                    <p className="font-inter text-xs text-mech-silver/40 text-center md:text-left">
                        * Some links may be affiliates. This supports the neural infrastructure.
                    </p>
                    <div className="font-mono text-[10px] text-mech-silver/30 tracking-widest uppercase flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <Box className="w-3 h-3 text-mech-cyan" />
                            v3.1_USES_MOD
                        </span>
                        <span className="flex items-center gap-2">
                            <Layers className="w-3 h-3 text-mech-blue" />
                            SYS_STABLE
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
