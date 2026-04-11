# Project State

## Current Milestone: M2
## Next Phase to Execute: Phase 8 (Resume Role Customizer)
## Last Updated: 2026-04-12

## Architecture
Full site architecture + design lock: `.planning/ARCHITECTURE.md`
Phase 0 blueprint in: `.planning/phases/phase-00-architecture-blueprint/PLAN.md`

## Milestones Overview
- M0: Architecture & Foundation — ✅ Done
- M1: Data & Content Foundation — ✅ Done
- M2: Interactive Experience — ⏳ In Progress (Phase 8 next)
- M3: Cinematic Core — ⏳ Planned
- M4: Monetization & Conversion — ⏳ Planned
- M5: AI & Platform Layer — ⏳ Planned
- M6: Community & Scale — ⏳ Planned

## Decisions Locked
- Stack: Next.js 16, React 19, Three.js, GSAP, Supabase, Tailwind CSS
- CSS Variables for theming (enables 4-theme system, Phase 9)
- Static JSON files for content (Now, Uses, Testimonials, Certificates, Skills) — easy to update
- GitHub username: farhanmallik05
- Projects data: static JSON (src/data/projects.json) initially, GitHub API in Phase 4
- Blog: MDX in /content/blog (Phase 13)
- Store: Razorpay + Stripe + Supabase (Phase 17)
- AI: Claude/Gemini API + RAG (Phase 19)
- Supabase: single project for ALL database needs (Phase 2.5)

## Design Lock
- Colors: --neon (#00F5FF), --neon2 (#BF5FFF), --bg (#070C1A), --bg2 (#0D1425)
- Fonts: Orbitron (headings), Rajdhani (body), Share Tech Mono (UI Labels)
- Glassmorphism: var(--glass) + backdrop-filter: blur(20px)
- Cyber theme is default and IMMUTABLE
- Full design system documented in ARCHITECTURE.md

## Seeds Planted (18 total)
| ID | Feature | Phase | Milestone |
|----|---------|-------|-----------|
| SEED-001 | Live Availability Status | Phase 11 | M3 |
| SEED-002 | Tech Radar / Skill Constellation | Phase 9 | M2 |
| SEED-003 | Case Studies Deep Dive | Phase 12 | M3 |
| SEED-004 | Uses / Stack Page | Phase 6.5 | M2 |
| SEED-005 | Drag-to-Explore Canvas | Phase 12 | M3 |
| SEED-006 | Consulting Booking Calendar | Phase 15 | M4 |
| SEED-007 | Digital Product Store Expanded | Phase 17 | M4 |
| SEED-008 | AI Greeter + Cursor "FM" | Phase 19 | M5 |
| SEED-009 | Spotify Now Playing | Phase 11 | M3 |
| SEED-010 | PWA + Offline Support | Phase 22 | M6 |
| SEED-011 | Matrix Rain Easter Egg | Phase 11 | M3 |
| SEED-012 | Ambient Sound Toggle | Phase 18 | M5 |
| SEED-013 | Visitor / Usage Counter | Phase 18 | M5 |
| SEED-014 | Podcast Version of Posts | Phase 21 | M6 |
| SEED-015 | Password Protected Pages | Phase 17 | M4 |
| SEED-016 | Pricing Calculator | Phase 15 | M4 |
| SEED-017 | OG Image Generator | Phase 13 | M3 |
| SEED-018 | Public API (/api/*) | Phase 20 | M5 |

## PLAN.md Status (23 phases)
- Phase 0: ✅ Complete
- Phase 1: ✅ Complete (hardened styling)
- Phase 2: ✅ Complete (bio/social sync)
- Phase 2.5: ✅ Complete (Supabase infra)
- Phase 3: ✅ Complete (LinkedIn data sync)
- Phase 3.5: ✅ Complete (About page base)
- Phase 4: ✅ Complete (GitHub Projects)
- Phase 5: ✅ Complete (Terminal CLI)
- Phase 6: ✅ Complete (Now page)
- Phase 6.5: ✅ Complete (Uses page)
- Phase 7: ✅ Complete (Certificates achievements)
- Phase 8: 📋 Plan Ready — phases/phase-08-resume-role-customizer/PLAN.md
- Phase 9-23: 📋 Plans Ready

## Open Blockers
- Resume PDF: Phase 11 requires /public/farhan-mallik-resume.pdf from user
- Spotify API: SEED-009 requires OAuth token setup
- Supabase project: ✅ Active & Integrated (snyvarunuobcpfadkpmc)
