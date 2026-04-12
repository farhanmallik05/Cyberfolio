# Phase 24: DSA Arena + Resume + Codolio Integration

## Overview

This phase adds three interconnected feature areas to the Neural Architect portfolio:

1. **`/resume`** — A full interactive resume page that replaces a static PDF dump with a role-aware, cyber-styled breakdown of Farhan Mallik's credentials, skills, experience, and projects.
2. **`/dsa`** — A dedicated DSA Arena page showcasing competitive programming activity, Codolio stats, platform breakdown, and language proficiency.
3. **Codolio Widget** — Embeds or replicates the Codolio profile card for social proof on both the DSA page and About page.

---

## Data Sources

### Resume (from image — 2026-04-12)

| Field | Value |
|-------|-------|
| Name | FARHAN MALLIK |
| Phone | 7988009083 |
| Email | farhanmallick2005@gmail.com |
| Blog | farhanmallik.blogspot.com |
| LinkedIn | @farhanmallik |

**Education**
- B.Tech — KCC Institute of Technology & Management (2024–2028)
- 12th — D.A.V. Centenary Public School, Rohtak (2023)
- 10th — D.A.V. Centenary Public School, Rohtak (2021)

**Experience**
- Hacktober Fest — Open Source Contributor (Oct 2025)

**Projects**
- Edu-Tech Website (Techverse): Techverse helps students learn technology, AI, and programming in a science-backed way
- n8n and Automation Script: Self-hosted various softwares with Docker and content automation using n8n

**Skills** (from resume)
- Python (pandas, numpy, matplotlib, tkinter)
- Web Dev (HTML, CSS, JavaScript, React, vibe coding)
- Linux (bash, terminal)
- UI/UX (Canva, Figma, Stitch)
- Prompt Engineering, Gen AI, n8n, automation scripting

**Achievements**
- Finalist in Paranox Hackathon
- Finalist in Buildathon 1.0 KCC

**Interests**: Graphic Design, Artificial Intelligence, Blockchain/web3

### Codolio (from https://codolio.com/profile/farhanmallik)

| Field | Value |
|-------|-------|
| Profile URL | https://codolio.com/profile/farhanmallik |
| Card URL | https://codolio.com/profile/farhanmallik/card |
| GitHub | farhanmallik05 |
| Tags | #JAVA #C++ #DSA #MYSQL #PYTHON3 #CP |
| Note | Stats (Questions Solved, Active Days, Contributions) require client-side JS — will need iframe or manual seeding |

---

## Deliverables

### Deliverable 1: `/resume` Page

**Route**: `src/app/resume/page.tsx`
**Components** (`src/components/resume/`):
- `ResumeHeader.tsx` — Name, title, photo placeholder, contact strip
- `ResumeSection.tsx` — Reusable cyber-styled section block
- `ResumeTimeline.tsx` — Education + Experience timeline (reuse from About page style)
- `ResumeSkillChips.tsx` — Skill tag cloud (filterable by category)
- `ResumeProjects.tsx` — Mini project cards (Edu-Tech, n8n, etc.)
- `ResumeAchievements.tsx` — Hackathon badge strip

**Data**: `src/data/resume.ts` (new file — typed TS module)

**Features**:
- Role-aware sections (synced with `RoleContext` from Phase 8)
- "Download PDF" CTA → `/public/farhan-mallik-resume.pdf`
- Print-friendly CSS (`@media print`) variant
- Linked from Navbar and Hero CTA

---

### Deliverable 2: `/dsa` Page — DSA Arena

**Route**: `src/app/dsa/page.tsx`
**Components** (`src/components/dsa/`):
- `DSAHero.tsx` — Page header with radar/circuit background, bio: "#DSA #CP #PYTHON3 #C++ #JAVA"
- `CodolioCard.tsx` — Embeds or replicates the Codolio card
- `DSAStatCards.tsx` — Stat strip: Questions Solved / Active Days / Streak / Contributions
- `LanguageBreakdown.tsx` — Language proficiency bar/ring chart
- `PlatformLinks.tsx` — Cards linking to LeetCode, CodeChef, HackerRank, Codolio
- `DSAActivityHeatmap.tsx` — GitHub-style activity grid (Codolio API or manually seeded)

**Data**: `src/data/dsa.ts` (new — seeded from Codolio card + manual entries)

**Features**:
- Codolio card embed as iframe widget (`https://codolio.com/profile/farhanmallik/card`)
- Manual stat seeding fallback if Codolio API unavailable
- Platform link cards with glow hover effects
- GSAP fade-in entry animations

---

### Deliverable 3: Codolio Widget Integration

**Placement**:
- `/dsa` page (primary)
- `/about` page sidebar (secondary — Phase 14 hook)

**Implementation Options** (decide at planning):
- Option A: `<iframe src="https://codolio.com/profile/farhanmallik/card" />` styled with border + glassmorphism frame
- Option B: Replicate card data manually in `src/data/dsa.ts` with a styled React component matching the Codolio card aesthetic

**Recommendation**: Option A for `/dsa` (no maintenance), Option B for sidebar (smaller footprint).

---

## Navigation Updates

- Add `/resume` to `Navbar.tsx` (under "More" or direct link)
- Add `/dsa` to `Navbar.tsx`
- Terminal commands: `dsa` → opens `/dsa`, `resume` → opens `/resume`
- Hero CTA: "Download Resume" → `/resume` (soft-link) + direct PDF download

---

## Implementation Plan

### Wave 1 — Data Layer
- [ ] Create `src/data/resume.ts` (typed module seeded from resume image)
- [ ] Create `src/data/dsa.ts` (seeded from Codolio card + manual)
- [ ] Upload `/public/farhan-mallik-resume.pdf`

### Wave 2 — Resume Page
- [ ] `src/app/resume/page.tsx`
- [ ] `ResumeHeader`, `ResumeTimeline`, `ResumeSkillChips`, `ResumeProjects`, `ResumeAchievements`
- [ ] CSS Modules for each component
- [ ] Print-friendly `@media print` variant

### Wave 3 — DSA Arena Page
- [ ] `src/app/dsa/page.tsx`
- [ ] `DSAHero`, `CodolioCard`, `DSAStatCards`, `LanguageBreakdown`, `PlatformLinks`
- [ ] Codolio iframe widget integration
- [ ] GSAP entry animations

### Wave 4 — Navigation & Hooks
- [ ] Add `/resume` and `/dsa` to `Navbar.tsx`
- [ ] Add terminal commands: `dsa`, `resume`
- [ ] Hero CTA update

---

## UAT Criteria

| Test | Expected |
|------|----------|
| `/resume` renders with all data | ✅ All sections visible |
| Role switching updates resume | ✅ Highlighted sections change |
| "Download PDF" CTA | ✅ Opens/downloads the PDF |
| `/dsa` renders Codolio card | ✅ Iframe loads or fallback renders |
| DSA stat cards visible | ✅ Numbers show correctly |
| Language breakdown correct | ✅ Matches Codolio tags |
| Platform links open correctly | ✅ External links open in new tab |
| Both routes in Navbar | ✅ Accessible |
| Terminal `dsa` command | ✅ Navigates to /dsa |

---

## Estimated Complexity: M (Medium)
## Milestone: M6 (Community & Scale — or pull into M3 if prioritized)
