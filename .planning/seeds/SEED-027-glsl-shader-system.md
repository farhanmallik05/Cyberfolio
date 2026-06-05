# SEED-027: GLSL Shader System

## What
A reusable GLSL shader library at `lib/shaders/` with a custom React hook `useShaderMaterial` to dynamically compile and manage shaders.

## Why
Centralizes shader logic to prevent code duplication, enables rich micro-animations (Fresnel glow, holographic scanlines, grid distortion), and resolves CSS variables to shader uniforms dynamically.

## Details
- Reusable library of custom WebGL shaders (`neonRimShader`, `holographicShader`, `gridDistortShader`, `particleShader`).
- Hook: `useShaderMaterial(type: ShaderType, overrides?: Partial<Uniforms>): THREE.ShaderMaterial`.
- Updates `uTime` on every frame via `useFrame` or `requestAnimationFrame`.
- Hot-updatable uniforms without component remounting.
- No hardcoded color hex values; colors pass as uniforms resolved from CSS variables (`--neon`, `--neon2`, `--bg`, etc.).

## Trigger Condition
Surface when entering **Milestone 3: Cinematic Core** or when building the WebGL background/3D assets (e.g. Phase 11 / Phase 15).

## Implementation Notes
- `neonRimShader` — Fresnel-based rim glow. Rim pulses with `--neon` color, inner dark (`--bg`).
- `holographicShader` — Scanline pattern + RGB chromatic aberration offset + alpha fade.
- `gridDistortShader` — Vertex shader that displaces a plane mesh in a sine wave based on scroll velocity.
- `particleShader` — Point sprite shader, circular soft-edge particles with size attenuation.
- Shaders created as `lib/shaders/[name].glsl.ts` (using template literals, typed).
