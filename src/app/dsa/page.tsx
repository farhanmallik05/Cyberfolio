'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import CodolioCard from '@/components/shared/CodolioCard'

export default function DsaArenaPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Page Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-3 bg-mech-cyan/10 border border-mech-cyan/20 rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.1)]">
              <Activity className="w-6 h-6 text-mech-cyan" />
            </div>
            <div className="text-left">
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
            className="font-rajdhani text-lg text-mech-silver/60 max-w-2xl leading-relaxed text-center"
          >
            Real-time synchronization of problem-solving metrics and algorithmic performance vectors. 
            Tracking complexity resolution across global competitive networks.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <CodolioCard />
        </motion.div>

      </div>
    </main>
  )
}
