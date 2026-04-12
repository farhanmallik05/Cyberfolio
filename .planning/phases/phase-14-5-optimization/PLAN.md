# Phase 14.5: System Performance & Asset Optimization

## Objective
Harden the portfolio's performance profile before the final Milestone 4/5 rollouts. Focus on reducing LCP (Largest Contentful Paint), minimizing main thread blocking, and optimizing data fetching efficiency.

## Acceptance Criteria
- [ ] Implement `next/dynamic` globally for heavy WebGL/Three.js components.
- [ ] Compress all static assets (Images to WebP/AVIF, SVGs optimized).
- [ ] Implement persistent caching for GitHub API data using Supabase as a data layer (instead of raw API calls on every request).
- [ ] Enable dynamic imports for third-party libraries (Lucide, GSAP where applicable).
- [ ] Resolve any "Cumulative Layout Shift" (CLS) issues identified in Lighthouse.

## Implementation Plan

### 1. Lazy Loading & Dynamic Imports
- Audit `AICore`, `BackgroundSystem`, and `TerminalCLI`.
- Ensure they are wrapped in `dynamic(() => ..., { ssr: false })`.

### 2. Asset Compression
- Run `imagemin` or equivalent on all `/public` assets.
- Verify 3D model compression if applicable.

### 3. GitHub Data Persistence
- Design a Supabase table `github_repos` and `github_stats`.
- Create a sync function (Cron) to populate these tables.
- Update `github-api.ts` to read from Supabase first, falling back to API.

### 4. Code Splitting
- Verify route-based code splitting in Next.js.
- Optimize heavy layouts for faster time-to-interactive.

## Files to Create/Modify
- `src/lib/supabase-client.ts` [NEW] (if not already exists)
- `src/lib/github-api.ts` [MODIFY]
- `src/app/layout.tsx` [MODIFY]
- `src/components/AICore.tsx` [MODIFY]
- `src/components/BackgroundSystem.tsx` [MODIFY]

## Verification
- Lighthouse score > 90 for Performance.
- Bundle analyzer report shows reduced first-load JS.
- GitHub data loads instantly from Supabase.
