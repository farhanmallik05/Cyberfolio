# Project Conventions

Establishing standardized development protocols and mechanical aesthetics.

---

## Coding Standards

### 1. TypeScript Supremacy
- No `any` types. All data models must be defined in `src/data/` (for content) or locally in the component file (for internal state shapes).
- Union types over enums for short fixed sets (e.g., `'primary' | 'support'`).
- Use `as const` for frozen data objects (e.g., `SITE_STATS`, `AVAILABILITY`).

### 2. Data-Driven Content
- **Mandatory**: All site content (bio, skills, testimonials, certificates, services, now, uses) must be sourced from `src/data/*.json` or `src/data/*.ts`.
- Hardcoding user-visible text in components is forbidden. Use the content ledger.
- Exception: UI labels, ARIA attributes, and generic placeholder text are allowed inline.

### 3. Component Structure — Single Responsibility
- Each component has one job. Use `MechPanel` for all primary architectural containers.
- Home cinematic components (`src/components/home/`) are self-contained: own CSS Module, own data import.
- Never nest interactive elements (links inside buttons, buttons inside anchor tags).

### 4. GSAP Lifecycle Safety
- All GSAP animations must be initialized inside `gsap.context(fn, scopeRef)`.
- Cleanup via `ctx.revert()` in the `useEffect` return.
- GSAP plugins (`ScrollTrigger`, `TextPlugin`) must be registered in `GSAPRegistrar.tsx` (client-only).

### 5. Dynamic Imports for Heavy Modules
- Three.js components (`AICore`, `BackgroundSystem`) must use `next/dynamic` with `{ ssr: false }`.
- GSAP ScrollTrigger orchestration should not execute on the server.

---

## Styling Protocols

### 1. Tailwind for Layout
- Use Tailwind for spacing, flexbox, grid, and responsive layout composition.
- Tailwind utilities for base typography and color system via CSS variable integration.

### 2. CSS Modules for Effects (Mandatory)
- Complex visual effects (glitches, gradients, blueprint grids, glow borders, scan lines) **must** use CSS Modules (`*.module.css`).
- No global CSS pollution. Global styles limited to `globals.css` (reset, base font vars).

### 3. Inline Styles — Strict Rule
- Inline `style` props **only** for truly dynamic values that cannot be expressed in a CSS variable (e.g., progress percentages, swatch colors from data arrays).
- When using dynamic CSS variables via `style`, cast as: `style={{ '--var': value } as React.CSSProperties}`.
- Add `{/* eslint-disable-next-line react/no-danger-with-children */}` comment when required.

### 4. CSS Variable Reference (Must Use)
```css
--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim
--font-orbitron, --font-inter
```
Never hardcode hex colors in component styles. Always use the CSS variable.

### 5. color-mix() Compatibility Rule
- When using `color-mix()` in CSS, always precede with a RGBA/hex fallback on the same property:
```css
background: rgba(0, 245, 255, 0.08);  /* Fallback */
background: color-mix(in srgb, var(--neon) 8%, transparent);
```

---

## Accessibility Protocols

### 1. Semantic HTML
- Use proper tags: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<aside>`.
- One `<h1>` per page. Heading hierarchy must be logical.

### 2. Interactive Isolation
- Never nest interactive elements. Each interactive affordance needs its own focusable element.
- Certificate cards: dedicated "Flip" button (not the card itself) for keyboard access.

### 3. External Links
- All external links must have: `rel="noopener noreferrer"`, `aria-label`, and `title` attributes.

### 4. ARIA Labels
- All icon-only buttons must have `aria-label`.
- All form inputs must have associated `<label>` elements.

### 5. Tab Order
- Verify all interactive modules are keyboard navigable with visible focus states (`:focus-visible`).

---

## Icon Registry Rule
**All Lucide icons must be imported from `src/lib/icons.ts`**, never directly from `lucide-react` in components. This ensures:
1. Tree-shaking optimization.
2. Single source of truth for icon naming.
3. Easy audit of all icons used across the project.
