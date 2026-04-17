# Phase 24 — DSA Arena + Resume + Codolio Integration
# Milestone 6 · Size: M · Status: Ready to Execute

## Goal
Ship three interconnected deliverables: a cinematic role-aware /resume page,
a /dsa arena with activity heatmap, and a custom CodolioCard component placed
on /dsa and the existing About page sidebar.

## Key Decisions (locked)
- Role-awareness: Full content swap across all sections (skills, projects,
  experience reorder) driven by existing RoleContext — no new context needed.
- PDF download: react-pdf — PDFDocument built from resume.ts data dynamically.
  Also add @media print stylesheet as fallback.
- Heatmap granularity: Both — StreakBar (weekly) above ActivityHeatmap (12-month grid).
- Codolio widget: Custom styled CodolioCard component powered by dsa.ts data,
  links to https://codolio.com/profile/farhanmallik — no iframe.
- Nav placement: /resume added to main nav. /dsa linked from About page + terminal only.
- About page: CodolioCard injected into Phase 3.5 build sidebar now
  (not deferred to Phase 14).
- Data: All stats are static/seeded in dsa.ts. Add "Last Synced" timestamp
  for transparency.

## Design Lock (always applies)
- Colors: --neon:#00F5FF --neon2:#BF5FFF --bg:#070C1A --bg2:#0D1425
- Fonts: Orbitron (headings) / Share Tech Mono (mono) / Rajdhani (body)
- Theme: Cyber default
- All components use glassmorphism cards, neon glow borders, standard glow patterns

## New Files
- src/data/resume.ts          — typed, role-aware resume data
- src/data/dsa.ts             — DSA stats, heatmap grid, streak data, platform links
- src/app/resume/page.tsx     — /resume route (client component, uses RoleContext)
- src/app/dsa/page.tsx        — /dsa route
- src/components/resume/ResumeHeader.tsx
- src/components/resume/ResumeSkills.tsx
- src/components/resume/ResumeExperience.tsx
- src/components/resume/ResumeProjects.tsx
- src/components/resume/ResumeEducation.tsx
- src/components/resume/ResumeAchievements.tsx
- src/components/resume/ResumePDFDocument.tsx  — react-pdf Document
- src/components/dsa/StatCards.tsx
- src/components/dsa/StreakBar.tsx
- src/components/dsa/ActivityHeatmap.tsx
- src/components/dsa/LanguageTags.tsx
- src/components/dsa/PlatformLinks.tsx
- src/components/shared/CodolioCard.tsx        — shared, used on /dsa + /about

## Modified Files
- src/components/layout/Navbar.tsx   — add /resume nav link
- src/app/about/page.tsx             — inject CodolioCard + "View DSA Arena →" CTA
- src/components/terminal/commands.ts — add `dsa` command → router.push('/dsa')

## Wave Plan

### Wave 1 — Data Foundation (parallel)
- [ ] Create src/data/resume.ts
      Types: ResumeData, RoleVariant<T> wrapper for role-aware fields
      Sections: objective, skills[], education[], experience[],
      projects[] (role-filtered), achievements[]
      Each role (Frontend/AI/Fullstack) has its own skills[] and projects[]
- [ ] Create src/data/dsa.ts
      Types: DsaStats, HeatmapDay, StreakWeek, Platform
      Data: statCards (Questions Solved, Active Days, Streak, Rank),
      heatmapData (365 days, activity level 0-4),
      streakData (52 weeks), languageTags, platforms,
      lastSynced: ISO date string
- [ ] Add /resume to Navbar (desktop + mobile menu)

### Wave 2 — Resume Page (parallel)
- [ ] /resume/page.tsx
      'use client' — consumes RoleContext
      Full role swap on role change: Framer Motion layout animations
      Section order changes per role (AI: skills first → projects → experience)
      Download button triggers react-pdf BlobProvider
- [ ] ResumeHeader — name, role badge, contact row, download CTA
- [ ] ResumeSkills — role-filtered skill chips, grouped by category
- [ ] ResumeExperience — timeline cards, glassmorphism
- [ ] ResumeProjects — role-filtered project cards, 2-col grid
- [ ] ResumeEducation — education timeline
- [ ] ResumeAchievements — achievement badges
- [ ] ResumePDFDocument — react-pdf layout mirroring page content
      dynamic import: import { PDFDownloadLink } from '@react-pdf/renderer'
      with ssr: false to avoid SSR crash
- [ ] @media print stylesheet in resume/page.tsx or globals
      Hides: navbar, footer, download button
      Resets: backgrounds to white, text to black, removes glow

### Wave 3 — DSA Arena Page (parallel)
- [ ] /dsa/page.tsx — layout shell, section composition
- [ ] StatCards — 4 cards: Questions Solved / Active Days / Current Streak / Global Rank
      Neon number, muted label, glassmorphism card, Framer Motion count-up on mount
- [ ] StreakBar — 52-week bar chart (weekly totals)
      SVG bars, current week highlighted in --neon, tooltip on hover
- [ ] ActivityHeatmap — 12-month grid (GitHub-style)
      SVG rect grid, 5 neon intensity levels (0 = bg2, 4 = --neon full)
      Month labels (Share Tech Mono), "Last Synced: [date]" footer
- [ ] LanguageTags — neon pill badges: #JAVA #C++ #DSA #MYSQL #PYTHON3 #CP
- [ ] PlatformLinks — LeetCode / CodeChef / HackerRank cards
      Icon + handle + "View Profile →" link, glassmorphism

### Wave 4 — Codolio Widget + Integrations (sequential)
- [ ] CodolioCard component (src/components/shared/)
      Avatar circle (initials "FM"), handle @farhanmallik,
      stat row (questions solved, active days, streak) from dsa.ts,
      platform icon row, "View on Codolio →" link to profile
      Design: glassmorphism, neon border, --neon2 accent
- [ ] Place CodolioCard on /dsa page (hero or sidebar)
- [ ] Inject CodolioCard into About page
      Find sidebar slot or inject below Philosophy/Values section
      Add "View DSA Arena →" CTA button below the card
- [ ] Add `dsa` command to terminal command registry
      Command: 'dsa' → description: 'Open DSA Arena', action: router.push('/dsa')
      Update help command output to include it

## Verification Criteria
- [ ] /resume renders all sections, role switch swaps content with animation
- [ ] PDF download produces correct role-filtered document
- [ ] @media print hides chrome correctly
- [ ] /resume appears in main nav (desktop + mobile)
- [ ] /dsa loads with stat cards, streak bar, and heatmap visible
- [ ] Heatmap shows 12-month grid with correct intensity levels
- [ ] "Last Synced" date visible on heatmap
- [ ] CodolioCard renders on /dsa page
- [ ] CodolioCard renders on /about page
- [ ] "View DSA Arena →" CTA on About page navigates to /dsa
- [ ] Terminal `dsa` command navigates to /dsa
- [ ] No hydration errors, no SSR crash from react-pdf
- [ ] Build exits 0 (next build)
- [ ] Design lock: no colors outside --neon/--neon2/--bg/--bg2 palette

## Dependencies & Risks
- react-pdf: must be dynamic-imported with ssr:false — SSR will crash
- ActivityHeatmap SVG: test at mobile widths — may need horizontal scroll wrapper
- About page injection: inspect current page structure before adding sidebar slot
  to avoid breaking existing Framer Motion timeline animations
