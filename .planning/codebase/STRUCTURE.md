# System Structure

Visualizing the system hierarchy and module ownership.

## Core Hierarchy
```text
Portfolio/
├── .planning/              # GSD Blueprint & persistent state
│   ├── codebase/           # Current system mapping (THIS)
│   ├── phases/             # Per-phase PLAN.md files
│   ├── seeds/              # Future feature seeds
│   ├── intel/              # Codebase intelligence snapshots
│   ├── reports/            # Session reports
│   ├── STATE.md            # Real-time project health
│   ├── ROADMAP.md          # Future operational phases
│   ├── ARCHITECTURE.md     # Full site design + system map
│   ├── PROJECT.md          # Identity, stack, social, content
│   └── REQUIREMENTS.md     # FR/NFR verification log
├── public/                 # Static assets (favicon, fonts, images)
└── src/
    ├── app/                # App Router route segments (14 active)
    │   ├── page.tsx        # Home (Cinematic — Phase 11)
    │   ├── about/
    │   ├── projects/
    │   ├── blog/
    │   ├── skills/
    │   ├── services/
    │   ├── certificates/
    │   ├── social/
    │   ├── now/
    │   ├── uses/
    │   ├── contact/
    │   ├── marketplace/
    │   └── api/contact/    # Supabase edge function proxy
    ├── components/         # Functional UI modules
    │   ├── home/           # 22 Cinematic UI components (Phase 11)
    │   ├── ui/             # Atomic design system primitives
    │   ├── skills/         # Skill constellation visualizations
    │   └── [shared]        # Navbar, Footer, ThemeHUD, RoleBadge, etc.
    ├── context/            # React Contexts (ThemeContext, RoleContext)
    ├── data/               # Content Ledger
    │   ├── *.json          # Static content (about, skills, certs, now, uses)
    │   └── *.ts            # Typed data (stats, services, themes, availability)
    ├── lib/                # Shared utilities & constants
    │   ├── icons.ts        # Mandatory Lucide icon registry
    │   └── supabase.ts     # Supabase client instance
    ├── utils/              # Helper functions
    └── styles/             # Global visual tokens (globals.css, tailwind config)
```

## Module Definitions
- **`/src/data/`**: Explicit source of truth for all displayed text, lists, credentials, and content. Never hardcode content in components.
- **`/src/components/ui/`**: Pure atomic components with no side-effects (`MechPanel`, `MechButton`, `TerminalCLI`, `GlitchText`, `Cursor`, `ScrollProgress`).
- **`/src/components/home/`**: All 22 Phase 11 cinematic components. Each is self-contained with its own CSS Module. Ordered by z-index (100 → 10) to create the wave-based scroll layering effect.
- **`/src/lib/icons.ts`**: The mandatory registry for all Lucide symbols used across the platform. Never import Lucide icons directly in components — always go through this registry.
- **`/src/app/`**: Orchestration layer that binds data to components. Each route segment handles its own data fetching and metadata generation.
- **`/src/context/`**: Two global React Contexts. `ThemeContext` manages the 6-theme system. `RoleContext` manages the Resume Role Customizer.

## Z-Index Architecture (Home Page Wave System)
```
z-[100]  HeroSection         ← Topmost, full viewport WebGL background
z-[90]   AboutPreview
z-[80]   SkillsPreview
z-[70]   ProjectsPreview
z-[60]   ServicesPreview
z-[50]   TestimonialsStrip
z-[40]   BlogPreview
z-[30]   ContactSection
z-[20]   TerminalCLI
z-[10]   BackgroundSystem    ← Bottommost, static background
```

## Route Map (Live Routes)
```
/ (Home)            /about          /projects
/blog               /skills         /services
/certificates       /social         /now
/uses               /contact        /marketplace
/api/contact        /_not-found
```
