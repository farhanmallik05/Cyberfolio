# Codebase Intelligence: Technology Stack & Quality

## [TECH] Stack Overview
- **Core**: Next.js 16.1.6 (Turbopack)
- **Runtime**: Node.js
- **Styling**: Tailwind CSS + Custom CSS Variables (Cyber Theme)
- **Logic**: TypeScript (Strict Mode)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase (Project ID: snyvarunuobcpfadkpmc) — Readiness: Infrastructure Plan Complete.
- **Data Fetching**: GitHub API (Live) + Static JSON (Monthly Heartbeat)

## [QUALITY] Current Status
- **Build**: 🔴 FAILED (Type mismatch in `src/app/social/page.tsx`)
- **Linting**: 🔴 PENDING (Likely unused icons and type 'any' usage in experimental components)
- **Type Density**: High, but recent autonomous components introduced `any` and string-to-union casting issues.
- **Performance**: High (Static-first rendering with dynamic data fetch).
- **SEO**: Basic implementation. Page-specific metadata missing for /social, /now, /uses.

## [CONCERNS] Critical Deficits
1. **Type Mismatch**: `SocialLink` category expects `"primary" | "support"` but receives `string`.
2. **Icon Typing**: Several components use `icon: any` instead of `LucideIcon` type.
3. **Accessibility**: Interactive `MechPanel` cards lack `role="link"` or `aria-label` definitions in some areas.
4. **Missing Content**: LinkedIn data (Phase 3) is still blocked, leaving placeholders in the About timeline.

## [ARCH] Component Topology
- `src/app/`: App router routes.
- `src/components/ui/`: Atomic design system components (`MechPanel`, `TerminalCLI`).
- `src/lib/`: Shared logic (API clients, command registries).
- `src/data/`: Static monthly heartbeat data.

---
*Scan generated dynamically via FM_OS :: SCAN_MOD v1.0*
