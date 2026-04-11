# SEED-012: Ambient Sound Toggle

## What
A subtle toggle in the UI that enables a low-volume ambient sound — a synth hum, lo-fi beat, or "neural" drone — as background audio while browsing the portfolio.

## Why
Mood. The Neural Architect brand is cinematic. Sound makes it immersive and memorable. Completely optional, muted by default, dismissable. Some visitors will love it and share it specifically for that reason.

## Details
- Toggle button: small speaker icon in navbar or footer
- States: 🔇 (off, default) → 🔊 (on, ambient)
- Audio: short ogg/mp3 loop (cyberpunk synth, ~30 seconds, seamless loop)
- Volume: 10-20% max by default
- Respects: prefers-reduced-motion doesn't apply but implement as opt-in only
- Persists: localStorage saves preference
- Different ambient per theme (optional): Cyber = synth, Matrix = mechanical hum, Minimal = silence, Synthwave = retrowave

## Trigger Condition
Surface when beginning **Milestone 5: AI & Platform Layer** — after core UX is stable. This is a delight layer.

## Implementation Notes
- HTML5 Audio API (no large libraries needed)
- Audio files: host in /public/audio/ (~100KB each, highly compressed)
- Autoplay policy: MUST be user-initiated (click the unmute button first)
- Preload: 'metadata' only until user enables
- Cross-browser: ogg primary, mp3 fallback
