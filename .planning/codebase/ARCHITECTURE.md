# System Architecture

## Technical Stack
- **Frontend**: Next.js 16.1.6 (App Router), React 19, TypeScript 5.
- **Styling**: Tailwind CSS 3 + CSS Modules (Hardened for build purity). No global style pollution.
- **Animation Engine**: GSAP 3.14.2 (ScrollTrigger) + Framer Motion 12. See Animation Ownership section.
- **3D Layer**: Three.js 0.183 + @react-three/fiber 9. SSR-disabled, dynamic-imported.
- **Backend**: Supabase (Auth, PostgreSQL, pgvector, Edge Functions).
- **Deployment**: Vercel (Static Export + Edge Functions).
- **Hardening**: `suppressHydrationWarning` on root `<html>` to silence browser extension interference.

## Core Architecture Patterns

### Navigation Mode
- Global sticky `<Navbar>` with active route highlighting (segment-aware via `usePathname`).
- `PageLoadingBar` for cross-route transitions.

### Visual Foundation — 6-Theme CSS Variable System
```css
/* Cyber (Default — IMMUTABLE) */
--neon:   #00F5FF;  --neon2:  #BF5FFF;
--bg:     #070C1A;  --bg2:    #0D1425;
--glass:  rgba(0,245,255,0.04);
--glass2: rgba(13,20,37,0.85);
--border: rgba(0,245,255,0.15);
--text:   #C8D8E8;  --dim:    #5A7A9A;

/* Theme overrides applied via data-theme="arctic|inferno|ghost|bio|void" on <html> */
```
- Theme toggled by `ThemeContext`. Persisted in `localStorage` (`na-theme`).
- Inline `<script>` in `<head>` reads `localStorage` on paint to prevent FOUC.

### Home Page Orchestration — Wave-Based Cinematic Architecture
**Phase 11 design pattern**: 10 sections ordered by descending `z-index` (100→10), creating a layered depth effect during GSAP ScrollTrigger pinning.

```
Wave 1: BackgroundSystem    z-[10]  — Static star + grid canvas
Wave 2: HeroSection         z-[100] — Full WebGL + GSAP entry timeline
Wave 3: Content Strip       z-[90]  → z-[40]  — Progressive reveal sections
Wave 4: ContactSection      z-[30]  — Multi-step form wizard
Wave 5: TerminalCLI         z-[20]  — Interactive CLI final node
```

GSAP lifecycle: All animations managed via `gsap.context(fn, ref)` for React safety + `ctx.revert()` on unmount.

### Data Architecture — Content Ledger Strategy
All site content is decoupled from UI components via a centralized JSON/TS ledger in `src/data/`:
- `stats.ts` → Hero strip numbers (10+ Projects, 2+ Years, 12+ Hackathons)
- `services.ts` → Service cards with pricing (single source of truth)
- `themes.ts` → Theme palette definitions
- `availability.ts` → Live availability badge state
- `testimonials.ts` → Marquee testimonial data
- `about.json` → Bio, education, experience timelines
- `skills.ts` / `skills.json` → Constellation node data
- `certificates.json` → Credential flip-card wall
- `now.json` → Now page content
- `uses.json` → Uses/Stack page items

### Global Component Layer (layout.tsx)
```
ThemeProvider → RoleProvider → div[fonts]
  ├── Cursor                     (custom pointer)
  ├── ScrollProgress             (top progress bar)
  ├── BackgroundSystem           (star + grid canvas)
  ├── BootSequence               (first-visit animation)
  │   ├── PageLoadingBar
  │   ├── Navbar
  │   ├── main {children}
  │   └── Footer
  ├── RoleBadge                  (floating role indicator)
  └── ThemeHUD                   (floating theme switcher)
```

## Animation Ownership Matrix
| Use Case | Tool | Justification |
|----------|------|---------------|
| Scroll-driven cinematic home | GSAP ScrollTrigger | Multi-element, scroll-position dependent |
| Element entry timelines | GSAP timeline | 3+ component choreography |
| Component-level reveals | Framer Motion | Single component scope |
| Hover states | Framer Motion | Gesture-based micro-interactions |
| Modal transitions | Framer Motion | Layout-bound transitions |
| 3D WebGL scene | Three.js + r3f | GPU-rendered canvas layer |
| Page navigation | Framer Motion | `template.tsx` AnimatePresence |
| **Rule** | If animation spans 3+ components OR depends on scroll position → GSAP. | |

## Performance & Accessibility Budget
- **Lighthouse Target**: Core Web Vitals ≥90 all pages; ≥75 for WebGL-heavy home.
- **Reduced Motion**: All GSAP-driven animations check `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- **Hydration**: Interactive components isolated with `"use client"`. Server-only: pages default to RSC.
- **Dynamic Import**: `AICore`, `ThreeScene`, GSAP-heavy components use `next/dynamic` with `ssr: false`.
- **CSS Variables**: Entire theming system uses native CSS custom properties — zero JS runtime overhead.

## API Routes (Active)
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | POST | Multi-step form → Supabase `contact_submissions` table |

## Supabase Integration
- **Project ID**: `snyvarunuobcpfadkpmc`
- **Active**: PostgreSQL, Auth, Edge Functions, pgvector
- **Tables**: `contact_submissions` (Phase 11)
- **Planned**: `analytics`, `purchases`, `subscribers`, `embeddings` (Phase 17–19)

## Security Posture
- `rel="noopener noreferrer"` on all external links.
- No API keys in client-side code.
- Supabase RLS policies on all tables.
- Contact form: server-side validation before insert.
- `suppressHydrationWarning` scoped to `<html>` — does not suppress app-level warnings.
