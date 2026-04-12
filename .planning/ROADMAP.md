## Last Updated: 2026-04-12
## Current State: ⏳ Milestone 3 In Progress — Cinematic Core
## Next Target: Phase 12 — Projects Index + Case Studies

---

## 🗓️ Milestone 0: Architecture & Foundation ✅

### Phase 0: Site Architecture Blueprint ✅
### Phase 1: Code Hardening — Linting & Styles ✅
### Phase 2: Bio & Social Update — GitHub Sync ✅

### Phase 2.5: Infrastructure Setup (M) ✅
- **Status**: ✅ Complete
- **Scope**: Supabase project init, full database schema, Auth config, Storage buckets.
- **Why here**: All of M4, M5, M6 depend on Supabase.

---

## 🏗️ Milestone 1: Data & Content Foundation ✅

### Phase 3: LinkedIn Data Synchronization (S) ✅
- **Status**: ✅ Complete
- **Scope**: Consolidated LI export (Experience, Education, Skills, Bio) merged into /data layer.

### Phase 3.5: About Page Full Build (M) ✅
- **Status**: ✅ Complete
- **Scope**: Initial About page with synthesized bio and high-fidelity timeline.

### Phase 4: Dynamic GitHub Projects Integration (S) ✅
- **Status**: ✅ Complete
- **Scope**: GitHub API → Projects page live data. Repo cards with stars, forks, language stats. Auto-updates without touching code.

---

## 🎮 Milestone 2: Interactive Experience ✅

### Phase 5: Interactive Terminal / CLI (M) ✅
- **Status**: ✅ Complete
- **Scope**: Fake terminal with command registry. Commands: help, whoa, projects, skills, contact, hire, sudo hire, clear, easter egg. Keyboard history, tab completion.

### Phase 5.5: Social Hub (S) ✅
- **Status**: ✅ Complete
- **Scope**: /social route, regex-based link extraction from GitHub README, high-fidelity card grid system.

### Phase 6: Now Page (/now) (S) ✅
- **Status**: ✅ Complete
- **Scope**: /now route, 4 sections (building/learning/reading/listening), static JSON data source, IST clock widget.

### Phase 6.5: Uses Page (/uses) (S) ✅
- **Status**: ✅ Complete
- **Scope**: Full stack/tools page. Hardware, dev tools, design tools, automation stack.

### Phase 7: Certificates & Achievements (S) ✅
- **Status**: ✅ Complete
- **Scope**: 3D flip-card wall for credentials with categorical filtering.

### Phase 8: Resume Role Customizer (M) ✅
- **Status**: ✅ Complete
- **Scope**: Real-time role switching (Frontend/AI/Fullstack) with constellation skill sync.

### Phase 9: Multi-Theme System (M) ✅
- **Status**: ✅ Complete
- **Scope**: Inferno/Arctic/Cyber themes with full CSS variable mapping.

### Phase 10: Testimonials & Social Proof (S) ✅
- **Status**: ✅ Complete
- **Scope**: Infinite marquee, live GitHub stats bar.

---

## 🎬 Milestone 3: Cinematic Core

### Phase 11: Cinematic Home Redesign (XL) ✅
- **Status**: ✅ Complete
- **Scope**: Reconstructed homepage with GSAP. Hero typewriter, about preview, projects strip, services preview, contact wizard, boot loader, WebGL background, and Matrix easter egg.

### Phase 12: Projects Index + Case Studies (L)
- **Status**: ⏳ Planned
- **Scope**: /projects transition grid, /projects/[slug] scroll-scrubbed case studies.

### Phase 13: Blog System (MDX) (L)
- **Status**: ⏳ Planned
- **Scope**: MDX blog, reading progress, stick TOC, giscus comments, OG image generator.

### Phase 13.5: Minimal Admin Panel (S)
- **Status**: ⏳ Planned
- **Scope**: Availability toggle, blog list draft/publish toggle.

### Phase 14: About Page Expanded (L)
- **Status**: ⏳ Planned
- **Scope**: Video intro, interactive timeline, AI-powered Q&A section.

### Phase 14.5: System Performance & Asset Optimization (M)
- **Status**: ⏳ Planned — phases/phase-14-5-optimization/PLAN.md
- **Scope**: Production hardening. Lazy load Three.js components, compress static assets (WebP/AVIF), implementation of Supabase cache for GitHub API, dynamic imports for heavy GSAP modules.

---

## 💰 Milestone 4: Monetization & Conversion

### Phase 15: Services Full Build (M)
- **Status**: ⏳ Planned
- **Scope**: /services with blocks, interactive pricing calculator, Cal.com booking.

### Phase 16: /hire Conversion Page (S)
- **Status**: ⏳ Planned
- **Scope**: Conversion-focused landing for agencies/clients.

### Phase 17: Digital Store (/store) (XL)
- **Status**: ⏳ Planned
- **Scope**: Product catalog, Razorpay checkout, Supabase purchase tracking.

---

## 🤖 Milestone 5: AI & Platform Layer

### Phase 18: Free AI Micro-Tools (/tools) (L)
- **Status**: ⏳ Planned
- **Scope**: prompt-optimizer, readme-generator, portfolio-roaster. Claude API powered.

### Phase 19: AI Chat — /chat (AI Farhan) (XL)
- **Status**: ⏳ Planned
- **Scope**: RAG-powered chat responding as Farhan. Knowledge base: all projects, blog posts, services.

### Phase 20: Admin Dashboard (/admin) (XL)
- **Status**: ⏳ Planned
- **Scope**: Full CMS for blog, projects, availability, and store orders.

---

## 🌐 Milestone 6: Community & Scale

### Phase 21: Newsletter System (/newsletter) (M)
- **Status**: ⏳ Planned
- **Scope**: Resend + React Email + Supabase subscriber list.

### Phase 22: Course Platform (/courses) (L)
- **Status**: ⏳ Planned
- **Scope**: Course index page, future self-hosted with Mux video.

### Phase 23: Community Hub (/community) (M)
- **Status**: ⏳ Planned
- **Scope**: Discord server links, open source contribution showcase, job board.

### Phase 24: DSA Arena + Resume + Codolio Integration (M)
- **Status**: ⏳ Planned — phases/24-dsa-arena-resume-codolio-integration/PLAN.md
- **Scope**: Three interconnected deliverables:
  1. **`/resume`** — Interactive resume page seeded from resume data (Farhan Mallik). Displays objective, skills, education, experience, projects, achievements. Role-aware (mirrors Role Customizer). Download PDF CTA.
  2. **`/dsa`** — Dedicated DSA Arena page. Displays languages practised (#JAVA, #C++, #DSA, #MYSQL, #PYTHON3, #CP). Stat cards: Questions Solved, Active Days, Streak. Difficulty heatmap. Platform links (LeetCode, CodeChef, HackerRank).
  3. **Codolio Widget** — Embeds the Codolio card (`https://codolio.com/profile/farhanmallik/card`) either as an iframe widget or replicates card data via the Codolio public profile URL. Placement: DSA page + About page sidebar.
- **Depends on**: Phase 14 (About Expanded — shares timeline)
- **Data Source**: `src/data/resume.ts` (new) + Codolio public profile URL

---

## 🌱 Seeds Registry

| ID | Feature | Phase | Milestone |
|----|---------|-------|-----------|
| SEED-001 | Live Availability Status | Phase 11 | M3 |
| SEED-002 | Tech Radar / Skill Constellation | Phase 9 | M2 |
| SEED-003 | Case Studies Deep Dive | Phase 12 | M3 |
| SEED-004 | Uses / Stack Page | Phase 6.5 | M2 |
| SEED-005 | Drag-to-Explore Canvas | Phase 12 | M3 |
| SEED-006 | Consulting Booking Calendar | Phase 15 | M4 |
| SEED-007 | Digital Product Store Expanded | Phase 17 | M4 |
| SEED-008 | AI Greeter + Cursor "FM" | Phase 19 | M5 |
| SEED-009 | Spotify Now Playing | Phase 11 | M3 |
| SEED-010 | PWA + Offline Support | Phase 22 | M6 |
| SEED-011 | Matrix Rain Easter Egg | Phase 11 | M3 |
| SEED-012 | Ambient Sound Toggle | Phase 18 | M5 |
| SEED-013 | Visitor / Usage Counter | Phase 18 | M5 |
| SEED-014 | Podcast Version of Posts | Phase 21 | M6 |
| SEED-015 | Password Protected Pages | Phase 17 | M4 |
| SEED-016 | Pricing Calculator | Phase 15 | M4 |
| SEED-017 | OG Image Generator | Phase 13 | M3 |
| SEED-018 | Public API (/api/*) | Phase 20 | M5 |
