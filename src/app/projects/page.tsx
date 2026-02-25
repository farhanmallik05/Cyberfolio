"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
    {
        title: "NEURAL CORE ERP",
        description: "Offline-first comprehensive CRM and ERP tailored for civil engineering. Features advanced material tracking and local-first SQLite sync.",
        techStack: ["Electron.js", "React", "Prisma", "SQLite"],
        githubUrl: "https://github.com/example/neural-core",
    },
    {
        title: "WEB3 MARKETPLACE",
        description: "Decentralized freelancing platform using smart contracts for automated escrow and job applications.",
        techStack: ["Next.js", "Solidity", "Hardhat", "Tailwind"],
        liveUrl: "https://example.com/web3",
    },
    {
        title: "N8N AUTOMATION ENGINE",
        description: "Scalable Zapier alternative workflow system. Automated lead generation to CRM data entry with 99.9% uptime.",
        techStack: ["n8n", "Docker", "PostgreSQL", "Node.js"],
        githubUrl: "https://github.com/example/n8n-setup",
        liveUrl: "https://example.com/n8n",
    },
    {
        title: "EDU-TECH AI TUTOR",
        description: "Generative AI powered tutoring platform that analyzes student responses and generates customized learning paths.",
        techStack: ["Python", "FastAPI", "React", "OpenAI"],
    }
];

export default function Projects() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col items-center mb-16">
                    <div className="px-4 py-1 border border-neon-magenta/30 bg-neon-magenta/10 rounded-full mb-4">
                        <span className="text-xs font-orbitron font-bold text-neon-magenta tracking-widest uppercase">CLASSIFIED DATA</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase">
                        Project <span className="text-neon-magenta">Archive</span>
                    </h1>
                    <p className="text-center font-inter text-foreground/60 mt-4 max-w-2xl">
                        System modules and intelligence operations deployed into production environments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
