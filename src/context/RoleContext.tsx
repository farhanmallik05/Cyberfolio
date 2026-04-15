// src/context/RoleContext.tsx
'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { SkillCategory, SECTOR_CONFIG } from '@/data/skills'

// Role = 'all' + all 12 skill categories
export type Role = 'all' | SkillCategory

export const ROLE_META: Record<Role, { label: string; color: string; symbol: string; bio: string; resumeUrl: string }> = {
  all: { 
    label: 'All', 
    color: 'var(--text-dim)', 
    symbol: '◈',
    bio: "Building at the intersection of software development, UI/UX design, automation, and digital product creation. Engineering intelligent systems and high-performance solutions — always learning, always building, always improving.",
    resumeUrl: '/resume.pdf'
  },
  // Generate entries from SECTOR_CONFIG
  ...Object.fromEntries(
    (Object.entries(SECTOR_CONFIG) as [SkillCategory, typeof SECTOR_CONFIG.frontend][]).map(([key, cfg]) => [
      key,
      {
        label: cfg.label,
        color: cfg.color,
        symbol: cfg.icon,
        bio: cfg.description,
        resumeUrl: '/resume.pdf',
      },
    ])
  ) as Record<SkillCategory, { label: string; color: string; symbol: string; bio: string; resumeUrl: string }>,
}

const ALL_ROLES = ['all', ...Object.keys(SECTOR_CONFIG)] as Role[]

interface RoleContextValue {
  activeRole: Role
  setRole: (r: Role) => void
}

const RoleContext = createContext<RoleContextValue | null>(null)

const STORAGE_KEY = 'portfolio-active-role'

function isValidRole(v: string | null): v is Role {
  return ALL_ROLES.includes(v as Role)
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<Role>('all')

  // Read initial role: URL param → localStorage → default 'all'
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlRole = params.get('role')
    if (isValidRole(urlRole)) {
      setActiveRole(urlRole)
      return
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isValidRole(stored)) {
      setActiveRole(stored)
    }
  }, [])

  const setRole = useCallback((role: Role) => {
    setActiveRole(role)
    localStorage.setItem(STORAGE_KEY, role)

    // Sync URL param without triggering navigation
    const url = new URL(window.location.href)
    if (role === 'all') {
      url.searchParams.delete('role')
    } else {
      url.searchParams.set('role', role)
    }
    window.history.replaceState({}, '', url.toString())
  }, [])

  return (
    <RoleContext.Provider value={{ activeRole, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used inside <RoleProvider>')
  return ctx
}
