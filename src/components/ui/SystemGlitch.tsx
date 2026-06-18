"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SystemGlitch() {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        let glitchTimer: NodeJS.Timeout;
        
        // Initial wait of 600 seconds (600,000ms)
        const initialWait = setTimeout(() => {
            triggerGlitch();
        }, 600000);

        const triggerGlitch = () => {
            setIsGlitching(true);
            
            // Glitch lasts 10 seconds
            setTimeout(() => {
                setIsGlitching(false);
                
                // Schedule next glitch randomly between 5 to 15 mins later
                const nextWait = 300000 + Math.random() * 600000;
                glitchTimer = setTimeout(triggerGlitch, nextWait);
            }, 10000);
        };

        return () => {
            clearTimeout(initialWait);
            clearTimeout(glitchTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isGlitching && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen overflow-hidden"
                >
                    {/* TV Static Effect */}
                    <motion.div 
                        animate={{ opacity: [0.1, 0.3, 0.1, 0.4, 0.2] }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat',
                        }}
                    />
                    
                    {/* Chromatic aberration splits */}
                    <motion.div 
                        animate={{ x: [-20, 20, -10, 10, -30, 30, 0], y: [-10, 10, -20, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                        className="absolute inset-0 bg-red-600/20 mix-blend-color-burn" 
                    />
                    <motion.div 
                        animate={{ x: [20, -20, 10, -10, 30, -30, 0], y: [10, -10, 20, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 0.15 }}
                        className="absolute inset-0 bg-neon-blue/20 mix-blend-color-burn" 
                    />
                    
                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_6px] opacity-80" />
                    
                    {/* Huge Glitch Warning */}
                    <div className="flex items-center justify-center h-full w-full opacity-70 mix-blend-hard-light">
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 0.9, 1.1, 1], 
                                rotate: [-2, 3, -4, 2, 0],
                                skewX: [0, 20, -20, 10, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                            className="text-red-500 font-orbitron text-6xl md:text-9xl font-black tracking-widest uppercase blur-[2px] select-none"
                        >
                            SYSTEM OVERRIDE
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
