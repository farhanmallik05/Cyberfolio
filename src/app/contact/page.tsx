"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";
import { ShieldAlert, Send, Terminal, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", projectType: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-4xl mx-auto relative z-10 flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="flex flex-col items-center mb-12">
                    <ShieldAlert className="w-12 h-12 text-neon-magenta mb-4 animate-pulse" />
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase mb-4 text-neon-magenta">
                        Secure <span className="text-white">Transmission</span>
                    </h1>
                    <p className="text-center font-inter text-foreground/60 max-w-2xl text-sm font-mono flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        ESTABLISHING ENCRYPTED CONNECTION... READY.
                    </p>
                </div>

                <GlassPanel neonBorder className="p-8 md:p-12 relative overflow-hidden" style={{ borderColor: 'rgba(255, 44, 251, 0.5)' }}>
                    {/* Decorative scanner line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-neon-magenta/50 animate-pulse shadow-[0_0_15px_#FF2CFB]" />

                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                        >
                            <Send className="w-16 h-16 text-neon-green mb-4" />
                            <h3 className="font-orbitron text-2xl text-neon-green uppercase tracking-wider">Transmission Delivered</h3>
                            <p className="font-inter text-foreground/70">
                                The packet has been securely routed. You will receive an acknowledgment shortly.
                            </p>
                            <NeonButton variant="blue" className="mt-8" onClick={() => setStatus("idle")}>
                                Initialize New Protocol
                            </NeonButton>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-orbitron text-xs text-neon-magenta uppercase tracking-wider">Entity Designation [Name]</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-cyber-base border border-white/10 p-3 rounded text-white font-inter focus:outline-none focus:border-neon-magenta transition-colors"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-orbitron text-xs text-neon-magenta uppercase tracking-wider">Return Vector [Email]</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-cyber-base border border-white/10 p-3 rounded text-white font-inter focus:outline-none focus:border-neon-magenta transition-colors"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-orbitron text-xs text-neon-magenta uppercase tracking-wider">Operation Protocol [Project Type]</label>
                                <select
                                    required
                                    className="w-full bg-cyber-base border border-white/10 p-3 rounded text-white font-inter focus:outline-none focus:border-neon-magenta transition-colors appearance-none"
                                    value={formData.projectType}
                                    onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                                >
                                    <option value="" disabled>Select Protocol</option>
                                    <option value="web-dev">Web Development System</option>
                                    <option value="automation">Automation Infrastructure</option>
                                    <option value="ai-integration">AI Integration Module</option>
                                    <option value="consulting">Architectural Consulting</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="font-orbitron text-xs text-neon-magenta uppercase tracking-wider">Encrypted Payload [Message]</label>
                                <textarea
                                    required
                                    rows={6}
                                    className="w-full bg-cyber-base border border-white/10 p-3 rounded text-white font-inter focus:outline-none focus:border-neon-magenta transition-colors resize-none"
                                    placeholder="Detail the parameters of your operation..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-500 font-orbitron text-sm">
                                    <AlertTriangle className="w-4 h-4" />
                                    SYSTEM FAILURE: UNABLE TO ROUTE PACKET.
                                </div>
                            )}

                            <div className="pt-4 flex justify-end">
                                <NeonButton
                                    variant="magenta"
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full md:w-auto"
                                >
                                    {status === "sending" ? "ENCRYPTING..." : "DISPATCH TRANSMISSION"}
                                </NeonButton>
                            </div>
                        </form>
                    )}
                </GlassPanel>
            </motion.div>
        </div>
    );
}
