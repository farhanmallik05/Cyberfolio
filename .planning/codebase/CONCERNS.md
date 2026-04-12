# System Concerns & Risks

*Last reviewed: 2026-04-12 (Phase 11 Hardening)*

Monitoring potential bottlenecks and architectural friction.

---

## Data Density
- **Skills Module**: Rendering 70+ skills in a constellation view. Performant under static generation. Future pagination or category filter toggles may be needed as skill count grows beyond 100.
- **Certificate Ledger**: Currently 15+ entries in `certificates.json`. Scaling past 30 may reduce "wall" readability — consider lazy-loading rows.
- **Testimonials Marquee**: Static data in `testimonials.ts`. Consider Supabase-backed management UI (Phase 20 admin panel) for easier updates.

---

## Architectural Friction
- **Git State**: All Phase 11 work was committed incrementally. No orphaned stash or uncommitted changes detected as of 2026-04-12.
- **HomeLoader / BootSequence Overlap**: Both `HomeLoader` (page-level, `sessionStorage`) and `BootSequence` (global layout, first-visit) manage fade-in sequences. Risk of visual collision during first page load — confirmed stable after Phase 11 testing.
- **Footer Deduplication**: `HomeFooter.tsx` exists but is NOT used. The global `Footer.tsx` is the single source of truth. `HomeFooter.tsx` should be archived after Phase 14.

---

## Visual Performance
- **GSAP Orchestration**: The wave-based home page relies on high-density ScrollTrigger pinning. Potential layout thrashing if many sub-components trigger simultaneous repaints. Monitoring `gsap.ticker` overhead. Mitigate with `will-change: transform` on pinned elements.
- **AICore (Three.js)**: WebGL canvas is lazy-loaded and SSR-disabled. However, on low-end hardware, the neural object animation may cause dropped frames. Consider a `prefers-reduced-motion` fallback static image.
- **CSS Module Migration**: Core visual components now use CSS Modules. Remaining concern: ensure all future components follow the same isolation pattern.
- **color-mix() Fallbacks**: Browser compatibility for `color-mix()` addressed with RGBA/hex fallbacks for Chrome < 111. IDE warnings expected but non-critical.

---

## Planned Improvements
- **Pagination / Virtualization**: Required if Certificate or Projects ledger exceeds ~50 items.
- **Supabase Content API**: Transition from static JSON to a Supabase-managed content API for easier remote updates (Phase 20 admin panel dependency).
- **OG Image Generator**: Currently missing dynamic OG images per-page. All pages share the same static OG config. Phase 13 will add `/api/og` using `@vercel/og`.
- **GitHub API Rate Limiting**: Production API calls to GitHub are not yet cached. Phase 14.5 will add Vercel Edge KV caching for 1-hour TTL.
- **Resume PDF**: `/public/farhan-mallik-resume.pdf` missing. Required for Hero CTA. Blocking "Download Resume" button.

---

## Non-Issues (Resolved)
- ✅ Duplicate footer rendering: Fixed — `layout.tsx` renders only the global `Footer`.
- ✅ `color-mix` fallbacks: Added RGBA/hex fallbacks across all affected CSS Modules.
- ✅ Inline style lint warnings: Resolved with localized ESLint suppressions for dynamic CSS variables.
- ✅ `any` types in social components: Resolved in Phase 2 code hardening.
- ✅ Missing aria-labels on social links: Fixed in Phase 11.7 accessibility pass.
