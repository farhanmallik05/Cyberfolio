# Codebase Quality & Technology Scan

*Scan last updated: 2026-04-12 (Phase 11 Hardening — Verified)*

---

## [TECH] Stack Overview
- **Core**: Next.js 16.1.6 (Turbopack, App Router)
- **Runtime**: Node.js 20+
- **Styling**: Tailwind CSS 3 + Custom CSS Variables (6-Theme System)
- **Logic**: TypeScript 5 (Strict Mode — No `any` types)
- **Animations**: GSAP 3.14.2 (ScrollTrigger), Framer Motion 12
- **Icons**: Lucide React 0.575 (Centralized Registry `src/lib/icons.ts`)
- **Backend**: Supabase (Project ID: `snyvarunuobcpfadkpmc`) — Active & Integrated
- **Data Fetching**: GitHub API (Live) + Static JSON Ledger (`src/data/*.json`)
- **3D**: Three.js 0.183 + @react-three/fiber 9 (Dynamic-imported, SSR-disabled)

---

## [QUALITY] Current Build Status
- **Build**: ✅ PASSING — Exit Code 0 (Verified 2026-04-12, Turbopack)
- **Linting**: ✅ PASSING — Dynamic CSS variable `style` props have localized ESLint suppressions
- **Type Density**: High. TypeScript strict mode enforced. No `any` types in production components.
- **Performance**: Static-first. Heavy components (Three.js, GSAP, AICore) are dynamically imported.
- **SEO**: Per-page metadata in `layout.tsx`. OpenGraph + keywords configured. Missing: OG image generator (Phase 13) and JSON-LD breadcrumbs.
- **Browser Compat**: `color-mix()` uses have RGBA/hex fallbacks for Chrome < 111. `backdrop-filter` uses `-webkit-` prefix.
- **Accessibility**: `aria-label`, `role`, `rel="noopener noreferrer"` verified on all external links. Certificate cards keyboard-navigable.

---

## [CONCERNS] Remaining Deficits
1. **Resume PDF Missing**: Hero "Download Resume" CTA points to `/public/farhan-mallik-resume.pdf` — file not yet uploaded.
2. **Blog MDX**: Phase 13 dependency — `/content/blog/` directory not yet created.
3. **Spotify OAuth**: SEED-009 blocked pending OAuth token setup.
4. **GSAP Overhead**: Wave-based Home page uses dense ScrollTrigger pinning. Potential layout thrashing if many sub-components trigger simultaneous repaints. Monitoring `gsap.ticker`.
5. **OG Image Generator**: No dynamic OG images yet — all pages share the same static OG config.

---

## [ARCH] Component Topology
```
src/
├── app/                    # App Router routes (14 active routes)
│   ├── page.tsx            # Cinematic Home (Phase 11)
│   ├── about/              # Full about page
│   ├── projects/           # GitHub-powered projects index
│   ├── blog/               # Blog index (Phase 13 pending)
│   ├── skills/             # Skill constellation viewer
│   ├── services/           # Services preview
│   ├── certificates/       # 3D flip-card credential wall
│   ├── social/             # Social hub
│   ├── now/                # Now page
│   ├── uses/               # Uses/Stack page
│   ├── contact/            # Contact page
│   ├── marketplace/        # Store placeholder
│   └── api/contact/        # Supabase contact form endpoint
├── components/             # Functional UI modules
│   ├── home/               # 22 Cinematic UI components (Phase 11)
│   │   ├── HeroSection     # GSAP timeline hero with AICore background
│   │   ├── HomeLoader      # Boot sequence (sessionStorage gate)
│   │   ├── AboutPreview    # 2-line bio + badges
│   │   ├── SkillsPreview   # Teaser for constellation
│   │   ├── ProjectsPreview # Featured 3 projects strip
│   │   ├── ServicesPreview # Service cards with "Starting From" pricing
│   │   ├── TestimonialsStrip # Reuses TestimonialMarquee
│   │   ├── BlogPreview     # 3 placeholder cards (Phase 13 pending)
│   │   ├── ContactSection  # Multi-step wizard → Supabase
│   │   ├── MatrixRain      # Easter egg (Shift+M canvas overlay)
│   │   └── GSAPRegistrar   # Registers GSAP plugins client-side
│   ├── skills/             # Skill constellation visualization
│   ├── ui/                 # Atomic design: MechPanel, TerminalCLI, Cursor, etc.
│   ├── Navbar.tsx          # Global sticky nav
│   ├── Footer.tsx          # Global footer (IST clock, dynamic year)
│   ├── ThemeHUD.tsx        # Floating theme switcher
│   ├── RoleBadge.tsx       # Role indicator badge
│   ├── BackgroundSystem.tsx # Stars + blueprint grid
│   ├── AICore.tsx          # Three.js WebGL background object
│   └── TestimonialMarquee.tsx # Infinite scrolling marquee
├── context/
│   ├── ThemeContext.tsx    # 6-theme global state
│   └── RoleContext.tsx     # Role switching state
├── data/                   # Static content ledger (JSON + TS)
└── lib/                    # Shared utilities (icon registry, API clients)
```
