"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, Calendar, Hash, ShieldCheck, Trophy, GraduationCap, Code2, LucideIcon, RotateCw, X } from "lucide-react";
import { useState } from "react";
import { MechPanel } from "./MechPanel";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  credentialId: string;
  verifyUrl: string;
  icon: string;
  description: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
    Holopin: ShieldCheck,
    Trophy: Trophy,
    GraduationCap: GraduationCap,
    Code2: Code2,
    Award: Award
};

export const CertificateCard = ({ cert }: { cert: Certificate }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const Icon = ICON_MAP[cert.icon] || Award;

  const handleFlip = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative w-full h-80 perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-700"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden">
          <MechPanel border glowHover className="h-full flex flex-col items-center justify-center p-6 text-center bg-mech-base/80">
            <button
              onClick={handleFlip}
              className="absolute top-4 right-4 p-2 rounded-sm bg-mech-cyan/5 border border-mech-cyan/20 text-mech-cyan/40 hover:text-mech-cyan hover:border-mech-cyan/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-mech-cyan"
              aria-label="View verification details"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-mech-cyan/10 border border-mech-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-8 h-8 text-mech-cyan" />
            </div>
            
            <h3 className="font-orbitron font-bold text-mech-white text-lg leading-tight uppercase tracking-widest mb-2">
              {cert.title}
            </h3>
            
            <p className="font-mono text-[10px] text-mech-cyan tracking-[0.2em] mb-4">
              {cert.issuer.toUpperCase()}
            </p>

            <div className="px-3 py-1 bg-mech-silver/5 border border-mech-silver/10 rounded-full text-[9px] text-mech-silver/60 uppercase font-mono tracking-widest">
                {cert.category}
            </div>

            <div className="absolute right-4 bottom-4 opacity-20 pointer-events-none">
                <motion.div
                   animate={{ x: [0, 5, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ExternalLink className="w-4 h-4 text-mech-cyan" />
                </motion.div>
            </div>
          </MechPanel>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <MechPanel border className="h-full flex flex-col p-6 bg-mech-panel">
            <button
              onClick={handleFlip}
              className="absolute top-4 right-4 p-2 rounded-sm bg-mech-silver/5 border border-mech-silver/10 text-mech-silver/40 hover:text-white hover:border-white/30 transition-all focus:outline-none focus:ring-1 focus:ring-mech-cyan"
              aria-label="Return to front"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between border-b border-mech-cyan/20 pb-4 pr-8">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-mech-cyan" />
                    <span className="font-orbitron text-[10px] text-mech-silver uppercase tracking-widest">Verification Dossier</span>
                </div>
                <div className="p-1.5 bg-mech-cyan/10 rounded-md">
                    <ShieldCheck className="w-4 h-4 text-mech-cyan" />
                </div>
              </div>

              <div className="space-y-4 font-mono text-[10px] text-mech-silver uppercase tracking-widest">
                <div className="space-y-1">
                  <div className="text-mech-cyan/40 text-[8px] flex items-center gap-1.5">
                    <Hash className="w-3 h-3" />
                    Credential_ID
                  </div>
                  <div className="text-white selection:bg-mech-cyan/30">{cert.credentialId || "N/A_ENCRYPTED"}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-mech-cyan/40 text-[8px] flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    Issue_Cycle
                  </div>
                  <div className="text-white">{cert.date}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-mech-cyan/40 text-[8px]">Subject_Objective</div>
                  <p className="lowercase font-inter normal-case text-mech-silver/80 leading-relaxed text-xs">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>

            <a 
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2 bg-mech-cyan/10 hover:bg-mech-cyan/20 border border-mech-cyan/20 hover:border-mech-cyan/50 text-mech-cyan font-orbitron text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all uppercase rounded group/btn"
            >
              Uplink to Source
              <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </MechPanel>
        </div>
      </motion.div>
    </div>
  );
};
