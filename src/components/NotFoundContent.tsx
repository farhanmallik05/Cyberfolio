"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { AlertTriangle, Terminal, ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?ABCDEF0123456789";

function useGlitchText(text: string) {
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        const interval = setInterval(() => {
            const shouldGlitch = Math.random() > 0.7;
            if (shouldGlitch) {
                const chars = text.split("");
                const glitchCount = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < glitchCount; i++) {
                    const idx = Math.floor(Math.random() * chars.length);
                    chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
                setDisplay(chars.join(""));
            } else {
                setDisplay(text);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [text]);

    return display;
}

export function NotFoundContent() {
    const errorCode = useGlitchText("404");
    const errorMsg = useGlitchText("SYSTEM FAILURE :: NODE NOT FOUND");
    const [scanLine, setScanLine] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanLine((prev) => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cyber-base">
            {/* Animated scan lines background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(transparent 50%, rgba(0, 240, 255, 0.05) 50%)`,
                        backgroundSize: "100% 4px",
                    }}
                />
                <div
                    className="absolute left-0 right-0 h-[2px] bg-neon-magenta/30 blur-sm transition-all"
                    style={{ top: `${scanLine}%` }}
                />
            </div>

            {/* Static noise overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
                <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-magenta/5 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center px-6 max-w-2xl"
            >
                {/* Warning Icon */}
                <motion.div
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                    className="inline-block mb-8"
                >
                    <AlertTriangle className="w-16 h-16 text-neon-magenta mx-auto animate-pulse" />
                </motion.div>

                {/* Error Code */}
                <h1 className="font-orbitron text-8xl md:text-[10rem] font-black text-white leading-none mb-4 select-none">
                    <span className="relative">
                        <span className="absolute -top-1 -left-1 text-neon-magenta/50 blur-[1px]">{errorCode}</span>
                        <span className="absolute top-1 left-1 text-neon-blue/50 blur-[1px]">{errorCode}</span>
                        <span className="relative">{errorCode}</span>
                    </span>
                </h1>

                {/* Error Message */}
                <div className="mb-8 p-4 bg-cyber-panel/50 border border-neon-magenta/20 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-3 justify-center">
                        <Terminal className="w-4 h-4 text-neon-magenta flex-shrink-0" />
                        <p className="font-orbitron text-sm md:text-base text-neon-magenta tracking-wider">
                            {errorMsg}
                        </p>
                    </div>
                </div>

                {/* System Log */}
                <div className="text-left mb-10 p-4 bg-black/40 rounded border border-white/5 font-mono text-xs text-white/40 space-y-1 max-w-md mx-auto">
                    <p>&gt; Attempting route resolution...</p>
                    <p>&gt; <span className="text-red-500">ERR</span> Requested node does not exist in neural network</p>
                    <p>&gt; <span className="text-neon-amber">WARN</span> Firewall intercepted unauthorized path</p>
                    <p>&gt; Redirecting to safe harbor...</p>
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                        className="inline-block w-2 h-4 bg-neon-green align-middle ml-1"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <NeonButton
                        variant="magenta"
                        onClick={() => (window.location.href = "/")}
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Return to Base
                        </span>
                    </NeonButton>
                    <NeonButton
                        variant="blue"
                        onClick={() => window.location.reload()}
                    >
                        <span className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Retry Connection
                        </span>
                    </NeonButton>
                </div>
            </motion.div>
        </div>
    );
}
