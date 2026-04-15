# Development Guide

This document provides conventions and guidelines for developing within the Neural Architect codebase.

## Directory Structure

```text
.
├── .planning/          # GSD AI Workflow specifications and state tracking
├── docs/               # Technical project documentation (you are here)
├── public/             # Static assets (fonts, models, CV)
├── src/
│   ├── app/            # Next.js 16 App Router (pages, api routes, layouts)
│   ├── components/     # UI Components organized by feature/domain
│   │   ├── home/       # Single-page cinematic showroom elements
│   │   ├── loader/     # Boot sequence animations
│   │   └── ui/         # Reusable primitives (buttons, glitch text, grids)
│   ├── context/        # React Context providers (ThemeContext, RoleContext)
│   ├── data/           # JSON Content Ledgers (skills, certificates, etc.)
│   ├── lib/            # Utility functions and API wrappers
│   └── styles/         # Global CSS and modular CSS scopes
```

## Component Architecture

Components should strictly adhere to the "glassmorphic" and "cyber-mechanical" UI aesthetic. 

- **Styling**: Avoid inline styles. Prefer CSS Modules (`Component.module.css`) combined with Tailwind utility classes where appropriate. Global layout alignment is managed by Tailwind, while complex glow effects, clip-paths, and gradient borders are strictly CSS modules.
- **Glassmorphism**: When constructing UI cards across the app, rely on `var(--bg2)` paired with `box-shadow` inset variables defined in `src/app/globals.css`.

## Animation Guidelines

We maintain a strict boundary between our two animation engines to prioritize performance.

1. **GSAP (`src/components/home/`)**:
   - Must be used for **ScrollTriggers**, timed narrative sequences, or multi-element orchestration.
   - Example: The Hero sequence (`HeroSection.tsx`) triggering the `GlitchText`, then fading in the `Terminal`, then scaling the background canvas.
   - **Cleanup**: Always return a cleanup function in `useEffect` that calls `ctx.revert()` or kills the GSAP context to prevent memory leaks in React 19's strict mode.

2. **Framer Motion (`src/components/ui/`)**:
   - Must be used for localized interactions, like hover states, 3D tilt effects, or small list staggering.
   - Ideal for isolated interactive primitives.

## Managing State

- **Theme State**: Read and mutate the global theme using `useTheme` from `src/context/ThemeContext.tsx`. The theme affects native CSS variables across the DOM.
- **Context Ledgers**: When building a new data-driven component (like the Certificates Wall), do not hardcode the data into the `.tsx` file. Instead, create or update a `.json` ledger in `src/data/` and import it. This separation ensures the UI components remain declarative.
