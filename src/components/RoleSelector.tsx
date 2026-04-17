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
      
      <div className="relative flex flex-wrap md:flex-nowrap items-center bg-mech-base/40 border border-mech-cyan/10 p-1 rounded-lg backdrop-blur-md overflow-x-auto no-scrollbar">
        {roles.map((role, idx) => {
          const meta = ROLE_META[role]
          const isActive = activeRole === role
          
          return (
            <button
              key={role}
              onClick={() => setRole(role)}
              className={`relative flex-1 min-w-[120px] px-6 py-2.5 transition-all duration-500 z-10 ${
                isActive ? 'text-mech-white' : 'text-mech-silver/40 hover:text-mech-silver'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className={`font-orbitron font-bold text-[10px] tracking-widest uppercase transition-colors`}>
                  {meta.label}
                </span>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeRoleTab"
                  className="absolute inset-0 bg-mech-cyan/10 border border-mech-cyan/30 rounded-md shadow-[0_0_20px_rgba(0,245,255,0.1)]"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                >
                    <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-mech-cyan" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-mech-cyan" />
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
