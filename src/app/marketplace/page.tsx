"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";
import { ShoppingCart, Download, FileText, Settings, Database } from "lucide-react";

const products = [
    {
        id: "MKT-01",
        title: "Cyberpunk Notion Dashboard",
        description: "Complete life-management OS built in Notion with custom cyberpunk aesthetics and formula automations.",
        icon: FileText,
        color: "text-neon-magenta",
        price: "₹499",
        type: "Notion Template"
    },
    {
        id: "MKT-02",
        title: "Twitter Auto-Poster n8n",
        description: "Pre-configured n8n workflow for scraping RSS feeds and automatically generating and posting to Twitter via OpenAI.",
        icon: Settings,
        color: "text-neon-blue",
        price: "₹1499",
        type: "Automation Workflow"
    },
    {
        id: "MKT-03",
        title: "Next.js UI Component Pack",
        description: "50+ animated, cyberpunk-styled React components built with Tailwind CSS and Framer Motion.",
        icon: Database,
        color: "text-neon-purple",
        price: "₹499",
        type: "Developer Asset"
    },
    {
        id: "MKT-04",
        title: "Tech Resume Template",
        description: "High-conversion, ATS-friendly developer resume template designed in Figma.",
        icon: Download,
        color: "text-neon-green",
        price: "₹99",
        type: "Figma File"
    }
];

export default function Marketplace() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10">

            {/* Background Matrix-like lines */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col items-center mb-16">
                    <div className="px-4 py-1 border border-neon-blue/30 bg-neon-blue/10 rounded-full mb-4 flex items-center gap-2 text-neon-blue text-xs font-orbitron tracking-widest uppercase">
                        <ShoppingCart className="w-3 h-3" /> SECURE CHECKOUT INITIALIZED
                    </div>
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase">
                        Digital <span className="text-neon-blue">Marketplace</span>
                    </h1>
                    <p className="text-center font-inter text-foreground/60 mt-4 max-w-2xl">
                        Downloadable assets, architectural templates, and pre-built automation layers for immediate deployment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="group"
                        >
                            <GlassPanel neonBorder className="h-full flex flex-col p-6 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">

                                {/* Glow Effect */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 group-hover:opacity-50 transition-opacity bg-current ${product.color}`} />

                                <div className="flex flex-col mb-4 relative z-10">
                                    <div className={`p-3 self-start bg-cyber-base rounded-md border border-white/10 mb-4 ${product.color}`}>
                                        <product.icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] font-orbitron uppercase tracking-wider ${product.color} mb-1`}>
                                        {product.type}
                                    </span>
                                    <h3 className="font-orbitron font-bold text-lg text-white leading-tight">
                                        {product.title}
                                    </h3>
                                </div>

                                <p className="font-inter text-sm text-foreground/60 mb-6 flex-1 relative z-10">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto relative z-10">
                                    <span className="font-orbitron font-bold text-xl text-white">
                                        {product.price}
                                    </span>
                                    <NeonButton
                                        variant={product.color.includes('blue') ? 'blue' : product.color.includes('green') ? 'green' : product.color.includes('magenta') ? 'magenta' : 'purple'}
                                        className="px-4 py-1 text-xs"
                                        onClick={() => alert(`Initiating secure transfer for ${product.id}`)}
                                    >
                                        Acquire
                                    </NeonButton>
                                </div>

                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
