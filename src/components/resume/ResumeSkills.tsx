'use client'

import { motion } from 'framer-motion'
import { Role } from '@/context/RoleContext'
import { ResumeSkillGroup } from '@/data/resume'

interface Props {
  skillGroups: ResumeSkillGroup[];
  activeRole: Role;
}

export default function ResumeSkills({ skillGroups, activeRole }: Props) {
  // Simple filtering logic: show if activeRole is 'all' OR if the skill has a tag matching the active role
  const filterSkills = (skills: ResumeSkillGroup['skills']) => {
    if (activeRole === 'all') return skills;
    return skills.filter(s => 
      s.tags.some(tag => tag.toLowerCase().includes(activeRole.toLowerCase())) ||
      s.tags.includes('core') // Always show core skills if tagged
    );
  };

  const filteredGroups = skillGroups.map(group => ({
    ...group,
    skills: filterSkills(group.skills)
  })).filter(group => group.skills.length > 0);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-orbitron text-xl text-mech-cyan tracking-widest uppercase">
          Skill Matrix
        </h2>
        <div className="flex-1 h-px bg-mech-cyan/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group, gIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gIdx * 0.1 }}
            className="p-5 bg-mech-panel/40 border border-mech-cyan/10 rounded-lg backdrop-blur-md relative overflow-hidden group hover:border-mech-cyan/30 transition-colors"
          >
            {/* Header */}
            <h3 className="font-orbitron text-[10px] text-mech-silver/40 tracking-[0.2em] uppercase mb-4">
              {group.category}
            </h3>

            <div className="space-y-4">
              {group.skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <span className="font-share-mono text-xs text-mech-white tracking-wider">
                      {skill.name}
                    </span>
                    <span className="font-share-mono text-[9px] text-mech-cyan/60 italic">
                      {skill.proficiency}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1 bg-mech-base rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-mech-cyan/40 to-mech-cyan shadow-[0_0_8px_rgba(0,245,255,0.3)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Matrix Decoration */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.03] pointer-events-none">
              <div className="grid grid-cols-2 gap-1 w-full h-full">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-mech-cyan" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
