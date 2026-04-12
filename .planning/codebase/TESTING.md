# Testing Protocols

Evaluating system stability and visual fidelity.

---

## Phase 1: Automated Verification (Gate — Required)

### `npm run build`
The primary gatekeeper. All changes must pass a full production build to verify:
- TypeScript type safety (strict mode)
- Next.js static generation success
- Zero import errors or missing module references

**Current Status**: ✅ PASSING (Exit Code 0 — 2026-04-12, Turbopack)

### ESLint
- **Trigger**: `npx next lint` (equivalent)
- **Scope**: Architecture standards, CSS best practices, React hooks usage.
- **Note**: Dynamic CSS variable `style` props are suppressed with localized ESLint annotations — these are intentional and non-blocking.

---

## Phase 2: Manual Quality Assurance

### UI Fidelity Sweep
- Manual verification on the local dev server (`localhost:3000`) for all cinematic transitions, GSAP timelines, and GLSL-inspired effects.
- **Wave System Check**: Scroll through home page slowly — verify z-index layering creates the expected parallax depth effect.
- **Theme Switch Check**: Toggle all 6 themes (Cyber, Arctic, Inferno, Ghost, Bio, Void) — verify token updates are instant and no visual artifacts.

### Data Integrity Check
- Cross-verify that `src/data/*.json` and `src/data/*.ts` updates propagate correctly to their respective UI modules:
  - `stats.ts` → HeroSection stats strip
  - `services.ts` → ServicesPreview cards
  - `testimonials.ts` → TestimonialMarquee
  - `availability.ts` → AvailabilityBadge in Hero

### Accessibility Audit
- Verify semantic HTML structure per page using browser DevTools Accessibility tree.
- Confirm all external links have `rel`, `aria-label`, `title`.
- Tab through interactive elements to confirm focus states.

### Responsiveness Audit
- Verify layout integrity at: 375px (mobile), 768px (tablet), 1280px (desktop), 1920px (ultrawide).
- Home page wave sections must not collapse on mobile.

---

## Phase 3: Interaction-Specific Tests

### GSAP Lifecycle
- Verify no GSAP "stale context" warnings in console after navigating away from and back to the Home page.
- `ctx.revert()` must fire cleanly on component unmount.

### Easter Egg (MatrixRain)
- `Shift+M` on Home page → Canvas overlay appears.
- Any key press or click → overlay dismisses.

### HomeLoader Boot Sequence
- **First visit** (clear `sessionStorage`): Loader plays full animation.
- **Return visit** (sessionStorage set): Loader skipped, content renders immediately.

### Contact Wizard
- Step 01 → Identity (Name, Email fields).
- Step 02 → Payload (Message, Project type).
- Step 03 → Transmission (Submit → Supabase).
- Verify progress bar advances correctly between steps.
- Verify "Back" button returns to previous step without data loss.

### Theme Persistence
- Select "Inferno" theme → Reload page → Inferno must still be active (via `localStorage`).
- Hard refresh (Ctrl+Shift+R) should also maintain theme (inline `<script>` in `<head>` handles FOUC).

---

## Phase 4: Performance Benchmarking

### Lighthouse / Core Web Vitals
- **Target**: ≥90 on all pages.
- **Exception**: Home page WebGL may score 75+; this is documented and accepted.
- **Run**: Chrome DevTools → Lighthouse → Mobile simulation.
- **Key Metrics**: LCP, CLS, FID/INP, TTI.

### Bundle Analysis (when needed)
- `ANALYZE=true npm run build` (if `@next/bundle-analyzer` is installed).
- Watch for GSAP or Three.js being bundled into the client without dynamic import.

---

## UAT Log
| Phase | UAT File | Status |
|-------|----------|--------|
| 11 (Cinematic Home) | `11-UAT.md` | ⏳ Awaiting User Verification |
