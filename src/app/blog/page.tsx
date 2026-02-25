"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { MechButton } from "@/components/ui/MechButton";
import { motion } from "framer-motion";
import { Calendar, Clock, TerminalSquare, ArrowRight, Database } from "lucide-react";

const posts = [
    {
        id: "post-1",
        title: "Building Offline-First Architectures with React and SQLite",
        excerpt: "Exploring the challenges and solutions in developing enterprise Electron apps that sync securely without internet connectivity.",
        date: "2026-02-24",
        readTime: "8 min read",
        category: "Architecture",
        colorClass: "text-mech-cyan border-mech-cyan",
        borderClass: "border-l-mech-cyan"
    },
    {
        id: "post-2",
        title: "The Death of Zapier: Why n8n is the Future of Automation",
        excerpt: "Why self-hostable node-based automation is taking over legacy sequential workflow systems across modern dev teams.",
        date: "2026-01-15",
        readTime: "5 min read",
        category: "Automation",
        colorClass: "text-mech-blue border-mech-blue",
        borderClass: "border-l-mech-blue"
    },
    {
        id: "post-3",
        title: "Deploying Local LLMs for Private Code Generation",
        excerpt: "A guide on setting up Ollama and Llama 3 on your local rig to keep your intellectual property off cloud GPUs.",
        date: "2025-11-02",
        readTime: "12 min read",
        category: "AI",
        colorClass: "text-mech-silver border-mech-silver",
        borderClass: "border-l-mech-silver"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-5xl mx-auto relative z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="flex flex-col items-center mb-16 w-full">
                    <TerminalSquare className="w-12 h-12 text-mech-silver/50 mb-4" />
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase mb-4 text-mech-white">
                        Transmission <span className="text-mech-cyan">Logs</span>
                    </h1>
                    <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-mech-cyan/50 to-transparent" />
                </div>

                <div className="flex flex-col gap-8 w-full">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="group cursor-pointer"
                        >
                            <MechPanel border glowHover={false} className={`p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-mech-base/50 transition-colors border-l-4 ${post.borderClass}`}>

                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-orbitron text-mech-silver/70">
                                        <span className={`px-2 py-1 rounded-sm border ${post.colorClass}`}>
                                            {post.category}
                                        </span>
                                        <span className="flex items-center gap-1 group-hover:text-mech-silver transition-colors"><Calendar className="w-3 h-3" /> {post.date}</span>
                                        <span className="flex items-center gap-1 group-hover:text-mech-silver transition-colors"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                    </div>

                                    <h2 className="text-2xl font-orbitron font-bold text-mech-white group-hover:text-mech-cyan transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="font-inter text-mech-silver leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="hidden md:flex items-center justify-center pl-6 border-l border-mech-silver/10 group-hover:border-mech-cyan/30 transition-colors">
                                    <ArrowRight className="w-6 h-6 text-mech-silver/30 group-hover:text-mech-cyan group-hover:translate-x-2 transition-all" />
                                </div>
                            </MechPanel>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center w-full">
                    <MechButton variant="secondary" icon={<Database className="w-4 h-4" />}>
                        Load Historical Data
                    </MechButton>
                </div>
            </motion.div>
        </div>
    );
}
