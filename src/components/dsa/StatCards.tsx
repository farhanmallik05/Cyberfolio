'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Calendar, Zap, Trophy } from 'lucide-react'
import { DsaStats } from '@/data/dsa'

interface Props {
  stats: DsaStats;
}

export default function StatCards({ stats }: Props) {
  const cardData = [
    {
      label: "Solutions Solved",
      value: stats.solutionsSolved,
      icon: CheckCircle2,
      color: "var(--neon)",
      desc: "Verified solutions across platforms"
    },
    {
      label: "Active Days",
      value: stats.activeDays,
      icon: Calendar,
      color: "var(--neon2)",
      desc: "Coding session consistency"
    },
    {
      label: "Current Streak",
      value: stats.currentStreak,
      icon: Zap,
      color: "#F59E0B",
      desc: "Consecutive days of problem solving"
    },
    {
      label: "Global Rank",
      value: stats.globalRank,
      icon: Trophy,
      color: "#34D399",
      desc: "Top percentile on LeetCode/GFG"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {cardData.map((card, idx) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative group p-6 bg-mech-panel/20 border border-mech-cyan/10 rounded-xl overflow-hidden hover:border-mech-cyan/30 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
          {/* Background Glow */}
          <div 
            className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"
            style={{ backgroundColor: card.color, borderRadius: '50%', filter: 'blur(30px)' }}
          />

          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div 
                className="p-2 rounded-lg border border-opacity-20"
                style={{ borderColor: card.color, backgroundColor: `${card.color}0D` }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <div className="font-share-mono text-[10px] text-mech-silver/20 tracking-tighter uppercase">
                Metric.{idx + 1}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-orbitron font-bold text-3xl text-mech-white mb-1">
                {typeof card.value === 'number' ? (
                  <CountUp value={card.value} />
                ) : (
                  card.value
                )}
              </h3>
              <p className="font-share-mono text-[10px] text-mech-cyan uppercase tracking-[0.15em] mb-2">
                {card.label}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-mech-cyan/5">
              <p className="font-rajdhani text-[10px] text-mech-silver/40 leading-tight">
                {card.desc}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function CountUp({ value }: { value: number | string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {value}
    </motion.span>
  )
}
