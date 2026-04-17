'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import { Role } from '@/context/RoleContext'
import { ResumeProject } from '@/data/resume'

interface Props {
  projects: ResumeProject[];
  activeRole: Role;
}

export default function ResumeProjectsList({ projects, activeRole }: Props) {
  const filteredProjects = projects.filter(p => {
    if (activeRole === 'all') return true;
    return p.tags.some(tag => tag.toLowerCase().includes(activeRole.toLowerCase()));
  });

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-orbitron text-xl text-mech-cyan tracking-widest uppercase">
          Neural Forge Output
        </h2>
        <div className="flex-1 h-px bg-mech-cyan/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj, idx) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-mech-panel/20 border border-mech-cyan/10 rounded-lg group hover:border-mech-cyan/40 transition-all flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-mech-cyan/5 border border-mech-cyan/20 rounded">
                <Code2 className="w-5 h-5 text-mech-cyan" />
              </div>
              <div className="flex gap-3 print:hidden">
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-mech-silver/40 hover:text-mech-cyan" aria-label={`${proj.name} GitHub repository`}>
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-mech-silver/40 hover:text-mech-cyan" aria-label={`${proj.name} live demo`}>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-orbitron text-lg text-mech-white mb-1 group-hover:text-mech-cyan transition-colors line-clamp-1">
                {proj.name}
              </h3>
              <p className="font-share-mono text-[10px] text-mech-cyan/60 uppercase tracking-wider mb-4">
                {proj.tagline}
              </p>
              
              <ul className="space-y-2 mb-6">
                {proj.outcomes.map((outcome, oIdx) => (
                  <li key={oIdx} className="text-xs text-mech-silver/80 font-rajdhani flex gap-2">
                    <span className="text-mech-cyan/50 shrink-0">›</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-mech-cyan/5">
              {proj.tech.map(t => (
                <span key={t} className="px-2 py-0.5 bg-mech-base text-[9px] font-share-mono text-mech-silver/50 rounded uppercase tracking-tighter">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
