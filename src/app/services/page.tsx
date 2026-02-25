"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";
import { Server, Zap, BrainCircuit, PenTool } from "lucide-react";

const services = [
    {
        id: "SRV-01",
        title: "Web Development Engine",
        description: "High-performance, secure, and modern web applications built on React and Next.js ecosystems.",
        icon: Server,
        color: "text-neon-blue",
        features: ["Responsive Architecture", "SEO Optimization", "API Integration", "Secure Authentication"],
        price: "From $1,500"
    },
    {
        id: "SRV-02",
        title: "Automation Infrastructure",
        description: "Streamlined business operations using advanced n8n workflows connecting multiple SaaS platforms.",
        icon: Zap,
        color: "text-neon-green",
        features: ["Zapier/Make Alternative", "Self-Hosted Options", "Custom Webhooks", "CRM Sync"],
        price: "From $800"
    },
    {
        id: "SRV-03",
        title: "AI System Integration",
        description: "Embedding Generative AI capabilities into your existing products to 10x user capabilities.",
        icon: BrainCircuit,
        color: "text-neon-magenta",
        features: ["Custom ChatGPT Bots", "Vector Search Integration", "Automated Content Generation", "OpenAI API"],
        price: "Custom Quote"
    },
    {
        id: "SRV-04",
        title: "UI/UX Design Framework",
        description: "User-centric design systems that convert visitors into users, focusing on modern aesthetics.",
        icon: PenTool,
        color: "text-neon-purple",
        features: ["Figma Prototypes", "Design Systems", "Wireframing", "User Journey Mapping"],
        price: "From $1,000"
    }
];

export default function Services() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10">

            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col items-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase">
                        Deployable <span className="text-neon-blue">Systems</span>
                    </h1>
                    <p className="text-center font-inter text-foreground/60 mt-4 max-w-2xl">
                        Acquire and integrate engineered modules into your business backend. Secure payment routing initialized.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                        >
                            <GlassPanel neonBorder className="h-full flex flex-col p-8 group hover:border-current hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all" style={{ color: "transparent" }}>

                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 bg-cyber-base rounded-lg border border-white/10 ${service.color} group-hover:scale-110 transition-transform`}>
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <span className="font-orbitron text-white/30 text-sm">{service.id}</span>
                                </div>

                                <h3 className="text-2xl font-orbitron font-bold text-white mb-3">
                                    {service.title}
                                </h3>

                                <p className="font-inter text-foreground/70 mb-6 flex-1">
                                    {service.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {service.features.map(feature => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-current ${service.color}`} />
                                            <span className="font-inter text-sm text-white/80">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                                    <span className={`font-orbitron font-bold text-lg ${service.color}`}>
                                        {service.price}
                                    </span>
                                    <NeonButton
                                        variant={service.color.includes('blue') ? 'blue' : service.color.includes('green') ? 'green' : service.color.includes('magenta') ? 'magenta' : 'purple'}
                                        className="w-full sm:w-auto text-sm py-2 px-4 shadow-none hover:shadow-none"
                                        onClick={() => alert(`Stripe Integration Endpoint for ${service.id} pending.`)}
                                    >
                                        Initialize Project
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
