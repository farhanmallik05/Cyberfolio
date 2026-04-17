'use client'

import { motion } from 'framer-motion'
import { dsaStats, heatmapData, streakData, languageTags, platforms } from '@/data/dsa'
import StatCards from '@/components/dsa/StatCards'
import StreakBar from '@/components/dsa/StreakBar'
import ActivityHeatmap from '@/components/dsa/ActivityHeatmap'
import { LanguageTags, PlatformLinks } from '@/components/dsa/PlatformLinks'
import { Activity, ShieldCheck, Terminal as TerminalIcon } from 'lucide-react'
import CodolioCard from '@/components/shared/CodolioCard'

export default function DsaArenaPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-3 bg-mech-cyan/10 border border-mech-cyan/20 rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.1)]">
              <Activity className="w-6 h-6 text-mech-cyan" />
            </div>
            <div>
              <span className="font-share-mono text-[10px] tracking-[0.4em] text-mech-cyan uppercase opacity-60">
                Core Execution Engine // Segment_01
              </span>
              <h1 className="font-orbitron font-bold text-3xl md:text-5xl text-mech-white tracking-tighter uppercase">
                DSA Arena
              </h1>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-lg text-mech-silver/60 max-w-2xl leading-relaxed"
          >
            Real-time synchronization of problem-solving metrics and algorithmic performance vectors. 
            Tracking complexity resolution across global competitive networks.
          </motion.p>
          
          <div className="mt-8 max-w-sm">
            <CodolioCard />
          </div>
        </div>

        {/* Stat Pulse Row */}
        <StatCards stats={dsaStats} />

        {/* Visualization Grid */}
        <div className="grid grid-cols-1 gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Streak Bar (narrower) */}
            <div className="lg:col-span-4">
              <StreakBar data={streakData} />
            </div>
            
            {/* Right: Heatmap (wider) */}
            <div className="lg:col-span-8">
              <ActivityHeatmap data={heatmapData} lastSynced={dsaStats.lastSynced} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LanguageTags tags={languageTags} />
            <PlatformLinks platforms={platforms} />
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 bg-mech-panel/40 border border-mech-cyan/20 rounded-2xl overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-mech-cyan/[0.03] rounded-full blur-[80px] -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-mech-cyan" />
                <h2 className="font-orbitron font-bold text-lg text-mech-white tracking-widest uppercase">
                  Verified Solutions
                </h2>
              </div>
              <p className="font-rajdhani text-mech-silver/60 max-w-xl">
                All metrics are programmatically synchronized from official platform profiles.
                Verification status: <span className="text-mech-cyan font-bold italic">AUTHENTICATED_BY_CODOLIO</span>.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 bg-mech-base/50 border border-mech-cyan/10 rounded-xl text-center">
                <p className="font-share-mono text-[9px] text-mech-silver/40 uppercase mb-1">Dev Cycle Status</p>
                <p className="font-orbitron text-xs text-mech-white font-bold tracking-widest">STABLE_V3</p>
              </div>
              <div className="px-6 py-4 bg-mech-base/50 border border-mech-cyan/10 rounded-xl text-center">
                <p className="font-share-mono text-[9px] text-mech-silver/40 uppercase mb-1">Latency Layer</p>
                <p className="font-orbitron text-xs text-mech-cyan font-bold tracking-widest">0.02ms</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Page Decoration */}
        <div className="mt-12 flex items-center gap-8 opacity-20 whitespace-nowrap overflow-hidden pointer-events-none">
          <div className="font-share-mono text-[10px] tracking-[0.5em] uppercase text-mech-silver">
            SYS.RUN_ARENA --SYNC --FORCE --SILENT
          </div>
          <div className="flex-1 h-px bg-mech-silver" />
          <TerminalIcon className="w-4 h-4 text-mech-silver" />
        </div>
      </div>
    </main>
  )
}
