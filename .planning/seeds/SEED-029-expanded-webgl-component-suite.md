# SEED-029: Expanded WebGL Component Suite

## What
A set of 4 advanced WebGL / Three.js React components: `NeuralNetworkOrb.tsx`, `HolographicCard.tsx`, `CyberTunnel.tsx`, and `GLTextRenderer.tsx`.

## Why
Adds highly interactive, modern cyberpunk elements to the UI that go far beyond standard static elements.

## Details
- `NeuralNetworkOrb`: Glowing nodes connected by edges, signal pulses traveling along random edges.
- `HolographicCard`: Offscreen canvas WebGL post-process effect (scanlines, RGB split, glow) on hover.
- `CyberTunnel`: Warp effect triggered by scroll progress, tunnel rings rush toward viewer.
- `GLTextRenderer`: Signed Distance Field (SDF) text rendering with `neonRimShader` and reveal animations.

## Trigger Condition
Surface when entering **Milestone 3: Cinematic Core** (Phase 11 Cinematic Home Redesign / Phase 14 About Page Expanded).

## Implementation Notes
- All colors resolved from CSS variables at mount.
- Cleanup on unmount (no memory leaks).
- Wrapped in `React.memo` for rendering performance.
- Independently importable.
- Shared constraints: Cyberpunk, no hex, typescript strict, getComputedStyle resolution.
