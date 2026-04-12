# SEED-017: OG Image Generator

## Concept
Dynamic Open Graph images auto-generated for every blog post, project, and page. When shared on LinkedIn or Twitter, shows a branded preview card instead of blank.

## Target Milestone: M3 (Phase 13)
## Trigger: Built inside Phase 13 (Blog launch)

## Implementation
- Next.js /api/og route using @vercel/og (Satori)
- Template: dark background (#070C1A via --bg), Neural Architect logo top-left, page title large center, category/type bottom-left, neon accent bar (#00F5FF)
- Parameters: `?title=...&type=blog&category=AI`
- Example: `/api/og?title=Building+AI+Agents&type=blog`

## Theme Notes
OG template uses --bg (#070C1A) background. Title in Orbitron font (loaded via satori font option). Neon line (#00F5FF) as bottom accent bar. Consistent with Neural Architect brand.
