"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";
import { Calendar, Clock, TerminalSquare, ArrowRight } from "lucide-react";

const posts = [
    {
        id: "post-1",
        title: "Building Offline-First Architectures with React and SQLite",
        excerpt: "Exploring the challenges and solutions in developing enterprise Electron apps that sync securely without internet connectivity.",
        date: "2026-02-24",
        readTime: "8 min read",
        category: "Architecture",
        color: "text-neon-blue"
    },
    {
        id: "post-2",
        title: "The Death of Zapier: Why n8n is the Future of Automation",
        excerpt: "Why self-hostable node-based automation is taking over legacy sequential workflow systems across modern dev teams.",
        date: "2026-01-15",
        readTime: "5 min read",
        category: "Automation",
        color: "text-neon-green"
    },
    {
        id: "post-3",
        title: "Deploying Local LLMs for Private Code Generation",
        excerpt: "A guide on setting up Ollama and Llama 3 on your local rig to keep your intellectual property off cloud GPUs.",
        date: "2025-11-02",
        readTime: "12 min read",
        category: "AI",
        color: "text-neon-magenta"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-5xl mx-auto relative z-10">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col items-center mb-16">
                    <TerminalSquare className="w-12 h-12 text-white/50 mb-4" />
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase mb-4">
                        Transmission <span className="text-white">Logs</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>

                <div className="flex flex-col gap-8">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="group cursor-pointer"
                        >
                            <GlassPanel neonBorder={false} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-white/[0.02] transition-colors border-l-4" style={{ borderLeftColor: idx === 0 ? '#00F0FF' : idx === 1 ? '#39FF14' : '#FF2CFB' }}>

                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-orbitron text-foreground/50">
                                        <span className={`px-2 py-1 rounded border border-current ${post.color}`}>
                                            {post.category}
                                        </span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                    </div>

                                    <h2 className="text-2xl font-orbitron font-bold text-white group-hover:text-neon-blue transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="font-inter text-foreground/70 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="hidden md:flex items-center justify-center pl-6 border-l border-white/10 group-hover:border-neon-blue/30 transition-colors">
                                    <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-neon-blue group-hover:translate-x-2 transition-all" />
                                </div>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <NeonButton variant="blue">Load Historical Data</NeonButton>
                </div>
            </motion.div>
        </div>
    );
}
