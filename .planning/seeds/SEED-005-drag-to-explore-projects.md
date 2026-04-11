# SEED-005: Drag-to-Explore Projects Canvas

## What
Instead of a standard projects grid, render projects as draggable cards on an infinite canvas — visitors physically drag and arrange them. Like a virtual desk or mood board.

## Why
This is the most memorable interaction pattern on any portfolio. Nobody forgets it. It screams UI/UX Explorer and Builder — both titles from your GitHub bio. It's also a perfect technical showpiece for the brand.

## Details
- Infinite canvas with inertia scrolling
- Project cards as draggable nodes
- Cards show: thumbnail, title, tech stack tags, live link
- Click to expand: full card with description transforms into case study entry
- Right-click context menu: "Open live", "View code", "Read case study"
- Keyboard: Tab between cards, Enter to open
- Physics: cards slightly repel when overlapping

## Trigger Condition
Surface when beginning **Milestone 3** or after Case Studies (SEED-003) is complete — the draggable canvas becomes the entry point to case studies.

## Implementation Notes
- `@use-gesture/react` + `framer-motion` for drag physics (both patterns exist in codebase)
- Or `react-flow` for canvas layout engine
- Three.js alternative: project cards as floating planes in 3D space
- Data from GitHub API (Phase 4) feeds card content
