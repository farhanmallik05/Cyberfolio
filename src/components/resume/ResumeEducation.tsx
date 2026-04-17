'use client'

import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { ResumeEducation } from '@/data/resume'

interface EducationProps {
  education: ResumeEducation[];
}

export function ResumeEducationList({ education }: EducationProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-orbitron text-xl text-mech-cyan tracking-widest uppercase flex items-center gap-3">
          <GraduationCap className="w-5 h-5" />
          Intellectual Loadout
        </h2>
        <div className="flex-1 h-px bg-mech-cyan/20" />
      </div>

      <div className="space-y-6">
        {education.map((edu, idx) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-5 bg-mech-panel/10 border border-mech-cyan/5 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
              <div>
                <h3 className="font-orbitron text-lg text-mech-white">{edu.degree}</h3>
                <span className="font-share-mono text-xs text-mech-cyan tracking-wider">{edu.institution}</span>
              </div>
              <div className="font-share-mono text-[10px] text-mech-silver/40 uppercase bg-mech-base px-2 py-1 rounded border border-mech-cyan/10">
                {edu.duration}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {edu.relevant_courses.map(course => (
                <span key={course} className="text-[9px] font-share-mono text-mech-silver/50 px-2 py-0.5 border border-mech-silver/10 rounded">
                  {course.toUpperCase()}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

interface AchievementsProps {
  achievements: { title: string; issuer: string; year: string; tags: string[] }[];
}

export function ResumeAchievementsList({ achievements }: AchievementsProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-orbitron text-xl text-mech-cyan tracking-widest uppercase flex items-center gap-3">
          <Award className="w-5 h-5" />
          Medals & Honors
        </h2>
        <div className="flex-1 h-px bg-mech-cyan/20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((ach, idx) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-4 border border-mech-cyan/10 bg-mech-panel/20 rounded-lg group hover:border-mech-cyan/30 transition-all"
          >
            <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-mech-cyan/20 bg-mech-cyan/5 text-mech-cyan group-hover:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-orbitron text-xs text-mech-white tracking-wide uppercase">{ach.title}</h3>
              <p className="font-share-mono text-[10px] text-mech-silver/40">{ach.issuer} • {ach.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
