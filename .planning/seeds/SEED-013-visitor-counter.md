# SEED-013: Visitor Counter (Social Proof)

## What
A live visitor counter shown prominently: "Join 4,200+ developers who visited" displayed on the home page hero or footer. Updates via an API route backed by Firestore or Upstash Redis.

## Why
Social proof at the most basic level. A large visitor count builds credibility instantly. "4,000+ developers visited this" is more persuasive than any design element. Simple to implement, high impact.

## Details
- Counter displayed in hero section or footer
- Animated count-up when it enters viewport
- Privacy-preserving: no tracking, just raw page hit increment
- Unique per session (sessionStorage flag prevents re-counting refreshes)
- Format: "4.2k+ developers visited" (abbreviated once over 1000)
- Optional: breakdown by country (using Vercel geolocation headers)

## Trigger Condition
Surface when beginning **Milestone 5** Phase 18 (AI Tools) — usage counters and visitor count share the same Supabase counter infrastructure. Resolved in Phase 18, M5.

## Implementation Notes
- Upstash Redis (free tier): increment on page load, GET on display
- Or Firestore: atomic increment
- API route: `/api/stats` — POST to increment, GET to read
- sessionStorage key: 'counted_this_session'
- Vercel KV (if using Vercel) is the simplest option
