"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { MechButton } from "@/components/ui/MechButton";
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
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", projectType: "", message: "" });
            } else {
                console.error("Submission failed");
                setStatus("error");
            }
        } catch (err) {
            console.error("API submission error:", err);
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
                <div className="flex flex-col items-center mb-12 w-full">
                    <ShieldAlert className="w-12 h-12 text-mech-cyan mb-4 animate-pulse" />
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase mb-4 text-mech-white">
                        Secure <span className="text-mech-cyan">Transmission</span>
                    </h1>
                    <p className="text-center font-inter text-mech-silver max-w-2xl text-sm font-mono flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        ESTABLISHING ENCRYPTED CONNECTION... READY.
                    </p>
                </div>

                <MechPanel border glowHover={false} className="p-8 md:p-12 relative overflow-hidden bg-mech-panel/80">
                    {/* Decorative scanner line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-mech-cyan/50 animate-pulse drop-shadow-[0_0_10px_rgba(15,211,255,0.8)]" />

                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                        >
                            <div className="p-4 rounded-full bg-mech-blue/10 border border-mech-blue shadow-[0_0_15px_rgba(0,174,239,0.3)]">
                                <Send className="w-12 h-12 text-mech-blue" />
                            </div>
                            <h3 className="font-orbitron text-2xl text-mech-blue uppercase tracking-wider">Transmission Delivered</h3>
                            <p className="font-inter text-mech-silver max-w-md">
                                The packet has been securely routed into the mainframe. You will receive an acknowledgment shortly.
                            </p>
                            <MechButton variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
                                Initialize New Protocol
                            </MechButton>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="space-y-2">
                                    <label className="font-orbitron text-xs text-mech-cyan uppercase tracking-wider">Entity Designation [Name]</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-mech-base/80 border border-mech-silver/20 p-3 rounded-sm text-mech-white font-inter placeholder:text-mech-silver/30 focus:outline-none focus:border-mech-cyan focus:shadow-[0_0_10px_rgba(15,211,255,0.2)] transition-all"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-orbitron text-xs text-mech-cyan uppercase tracking-wider">Return Vector [Email]</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-mech-base/80 border border-mech-silver/20 p-3 rounded-sm text-mech-white font-inter placeholder:text-mech-silver/30 focus:outline-none focus:border-mech-cyan focus:shadow-[0_0_10px_rgba(15,211,255,0.2)] transition-all"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                             <div className="space-y-2 w-full">
                                 <label htmlFor="project-type" className="font-orbitron text-xs text-mech-cyan uppercase tracking-wider">Operation Protocol [Project Type]</label>
                                 <select
                                     id="project-type"
                                     required
                                     className="w-full bg-mech-base/80 border border-mech-silver/20 p-3 rounded-sm text-mech-white font-inter focus:outline-none focus:border-mech-cyan focus:shadow-[0_0_10px_rgba(15,211,255,0.2)] transition-all appearance-none uppercase text-sm tracking-wide"
                                     value={formData.projectType}
                                     onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                                 >
                                    <option value="" disabled className="text-mech-silver/50">Select Protocol</option>
                                    <option value="general-inquiry">General Inquiry</option>
                                    <option value="technical-support">Technical Support</option>
                                    <option value="sales-pricing">Sales / Pricing</option>
                                    <option value="collaboration">Collaboration</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="report-bug">Report a Bug</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>

                            <div className="space-y-2 w-full">
                                <label className="font-orbitron text-xs text-mech-cyan uppercase tracking-wider">Encrypted Payload [Message]</label>
                                <textarea
                                    required
                                    rows={6}
                                    className="w-full bg-mech-base/80 border border-mech-silver/20 p-3 rounded-sm text-mech-white font-inter placeholder:text-mech-silver/30 focus:outline-none focus:border-mech-cyan focus:shadow-[0_0_10px_rgba(15,211,255,0.2)] transition-all resize-none"
                                    placeholder="Detail the parameters of your operation..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-500 font-orbitron text-sm bg-red-500/10 p-3 border border-red-500/20 rounded-sm">
                                    <AlertTriangle className="w-4 h-4" />
                                    SYSTEM FAILURE: UNABLE TO ROUTE PACKET. Please try again.
                                </div>
                            )}

                            <div className="pt-4 flex justify-end w-full">
                                <MechButton
                                    variant="primary"
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full md:w-auto"
                                >
                                    {status === "sending" ? "ENCRYPTING..." : "DISPATCH TRANSMISSION"}
                                </MechButton>
                            </div>
                        </form>
                    )}
                </MechPanel>
            </motion.div>
        </div>
    );
}
