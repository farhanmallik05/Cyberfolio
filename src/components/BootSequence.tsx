"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
    "Initializing neural framework...",
    "Loading automation modules...",
    "Verifying developer credentials...",
    "Access Level: Architect",
    "System Ready."
];

export function BootSequence({ children }: { children: React.ReactNode }) {
    const [isBooting, setIsBooting] = useState(true);
    const [visibleMessages, setVisibleMessages] = useState<string[]>([bootMessages[0]]);

    useEffect(() => {
        // Check if we've already booted dynamically using localStorage to persist across visits
        const hasBooted = localStorage.getItem("hasBooted") || sessionStorage.getItem("hasBooted");
        if (hasBooted) {
            setIsBooting(false);
            return;
        }

        let currentIndex = 1;

        const interval = setInterval(() => {
            if (currentIndex < bootMessages.length) {
                setVisibleMessages(prev => [...prev, bootMessages[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setIsBooting(false);
                    sessionStorage.setItem("hasBooted", "true");
                    localStorage.setItem("hasBooted", "true");
                }, 1000); // 1 second delay after "System Ready" before fading out
            }
        }, 600); // 600ms between each message

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isBooting && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                        className="fixed inset-0 z-50 flex flex-col justify-center items-start text-left bg-black text-neon-green font-orbitron p-8 sm:p-24"
                    >
                        <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
                            {visibleMessages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-lg md:text-2xl"
                                >
                                    <span className="opacity-50 mr-4">{`>`}</span>
                                    {msg}
                                    {idx === visibleMessages.length - 1 && idx !== bootMessages.length - 1 && (
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                            className="ml-2 inline-block w-3 h-5 bg-neon-green align-middle"
                                        />
                                    )}
                                </motion.div>
                            ))}

                            {visibleMessages.length === bootMessages.length && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-8 opacity-70 flex items-center gap-4"
                                >
                                    <div className="h-[1px] w-full bg-neon-green max-w-[200px]" />
                                    <span className="text-sm">ENTER SYSTEM</span>
                                    <div className="h-[1px] w-full bg-neon-green max-w-[200px]" />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Render children immediately for hydration, but hide them visually until boot is complete */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isBooting ? 0 : 1, y: isBooting ? 20 : 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="min-h-screen"
                style={{ pointerEvents: isBooting ? "none" : "auto" }}
            >
                {children}
            </motion.div>
        </>
    );
}
