# SEED-028: Lenis Scroll Velocity + Scene Coupling

## What
Implementation of a smooth scroll system using Lenis that exposes scroll velocity and progress, driving both DOM GSAP animations and WebGL uniform updates.

## Why
Couples the scroll position and momentum directly to the 3D graphics and UI animations, making scroll interaction incredibly fluid and dynamic.

## Details
- `LenisProvider.tsx`: Context provider. Easing, lerp 0.08, duration 1.4, sync Lenis raf with GSAP ticker.
- `useScrollVelocity()`: Exposes smoothed velocity (exponential decay) and scroll coordinates at 60fps.
- `useParallax(factor)`: Smoothly translates element using GSAP `quickTo` based on scroll.
- `useWebGLSync()`: Binds scroll velocity and progress uniforms (`uScrollVelocity`, `uScrollProgress`) of a `THREE.ShaderMaterial`.

## Trigger Condition
Surface when starting **Milestone 3: Cinematic Core** (Phase 11: Cinematic Home Redesign or Phase 14.5: Performance Optimization).

## Implementation Notes
- Use GSAP `quickTo` for performance.
- Zero scroll jank, no `useState` triggers inside the rAF scroll loop.
- Fully typed.
- Deliverable: 4 files in `hooks/scroll/` + `providers/LenisProvider.tsx`.
