// src/context/RoleContext.tsx
'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type Role = 'all' | 'frontend' | 'automation' | 'ai'

export const ROLE_META: Record<Role, { label: string; color: string; symbol: string; bio: string; resumeUrl: string }> = {
  all: { 
    label: 'All', 
    color: 'var(--text-dim)', 
    symbol: '◈',
    bio: "Building at the intersection of software development, UI/UX design, automation, and digital product creation. Engineering intelligent systems and high-performance solutions — always learning, always building, always improving.",
    resumeUrl: '/resume.pdf'
  },
  frontend: { 
    label: 'Frontend', 
    color: 'var(--neon)', 
    symbol: '⬡',
    bio: "Focused on architecting pixel-perfect, high-performance interfaces and immersive user experiences. Specializing in advanced React patterns, GSAP animations, and modern frontend ecosystems.",
    resumeUrl: '/resume.pdf'
  },
  automation: { 
    label: 'Automation', 
    color: 'var(--neon2)', 
    symbol: '⟳',
    bio: "Streamlining complex operations through autonomous workflow engineering. Expert in n8n, Python-driven automation, and building self-healing system protocols to eliminate manual overhead.",
    resumeUrl: '/resume.pdf'
  },
  ai: { 
    label: 'AI', 
    color: 'var(--accent-glow)', 
    symbol: '◎',
    bio: "Engineering the next generation of intelligent systems using GenAI and Agentic architectures. Proficient in RAG, prompt engineering, and deploying autonomous AI agents to solve high-value problems.",
    resumeUrl: '/resume.pdf'
  },
}

interface RoleContextValue {
  activeRole: Role
  setRole: (r: Role) => void
}

const RoleContext = createContext<RoleContextValue | null>(null)

const STORAGE_KEY = 'portfolio-active-role'
const VALID_ROLES: Role[] = ['all', 'frontend', 'automation', 'ai']

function isValidRole(v: string | null): v is Role {
  return VALID_ROLES.includes(v as Role)
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
