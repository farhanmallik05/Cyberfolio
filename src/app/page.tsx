"use client";

import dynamic from "next/dynamic";
import { GlitchText } from "@/components/ui/GlitchText";
import { MechButton } from "@/components/ui/MechButton";
import { Code, Terminal as TerminalIcon, Cpu, Database, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MechPanel } from "@/components/ui/MechPanel";
import { TerminalCLI } from "@/components/ui/TerminalCLI";
import { useEffect, useRef } from "react";
import { useRole, ROLE_META } from "@/context/RoleContext";
import { SECTION_WEIGHTS } from "@/data/section-weights";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";
     
gsap.registerPlugin(Flip);

// Lazy load Three.js heavy component for the AI Core Sphere
const AICore = dynamic(() => import("@/components/AICore").then(mod => ({ default: mod.AICore })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-mech-base rounded-full animate-pulse opacity-50" />,
});

export default function Home() {
  const { activeRole } = useRole();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const weights = SECTION_WEIGHTS[activeRole];
    // We only reorder the root children of the container
    const sections = Array.from(containerRef.current.children) as HTMLElement[];
    
    // Capture state
    const state = Flip.getState(sections);

    // Apply new order
    weights.forEach((sectionId, index) => {
      const el = containerRef.current?.querySelector(`[data-section="${sectionId}"]`) as HTMLElement;
      if (el) {
        el.style.order = String(index);
      }
    });

    // Animate
    Flip.from(state, {
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.05,
      scale: true,
      onComplete: () => {
        // Clear any inline styles that might interfere with layout if needed
      }
    });
  }, [activeRole]);

  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden w-full pt-20 pb-10 px-4">

      {/* Mech Control Console Split Layout */}
      <div 
        ref={containerRef}
        className="container mx-auto z-10 w-full max-w-7xl flex flex-col gap-24 relative"
      >
        <section data-section="hero" className="w-full">
          {/* Left Panel: 3D Mech AI Core Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:flex-1 flex justify-center relative"
          >
            {/* ... (Existing AICore and Rings code) ... */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 border border-mech-cyan/10 rounded-full flex items-center justify-center">
                <div className="absolute inset-4 border border-mech-silver/10 rounded-full border-dashed" />
                <div className="absolute inset-8 sm:inset-12 border border-mech-cyan/20 rounded-full" />
              </div>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
                <div className="w-full h-full rounded-full border-t flex justify-center border-mech-cyan/40">
                  <div className="w-2 h-2 bg-mech-cyan rounded-full mt-[-4px] shadow-[0_0_10px_#0FD3FF]" />
                </div>
              </motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-4 sm:inset-8">
                <div className="w-full h-full rounded-full border-b flex justify-center items-end border-mech-blue/40">
                  <div className="w-3 h-3 bg-mech-blue rounded-full mb-[-6px]" />
                </div>
              </motion.div>
              <AICore />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 origin-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mech-panel p-1.5 sm:p-2.5 rounded-sm border border-mech-blue shadow-[0_0_10px_rgba(0,174,239,0.3)] transform -rotate-[360deg] animate-[spin_20s_linear_infinite_reverse]">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-mech-blue" />
                </div>
              </motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-4 origin-center">
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 bg-mech-panel p-1.5 sm:p-2.5 rounded-sm border border-mech-cyan shadow-[0_0_10px_rgba(15,211,255,0.3)] transform rotate-[360deg] animate-[spin_25s_linear_infinite]">
                  <TerminalIcon className="w-4 h-4 sm:w-5 sm:h-5 text-mech-cyan" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Panel: Typography & Control Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full lg:flex-1 text-center lg:text-left flex flex-col gap-4 sm:gap-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-2 flex-wrap">
                <div className="w-6 sm:w-8 h-px bg-mech-cyan" />
                <h2 className="text-mech-cyan font-orbitron tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase font-medium">
                  Computer Science Student • Builder • UI/UX Explorer
                </h2>
                <div className="w-6 sm:w-8 h-px bg-mech-cyan hidden sm:block" />
              </div>

              <div className="relative inline-block max-w-full">
                <GlitchText
                  text="FARHAN MALLIK"
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight font-orbitron text-white whitespace-nowrap"
                />
                <div className="absolute -bottom-2 -right-2 sm:-right-4 w-8 sm:w-12 h-8 sm:h-12 border-b border-r border-mech-cyan/30" />
                <div className="absolute -top-2 -left-2 sm:-left-4 w-8 sm:w-12 h-8 sm:h-12 border-t border-l border-mech-cyan/30" />
              </div>
            </div>

            <MechPanel className="p-4 sm:p-6 mt-2 sm:mt-4 lg:mr-12" border glowHover={false}>
              <motion.p 
                key={activeRole}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-mech-silver text-xs sm:text-sm md:text-base font-inter leading-relaxed text-left"
              >
                {ROLE_META[activeRole].bio}
              </motion.p>
            </MechPanel>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-4 sm:mt-6">
              <Link href="/projects" className="w-full sm:w-auto">
                <MechButton variant="primary" className="w-full" icon={<FolderGit2 className="w-4 h-4" />}>
                  Initialize Projects
                </MechButton>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <MechButton variant="secondary" className="w-full" icon={<Database className="w-4 h-4" />}>
                  Launch Collaboration
                </MechButton>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Dynamic Section: Projects Preview */}
        <section 
          data-section="projects" 
          className="w-full py-12 border-t border-mech-cyan/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <FolderGit2 className="text-mech-cyan w-5 h-5" />
            <h3 className="font-orbitron text-sm tracking-[0.2em] text-mech-silver uppercase">Primary project_deployments</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
             <div className="h-32 border border-dashed border-mech-silver/20 rounded-lg flex items-center justify-center font-orbitron text-[10px] text-mech-silver/40 uppercase tracking-widest">
               [ Role_Match_Buffer_Initializing ]
             </div>
             <div className="h-32 border border-dashed border-mech-silver/20 rounded-lg flex items-center justify-center font-orbitron text-[10px] text-mech-silver/40 uppercase tracking-widest">
               [ Role_Match_Buffer_Initializing ]
             </div>
          </div>
        </section>

        {/* Dynamic Section: Skills Preview */}
        <section 
          data-section="skills" 
          className="w-full py-12 border-t border-mech-cyan/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <Cpu className="text-mech-cyan w-5 h-5" />
            <h3 className="font-orbitron text-sm tracking-[0.2em] text-mech-silver uppercase">Neural_Core diagnostics</h3>
          </div>
          <div className="flex flex-wrap gap-3 opacity-50">
            {['REACT', 'NEXT.JS', 'TYPESCRIPT', 'PYTHON', 'AI_AGENTRY', 'AUTOMATION'].map(s => (
              <span key={s} className="px-3 py-1 border border-mech-silver/20 text-[10px] font-orbitron text-mech-silver tracking-widest uppercase">{s}</span>
            ))}
          </div>
        </section>

        {/* Terminal Interaction Section */}
        <section 
          data-section="contact" 
          className="w-full"
        >
          <div className="flex items-center gap-4 mb-6 border-b border-mech-cyan/10 pb-2">
            <TerminalIcon className="text-mech-cyan w-5 h-5" />
            <h3 className="font-orbitron text-sm tracking-[0.2em] text-mech-silver uppercase">Interactive Terminal Access</h3>
          </div>
          <TerminalCLI />
        </section>

      </div>
    </main>
  );
}
