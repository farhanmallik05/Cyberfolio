# Requirements: Portfolio — Cumulative Verified Status

## Functional Requirements

### FR-1: Code Quality ✅
- **Status**: Verified (Phase 11.5 Hardening)
- **Details**: Zero critical lint errors. Inline CSS migrated to CSS Modules (`ContactSection.module.css`, `ThemeHUD.module.css`). Dynamic CSS variables passed via `style` prop are suppressed with localized ESLint annotations.
- **Proof**: Production build (`npm run build`) — Exit Code 0, Turbopack.

### FR-2: Bio & Social Sync ✅
- **Status**: Verified
- **Details**: Homepage subtitle and hero tagline match the brand identity. Bio synthesized from LinkedIn + GitHub.
- **Socials**: Centralized in `src/data/about.json` and `Footer.tsx`.
- **Email**: `mallikfarhan10@gmail.com`

### FR-3: LinkedIn Data Integration ✅
- **Status**: Verified
- **Details**: 15+ credentials imported. 70+ skills categorized in `src/data/skills.ts`. Education and Experience timelines populated in `src/data/about.json`.

### FR-4: GitHub Projects Integration ✅
- **Status**: Verified
- **Details**: Real-time project data fetching via GitHub API. Displays stars, forks, and primary languages on `/projects`.

### FR-5: Interactive Terminal CLI ✅
- **Status**: Verified (Phase 5 + 11 Re-integration)
- **Details**: `TerminalCLI` component embedded at the bottom of the homepage. Supports `help`, `whoami`, `projects`, `skills`, `contact`, keyboard history, `sudo hire`, and Easter egg commands.

### FR-6: Certificate & Achievement Wall ✅
- **Status**: Verified (Phase 7)
- **Details**: 3D flip-card system with categorical filtering. 15+ credentials seeded in `src/data/certificates.json`. Keyboard-accessible "Flip" button added.

### FR-7: Resume Role Customizer ✅
- **Status**: Verified (Phase 8)
- **Details**: Real-time role switching (Frontend Engineer / AI Engineer / Automation Engineer). Skill constellation syncs dynamically via `RoleContext`.

### FR-8: Multi-Theme System ✅
- **Status**: Verified (Phase 9)
- **Details**: 6 themes (Cyber, Arctic, Inferno, Ghost, Bio, Void). Persisted via `localStorage`. Inline switching with zero page reload. `ThemeHUD` component handles UI.

### FR-9: Testimonials & Social Proof ✅
- **Status**: Verified (Phase 10)
- **Details**: Infinite scrolling marquee (`TestimonialMarquee`). 4 testimonials seeded in `src/data/testimonials.ts`. `GitHubStatsBar` live API widget integrated.

### FR-10: Cinematic Home Redesign ✅
- **Status**: Verified (Phase 11)
- **Details**: Wave-based Z-index scroll system (z-100 → z-10). GSAP timeline on `HeroSection`. `HomeLoader` boot sequence with `sessionStorage` once-per-session logic. `MatrixRain` Easter egg on `Shift+M`. Multi-step `ContactSection` wizard wires to Supabase `/api/contact`.
- **Components**: `HomeLoader`, `HeroSection`, `AboutPreview`, `SkillsPreview`, `ProjectsPreview`, `ServicesPreview`, `TestimonialsStrip`, `BlogPreview`, `ContactSection`, `MatrixRain`, `GSAPRegistrar`.

---

## Non-Functional Requirements

### NFR-1: Performance ✅
- GSAP and Three.js components are dynamic-imported (`next/dynamic`, `ssr: false`).
- `AICore.tsx` lazy-loaded with no SSR.
- Lighthouse Core Web Vitals target: ≥90 (≥75 for WebGL-heavy home page).

### NFR-2: Accessibility ✅
- `aria-label` and `role` attributes on all interactive social links (`Footer.tsx`, `HomeFooter.tsx`).
- `rel="noopener noreferrer"` on all external anchor tags.
- Certificate flip cards use dedicated keyboard-focusable "Flip" buttons.
- Semantic HTML: `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` throughout.

### NFR-3: Browser Compatibility ✅
- `color-mix()` CSS declarations have RGBA/hex fallbacks for Chrome < 111.
- `backdrop-filter` includes `-webkit-` prefixes.

### NFR-4: Brand Consistency ✅
- Design Lock enforced: `--neon`, `--neon2`, `--bg`, `--bg2`, `--glass`, `--border` CSS variables.
- Cyber-mechanical aesthetic immutable. `Orbitron` / `Share Tech Mono` typography locked.
- CSS Module hardening: no global style pollution.

### NFR-5: Security ✅
- `suppressHydrationWarning` on root `<html>` to prevent false hydration errors from browser extensions.
- Supabase Auth guard on `/admin` routes (planned Phase 20).
- Contact form data validated before submission.
