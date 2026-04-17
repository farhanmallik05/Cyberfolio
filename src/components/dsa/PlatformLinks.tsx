'use client'

import { motion } from 'framer-motion'
import { Platform } from '@/data/dsa'
import { Code2, ExternalLink, Award } from 'lucide-react'

interface TagsProps {
  tags: string[];
}

export function LanguageTags({ tags }: TagsProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="font-orbitron font-bold text-sm tracking-[0.2em] text-mech-white uppercase">
          Technology Distribution
        </h3>
        <div className="flex-1 h-px bg-mech-cyan/10" />
      </div>
      
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="px-4 py-2 border border-mech-cyan/20 bg-mech-cyan/5 rounded-md hover:border-mech-cyan/60 transition-all flex items-center gap-3 group"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-mech-cyan/40 group-hover:bg-mech-cyan transition-colors" />
            <span className="font-share-mono text-[10px] md:text-sm text-mech-silver group-hover:text-mech-white tracking-widest leading-none translate-y-[1px]">
              #{tag}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

interface LinksProps {
  platforms: Platform[];
}

export function PlatformLinks({ platforms }: LinksProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h3 className="font-orbitron font-bold text-sm tracking-[0.2em] text-mech-white uppercase">
          Access Vectors
        </h3>
        <div className="flex-1 h-px bg-mech-cyan/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((platform, idx) => (
          <motion.a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-5 bg-mech-panel/10 border border-mech-cyan/5 rounded-lg hover:border-mech-cyan/40 hover:bg-mech-panel/40 transition-all group flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div 
                  className="p-2 rounded border border-opacity-20"
                  style={{ borderColor: platform.color, backgroundColor: `${platform.color}0D` }}
                >
                  <Code2 className="w-4 h-4" style={{ color: platform.color }} />
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-mech-silver/20 group-hover:text-mech-cyan transition-colors" />
              </div>
              
              <h4 className="font-orbitron text-xs text-mech-white tracking-tighter uppercase mb-1">
                {platform.name}
              </h4>
              <p className="font-share-mono text-[10px] text-mech-silver/40">
                @{platform.handle}
              </p>
            </div>
            
            <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-share-mono text-[9px] text-mech-cyan uppercase tracking-tighter">Enter Protocol</span>
              <div className="h-px flex-1 bg-mech-cyan/30" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
