"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Award,   ShieldCheck, Trophy, GraduationCap, Code2, LucideIcon, RotateCw, RotateCcw } from "lucide-react";
import { useState, useRef } from "react";
import { MechPanel } from "./MechPanel";
import styles from "./CertificateCard.module.css";

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
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for magnetic tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth weighted movement
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [20, -20]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-20, 20]), springConfig);

  const Icon = ICON_MAP[cert.icon] || Award;
  const verifyUrl = cert.verifyUrl || "https://linkedin.com/in/farhanmallik/details/certifications/";

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsFlipped(false);
  };

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-full h-[400px] perspective-2000 group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-500"
        style={{ 
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 180 : rotateY,
        }}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden z-20">
          <MechPanel border glowHover className="h-full flex flex-col items-center justify-center p-8 text-center bg-mech-base/90 shadow-2xl relative">
            {/* Visual Enhancements */}
            <div className={styles.radarScan} />
            <div className={styles.neuralGrid} />
            <div className={styles.glowContainer} />

            <div className="relative z-10 w-24 h-24 rounded-full bg-mech-cyan/10 border-2 border-mech-cyan/20 flex items-center justify-center mb-10 group-hover:bg-mech-cyan/20 group-hover:border-mech-cyan/40 transition-all duration-500 shadow-[0_0_30px_rgba(0,245,255,0.15)]">
                <Icon className="w-12 h-12 text-mech-cyan" />
                <div className="absolute inset-0 rounded-full border border-mech-cyan/30 animate-ping opacity-20" />
            </div>
            
            <h3 className="relative z-10 font-orbitron font-bold text-mech-white text-2xl leading-tight uppercase tracking-[0.2em] mb-4">
              {cert.title}
            </h3>
            
            <p className="relative z-10 font-mono text-[12px] text-mech-cyan/80 tracking-[0.3em] mb-8">
              {cert.issuer.toUpperCase()}
            </p>

            <div className="relative z-10 px-6 py-2 bg-mech-cyan/5 border border-mech-cyan/30 rounded-full text-[11px] text-mech-cyan font-black uppercase font-mono tracking-[0.4em]">
                {cert.category}
            </div>

            <div className="absolute bottom-6 right-8 flex items-center gap-3 text-mech-cyan/20 group-hover:text-mech-cyan transition-colors">
               <span className="font-orbitron text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Engage_Node</span>
               <RotateCw className="w-5 h-5 animate-spin-slow" />
            </div>
          </MechPanel>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 z-10">
          <MechPanel border className="h-full flex flex-col p-8 bg-mech-panel/95 backdrop-blur-2xl border-mech-cyan/40 shadow-[0_0_50px_rgba(0,245,255,0.15)] relative overflow-hidden">
            {/* Background Data Readouts */}
            <div className="absolute top-2 left-4 opacity-10 font-mono text-[8px] text-mech-cyan whitespace-pre select-none pointer-events-none">
              {`// DECRYPTING_CREDENTIAL\n// STATUS: VERIFIED\n// ORIGIN: ${cert.issuer}\n// NODE: ${cert.id}`}
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 relative z-10">
              <div className="relative">
                 <div className="absolute inset-0 blur-xl bg-mech-cyan/20 rounded-full animate-pulse" />
                 <ShieldCheck className="w-12 h-12 text-mech-cyan relative z-10" />
              </div>

              <div className="space-y-2">
                <span className="font-orbitron text-[10px] text-mech-cyan/60 uppercase tracking-[0.4em]">Verification Dossier</span>
                <h4 className="font-orbitron font-bold text-mech-white uppercase tracking-widest text-lg">Valid_Credential</h4>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-mech-cyan/40 to-transparent" />

              <div className={styles.dossierGrid}>
                <div className="space-y-2">
                  <div className={styles.readoutLine}>ID_STRING</div>
                  <div className="text-white bg-mech-base/60 py-2 px-3 rounded border border-white/5 text-[11px] font-mono break-all">{cert.credentialId || "AUTH_LOCK_REQUIRED"}</div>
                </div>

                <div className="space-y-2">
                  <div className={styles.readoutLine}>TEMPORAL_STAMP</div>
                  <div className="text-white text-[12px] font-mono">{cert.date}</div>
                </div>
              </div>

              <p className="font-inter text-[13px] text-mech-silver/80 leading-relaxed italic max-w-[280px]">
                "{cert.description}"
              </p>
            </div>

            <a 
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-4 bg-mech-cyan/25 hover:bg-mech-cyan/50 border border-mech-cyan/50 hover:border-mech-cyan text-mech-cyan hover:text-white font-orbitron text-[11px] tracking-[0.4em] flex items-center justify-center gap-4 transition-all uppercase rounded group/btn shadow-[0_0_20px_rgba(0,245,255,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              UP-LINK TO SOURCE
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
            
            <div className="mt-4 flex justify-center">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="text-[9px] font-orbitron text-mech-silver/40 hover:text-mech-cyan flex items-center gap-2 transition-colors uppercase tracking-widest"
              >
                <RotateCcw className="w-3 h-3" /> Restore_View
              </button>
            </div>
          </MechPanel>
        </div>
      </motion.div>
    </div>
  );
};
