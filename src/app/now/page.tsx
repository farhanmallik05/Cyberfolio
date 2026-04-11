"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { motion } from "framer-motion";
import { 
    Cpu, 
    BookOpen, 
    Headphones, 
    Code2, 
    Clock, 
    Activity, 
    ArrowUpRight,
    Search
} from "lucide-react";
import nowData from "@/data/now.json";

interface NowItem {
    title: string;
    description?: string;
    author?: string;
    type?: string;
    link?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

export default function NowPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 max-w-5xl mx-auto relative z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-12 w-full"
            >
                {/* Header Context */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mech-cyan/20 pb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Activity className="w-8 h-8 text-mech-cyan animate-pulse" />
                            <h1 className="text-3xl font-orbitron font-bold text-white tracking-widest uppercase">
                                Heartbeat <span className="text-mech-cyan">::</span> Current_Focus
                            </h1>
                        </div>
                        <p className="font-mono text-sm text-mech-silver/60">
                            SYNCHRONIZING PORTFOLIO STATE... STATUS: <span className="text-mech-cyan">SYNCHED</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-end font-mono text-[10px] tracking-[0.2em] text-mech-silver/40 uppercase">
                        <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>LAST_SIGNAL_RCVD: {nowData.lastUpdated}</span>
                        </div>
                        <div className="mt-1">LOC: {nowData.timezone}</div>
                    </div>
                </div>

                {/* Grid Layout */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* WORKING ON */}
                    <div className="space-y-6">
                        <h3 className="font-orbitron text-xs text-mech-cyan tracking-[0.4em] uppercase flex items-center gap-3">
                            <Cpu className="w-4 h-4" />
                            {">"} CURRENT_PROCESSES
                        </h3>
                        <div className="space-y-4">
                            {nowData.working.map((item, idx) => (
                                    <motion.div key={idx} variants={itemVariants}>
                                        <MechPanel 
                                            border 
                                            className="p-5 group hover:bg-mech-cyan/5 transition-colors border-l-2 border-l-mech-cyan"
                                            aria-label={`Currently working on: ${item.title}`}
                                        >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-orbitron text-sm text-white group-hover:text-mech-cyan transition-colors uppercase tracking-widest">
                                                {item.title}
                                            </h4>
                                            {item.link && (
                                                <a 
                                                    href={item.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    aria-label={`View ${item.title}`}
                                                >
                                                    <ArrowUpRight className="w-4 h-4 text-mech-cyan/40 group-hover:text-mech-cyan transition-all" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="font-inter text-sm text-mech-silver/70 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </MechPanel>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* LEARNING */}
                    <div className="space-y-6">
                        <h3 className="font-orbitron text-xs text-mech-blue tracking-[0.4em] uppercase flex items-center gap-3">
                            <Code2 className="w-4 h-4" />
                            {">"} NEURAL_UPLOADS
                        </h3>
                        <div className="space-y-4">
                            {nowData.learning.map((item, idx) => (
                                    <motion.div key={idx} variants={itemVariants}>
                                        <MechPanel 
                                            border 
                                            className="p-5 group hover:bg-mech-blue/5 transition-colors border-l-2 border-l-mech-blue"
                                            aria-label={`Currently learning: ${item.title}`}
                                        >
                                        <h4 className="font-orbitron text-sm text-white group-hover:text-mech-blue transition-colors uppercase tracking-widest mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="font-inter text-sm text-mech-silver/70 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </MechPanel>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* READING */}
                    <div className="space-y-6">
                        <h3 className="font-orbitron text-xs text-mech-silver/50 tracking-[0.4em] uppercase flex items-center gap-3">
                            <BookOpen className="w-4 h-4" />
                            {">"} INTEL_HARVEST
                        </h3>
                        <div className="space-y-4">
                            {nowData.reading.map((item, idx) => (
                                <motion.div key={idx} variants={itemVariants}>
                                    <MechPanel border className="p-5 group hover:bg-white/5 transition-colors border-l-2 border-l-mech-silver/30">
                                        <h4 className="font-orbitron text-sm text-white group-hover:text-mech-silver transition-colors uppercase tracking-widest">
                                            {item.title}
                                        </h4>
                                        <p className="font-mono text-[10px] text-mech-silver/40 mt-1 uppercase">
                                            BY: {item.author}
                                        </p>
                                    </MechPanel>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* LISTENING */}
                    <div className="space-y-6">
                        <h3 className="font-orbitron text-xs text-mech-cyan/50 tracking-[0.4em] uppercase flex items-center gap-3">
                            <Headphones className="w-4 h-4" />
                            {">"} AUDIO_FEEDS
                        </h3>
                        <div className="space-y-4">
                            {nowData.listening.map((item, idx) => (
                                <motion.div key={idx} variants={itemVariants}>
                                    <MechPanel border className="p-5 group hover:bg-mech-cyan/5 transition-colors border-l-2 border-l-mech-cyan/20">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-orbitron text-sm text-white group-hover:text-mech-cyan transition-colors uppercase tracking-widest">
                                                    {item.title}
                                                </h4>
                                                <p className="font-mono text-[10px] text-mech-silver/40 mt-1 uppercase flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-mech-cyan/40" />
                                                    {item.type}
                                                </p>
                                            </div>
                                            {item.type === 'music' && (
                                                <div className="flex gap-0.5 items-end h-4">
                                                    <div className="w-0.5 h-full bg-mech-cyan animate-[pulse_1s_infinite]" />
                                                    <div className="w-0.5 h-2/3 bg-mech-cyan animate-[pulse_0.8s_infinite]" />
                                                    <div className="w-0.5 h-1/2 bg-mech-cyan animate-[pulse_1.2s_infinite]" />
                                                </div>
                                            )}
                                        </div>
                                    </MechPanel>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <div className="mt-8 flex flex-col items-center gap-6">
                    <p className="font-inter text-sm text-mech-silver/50 max-w-lg text-center leading-relaxed">
                        Inspired by the <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="text-mech-cyan hover:underline">/now page</a> movement by Derek Sivers. This signal is updated monthly.
                    </p>
                    <Search className="w-6 h-6 text-mech-cyan/20" />
                </div>
            </motion.div>
        </div>
    );
}
