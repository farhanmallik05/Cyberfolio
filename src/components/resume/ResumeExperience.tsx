'use client'

import { motion } from 'framer-motion'
import { Role } from '@/context/RoleContext'
import { ResumeExperience } from '@/data/resume'

interface Props {
  experience: ResumeExperience[];
  activeRole: Role;
}

export default function ResumeExperienceList({ experience, activeRole }: Props) {
  // Reorder or filter based on role if needed
  // In this case, we'll just show all but highlight relevant ones or provide role-adaptive sort
  const sortedExperience = [...experience].sort((a, b) => {
    if (activeRole === 'all') return 0;
    const aMatch = a.tags.some(t => t.toLowerCase().includes(activeRole.toLowerCase()));
    const bMatch = b.tags.some(t => t.toLowerCase().includes(activeRole.toLowerCase()));
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-orbitron text-xl text-mech-cyan tracking-widest uppercase">
          Operational History
        </h2>
        <div className="flex-1 h-px bg-mech-cyan/20" />
      </div>

      <div className="space-y-6">
        {sortedExperience.map((exp, idx) => {
          const isRelevant = activeRole !== 'all' && exp.tags.some(t => t.toLowerCase().includes(activeRole.toLowerCase()));
          
          return (
            <motion.div
              key={`${exp.organization}-${exp.role}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-6 bg-mech-panel/20 border ${isRelevant ? 'border-mech-neon2/30 shadow-[0_0_15px_rgba(191,95,255,0.05)]' : 'border-mech-cyan/10'} rounded-lg group transition-all`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-orbitron text-lg text-mech-white tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-share-mono text-sm text-mech-cyan">{exp.organization}</span>
                    <span className="text-mech-silver/20">•</span>
                    <span className="font-share-mono text-[10px] text-mech-silver/40 uppercase tracking-widest">{exp.location}</span>
                  </div>
                </div>
                <div className="font-share-mono text-xs text-mech-silver/60">
                  {exp.period}
                </div>
              </div>

              <ul className="space-y-2">
                {exp.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex gap-3 text-sm text-mech-silver/80 leading-relaxed font-rajdhani">
                    <span className="text-mech-cyan mt-1.5 w-1.5 h-1.5 rounded-full border border-mech-cyan/40 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Relevance Marker */}
              {isRelevant && (
                <div className="absolute top-4 right-4 print:hidden">
                  <div className="px-2 py-0.5 border border-mech-neon2/40 rounded text-[8px] font-orbitron text-mech-neon2 tracking-tighter uppercase">
                    High Relevance
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
