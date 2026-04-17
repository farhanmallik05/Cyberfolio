'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Download } from 'lucide-react'
import { ResumeIdentity } from '@/data/resume'

interface Props {
  identity: ResumeIdentity;
  activeRoleLabel: string;
  downloadButton?: React.ReactNode;
}

export default function ResumeHeader({ identity, activeRoleLabel, downloadButton }: Props) {
  return (
    <div className="relative mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
      {/* Photo / ID Badge */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative group p-1 border border-mech-cyan/20 bg-mech-panel rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.05)]"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 bg-mech-base rounded-md overflow-hidden relative">
          <img 
            src={identity.photo} 
            alt={identity.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-mech-cyan/10 group-hover:opacity-0 transition-opacity" />
          
          {/* Scanning Line Animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-mech-cyan/40 shadow-[0_0_10px_rgba(0,245,255,0.5)] animate-scan-line pointer-events-none" />
        </div>
        
        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-mech-cyan" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-mech-cyan" />
      </motion.div>

      {/* Info */}
      <div className="flex-1 space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <span className="font-share-mono text-xs tracking-[0.3em] text-mech-cyan uppercase mb-1 block">
            Subject ID: FM_05 // OS_CORE
          </span>
          <h1 className="font-orbitron text-3xl md:text-5xl font-bold tracking-tighter text-mech-white mb-2">
            {identity.name.toUpperCase()}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-mech-neon2" />
            <span className="font-orbitron text-sm md:text-lg text-mech-neon2 tracking-widest uppercase">
              {activeRoleLabel}
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2"
        >
          <ContactItem icon={Mail} text={identity.email} href={`mailto:${identity.email}`} />
          <ContactItem icon={MapPin} text={identity.location} />
          <ContactItem icon={Linkedin} text="LinkedIn / farhanmallik" href={identity.linkedin} />
          <ContactItem icon={Github} text="GitHub / farhanmallik05" href={identity.github} />
        </motion.div>
      </div>

      {/* Download CTA - Hidden during print */}
      <div className="print:hidden">
        {downloadButton}
      </div>
    </div>
  )
}

function ContactItem({ icon: Icon, text, href }: { icon: any, text: string, href?: string }) {
  const content = (
    <div className="flex items-center gap-2 text-mech-silver/60 hover:text-mech-white transition-colors">
      <Icon className="w-3.5 h-3.5 text-mech-cyan/50" />
      <span className="font-share-mono text-[10px] md:text-xs">{text}</span>
    </div>
  )

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  return content
}
