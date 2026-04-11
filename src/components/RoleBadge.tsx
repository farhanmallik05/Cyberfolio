'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRole, ROLE_META, Role } from '@/context/RoleContext'
import { ChevronUp, X } from 'lucide-react'
import styles from './RoleBadge.module.css'

export function RoleBadge() {
  const { activeRole, setRole } = useRole()
  const [isOpen, setIsOpen] = useState(false)
  const meta = ROLE_META[activeRole]
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[100] ${styles.badgeContainer}`}
      ref={containerRef}
      data-active-role={activeRole}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
            className={`absolute bottom-16 right-0 mb-2 w-64 bg-mech-navy/90 backdrop-blur-xl border rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50 ${styles.popover}`}
          >
            <div className="p-4 border-b border-mech-silver/10 bg-mech-base/50 flex justify-between items-center">
              <span className="font-orbitron text-xs font-bold tracking-widest text-mech-silver uppercase">Viewport Priority</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-mech-silver hover:text-mech-white transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="p-2 space-y-1">
              {(Object.entries(ROLE_META) as [Role, typeof meta][]).map(([role, roleMeta]) => (
                <button
                  key={role}
                  onClick={() => {
                    setRole(role)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all group relative overflow-hidden ${
                    activeRole === role 
                    ? `bg-mech-cyan/10 border border-mech-cyan/20 ${styles.roleItemActive}` 
                    : 'hover:bg-mech-white/5 border border-transparent'
                  } ${styles.roleItem}`}
                  data-item-role={role}
                >
                  <span className={`font-orbitron text-lg group-hover:scale-110 transition-transform ${styles.roleSymbol}`}>
                    {roleMeta.symbol}
                  </span>
                  <div className="flex flex-col items-start leading-tight">
                    <span className={`font-orbitron text-xs font-bold tracking-wider uppercase ${
                      activeRole === role ? 'text-mech-white' : 'text-mech-silver'
                    }`}>
                      {roleMeta.label}
                    </span>
                    <span className="text-[10px] text-mech-silver/60 font-inter">
                      {role === 'all' ? 'Standard Profile' : `Optimized for ${roleMeta.label}`}
                    </span>
                  </div>
                  
                  {activeRole === role && (
                    <motion.div 
                      layoutId="active-indicator"
                      className={`absolute left-0 w-1 h-6 ${styles.activeIndicator}`}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="bg-mech-base/30 px-4 py-2 text-[10px] font-mono text-mech-silver/40 lowercase border-t border-mech-silver/5">
              Protocol v8.0 :: {meta.label.toLowerCase()}_active
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2.5 bg-mech-navy/80 backdrop-blur-md border rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all group ${
          styles.triggerButton
        } ${isOpen ? styles.triggerButtonOpen : ''}`}
      >
        <div className={`w-2 h-2 rounded-full animate-pulse ${styles.statusIndicator}`} />
        <span className="font-orbitron font-bold text-xs tracking-[0.2em] uppercase text-mech-white">
          {activeRole === 'all' ? 'Synchronizing' : meta.label}
        </span>
        <ChevronUp 
          size={14} 
          className={`text-mech-silver transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>
    </div>
  )
}
