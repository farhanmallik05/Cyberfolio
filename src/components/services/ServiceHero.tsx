'use client';

import { motion } from 'framer-motion';

export function ServiceHero() {
  return (
    <section className="relative pt-32 pb-16 px-6 sm:px-12 md:px-24 mx-auto max-w-7xl">
      <div className="flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block px-4 py-1.5 mb-4 border border-mech-cyan/30 rounded bg-mech-cyan/5 text-mech-cyan font-mono text-sm tracking-widest uppercase"
        >
          System Upgrades
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold font-orbitron text-mech-silver"
        >
          Architect Your <span className="text-mech-cyan drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">Neural</span> Build
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl text-lg md:text-xl text-mech-silver/70 font-rajdhani"
        >
          High-performance engineering tailored for visionary founders. Select your service class below to initialize a deployment sequence.
        </motion.p>
      </div>
    </section>
  );
}
