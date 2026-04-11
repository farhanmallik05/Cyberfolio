# SEED-011: Matrix Rain Easter Egg

## What
Trigger a full-screen Matrix-style green character rain effect when the user fast-scrolls (velocity threshold) or types a secret key sequence (e.g., Konami code).

## Why
Easter eggs create moments of delight and generate social sharing. Developers specifically love finding and sharing hidden things. This fits the Neural Architect brand perfectly and is memorable.

## Details
- Trigger 1: Fast scroll (velocity > threshold, detected via RAF)
- Trigger 2: Keyboard sequence (↑↑↓↓←→←→BA or custom)
- Trigger 3: Type "matrix" in the terminal CLI (Phase 5)
- Effect: canvas overlay, falling Japanese katakana/Latin characters in neon green
- Duration: 5 seconds then fade out, or click to dismiss
- First trigger shows: "System override initiated..." in Matrix font
- After effect: subtle message "You found a secret. Check the console." → creative console.log

## Trigger Condition
Surface when beginning **Milestone 3** Phase 11 (Cinematic Home) — the easter egg lives inside the home page experience. Can also be triggered from terminal (Phase 5). Resolved in Phase 11, M3.

## Implementation Notes
- Canvas 2D with character rain algorithm (column-based)
- Characters: mix of katakana (0x30A0-0x30FF) and numbers
- requestAnimationFrame loop with column drop state array
- Cleanup: remove canvas + event listener after dismiss
- Pairs beautifully with Matrix theme (SEED from Phase 9)
