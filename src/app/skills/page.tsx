'use client'

import React from 'react';
import { useRole, ROLE_META } from '@/context/RoleContext';
import styles from './skills.module.css';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Code2, 
  Layers, 
  Zap, 
  Wrench, 
  Bot, 
  Network, 
  Search,
  Database,
  Cloud,
  Terminal,
  Globe
} from 'lucide-react';

const SKILLS_DATA = [
    {
        category: "Neural Core",
        icon: <Cpu className="w-5 h-5" />,
        skills: ["Next.js 15", "TypeScript", "React 19", "Node.js"],
        roles: ["frontend", "automation", "ai"]
    },
    {
        category: "Visual Matrix",
        icon: <Layers className="w-5 h-5" />,
        skills: ["GSAP", "Tailwind CSS", "Framer Motion", "Three.js"],
        roles: ["frontend"]
    },
    {
        category: "Agentic Systems",
        icon: <Bot className="w-5 h-5" />,
        skills: ["LangChain", "OpenAI / Anthropic", "Vector DBs", "RAG Pipeline"],
        roles: ["ai"]
    },
    {
        category: "Automation Grid",
        icon: <Zap className="w-5 h-5" />,
        skills: ["n8n", "Python Scripts", "GitHub Actions", "Webhooks"],
        roles: ["automation"]
    },
    {
        category: "Data Integrity",
        icon: <Database className="w-5 h-5" />,
        skills: ["Supabase", "PostgreSQL", "Prisma", "Redis"],
        roles: ["frontend", "automation"]
    },
    {
        category: "Protocol Stack",
        icon: <Globe className="w-5 h-5" />,
        skills: ["REST APIs", "GraphQL", "WebSockets", "gRPC"],
        roles: ["frontend", "automation", "ai"]
    }
];

export default function SkillsPage() {
    const { activeRole } = useRole();
    const roleMeta = ROLE_META[activeRole];

    return (
        <div 
            className={`min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 w-full ${styles.pageContainer}`}
            data-active-role={activeRole}
        >

            {/* Background grid */}
            <div className={styles.backgroundGrid} />

            <div className="relative mb-16">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mb-4"
                >
                    <div className="w-12 h-[1px] bg-mech-cyan shadow-[0_0_8px_#0FD3FF]" />
                    <span className="font-orbitron text-xs tracking-[0.3em] uppercase text-mech-cyan">Arsenal Protocol</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-orbitron font-black uppercase text-mech-white tracking-tighter"
                >
                    Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-mech-cyan to-mech-silver">Capabilities</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-mech-silver/60 max-w-xl font-inter leading-relaxed"
                >
                    A curated mapping of my expertise across the full stack, optimized for {roleMeta.label.toLowerCase()} performance.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SKILLS_DATA.map((group, idx) => {
                    const isRelevant = activeRole === 'all' || group.roles.includes(activeRole);
                    
                    return (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className={`group p-6 rounded-xl bg-mech-navy/40 backdrop-blur-md border border-mech-silver/10 hover:border-mech-cyan/40 transition-all duration-500 overflow-hidden relative ${
                                isRelevant ? styles.rolePanelHighlight : ''
                            }`}
                        >
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-mech-cyan/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            
                            <div className="flex items-center gap-4 mb-6 relative">
                                <div className={`p-2.5 rounded-lg bg-mech-base/50 border border-mech-silver/20 ${isRelevant ? styles.highlightedText : 'text-mech-silver'}`}>
                                    {group.icon}
                                </div>
                                <h3 className="font-orbitron text-sm font-bold tracking-widest text-mech-white uppercase">
                                    {group.category}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {group.skills.map(skill => (
                                    <div key={skill} className="space-y-1.5">
                                        <div className="flex justify-between items-center text-[11px] font-orbitron tracking-wider">
                                            <span className="text-mech-silver group-hover:text-mech-white transition-colors uppercase">{skill}</span>
                                            <span className={isRelevant ? styles.highlightedText : 'text-mech-silver/40'}>
                                                {isRelevant ? 'OPTIMIZED' : 'LEGACY'}
                                            </span>
                                        </div>
                                        <div className="h-1 w-full bg-mech-base/50 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: isRelevant ? '100%' : '60%' }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + idx * 0.1 }}
                                                className={`h-full ${isRelevant ? styles.dynamicProgress : 'bg-mech-silver/20'}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Corner deco */}
                            <div className="absolute -bottom-2 -right-2 opacity-5 text-mech-cyan">
                                <Terminal size={80} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
