# SEED-008: AI Greeter + Cursor Trail Constellation

## What
Two micro-features for returning visitors: a cookie-based "Welcome back, [name]" AI greeter that feels personal, and a cursor trail that forms your initials (FM) after a few seconds of movement.

## Why
Personalization is memorable. Nobody forgets a site that recognizes them. The cursor constellation is a pure showpiece — perfect for someone who identifies as "UI/UX Explorer & Builder." Both are zero-friction (no login required).

## Details

### AI Greeter
- First visit: stores a randomly assigned friendly name OR asks "What should I call you?" (subtle prompt, dismissable)
- Return visit: shows "Welcome back, [name]. Still building?" in the boot loader or hero section
- Cookie-based, 30-day expiry
- Toggleable in settings

### Cursor Constellation
- After 3 seconds of cursor movement, subtle trails connect into the letters "FM"
- Trails fade out after 2 seconds of stillness
- Respects prefers-reduced-motion
- Color matches active theme

## Trigger Condition
Surface when beginning **Milestone 5: AI & Platform Layer** — after core pages and themes are stable.

## Implementation Notes
- Cursor trail: canvas overlay, requestAnimationFrame loop, draw bezier path
- Initials formation: pre-defined SVG path for "FM", cursor snaps toward path points
- Greeter: localStorage for name, cookie for "visited" flag
