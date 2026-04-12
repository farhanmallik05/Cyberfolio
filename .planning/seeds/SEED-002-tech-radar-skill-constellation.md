# SEED-002: Tech Radar / Skill Constellation

## What
Replace the current skills page with an interactive radar/constellation map — dots connected by lines, grouped by category, hoverable with tooltips. Renders like a neural network.

## Why
Progress bars and grids are everywhere. A constellation map is visually distinctive, fits the Neural Architect brand perfectly, and becomes a portfolio centerpiece that visitors remember and share.

## Details
- Skills rendered as nodes on a canvas (SVG or Canvas API, or Three.js)
- Categories: Languages, Frameworks, Tools, AI/ML, Design, DevOps
- Connecting lines between related skills (e.g., React → Next.js → Vercel)
- Hover: tooltip with proficiency level, years of experience, notable projects
- Animated on entry: nodes fade in and lines draw themselves
- Optional: "pulse" animation on most-used nodes

## Trigger Condition
Surface when beginning **Milestone 2** Phase 9 (Multi-Theme System) — the constellation should be built alongside the theme system since both touch the skills component's CSS variables. Resolved in Phase 9, M2.

## Implementation Notes
- Three.js is already installed — use it for the constellation
- D3.js force simulation is an alternative for the graph layout
- Data source: static JSON or pulled from GitHub language stats API
