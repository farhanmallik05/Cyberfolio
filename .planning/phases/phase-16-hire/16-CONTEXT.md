# Phase 16: /hire — Conversion Page - Context

**Gathered:** 2026-06-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the `/hire` route as a dedicated client conversion page for Farhan Mallik. The layout will center around an interactive tabbed switcher panel that lets users navigate between evaluating engagement models, booking a call via Cal.com, or submitting a detailed project brief.

</domain>

<decisions>
## Implementation Decisions

### Layout & Conversion Flow
- **D-01:** Single-panel tabbed switcher. Instead of a long scrolling landing page, the content is consolidated within a central, interactive HUD-style container where the user toggles between:
  1. **Engagement Models** (evaluating rates and engagement terms)
  2. **Book a Call** (direct Cal.com calendar scheduling)
  3. **Send a Brief** (detailed form submission)
- **D-02:** Availability banner (SEED-001) will be displayed prominently at the top of the page, dynamically indicating client intake status.

### 'Send a Brief' Data & Storage
- **D-03:** Store brief submissions in a new dedicated `briefs` table in the Supabase database. This separates deep client briefs from simple, generic contacts stored in `enquiries`.
- **D-04:** Form fields: Company Name, Project Name, Budget Range, Timeline, Project Description, and Attachment Link.

### File Attachment Strategy
- **D-05:** To avoid Supabase Storage file-handling complexity, no physical file upload is supported. Instead, the form will include a text field requesting a **public link** to the brief/assets (e.g., Google Drive, Figma, Notion, OneDrive).

### Engagement Models UI
- **D-06:** Interactive tab-deck/switcher. Clicking each engagement model (Project-based, Hourly, Monthly Retainer, Consulting Call) will reveal its specific description, pricing details, and deliverables in a central showcase card.

### Cal.com Booking Integration (SEED-006)
- **D-07:** Integrated event selectors. The Cal.com widget will allow users to select and schedule different event types directly (e.g., a free 15-minute discovery call vs. a paid 60-minute strategy session).
- **D-08:** Username configured via `NEXT_PUBLIC_CAL_USERNAME` env var, with graceful fallback to a contact link if not set.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Architecture & Design
- `.planning/ARCHITECTURE.md` — Central design variables, layout constraints, and typography definitions
- `.planning/codebase/INTEGRATIONS.md` — Existing API and Supabase clients overview
- `.planning/phases/phase-16-hire/PLAN.md` — Original scope details

### Content
- `src/data/availability.ts` — Intaked availability state
- `src/data/testimonials.ts` — Client proof quotes to be displayed alongside conversion elements

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/MechPanel.tsx` — Base glassmorphic panel.
- `src/components/ui/MechButton.tsx` — Neon action buttons.
- `src/app/api/contact/route.ts` — Pattern for Serverless Next.js API route handling database inserts.
- `src/components/services/CalBookingEmbed.tsx` — Cal.com integration pattern (used on services page).

### Established Patterns
- Client-side routes use `'use client'` with Framer Motion entry/exit transitions.
- Environment variables prefixed with `NEXT_PUBLIC_` for client availability.

### Integration Points
- `/hire` route will be created under `src/app/hire/page.tsx`.
- DB Migration will be created in `supabase/migrations/` for the new `briefs` table.

</code_context>

<specifics>
## Specific Ideas

- The tab switcher should have smooth transitions and a cybernetic "active" state (glitch lines or neon outline).
- Link inputs should show placeholder suggestions (e.g., "https://drive.google.com/...") to guide the user.

</specifics>

<deferred>
## Deferred Ideas

- Standard contact inquiries remain in `enquiries` table via the homepage contact widget.

</deferred>

---

*Phase: 16-hire*
*Context gathered: 2026-06-06*
