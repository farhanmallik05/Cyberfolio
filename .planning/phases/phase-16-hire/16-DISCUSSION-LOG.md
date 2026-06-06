# Phase 16: /hire — Conversion Page - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-06
**Phase:** 16-hire
**Areas discussed:** Layout & Conversion Flow, 'Send a Brief' Storage, File Attachment Strategy, Engagement Models UI, Booking Options

---

## Layout & Conversion Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Long-form Scroll | Availability Banner -> Who I Work With -> Engagement Models -> Form/Booking -> Testimonials | |
| Tabbed Switcher | Switch between models, booking, and brief inside a single panel | ✓ |

**User's choice:** Tabbed Switcher
**Notes:** Decided on a more consolidated UI. Toggling content inside a single dashboard panel fits the cyber-mechanical theme better and prevents page bloat.

---

## 'Send a Brief' Storage

| Option | Description | Selected |
|--------|-------------|----------|
| New dedicated `briefs` table | Create a new table in Supabase specifically for project briefs | ✓ |
| Extend `enquiries` table | Add optional columns to the existing general inquiries table | |

**User's choice:** New dedicated `briefs` table in Supabase
**Notes:** Better data segregation. Highly structured client leads shouldn't pollute the general contact table.

---

## File Attachment Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Supabase Storage bucket | Client-side physical file upload to a new public Supabase bucket | |
| Text field for external link | Request a public link (Google Drive, Figma, Notion etc.) | ✓ |

**User's choice:** Text field for external link
**Notes:** Chosen for ease of implementation. Avoids storage permissions, bucket creation, and size-limiting middleware overhead.

---

## Engagement Models UI

| Option | Description | Selected |
|--------|-------------|----------|
| Glass card grid | Standard static responsive cards with hover tilt | |
| Interactive switcher/tab-deck | Toggling cards in a deck to display detailed views | ✓ |

**User's choice:** Interactive switcher/tab-deck representing the models
**Notes:** Matches the tabbed switcher philosophy of the page. Keeps the view clean by displaying details on-demand.

---

## Booking Options

| Option | Description | Selected |
|--------|-------------|----------|
| Embedded event selectors | Display event types side-by-side (discovery vs. paid session) | ✓ |
| Reuse services page widget | Simple copy of the generic Cal.com scheduler | |

**User's choice:** Embedded event selectors
**Notes:** Enables more conversion control on the hire page, giving prospects immediate choices.

---

## the agent's Discretion

- Visual styling of the switcher tabs (glitch lines/neon outlines).
- Form validation error states and UX copy.
