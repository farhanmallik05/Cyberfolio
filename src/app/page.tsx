"use client";

import dynamic from "next/dynamic";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonButton } from "@/components/ui/NeonButton";
import { Code, Terminal, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Lazy load Three.js heavy component
const NeuralGrid = dynamic(() => import("@/components/NeuralGrid").then(mod => ({ default: mod.NeuralGrid })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-cyber-base" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      <NeuralGrid />

      {/* Holographic Dashboard Split Layout */}
      <div className="container mx-auto px-4 z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative">

        {/* Left Panel: Floating Tech Holograms */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 w-full flex justify-center lg:justify-start lg:pl-12"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-neon-blue/20 border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-neon-magenta/20 border-dotted"
            />

            {/* Center piece */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center neon-border-blue rounded-full bg-cyber-panel/50 backdrop-blur-md">
                <Cpu className="w-12 h-12 text-neon-blue animate-pulse" />
              </div>
            </div>

            {/* Orbiting Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 origin-center"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyber-panel p-3 rounded-full border border-neon-purple shadow-[0_0_15px_#6A00FF]">
                <Code className="w-6 h-6 text-neon-purple" />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 origin-center"
            >
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-cyber-panel p-3 rounded-full border border-neon-green shadow-[0_0_15px_#39FF14]">
                <Terminal className="w-6 h-6 text-neon-green" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel: Glitch Info & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex-1 w-full text-center lg:text-left flex flex-col gap-6"
        >
          <div className="space-y-2">
            <h2 className="text-neon-blue font-orbitron tracking-[0.2em] text-sm md:text-md uppercase">
              AI & Automation Developer
            </h2>
            <GlitchText
              text="FARHAN MALLIK"
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
            />
          </div>

          <p className="text-foreground/80 md:text-lg max-w-xl mx-auto lg:mx-0 font-inter leading-relaxed">
            Engineering intelligent systems, automation frameworks & advanced digital solutions. Architecting the future, one protocol at a time.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
            <Link href="/projects">
              <NeonButton variant="blue">View Projects</NeonButton>
            </Link>
            <Link href="/contact">
              <NeonButton variant="magenta">Deploy Collaboration</NeonButton>
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
