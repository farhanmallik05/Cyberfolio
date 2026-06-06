---
gsd_state_version: 1.0
milestone: v12.0
milestone_name: milestone
status: unknown
stopped_at: Phase 16 context gathered
last_updated: "2026-06-06T11:37:10.446Z"
progress:
  total_phases: 33
  completed_phases: 1
  total_plans: 1
  completed_plans: 1
  percent: 100
---

# Project State

## Current Milestone: M3 — Cinematic Core

## Next Phase to Execute: Phase 18 (Free AI Micro-Tools)

## Last Updated: 2026-04-16

## Status: 🟢 Phase 15.5 Shipped — Services Engine Active

---

## Architecture

Full site architecture + design lock: `.planning/ARCHITECTURE.md`
Phase 0 blueprint in: `.planning/phases/phase-00-architecture-blueprint/PLAN.md`

---

## Milestones Overview

- M0: Architecture & Foundation — ✅ Done
- M1: Data & Content Foundation — ✅ Done
- M2: Interactive Experience — ✅ Done (Phases 5–10: Terminal, Social, Now, Uses, Certificates, Resume Customizer, Themes, Testimonials)
- M3: Cinematic Core — ⏳ In Progress (Phases 11, 12, 13, 13.5, 14 ✅)
- M4: Monetization & Conversion — ⏳ Planned
- M5: AI & Platform Layer — ⏳ Planned
- M6: Community & Scale — ⏳ Planned

---

## Decisions Locked

- Stack: Next.js 16.1.6, React 19, Three.js 0.183, GSAP 3.14.2, Supabase, Tailwind CSS 3
- CSS Variables for theming — active 6-theme system (Cyber/Arctic/Inferno/Ghost/Bio/Void)
- Static JSON ledger in `src/data/` for all content (skills, certificates, now, uses, testimonials)
- **Protocol v12.0**: Unification of Skill Categories (12 sectors) and Viewport Priority roles.
- **Universal Tagging**: `skillTags: SkillCategory[]` field implemented across Projects, Certificates, Services, and About data.
- Theme persistence: `localStorage` key `na-theme`; inline theme injection via `<script>` in `<head>`
- GitHub username: `farhanmallik05`
- Projects data: GitHub API live integration (Phase 4 ✅)
- Blog: MDX in `/content/blog` (Phase 13 ✅)
- Admin: Server Action based dashboard (Phase 13.5 ✅)
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
| 1-12 | Foundation / Interactivity / Redesign | ✅ Complete |
| 13 | Blog System (MDX) | ✅ Complete |
| 13.5 | Minimal Admin Panel | ✅ Complete |
| 14 | About Page Expanded | ✅ Complete |
| 14.5 | Performance Optimization | ✅ Complete |
| 15 | Skill Constellation V2 (Protocol v12.0) | ✅ Complete |
| 15.5 | Services Integration (Refactored) | 🚢 Shipped |
| 16–17 | Monetization / Store | 📋 Plans Ready |
| 18 | AI Tools (/tools) | ⏳ Next |
| 19-23 | AI Chat / Admin / Community | 📋 Plans Ready |
| 24 | DSA Arena + Resume + Codolio | ✅ Complete |

---

## Seeds Planted (18 total)

| ID | Feature | Phase | Milestone | Status |
|----|---------|-------|-----------|--------|
| SEED-001 | Live Availability Status | Phase 11 | M3 | ✅ Implemented |
| SEED-017 | OG Image Generator | Phase 13 | M3 | ✅ Implemented |
| SEED-018 | Admin Dashboard | Phase 13.5 | M3 | ✅ Implemented |

---

## Quick Tasks Completed

| Task | Date | Status |
|------|------|--------|
| Fix Home Tab Name Visibility | 2026-04-12 | ✅ Complete |
| Vertical Scroll Timeline Refactor | 2026-04-16 | ✅ Complete |
| LinkedIn Skills Integration + Responsive Constellation | 2026-04-16 | ✅ Complete |

---

## Accumulated Context

### Roadmap Evolution

- Phase 15.5.1 inserted after Phase 15.5: Connect Qdrant Vector Database (URGENT)

---

## Session Continuity

Last session: 2026-06-06T11:37:10.415Z
Stopped at: Phase 16 context gathered
Resume file: .planning/phases/phase-16-hire/16-CONTEXT.md
