"use client";

import React from "react";
import { motion } from "framer-motion";

export function ScanningLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-mech-base/20 backdrop-blur-sm overflow-hidden relative border border-mech-silver/5">
      {/* Moving scanning line */}
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mech-cyan to-transparent shadow-[0_0_15px_var(--mech-cyan)] z-10"
      />
      
      {/* Background Pulse */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.05)_0%,transparent_70%)]"
      />

      <div className="flex flex-col items-center gap-4 z-20">
        <div className="flex gap-1.5 h-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ height: 4 }}
              animate={{ height: [4, 12, 4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 bg-mech-cyan"
            />
          ))}
        </div>
        <span className="font-orbitron text-[10px] text-mech-cyan tracking-[0.4em] uppercase animate-pulse">
          Initializing_Neural_Core
        </span>
      </div>
    </div>
  );
}
