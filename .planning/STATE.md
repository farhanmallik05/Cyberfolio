# Project State

## Current Milestone: M3 — Cinematic Core
## Next Phase to Execute: Phase 13 (Blog System)
## Last Updated: 2026-04-13
## Status: ⏸️ Milestone 3 In Progress — Phase 13 Paused (Wave 1 Infrastructure)

---

## Architecture
Full site architecture + design lock: `.planning/ARCHITECTURE.md`
Phase 0 blueprint in: `.planning/phases/phase-00-architecture-blueprint/PLAN.md`

---

## Milestones Overview
- M0: Architecture & Foundation — ✅ Done
- M1: Data & Content Foundation — ✅ Done
- M2: Interactive Experience — ✅ Done (Phases 5–10: Terminal, Social, Now, Uses, Certificates, Resume Customizer, Themes, Testimonials)
- M3: Cinematic Core — ⏳ In Progress (Phase 11 ✅, Phase 12 next)
- M4: Monetization & Conversion — ⏳ Planned
- M5: AI & Platform Layer — ⏳ Planned
- M6: Community & Scale — ⏳ Planned

---

## Decisions Locked
- Stack: Next.js 16.1.6, React 19, Three.js 0.183, GSAP 3.14.2, Supabase, Tailwind CSS 3
- CSS Variables for theming — active 6-theme system (Cyber/Arctic/Inferno/Ghost/Bio/Void)
- Static JSON ledger in `src/data/` for all content (skills, certificates, now, uses, testimonials)
- Theme persistence: `localStorage` key `na-theme`; inline theme injection via `<script>` in `<head>`
- GitHub username: `farhanmallik05`
- Projects data: GitHub API live integration (Phase 4 ✅)
- Blog: MDX in `/content/blog` (Phase 13)
- Store: Razorpay + Stripe + Supabase (Phase 17)
- AI Chat: Claude/Gemini API + RAG (Phase 19)
- Supabase: single project for ALL database needs — ID: `snyvarunuobcpfadkpmc`

---

## Design Lock
- Colors: `--neon` (#00F5FF), `--neon2` (#BF5FFF), `--bg` (#070C1A), `--bg2` (#0D1425)
- Fonts: Orbitron (headings, Next Font), Inter (body, Next Font), Share Tech Mono (UI labels)
- Glassmorphism: `var(--glass)` + `backdrop-filter: blur(20px)`
- **Cyber theme is default and IMMUTABLE** — all other themes shift `--neon` and `--bg` via `data-theme` attribute
- Full design system documented in ARCHITECTURE.md

---

## Phase Completion Log
| Phase | Name | Status |
|-------|------|--------|
| 0 | Architecture Blueprint | ✅ Complete |
| 1 | Code Hardening | ✅ Complete |
| 2 | Bio & Social Update | ✅ Complete |
| 2.5 | Infrastructure Setup | ✅ Complete |
| 3 | LinkedIn Data Sync | ✅ Complete |
| 3.5 | About Page Full Build | ✅ Complete |
| 4 | GitHub Projects Integration | ✅ Complete |
| 5 | Interactive Terminal CLI | ✅ Complete |
| 5.5 | Social Hub | ✅ Complete |
| 6 | Now Page | ✅ Complete |
| 6.5 | Uses Page | ✅ Complete |
| 7 | Certificates Wall | ✅ Complete |
| 7.5 | Proper Supabase Integration | ✅ Complete |
| 8 | Resume Role Customizer | ✅ Complete |
| 9 | Multi-Theme System | ✅ Complete |
| 10 | Testimonials & Social Proof | ✅ Complete |
| 11 | Cinematic Home Redesign | ✅ Complete (HARDENED) |
| 12 | Projects Index + Case Studies | ✅ Complete (HARDENED) |
| 13 | Blog System (MDX) | ⏳ Planned |
| 13.5 | Minimal Admin Panel | ⏳ Planned |
| 14 | About Page Expanded | ⏳ Planned |
| 14.5 | Performance Optimization | ⏳ Planned |
| 15–23 | Monetization / AI / Community | 📋 Plans Ready |

---

## Seeds Planted (18 total)
| ID | Feature | Phase | Milestone | Status |
|----|---------|-------|-----------|--------|
| SEED-001 | Live Availability Status | Phase 11 | M3 | ✅ Implemented (`src/data/availability.ts`) |
| SEED-002 | Tech Radar / Skill Constellation | Phase 9 | M2 | ✅ Implemented |
| SEED-003 | Case Studies Deep Dive | Phase 12 | M3 | ⏳ Pending |
| SEED-004 | Uses / Stack Page | Phase 6.5 | M2 | ✅ Implemented |
| SEED-005 | Drag-to-Explore Canvas | Phase 12 | M3 | ⏳ Pending |
| SEED-006 | Consulting Booking Calendar | Phase 15 | M4 | ⏳ Pending |
| SEED-007 | Digital Product Store Expanded | Phase 17 | M4 | ⏳ Pending |
| SEED-008 | AI Greeter + Cursor "FM" | Phase 19 | M5 | ⏳ Pending |
| SEED-009 | Spotify Now Playing | Phase 11 | M3 | ⏳ Pending (needs OAuth) |
| SEED-010 | PWA + Offline Support | Phase 22 | M6 | ⏳ Pending |
| SEED-011 | Matrix Rain Easter Egg | Phase 11 | M3 | ✅ Implemented (`Shift+M`) |
| SEED-012 | Ambient Sound Toggle | Phase 18 | M5 | ⏳ Pending |
| SEED-013 | Visitor / Usage Counter | Phase 18 | M5 | ⏳ Pending |
| SEED-014 | Podcast Version of Posts | Phase 21 | M6 | ⏳ Pending |
| SEED-015 | Password Protected Pages | Phase 17 | M4 | ⏳ Pending |
| SEED-016 | Pricing Calculator | Phase 15 | M4 | ⏳ Pending |
| SEED-017 | OG Image Generator | Phase 13 | M3 | ⏳ Pending |
| SEED-018 | Public API (/api/*) | Phase 20 | M5 | ⏳ Pending |

---

## Open Blockers
- **Resume PDF**: `/public/farhan-mallik-resume.pdf` — Required for "Download Resume" CTA in Hero
- **Spotify API**: SEED-009 requires OAuth token setup; blocked intentionally
- **Supabase project**: ✅ Active & Integrated (`snyvarunuobcpfadkpmc`)
- **Blog MDX**: Phase 13 — `/content/blog` directory not yet created

---

## Key Global Components
| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout: Providers, Navbar, Footer, BootSequence, ThemeHUD, RoleBadge |
| `src/components/Navbar.tsx` | Global sticky nav with active route highlighting |
| `src/components/Footer.tsx` | Global footer — IST clock, social links, dynamic year |
| `src/components/ThemeHUD.tsx` | Floating theme switcher bottom-right |
| `src/components/RoleBadge.tsx` | Floating role indicator (Frontend/AI/Automation) |
| `src/components/BootSequence.tsx` | Auth + first-visit animation wrapper |
| `src/components/BackgroundSystem.tsx` | Star field + blueprint grid background |
| `src/context/ThemeContext.tsx` | Global theme state manager |
| `src/context/RoleContext.tsx` | Global role state manager |

---

## Roadmap Evolution
- Phase 7.5 added: Proper Supabase Database Integration (inserted between 7 and 8)
- Phase 14.5 added: System Performance & Asset Optimization (inserted between 14 and 15)
- Phase 11: Split hardening into 11.5 (styles), 11.6 (browser compat), 11.7 (accessibility)
- Phase 24 added: DSA Arena + Resume + Codolio Integration (end of M6)

---

## Quick Tasks Completed
| Task | Date | Status |
|------|------|--------|
| Fix Home Tab Name Visibility | 2026-04-12 | ✅ Complete |
