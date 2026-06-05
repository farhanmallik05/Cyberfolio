# SEED-026: WebGL Background + 3D Scene

## What
A full-viewport WebGL canvas rendered behind all page content (`WebGLBackground.tsx`) displaying a receding isometric grid, rotating wireframe geometric shapes, and a drifting particle field.

## Why
Elevates the Neural Architect portfolio visual fidelity to a premium level, creating an immersive 3D space that reacts to scroll and cursor movement.

## Details
- Raw WebGL2 (or Three.js with minimal overhead).
- Canvas sits at `z-index: -1`, `position: fixed`, `pointer-events: none`.
- Receding infinite isometric grid plane in `--neon` with low opacity.
- 3-5 floating wireframe geometric shapes (icosahedron, octahedron, torus) rotating slowly.
- Ambient particle field with 800-1200 points drifting, colored with `--neon` and `--neon2`.
- Accepts `scrollY: number` prop to tilt grid plane and shift particle drift.
- Accepts `mousePos: {x, y}` prop for subtle shape leaning (max 8deg).
- Zero layout reflow, smooth cleanup on unmount.
- TypeScript strict (no `any`).

## Trigger Condition
Surface when beginning **Milestone 3: Cinematic Core** (specifically Phase 11: Cinematic Home Redesign or Phase 14.5: System Performance & Asset Optimization).

## Implementation Notes
- Design system variables must be resolved from CSS variables at mount (getComputedStyle) with no hardcoded hex.
- Clean up all event listeners, animation frames, and buffers on unmount.
- Integrates with scroll hook velocity (SEED-028).
