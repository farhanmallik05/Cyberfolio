"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { MechButton } from "@/components/ui/MechButton";
import { motion } from "framer-motion";
import { Server, Zap, BrainCircuit, PenTool } from "lucide-react";

const services = [
    {
        id: "SRV-01",
        title: "Web Development Engine",
        description: "High-performance, secure, and modern web applications built on React and Next.js ecosystems.",
        icon: Server,
        colorClass: "text-mech-cyan border-mech-cyan shadow-[0_0_15px_rgba(15,211,255,0.3)]",
        iconBg: "bg-mech-cyan/10",
        features: ["Responsive Architecture", "SEO Optimization", "API Integration", "Secure Authentication"],
        price: "From ₹1,500"
    },
    {
        id: "SRV-02",
        title: "Automation Infrastructure",
        description: "Streamlined business operations using advanced n8n workflows connecting multiple SaaS platforms.",
        icon: Zap,
        colorClass: "text-mech-blue border-mech-blue shadow-[0_0_15px_rgba(0,174,239,0.3)]",
        iconBg: "bg-mech-blue/10",
        features: ["Zapier/Make Alternative", "Self-Hosted Options", "Custom Webhooks", "CRM Sync"],
        price: "From ₹800"
    },
    {
        id: "SRV-03",
        title: "AI System Integration",
        description: "Embedding Generative AI capabilities into your existing products to 10x user capabilities.",
        icon: BrainCircuit,
        colorClass: "text-mech-silver border-mech-silver shadow-[0_0_15px_rgba(201,209,217,0.3)]",
        iconBg: "bg-mech-silver/10",
        features: ["Custom ChatGPT Bots", "Vector Search Integration", "Automated Content Generation", "OpenAI API"],
        price: "Custom Quote"
    },
    {
        id: "SRV-04",
        title: "UI/UX Design Framework",
        description: "User-centric design systems that convert visitors into users, focusing on mechanical precision and modern aesthetics.",
        icon: PenTool,
        colorClass: "text-mech-cyan border-mech-cyan shadow-[0_0_15px_rgba(15,211,255,0.3)]",
        iconBg: "bg-mech-cyan/10",
        features: ["Figma Prototypes", "Design Systems", "Wireframing", "User Journey Mapping"],
        price: "From ₹1,000"
    }
];

export default function Services() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 w-full">

            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mech-cyan/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="flex flex-col items-center mb-16 w-full">
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase text-mech-white">
                        Deployable <span className="text-mech-cyan">Systems</span>
                    </h1>
                    <p className="text-center font-inter text-mech-silver mt-4 max-w-2xl">
                        Acquire and integrate engineered modules into your business backend. Secure payment routing initialized.
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-mech-cyan/30 to-transparent w-full max-w-md mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="h-full"
                        >
                            <MechPanel border glowHover className="h-full flex flex-col p-8 group transition-all bg-gradient-to-br from-mech-panel to-mech-base">

                                {/* Top Header of Panel */}
                                <div className="flex justify-between items-start mb-6 border-b border-mech-silver/10 pb-6">
                                    <div className={`p-4 rounded-sm border ${service.iconBg} ${service.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-orbitron text-mech-silver/50 text-xs tracking-widest uppercase">MODULE ID</span>
                                        <span className="font-orbitron font-bold text-mech-cyan text-sm">{service.id}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-orbitron font-bold text-mech-white mb-3 group-hover:text-mech-cyan transition-colors">
                                    {service.title}
                                </h3>

                                <p className="font-inter text-mech-silver mb-6 flex-1 text-sm leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="space-y-3 mb-8 bg-mech-base/50 p-4 border border-mech-silver/5 rounded-sm">
                                    {service.features.map(feature => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-mech-blue shadow-[0_0_5px_rgba(0,174,239,0.8)] rounded-none rotate-45" />
                                            <span className="font-inter text-sm text-mech-silver">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-mech-silver/10">
                                    <span className="font-orbitron font-bold text-lg text-mech-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                                        {service.price}
                                    </span>
                                    <MechButton
                                        variant="primary"
                                        className="w-full sm:w-auto"
                                    >
                                        Initialize Integration
                                    </MechButton>
                                </div>

                            </MechPanel>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
