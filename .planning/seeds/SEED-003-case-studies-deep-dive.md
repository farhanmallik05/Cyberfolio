# SEED-003: Case Studies Deep Dive Pages

## What
Dedicated /projects/[slug] pages per project with a full narrative: Problem → Approach → Solution, before/after comparisons, metrics, design decisions, and embedded demo or video.

## Why
A grid of projects tells people what you built. Case studies show HOW you think. This is the difference between a portfolio and a case for hiring you. Hiring managers and clients read these.

## Details
- Dynamic route: `/projects/[slug]`
- Sections per case study:
  1. Problem Statement
  2. My Role & Constraints
  3. Approach / Process
  4. Solution & Tech Decisions
  5. Before/After (screenshots, metrics, comparisons)
  6. Outcomes (impact, users, stars, etc.)
  7. What I'd do differently
  8. Live demo link + GitHub link
- Related projects sidebar
- Share to LinkedIn / Twitter buttons

## Trigger Condition
Surface when beginning **Milestone 3** or after Phase 4 (GitHub Projects Integration) completes — case studies build on top of the projects data.

## Implementation Notes
- MDX files for content (easy to write, renders React components inline)
- Or Firestore documents for CMS-like editing
- Images: before/after slider component
- Video: embedded YouTube/Loom iframe
