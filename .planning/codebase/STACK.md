# Tech Stack Alpha

Evaluating core technological dependencies and module versions.

## Base Framework
- **Next.js 16.1.6**: Leveraging App Router and Turbopack for high-performance development and static generation.
- **React 19.2.4**: Concurrent features and improved hydration safety.
- **Node.js 20+**: Runtime environment for building and deployment.
- **TypeScript 5**: Strict mode enforced. No `any` types — all models defined locally or in `src/types/`.

## Neural Interface (UI/UX)
- **Tailwind CSS 3.4**: Utility-first for layout and rapid composition.
- **CSS Modules**: Isolated styling for complex visual glitches, background grids, and hardware-acceleration required effects. Mandatory for all complex visual components.
- **GSAP 3.14.2**: Primary animation engine. Used for scroll-driven cinematic sequences (`ScrollTrigger`), multi-element timelines, and WebGL/Three.js coordination.
- **Framer Motion 12**: Component-level entry animations, hover states, micro-interactions, and modal transitions.
- **Three.js 0.183 + @react-three/fiber 9**: WebGL background (AICore neural object). Dynamic-imported, no SSR.
- **Lucide React 0.575**: Primary icon engine. Centralized in `src/lib/icons.ts`.

## Fonts (`src/app/layout.tsx`, Next Font)
- **Orbitron** (400, 500, 700, 900): All headings and UI labels
- **Inter**: Body text
- **Share Tech Mono** (external): UI label / terminal text elements

## Data & Persistence
- **JSON Content Ledger**: Centralized in `src/data/` (`about.json`, `certificates.json`, `skills.json`, `now.json`, `uses.json`)
- **TypeScript Modules**: `src/data/*.ts` for typed content (stats, services, testimonials, themes, availability)
- **GitHub API**: Live repository data for the `/projects` page
- **Supabase**: Backend infrastructure — Project ID: `snyvarunuobcpfadkpmc`
  - PostgreSQL database
  - Auth (planned Phase 20 admin)
  - Edge Functions
  - pgvector (for AI Chat knowledge base — Phase 19)
  - Realtime
- **Contact API**: `/api/contact` edge route → Supabase insert

## State Management
- **ThemeContext** (`src/context/ThemeContext.tsx`): Global theme state. Persisted in `localStorage` as `na-theme`. Default: `cyber`.
- **RoleContext** (`src/context/RoleContext.tsx`): Active resume role (Frontend/AI/Automation). Drives constellation sync.

## Animation Ownership Matrix
| Concern | Tool |
|---------|------|
| Scroll-driven cinematic home | GSAP ScrollTrigger |
| Multi-element timeline sequences | GSAP timeline |
| Component entry animations | Framer Motion |
| Hover states, micro-interactions | Framer Motion |
| 3D WebGL background | Three.js + r3f |
| Page transitions | Framer Motion |

## Environment Diagnostic
- **OS**: Windows (Local Dev)
- **Compiler**: Turbopack
- **Dev Server**: `npm run dev` — `localhost:3000`
- **Deployment Target**: Vercel (Static Export + Edge Functions)
- **Build Command**: `next build` (Exit Code 0 verified 2026-04-12)
