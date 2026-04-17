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
    Search,
    Monitor,
    Layers,
    Terminal,
    MapPin,
    Zap,
    ExternalLink
} from "lucide-react";
import nowData from "@/data/now.json";
import usesData from "@/data/uses.json";
import { resumeData } from "@/data/resume";

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
    // Find active project for the pulse
    const activeProject = resumeData.projects.find(p => p.tagline.toLowerCase().includes('building') || p.name === 'Nexus') || resumeData.projects[0];

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 max-w-7xl mx-auto relative z-10 w-full">
            {/* Header Telemetry */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mech-cyan/20 pb-8 mb-12"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Activity className="w-8 h-8 text-mech-cyan animate-pulse" />
                        <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white tracking-widest uppercase">
                            Dashboard <span className="text-mech-cyan">::</span> Telemetry_Scan
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                        <p className="font-mono text-[10px] text-mech-silver/60 tracking-widest">
                            SYNCHRONIZING_STATE... STATUS: <span className="text-mech-cyan">ACTIVE</span>
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 bg-mech-cyan/5 border border-mech-cyan/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-mech-cyan animate-ping" />
                            <span className="font-share-mono text-[9px] text-mech-cyan uppercase tracking-tighter">
                                Currently shipping: {activeProject.name}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col items-end font-mono text-[10px] tracking-[0.2em] text-mech-silver/40 uppercase">
                    <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>LAST_UDP: {nowData.lastUpdated}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>LOC: {nowData.timezone}</span>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-col gap-16">
                {/* 1. TELEMETRY (STATUS) */}
                <div className="space-y-12">
                    <div className="space-y-12">
                        {/* Status Blocks */}
                        <div className="space-y-8">
                            <SectionHeader icon={Cpu} title="Active Protocols" color="text-mech-cyan" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {nowData.working.map((item, idx) => (
                                    <StatusCard key={idx} item={item} color="cyan" />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <SectionHeader icon={Code2} title="Neural Uploads" color="text-mech-blue" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {nowData.learning.map((item, idx) => (
                                    <StatusCard key={idx} item={item} color="blue" />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Intellectual Feeds */}
                            <div className="space-y-6">
                                <SectionHeader icon={BookOpen} title="Intel Harvest" color="text-mech-silver/50" />
                                {nowData.reading.map((item, idx) => (
                                    <div key={idx} className="flex flex-col border-l border-mech-silver/10 pl-4 py-1">
                                        <span className="font-orbitron text-[10px] text-white uppercase tracking-widest">{item.title}</span>
                                        <span className="font-mono text-[8px] text-mech-silver/40 uppercase mt-1">Auth: {item.author}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <SectionHeader icon={Headphones} title="Audio Feeds" color="text-mech-cyan/50" />
                                {nowData.listening.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-l border-mech-cyan/10 pl-4 py-1">
                                        <div>
                                            <span className="font-orbitron text-[10px] text-white uppercase tracking-widest block">{item.title}</span>
                                            <span className="font-mono text-[8px] text-mech-silver/40 uppercase">{item.type}</span>
                                        </div>
                                        {item.type === 'music' && <div className="flex gap-0.5"><div className="w-0.5 h-2 bg-mech-cyan animate-pulse"/><div className="w-0.5 h-3 bg-mech-cyan animate-pulse delay-75"/></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-mech-cyan/20 to-transparent" />

                {/* 2. LOADOUT (USES) */}
                <div className="space-y-16">
                    {usesData.categories.map((category) => (
                        <div key={category.id} className="space-y-8">
                            <div className="flex items-center gap-4 group">
                                <h2 className="font-orbitron text-[11px] text-mech-cyan tracking-[0.4em] uppercase whitespace-nowrap">
                                    {category.name}
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-mech-cyan/20 to-transparent" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.items.map((item) => (
                                    <a 
                                        key={item.name} 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group block"
                                    >
                                        <MechPanel border className="p-5 hover:bg-mech-cyan/[0.03] transition-all h-full flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-orbitron text-xs font-bold text-mech-white group-hover:text-mech-cyan transition-colors uppercase tracking-widest mb-2">
                                                    {item.name}
                                                </h3>
                                                <p className="font-inter text-xs text-mech-silver/60 leading-relaxed mb-4">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-mech-silver/5">
                                                <span className="font-mono text-[8px] text-mech-silver/20 uppercase tracking-[0.2em] group-hover:text-mech-cyan/40 transition-colors">
                                                    Uplink_Available
                                                </span>
                                                <ExternalLink className="w-3 h-3 text-mech-cyan/20 group-hover:text-mech-cyan transition-colors" />
                                            </div>
                                        </MechPanel>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                    <div className="pt-12 border-t border-mech-silver/10 text-center">
                        <p className="font-inter text-[10px] text-mech-silver/30 leading-relaxed max-w-lg mx-auto">
                            System loadout audited for v3.1 stability. This manifest documents the hardware and software layers powering the current neural interface. Inspired by Derek Sivers' /now movement.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ icon: Icon, title, color }: { icon: any, title: string, color: string }) {
    return (
        <div className="flex items-center gap-3">
            <Icon className={`w-4 h-4 ${color}`} />
            <h3 className={`font-orbitron font-bold text-[10px] tracking-[0.3em] uppercase ${color}`}>
                {title}
            </h3>
        </div>
    );
}

function StatusCard({ item, color }: { item: any, color: 'cyan' | 'blue' }) {
    const accentClass = color === 'cyan' ? 'border-l-mech-cyan hover:bg-mech-cyan/5' : 'border-l-mech-blue hover:bg-mech-blue/5';
    const textClass = color === 'cyan' ? 'group-hover:text-mech-cyan' : 'group-hover:text-mech-blue';
    const iconClass = color === 'cyan' ? 'text-mech-cyan/40 group-hover:text-mech-cyan' : 'text-mech-blue/40 group-hover:text-mech-blue';

    return (
        <MechPanel border className={`p-5 group transition-colors border-l-2 ${accentClass}`}>
            <div className="flex justify-between items-start mb-2">
                <h4 className={`font-orbitron text-xs font-bold text-white transition-colors uppercase tracking-widest ${textClass}`}>
                    {item.title}
                </h4>
                {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title}`}>
                        <ArrowUpRight className={`w-4 h-4 transition-all ${iconClass}`} />
                    </a>
                )}
            </div>
            <p className="font-inter text-[11px] text-mech-silver/70 leading-relaxed">
                {item.description}
            </p>
        </MechPanel>
    );
}
