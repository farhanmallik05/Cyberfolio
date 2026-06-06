# Phase 22: Course Platform (/courses) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-06
**Phase:** 22-courses
**Areas discussed:** PWA & Offline Strategy, Course Access Control, Course Catalog Layout, PWA Install Prompts

---

## PWA & Offline Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Full PWA setup | Cache static files, routes, and curriculum JSON schema for offline reading | ✓ |
| Lightweight SW | Cache basic shell bundles (CSS/JS/fonts) only | |

**User's choice:** Full PWA setup
**Notes:** Decided on caching curriculum details to allow students to read course content and study offline, matching the premium platform objective.

---

## Course Access Control

| Option | Description | Selected |
|--------|-------------|----------|
| Supabase Auth + Table | Gate curriculum behind login; check email in `enrollments` table | ✓ |
| Magic URLs | Email raw links or access tokens via Resend webhook (no auth setup) | |

**User's choice:** Supabase Auth + `enrollments` table
**Notes:** Better security and scalability. Protects course contents fully by requiring authenticated sessions.

---

## Course Catalog Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Unified Dashboard | Enrolled courses at the top (if logged in) + catalog grid at bottom | ✓ |
| Catalog Grid only | Standard scrollable listing of all courses with checkout CTAs | |

**User's choice:** Unified page (catalog grid + enrolled dashboard)
**Notes:** Simplifies user navigation, letting logged-in students access their content directly from the index route.

---

## PWA Install Prompts

| Option | Description | Selected |
|--------|-------------|----------|
| Custom PWA Prompt | Show a custom neon-pulsing 'INSTALL PWA PROTOCOL' button | ✓ |
| Native browser prompts | Avoid custom overlay prompts; rely on browser installer indicators | |

**User's choice:** Custom install banner ('INSTALL PWA PROTOCOL')
**Notes:** Adds to the mechanical/hacker theme of the application and raises PWA installation rate.

---

## the agent's Discretion

- Choice of service worker update strategies (defaults to prompt-on-update or automatic update refresh).
- Exact JSON curriculum schema format.
