# Phase 22: Course Platform (/courses) - Context

**Gathered:** 2026-06-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the `/courses` index page and course detail routing. The platform will include a dual-pane interface (catalog grid and enrolled student dashboard), integrate Dodo Payments checkouts with Supabase Auth/Enrollments database tables for access control, and set up a full Progressive Web App (PWA) configuration with service workers for offline course access.

</domain>

<decisions>
## Implementation Decisions

### PWA & Offline Strategy (SEED-010)
- **D-01:** Implement a full PWA setup. Cache static assets (CSS, JS, fonts) and curriculum route files, plus the structured JSON curriculum content schemas to ensure enrolled users can read course content and study offline after the initial load.
- **D-02:** Build a service worker registration script (`public/sw.js`) utilizing cache-first strategies for assets and network-first fallbacks for live user database syncs.

### Course Access Control
- **D-03:** Enforce access control using **Supabase Auth** combined with an `enrollments` database table.
- **D-04:** Post-purchase workflow: Dodo Payments payment webhook triggers a server action that upserts the user's email/user ID into the `enrollments` table. The user must sign up or log in via Supabase Auth to decrypt and view lessons or curriculum details.

### Course Catalog Layout
- **D-05:** Unified dashboard page. If the user is logged in and enrolled in any courses, display a prominent "Enrolled Systems" progress dashboard at the top of `/courses`. Show the general catalog of available courses for purchase in a grid at the bottom.

### PWA Install Banner
- **D-06:** Implement a custom, neon-pulsing installer banner (labeled "INSTALL PWA PROTOCOL" in `Share Tech Mono`) on both desktop and mobile viewports. Intercept the browser's `beforeinstallprompt` event to bind installation to this custom trigger.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Specs
- `.planning/ARCHITECTURE.md` — Typography, CSS variable themes, and layout grids
- `.planning/phases/phase-22-courses/PLAN.md` — Original scope details

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/GlassPanel.tsx` — Used for course card templates.
- `src/components/ui/MechPanel.tsx` — Enrolled systems progress container.
- `src/lib/supabase.ts` — Auth client checks and queries.

### Established Patterns
- Client-side Next.js route segments.
- CSS Variable definitions for progress bar fills.

### Integration Points
- `/courses` and dynamic `/courses/[slug]` routing directories.
- PWA manifest mapping in `/public/manifest.json`.
- Database migrations in `supabase/migrations/` for the `enrollments` table.

</code_context>

<specifics>
## Specific Ideas

- The PWA install trigger should have a terminal glitch animation when installation starts.
- Display course progress bars matching the neon theme colors of the selected page theme.

</specifics>

<deferred>
## Deferred Ideas

- Self-hosted video streaming (using Mux Video) is deferred to Phase 22 v2. Initial releases will redirect to external hosted videos or text lessons.
- Automated certificate generator is deferred.

</deferred>

---

*Phase: 22-courses*
*Context gathered: 2026-06-06*
