'use client'

import { motion } from 'framer-motion'
import { useRole, ROLE_META, Role } from '@/context/RoleContext'
import { Terminal } from 'lucide-react'

export function RoleSelector() {
  const { activeRole, setRole } = useRole()

  const roles = Object.keys(ROLE_META) as Role[]

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2 px-1">
        <Terminal className="w-4 h-4 text-mech-cyan/60" />
        <span className="font-orbitron text-[10px] tracking-[0.2em] text-mech-silver/60 uppercase">
          Select Operation Protocol
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {roles.map((role, idx) => {
          const meta = ROLE_META[role]
          const isActive = activeRole === role
          
          return (
            <button
              key={role}
              onClick={() => setRole(role)}
              className={`relative group px-4 py-2 border transition-all duration-300 ${
                isActive 
                ? 'border-mech-cyan bg-mech-cyan/5 shadow-[0_0_15px_rgba(15,211,255,0.2)]' 
                : 'border-mech-silver/20 bg-transparent hover:border-mech-cyan/50 hover:bg-mech-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-orbitron text-[10px] ${isActive ? 'text-mech-cyan' : 'text-mech-silver/40'}`}>
                  0{idx + 1}.
                </span>
                <span className={`font-orbitron font-bold text-xs tracking-widest uppercase transition-colors ${
                  isActive ? 'text-mech-white' : 'text-mech-silver group-hover:text-mech-white'
                }`}>
                  {meta.label}
                </span>
              </div>
              
              {/* Corner Accents */}
              {isActive && (
                <>
                  <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-mech-cyan" />
                  <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-mech-cyan" />
                  <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-mech-cyan" />
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-mech-cyan" />
                </>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
