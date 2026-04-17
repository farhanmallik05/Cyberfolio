'use client'

import { motion } from 'framer-motion'
import { StreakWeek } from '@/data/dsa'

interface Props {
  data: StreakWeek[];
}

export default function StreakBar({ data }: Props) {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="mb-12 p-6 bg-mech-panel/20 border border-mech-cyan/10 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-mech-cyan" />
          <h3 className="font-orbitron font-bold text-sm tracking-[0.2em] text-mech-white uppercase">
            52-Week Velocity Data
          </h3>
        </div>
        <div className="font-share-mono text-[9px] text-mech-silver/40 uppercase tracking-widest">
          Resolution: Weekly Intervals
        </div>
      </div>

      <div className="h-32 flex items-end gap-1 px-1">
        {data.map((week, idx) => {
          const height = (week.count / maxCount) * 100;
          const isCurrent = idx === data.length - 1;

          return (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(height, 5)}%` }}
              transition={{ delay: idx * 0.01 + 0.2, duration: 0.5 }}
              className={`flex-1 rounded-t-sm relative group cursor-help transition-all duration-300 ${
                isCurrent 
                ? 'bg-mech-neon2 shadow-[0_0_10px_rgba(191,95,255,0.4)]' 
                : 'bg-mech-cyan/30 hover:bg-mech-cyan'
              }`}
            >
              {/* Tooltip (CSS only for perf) */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-mech-base border border-mech-cyan/20 rounded text-[9px] font-share-mono text-mech-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                Week {idx + 1}: {week.count} Solved
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-between mt-4 font-share-mono text-[8px] text-mech-silver/20 uppercase tracking-[0.3em]">
        <span>Q1 2025</span>
        <span>Q2 2025</span>
        <span>Q3 2025</span>
        <span>Q4 2025</span>
        <span className="text-mech-neon2">Current Vector</span>
      </div>
    </div>
  )
}
