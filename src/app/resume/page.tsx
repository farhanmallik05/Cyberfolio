'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRole, ROLE_META } from '@/context/RoleContext'
import { resumeData } from '@/data/resume'
import ResumeHeader from '@/components/resume/ResumeHeader'
import ResumeSkills from '@/components/resume/ResumeSkills'
import ResumeExperienceList from '@/components/resume/ResumeExperience'
import ResumeProjectsList from '@/components/resume/ResumeProjects'
import { ResumeEducationList, ResumeAchievementsList } from '@/components/resume/ResumeEducation'
import { RoleSelector } from '@/components/RoleSelector'
import { Terminal } from 'lucide-react'
import dynamic from 'next/dynamic'

const ResumeDownloadButton = dynamic(() => import('@/components/resume/ResumeDownloadButton'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse h-10 w-32 bg-mech-cyan/10 border border-mech-cyan/20 rounded" />
  )
})

export default function ResumePage() {
  const { activeRole } = useRole()
  const roleMeta = ROLE_META[activeRole]

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Role Selector Dashboard */}
        <div className="mb-12 p-6 bg-mech-panel/40 border border-mech-cyan/20 rounded-xl backdrop-blur-xl relative overflow-hidden group print:hidden">
          <div className="absolute inset-0 bg-mech-cyan/[0.02] group-hover:bg-mech-cyan/[0.04] transition-colors" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <Terminal className="w-5 h-5 text-mech-cyan" />
            <h2 className="font-orbitron font-bold text-sm tracking-[0.2em] text-mech-white uppercase">
              Target Profile Selection
            </h2>
          </div>
          <RoleSelector />
          
          <div className="mt-6 p-4 bg-mech-base/50 border border-mech-cyan/10 rounded-lg relative z-10">
            <p className="font-share-mono text-[10px] md:text-xs text-mech-silver/60 leading-relaxed italic">
              "System objective: Synchronizing archives for the 
              <span className="text-mech-cyan font-bold mx-1 uppercase">{roleMeta.label}</span> 
              vector. All metrics, projects, and specializations are now filtered for maximum relevance."
            </p>
          </div>
        </div>

        {/* Resume Content Wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-mech-panel/20 border border-mech-cyan/10 rounded-2xl p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mech-cyan/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mech-neon2/20 to-transparent" />
            
            <div className="relative z-10">
              {/* Header */}
              <ResumeHeader 
                identity={resumeData.identity} 
                activeRoleLabel={roleMeta.label}
                downloadButton={
                  <ResumeDownloadButton 
                    data={resumeData} 
                    activeRole={activeRole} 
                    label={roleMeta.label} 
                  />
                }
              />

              {/* Role Objective */}
              <div className="mb-12">
                <p className="font-rajdhani text-lg md:text-xl text-mech-white leading-relaxed max-w-4xl italic">
                  "{resumeData.objectives[activeRole]}"
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 gap-12">
                <ResumeSkills skillGroups={resumeData.skills} activeRole={activeRole} />
                <ResumeExperienceList experience={resumeData.experience} activeRole={activeRole} />
                <ResumeProjectsList projects={resumeData.projects} activeRole={activeRole} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <ResumeEducationList education={resumeData.education} />
                  <ResumeAchievementsList achievements={resumeData.achievements} />
                </div>
              </div>
            </div>

            {/* Matrix Watermark */}
            <div className="absolute top-20 right-[-100px] text-[15rem] font-bold text-mech-cyan/[0.02] font-orbitron pointer-events-none select-none -rotate-12 z-0">
              {roleMeta.label.split(' ')[0].toUpperCase()}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Meta */}
        <div className="mt-12 flex items-center justify-between opacity-30 px-6 font-share-mono text-[9px] uppercase tracking-[0.4em] text-mech-silver pointer-events-none">
          <span>Neural.OS v3.0.4</span>
          <span>Security Protocol Active</span>
          <span>End of Transmission</span>
        </div>
      </div>

      {/* Global CSS for Print and Scan Line */}
      <style jsx global>{`
        @keyframes scan-line {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        .animate-scan-line {
          animation: scan-line 4s linear infinite;
        }
        @media print {
          body { background: white !important; color: black !important; }
          .print\\:hidden { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; }
          .bg-mech-panel\\/20, .bg-mech-panel\\/40 { background: transparent !important; }
          .border-mech-cyan\\/10, .border-mech-cyan\\/20 { border-color: #eee !important; }
          .text-mech-white { color: #000 !important; }
          .text-mech-silver\\/60, .text-mech-silver\\/80 { color: #666 !important; }
          .text-mech-cyan, .text-mech-neon2 { color: #000 !important; font-weight: bold; }
          h1, h2, h3 { color: black !important; text-shadow: none !important; }
          .rounded-2xl { border-radius: 0 !important; border: none !important; box-shadow: none !important; }
        }
      `}</style>
    </main>
  )
}
