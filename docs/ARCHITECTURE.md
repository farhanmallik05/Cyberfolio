# Architecture Overview

This document outlines the high-level architecture of the **Neural Architect** portfolio, an interactive, cinematic web experience designed to showcase the intersection of AI, automation, and high-fidelity interface design.

## Core Tech Stack
The project is built on a modern, edge-optimized stack to ensure both aesthetic excellence and functional performance:

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router, Turbopack)
- **Deployment**: [Netlify](https://www.netlify.com/) (Edge-optimized distribution)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Realtime, Edge Functions)
- **Styling**: Vanilla CSS Modules combined with Tailwind CSS 3 for utility processing.
- **Cinematic Animations**: 
  - [GSAP 3.14.2](https://gsap.com/) for complex, scroll-driven timelines, layout shifting (FLIP), and scene coordination.
  - [Framer Motion](https://www.framer.com/motion/) for component-level micro-interactions, modal transitions, and hover states.
- **3D Rendering**: [Three.js 0.183](https://threejs.org/) for WebGL shader backgrounds and interactive neural objects.

## System Layers
The architecture is divided into logical layers to maintain separation of concerns as the portfolio scales into a full platform:

1. **Core Experience (`/`)**: The cinematic showroom. Heavily interactive, scroll-driven, utilizing GSAP for a continuous narrative flow.
2. **Platform Layer**: Deep-dive functional pages (`/projects`, `/about`, `/services`, `/blog`). Relies heavily on the dynamic data fed from internal JSON ledgers and Supabase.
3. **AI Layer**: Features like the AI clone (`/chat`) backed by RAG through Supabase `pgvector` and free-tier micro-tools.
4. **Monetization & Community**: Digital product distribution, course platforms, and newsletter subscription via Resend + Supabase.

## Theming Architecture
The theming system is built entirely on native CSS variables injected at the `:root` level, managed by the `ThemeContext.tsx` provider. 

**Immutable Core**: The default "Cyber" theme is immutable. Alternative themes (Arctic, Inferno, Ghost, Bio, Void) shift the `--neon` and `--bg` tokens via a `data-theme` attribute applied to the `<html>` tag, persisting via `localStorage`.

## Animation Ownership Matrix
To prevent conflict and performance bottlenecking, animation responsibilities are strictly separated:
- **GSAP**: Multi-element timelines, complex scroll-triggers, layout reordering, and WebGL coordination.
- **Framer Motion**: Component-level entry animations, reactive UI states (e.g., hover tilts, modal pops).
- **Rule of Thumb**: If an animation spans more than 3 distinct UI components or relies on the user's scroll position, it is handled by GSAP.

## Infrastructure Standard
- **GitHub API Proxy**: To prevent client-side rate limits, GitHub REST API requests are routed through a server-side API proxy route (`src/app/api/github/projects/route.ts`) authenticated with a classic Personal Access Token.
- **Data Source**: Structural site content (skills, roles, static certificates) is maintained in rigorous JSON ledgers (`src/data/`), while transactional data (leads, newsletter subs, purchases) flows directly into Supabase.
