"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, 
    ShieldAlert, 
    Database, 
    GraduationCap, 
    Briefcase, 
    Terminal, 
    Target, 
    ChevronDown, 
    ChevronUp,
    Fingerprint,
    Cpu,
    Globe
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchGithubReadme } from "@/lib/github-api";
import aboutData from "@/data/about.json";

export default function About() {
    const [readme, setReadme] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [showSupplemental, setShowSupplemental] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const content = await fetchGithubReadme();
                setReadme(content);
            } catch (error) {
                console.error("Failed to load supplemental dossier:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 max-w-6xl mx-auto relative z-10 w-full">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-12 w-full"
            >
                {/* 1. Header: Mission Manifest */}
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-b border-mech-cyan/30 pb-8">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <ShieldAlert className="w-8 h-8 text-mech-cyan animate-pulse" />
                            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white tracking-widest uppercase">
                                Mission Briefing <span className="text-mech-cyan">::</span> Subject_Dossier
                            </h1>
                        </div>
                        <p className="font-mono text-sm text-mech-cyan tracking-[0.2em] font-bold">
                            {aboutData.subject.tagline.toUpperCase()}
                        </p>
                    </div>
                    <div className="font-mono text-[10px] text-mech-silver/40 tracking-[0.3em] uppercase hidden md:block text-right">
                        <div>REF_ID: {aboutData.subject.identification}</div>
                        <div>LOC_SIGNAL: {aboutData.subject.location}</div>
                    </div>
                </div>

                {/* 2. Primary Dossier Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
                    
                    {/* Identification Panel */}
                    <div className="lg:col-span-4 space-y-8">
                        <MechPanel border className="p-1 group overflow-hidden bg-mech-base">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <motion.img 
                                    src="https://github.com/farhanmallik05.png" 
                                    alt="Subject FM"
                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-mech-base via-transparent to-transparent opacity-60" />
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,211,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,211,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
                                
                                <motion.div
                                    className="absolute left-0 right-0 h-0.5 bg-mech-cyan shadow-[0_0_15px_#0FD3FF]"
                                    initial={{ top: "-10%" }}
                                    animate={{ top: "110%" }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <div className="p-4 bg-mech-panel/50 border-t border-mech-cyan/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <Fingerprint className="w-5 h-5 text-mech-cyan" />
                                    <h3 className="font-orbitron text-xs tracking-widest text-mech-silver uppercase">Biometric Metadata</h3>
                                </div>
                                <div className="space-y-3 font-mono text-[10px] text-mech-silver/60 uppercase tracking-widest">
                                    <div className="flex justify-between border-b border-mech-silver/10 pb-1">
                                        <span>Identity</span>
                                        <span className="text-white">{aboutData.subject.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-mech-silver/10 pb-1">
                                        <span>Class</span>
                                        <span className="text-mech-blue">{aboutData.subject.role}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-mech-silver/10 pb-1">
                                        <span>Status</span>
                                        <span className="text-mech-cyan animate-pulse">Available</span>
                                    </div>
                                </div>
                            </div>
                        </MechPanel>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-orbitron text-[10px] tracking-[0.4em] text-mech-silver/40 uppercase mb-2 px-1">Specializations</h3>
                            {aboutData.specializations.map((spec, idx) => (
                                <MechPanel key={idx} border className="p-4 bg-mech-cyan/5 border-mech-cyan/10 hover:border-mech-cyan/30 transition-all">
                                    <h4 className="font-orbitron text-xs text-mech-cyan tracking-widest uppercase mb-1">{spec.title}</h4>
                                    <p className="font-inter text-[11px] text-mech-silver/70 leading-relaxed">{spec.description}</p>
                                </MechPanel>
                            ))}
                        </div>
                    </div>

                    {/* Mission Core Panel */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <MechPanel className="p-8 border-l-4 border-l-mech-cyan relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <Target className="w-32 h-32 text-mech-cyan" />
                            </div>
                            <h3 className="font-orbitron text-xl mb-8 text-mech-white flex items-center gap-3 uppercase tracking-widest">
                                <Terminal className="w-5 h-5 text-mech-cyan" />
                                Subject_Narrative
                            </h3>
                            <div className="font-inter text-mech-silver/80 leading-relaxed space-y-6">
                                <p className="text-lg first-letter:text-4xl first-letter:font-orbitron first-letter:mr-2 first-letter:text-mech-cyan first-letter:float-left">
                                    {aboutData.bio}
                                </p>
                            </div>
                        </MechPanel>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Academic History */}
                            <div className="space-y-6">
                                <h3 className="font-orbitron text-sm text-white flex items-center gap-3 tracking-[0.2em] uppercase">
                                    <GraduationCap className="w-5 h-5 text-mech-blue" />
                                    Academic_Logs
                                </h3>
                                <div className="space-y-4">
                                    {aboutData.academicRecord.map((edu, idx) => (
                                        <div key={idx} className="relative pl-6 border-l border-mech-blue/30 py-2">
                                            <div className="absolute w-2 h-2 bg-mech-blue rounded-full -left-[5px] top-4 shadow-[0_0_8px_rgba(0,174,239,0.8)]" />
                                            <h4 className="font-orbitron text-xs text-mech-white uppercase tracking-widest">{edu.degree}</h4>
                                            <p className="text-[10px] text-mech-silver/60 font-mono mt-1">{edu.institution} • {edu.period}</p>
                                            <span className="inline-block mt-2 px-2 py-0.5 bg-mech-blue/10 border border-mech-blue/20 rounded text-[8px] font-mono text-mech-blue">{edu.status.toUpperCase()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Professional Experience */}
                            <div className="space-y-6">
                                <h3 className="font-orbitron text-sm text-white flex items-center gap-3 tracking-[0.2em] uppercase">
                                    <Briefcase className="w-5 h-5 text-mech-cyan" />
                                    Expertise_Pulse
                                </h3>
                                <div className="space-y-4">
                                    {aboutData.experience.map((exp, idx) => (
                                        <div key={idx} className="relative pl-6 border-l border-mech-cyan/30 py-2">
                                            <div className="absolute w-2 h-2 bg-mech-cyan rounded-full -left-[5px] top-4 shadow-[0_0_8px_rgba(15,211,255,0.8)]" />
                                            <h4 className="font-orbitron text-xs text-mech-white uppercase tracking-widest">{exp.role}</h4>
                                            <p className="text-[10px] text-mech-silver/60 font-mono mt-1">{exp.organization} • {exp.period}</p>
                                            <p className="text-[10px] text-mech-silver/40 mt-2 font-inter italic">{exp.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Core Interests Bar */}
                        <MechPanel border className="p-4 bg-mech-panel/30 border-dashed border-mech-silver/10">
                            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                                <h3 className="font-orbitron text-[10px] tracking-[0.3em] text-mech-silver/40 uppercase">Interest_Index ::</h3>
                                {aboutData.interests.map((interest, idx) => (
                                    <span key={idx} className="flex items-center gap-2 font-mono text-[10px] text-mech-silver/60 uppercase">
                                        <Cpu className="w-3 h-3 text-mech-cyan/30" />
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </MechPanel>
                    </div>
                </div>

                {/* 3. Supplemental Intel (README sync) */}
                <div className="mt-12 space-y-4">
                    <button 
                        onClick={() => setShowSupplemental(!showSupplemental)}
                        className="w-full group flex items-center justify-between p-4 border border-mech-silver/10 hover:border-mech-cyan/30 transition-all bg-mech-base/30 rounded-lg group"
                    >
                        <div className="flex items-center gap-4">
                            <Database className="w-5 h-5 text-mech-silver group-hover:text-mech-cyan transition-colors" />
                            <span className="font-orbitron text-xs tracking-[0.2em] text-mech-silver group-hover:text-mech-white uppercase transition-colors"> Access Supplemental Intelligence (GitHub_README) </span>
                        </div>
                        {showSupplemental ? <ChevronUp className="w-4 h-4 text-mech-cyan" /> : <ChevronDown className="w-4 h-4 text-mech-silver" />}
                    </button>

                    <AnimatePresence>
                        {showSupplemental && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <MechPanel className="p-8 border-t-0 rounded-t-none bg-black/20" glowHover={false}>
                                    {isLoading ? (
                                        <div className="space-y-4 py-8">
                                            <div className="h-4 bg-mech-cyan/10 animate-pulse w-3/4" />
                                            <div className="h-4 bg-mech-cyan/10 animate-pulse w-full" />
                                            <div className="h-4 bg-mech-cyan/10 animate-pulse w-5/6" />
                                        </div>
                                    ) : (
                                        <div className="prose prose-invert prose-mech max-w-none font-inter text-mech-silver/60 leading-relaxed
                                            prose-headings:font-orbitron prose-headings:text-mech-white/80 prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-sm
                                            prose-a:text-mech-cyan/60 prose-a:no-underline hover:prose-a:underline
                                            prose-code:text-mech-blue/60 prose-code:bg-mech-blue/5 prose-code:px-1 prose-code:rounded
                                            prose-strong:text-mech-silver">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {readme || "No supplemental data found."}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </MechPanel>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Decorator */}
                <div className="pt-12 border-t border-mech-silver/10 flex justify-between items-center text-[10px] font-mono text-mech-silver/30 tracking-widest uppercase">
                    <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        <span>NEURAL_NODE_721-FM</span>
                    </div>
                    <span>© 2026 FM_OS :: DOSSIER_V2.0</span>
                </div>
            </motion.div>
        </div>
    );
}
