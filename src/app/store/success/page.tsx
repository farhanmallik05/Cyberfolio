"use client";

import { useEffect, useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StoreSuccessPage() {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const sequence = [
            "Initializing secure handshake...",
            "Verifying transaction integrity...",
            "Generating encrypted token...",
            "Preparing payload delivery...",
            "Dispatching secure email link...",
            "Payload successfully delivered."
        ];
        
        let logIndex = 0;
        
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const newProgress = prev + Math.floor(Math.random() * 15) + 5;
                
                // Add logs based on progress
                const expectedIndex = Math.min(Math.floor((newProgress / 100) * sequence.length), sequence.length - 1);
                if (expectedIndex > logIndex) {
                    setLogs(prevLogs => [...prevLogs, sequence[expectedIndex]]);
                    logIndex = expectedIndex;
                }
                
                return newProgress;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-3xl mx-auto relative z-10 flex flex-col justify-center items-center">
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <GlassPanel neonBorder className="p-8 md:p-12 relative overflow-hidden w-full border-neon-green/50">
                    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-10 bg-neon-green" />
                    
                    <div className="flex flex-col items-center relative z-10">
                        {progress < 100 ? (
                            <Terminal className="w-12 h-12 text-neon-green mb-6 animate-pulse" />
                        ) : (
                            <CheckCircle2 className="w-12 h-12 text-neon-green mb-6" />
                        )}
                        
                        <h1 className="text-2xl md:text-4xl font-orbitron font-bold text-white mb-8 tracking-widest text-center">
                            {progress < 100 ? "TRANSACTION SECURED" : "PAYLOAD DELIVERED"}
                        </h1>
                        
                        <div className="w-full max-w-lg bg-black/80 border border-neon-green/30 rounded p-4 font-share-tech text-sm text-neon-green/80 flex flex-col gap-2 min-h-[160px]">
                            {logs.map((log, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-2"
                                >
                                    <span className="opacity-50">&gt;</span> {log}
                                </motion.div>
                            ))}
                            {progress < 100 && (
                                <motion.div 
                                    animate={{ opacity: [1, 0, 1] }} 
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="w-2 h-4 bg-neon-green inline-block ml-2 mt-1"
                                />
                            )}
                        </div>
                        
                        <div className="w-full max-w-lg bg-black/50 border border-neon-green/30 rounded-sm h-4 mt-6 mb-8 relative overflow-hidden">
                            <div 
                                className="h-full bg-neon-green transition-all duration-300 ease-out"
                                style={{ width: `${Math.min(progress, 100)}%`, boxShadow: '0 0 10px rgba(0, 255, 128, 0.5)' }}
                            />
                        </div>

                        {progress === 100 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link href="/store" className="inline-flex items-center justify-center border-2 border-neon-green text-neon-green font-orbitron px-8 py-3 hover:bg-neon-green hover:text-black transition-all duration-300 font-bold tracking-wider">
                                    RETURN TO SYSTEM
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </GlassPanel>
            </motion.div>

        </div>
    );
}
