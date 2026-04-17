'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code2, ExternalLink, Trophy, Zap, Activity } from 'lucide-react'
import { dsaStats } from '@/data/dsa'

interface Props {
  className?: string;
  showLink?: boolean;
}

export default function CodolioCard({ className, showLink = true }: Props) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-5 bg-mech-panel/40 border border-mech-cyan/20 rounded-xl overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${className}`}
    >
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-mech-cyan/[0.05] via-transparent to-mech-neon2/[0.05] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-mech-base border border-mech-cyan/30 flex items-center justify-center font-orbitron text-[10px] text-mech-cyan font-bold">
            FM
          </div>
          <div>
            <h4 className="font-orbitron text-[10px] text-mech-white tracking-widest leading-none">@farhanmallik</h4>
            <span className="font-share-mono text-[8px] text-mech-silver/40 uppercase">Codolio Profile</span>
          </div>
        </div>
        <div className="p-1.5 bg-mech-cyan/5 border border-mech-cyan/20 rounded">
          <Activity className="w-3.5 h-3.5 text-mech-cyan" />
        </div>
      </div>

      {/* Codolio Official Card Image */}
      {!imgError && (
        <div className="relative z-10 mb-4 rounded-lg overflow-hidden border border-mech-cyan/10 bg-mech-base/30">
          <img 
            src="https://codolio.com/profile/farhanmallik/card" 
            alt="Codolio Stats"
            onError={() => setImgError(true)}
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mech-base/80 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Manual Stats Row (Always show if Image fails, or show as secondary) */}
      <div className={`grid grid-cols-3 gap-2 mb-4 relative z-10 transition-opacity ${imgError ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
        <StatMini label="Solved" value={dsaStats.solutionsSolved} icon={Code2} color="var(--neon)" />
        <StatMini label="Active" value={dsaStats.activeDays} icon={Zap} color="#F59E0B" />
        <StatMini label="Dev Days" value={dsaStats.totalDevDays} icon={Trophy} color="var(--neon2)" />
      </div>

      {/* Verification footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-mech-cyan/10 relative z-10">
        <div className="flex gap-1.5 opacity-40 grayscale group-hover:grayscale-0 transition-all">
           <div className="w-2.5 h-2.5 bg-mech-cyan rounded-full animate-pulse" />
           <p className="font-share-mono text-[7px] text-mech-silver/60 uppercase">Real-time Data</p>
        </div>
        {showLink && (
          <a 
            href="https://codolio.com/profile/farhanmallik" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-share-mono text-[8px] text-mech-cyan hover:text-white transition-colors uppercase tracking-widest"
          >
            View Profile
            <ExternalLink className="w-2 h-2" />
          </a>
        )}
      </div>

      {/* Animated Scan Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-mech-cyan/20 shadow-[0_0_8px_rgba(0,245,255,0.4)] animate-scan-line pointer-events-none opacity-20" />
    </motion.div>
  )
}

function StatMini({ label, value, icon: Icon, color }: { label: string, value: any, icon: any, color: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 mb-1 opacity-60">
        <Icon className="w-2.5 h-2.5" style={{ color }} />
        <span className="font-share-mono text-[7px] text-mech-silver uppercase tracking-tighter">{label}</span>
      </div>
      <div className="font-orbitron text-xs font-bold text-mech-white tracking-widest">
        {value}
      </div>
    </div>
  )
}
