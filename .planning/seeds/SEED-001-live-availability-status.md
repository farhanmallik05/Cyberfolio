# SEED-001: Live Availability Status

## What
A real-time status indicator showing whether Farhan is available for work or currently booked.

## Why
Recruiters and clients want to know availability before reaching out. A live indicator dramatically increases inbound quality — people who ask are already pre-filtered.

## Details
- 🟢 Available for work / 🔴 Currently booked indicator
- Next available date
- Response time expectation
- Preferred project types
- Update mechanism: simple JSON in `/public/status.json` or environment variable

## Where it lives
- Navbar (subtle indicator dot)
- Hero section (badge near CTA buttons)
- Contact page (before the form)
- Footer (bottom right)

## Trigger Condition
Surface when beginning **Milestone 3: Monetization & Depth** or when user reports actively seeking freelance clients.

## Implementation Notes
- Status JSON: `{ "available": true, "nextAvailable": "2026-05-01", "responseTime": "24h", "preferredTypes": ["UI/UX", "Automation", "AI Integration"] }`
- Animated pulse on the green dot
- Could tie into Cal.com availability (see SEED-006)
