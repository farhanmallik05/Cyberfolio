## Last Updated: 2026-04-12
## Current State: ✅ Milestone 1 Complete — Data & Content Foundation
## Next Target: Phase 8 — Resume Role Customizer

---

## 🗓️ Milestone 0: Architecture & Foundation ✅

### Phase 0: Site Architecture Blueprint ✅
### Phase 1: Code Hardening — Linting & Styles ✅
### Phase 2: Bio & Social Update — GitHub Sync ✅

### Phase 2.5: Infrastructure Setup ✅
- **Status**: ✅ Complete
- **Scope**: Supabase project init, full database schema, Auth config, Storage buckets.
- **Why here**: All of M4, M5, M6 depend on Supabase.

---

## 🏗️ Milestone 1: Data & Content Foundation ✅

### Phase 3: LinkedIn Data Synchronization ✅
- **Status**: ✅ Complete
- **Scope**: Consolidated LI export (Experience, Education, Skills, Bio) merged into /data layer.
- **Reference**: [implementation_plan_data_sync.md](file:///c:/Users/farhan/.gemini/antigravity/brain/bd93a9ff-7cad-4415-b84c-a6a24f35a633/implementation_plan_data_sync.md)

### Phase 3.5: About Page Full Build ✅
- **Status**: ✅ Complete
- **Scope**: Initial About page with synthesized bio and high-fidelity timeline.

### Phase 4: Dynamic GitHub Projects Integration ✅
- **Status**: ✅ Complete
- **Scope**: GitHub API → Projects page live data. Repo cards with stars, forks, language stats. Auto-updates without touching code.

---

## 🎮 Milestone 2: Interactive Experience

### Phase 5: Interactive Terminal / CLI ✅
- **Status**: ✅ Complete
- **Scope**: Fake terminal with command registry. Commands: help, whoa, projects, skills, contact, hire, sudo hire, clear, easter egg. Keyboard history, tab completion.

### Phase 5.5: Social Hub (Neural Nodes) ✅
- **Status**: ✅ Complete
- **Scope**: /social route, regex-based link extraction from GitHub README, high-fidelity card grid system, donation link support.

### Phase 6: Now Page (/now) ✅
- **Status**: ✅ Complete
- **Scope**: /now route, 4 sections (building/learning/reading/listening), static JSON data source, IST clock widget, updated monthly.

### Phase 6.5: Uses Page (/uses) ✅
- **Status**: ✅ Complete
- **Scope**: Full stack/tools page. Hardware, dev tools, design tools, automation stack, productivity, hosting, learning resources. Each item: icon + name + description + link. "Why I use this" tooltip.
- **Why here**: Zero dependencies, 2-3 hour build. Adds immediate SEO value for developer tool searches. Complements /now page — same content category.

### Phase 7: Certificates & Achievements Wall ✅
- **Status**: ✅ Complete — phases/phase-07-certificates-achievements/PLAN.md
- **Scope**: 3D flip card grid, filter by category, verify links, Holopin badge integration.

### Phase 8: Resume Role Customizer
- **Status**: ⏳ Planned — phases/phase-08-resume-role-customizer/PLAN.md
- **Scope**: Role selector (Frontend / Automation / AI). Dynamic section reordering. Highlights relevant skills and projects per selected role.

### Phase 9: Multi-Theme System
- **Status**: ⏳ Planned — phases/phase-09-multi-theme-system/PLAN.md
- **Scope**: 4 themes via CSS variables: Cyber (default, UNCHANGED), Matrix, Minimal, Synthwave. localStorage persistence. Animated theme transition. ALSO includes Skill Constellation (SEED-002) — replaces progress bars with interactive node map.
- **Why SEED-002 here**: Both touch the skills component's CSS variables at the same time. Do once, correctly.
- **Blocks**: Phase 11 (themes must exist before cinematic home is built)

### Phase 10: Testimonials & Social Proof
- **Status**: ⏳ Planned — phases/phase-10-testimonials-social-proof/PLAN.md
- **Scope**: Scrolling marquee (infinite loop), live GitHub stats via API, Holopin badges. Real testimonial content from hackathon judges and teammates.
- **Why before Phase 11**: Cinematic home includes a testimonials strip. Must have real content before home is built — not placeholders.
- **Blocks**: Phase 11

---

## 🎬 Milestone 3: Cinematic Core

### Phase 11: Cinematic Home Redesign (GSAP)
- **Status**: ⏳ Planned — phases/phase-11-cinematic-home/PLAN.md
- **Scope**: Full GSAP scroll-driven home. Boot loader (once per session), hero typewriter cycling roles, constellation skills preview, projects horizontal scroll (3 featured), services preview (4 cards), testimonials strip, multi-step contact wizard, IST footer clock, stats strip with count-up. Includes: SEED-001 (availability badge), SEED-009 (Spotify footer), SEED-011 (Matrix rain).
- **Depends on**: Phase 9 (themes), Phase 5 (terminal), Phase 10 (testimonials content)
- **Theme note**: Cyber theme is default. All GSAP animations inherit CSS variables. Zero hardcoded colors.

### Phase 12: Projects Index + Case Studies
- **Status**: ⏳ Planned — phases/phase-12-projects-case-studies/PLAN.md
- **Scope**: /projects with GSAP FLIP filter, Fuse.js search, status badges, masonry grid. /projects/[slug] with scroll-scrubbed timeline, architecture diagrams, before/after comparisons, code snippets, Loom embed, related projects. Includes: SEED-003 (case studies), SEED-005 (drag canvas as projects variant).
- **Depends on**: Phase 4 (GitHub data)

### Phase 13: Blog System (MDX)
- **Status**: ⏳ Planned — phases/phase-13-blog-system/PLAN.md
- **Scope**: MDX blog with custom components (CodeBlock, Callout, Demo, Quote, Tweet), reading progress bar, sticky TOC, giscus comments, newsletter signup per post, OG image generation (SEED-017), RSS + JSON feed.
- **Why in M3 not M4**: SEO indexing takes 2-3 months. Every week delayed = weeks of lost organic traffic. Blog also feeds Phase 18 (AI Chat knowledge base). Publish early, publish often.
- **Blocks**: Phase 18 (AI Chat needs blog content)
- **Includes**: SEED-017 (OG image generator)

### Phase 14: About Page Expanded
- **Status**: ⏳ Planned — phases/phase-14-about-expanded/PLAN.md
- **Scope**: Expand Phase 3.5 About page. Add video introduction (muted autoplay), interactive draggable timeline, AI-powered Q&A section ("ask me anything"), working style card (async, deep work, etc).
- **Depends on**: Phase 3.5 (base about page), Phase 18 (AI Q&A needs chat infrastructure)
- **Note**: Phase 3.5 handles the full initial build. Phase 14 is the premium upgrade layer only.

---

## 💰 Milestone 4: Monetization & Conversion

### Phase 15: Services Full Build
- **Status**: ⏳ Planned — phases/phase-15-services/PLAN.md
- **Scope**: /services with 4 service blocks, how-it-works timeline, interactive pricing calculator (SEED-016), FAQ accordion, Cal.com booking embed (SEED-006).
- **Includes**: SEED-006 (booking calendar), SEED-016 (pricing calculator)

### Phase 16: /hire Conversion Page
- **Status**: ⏳ Planned — phases/phase-16-hire/PLAN.md
- **Scope**: Focused client conversion page. Live availability banner (SEED-001), engagement models, booking tiers, "send a brief" detailed form, client logos/testimonials block.

### Phase 17: Digital Store (/store)
- **Status**: ⏳ Planned — phases/phase-17-store/PLAN.md
- **Scope**: Product catalog, /store/[slug] pages, Razorpay/Stripe checkout, Supabase purchase tracking, Resend delivery emails, /store/success page, free lead magnets, SEED-015 (password protection for premium content).
- **Depends on**: Phase 2.5 (Supabase infrastructure)
- **Includes**: SEED-007 (expanded store), SEED-015 (password protection), SEED-013 (visitor counter — sales proof)

---

## 🤖 Milestone 5: AI & Platform Layer

### Phase 18: Free AI Micro-Tools (/tools)
- **Status**: ⏳ Planned — phases/phase-18-ai-tools/PLAN.md
- **Scope**: /tools index + 3 initial tool pages. Tools: prompt-optimizer, readme-generator, portfolio-roaster. Claude API powered. Usage counters in Supabase (SEED-013). Includes: SEED-012 (ambient sound toggle option).
- **Depends on**: Phase 2.5 (Supabase for counters)
- **Why before AI Chat**: Tools drive organic traffic. More users = more data on what developers want. Proves AI skill publicly before /chat launches.

### Phase 19: AI Chat — /chat (AI Farhan)
- **Status**: ⏳ Planned — phases/phase-19-ai-chat/PLAN.md
- **Scope**: RAG-powered chat responding as Farhan. Knowledge base: all projects, blog posts, services, FAQ, availability status. Supabase pgvector + streaming responses. Includes: SEED-008 (AI greeter on home).
- **Depends on**: Phase 2.5 (Supabase pgvector), Phase 13 (blog content), Phase 12 (project data)

### Phase 20: Admin Dashboard (/admin)
- **Status**: ⏳ Planned — phases/phase-20-admin/PLAN.md
- **Scope**: Supabase Auth protected. CMS for: blog posts (MDX editor), projects, availability status, store products, now page content. Analytics dashboard. Store orders list. Lead CRM. Includes: SEED-018 (public API endpoints).
- **Depends on**: Phase 2.5 (Supabase + Auth), all content phases (13, 15, 17)

---

## 🌐 Milestone 6: Community & Scale

### Phase 21: Newsletter System (/newsletter)
- **Status**: ⏳ Planned — phases/phase-21-newsletter/PLAN.md
- **Scope**: Resend + React Email + Supabase subscriber list. Signup page with value prop, sample issue preview, subscriber count. Unsubscribe handling. Archive of past issues. Includes: SEED-014 (podcast version of posts).
- **Depends on**: Phase 2.5 (Supabase subscribers)

### Phase 22: Course Platform (/courses)
- **Status**: ⏳ Planned — phases/phase-22-courses/PLAN.md
- **Scope**: Course index page. Initial redirect to Gumroad. Future self-hosted with Mux video. First course: n8n Automation Masterclass. Includes: SEED-010 (PWA — offline course access).
- **Depends on**: Phase 17 (store/payment system), Phase 21 (newsletter for launch)

### Phase 23: Community Hub (/community)
- **Status**: ⏳ Planned — phases/phase-23-community/PLAN.md
- **Scope**: Discord server links, open source contribution showcase, monthly challenge, community project gallery, job board.
- **Depends on**: Phase 21 (newsletter audience must exist before community is viable)

---

## 🔗 Dependency Chain (Critical — Read Before Starting Any Phase)

```
Phase 2.5 (Supabase)
    ├──→ Phase 17 (Store)
    ├──→ Phase 18 (AI Tools)
    ├──→ Phase 19 (AI Chat — pgvector)
    ├──→ Phase 20 (Admin — Auth)
    └──→ Phase 21 (Newsletter — subscribers)

Phase 3 (LinkedIn)
    └──→ Phase 3.5 (About Page)

Phase 3.5 (About)
    └──→ Phase 14 (About Expanded)

Phase 4 (GitHub)
    └──→ Phase 12 (Projects)

Phase 5 (Terminal)
    └──→ Phase 11 (Cinematic Home — boot loader)

Phase 9 (Themes)
    └──→ Phase 11 (Cinematic Home — CSS vars)

Phase 10 (Testimonials)
    └──→ Phase 11 (Cinematic Home — strip content)

Phase 12 (Projects)
    └──→ Phase 19 (AI Chat — project knowledge)

Phase 13 (Blog)
    └──→ Phase 18 (AI Chat — blog knowledge base)
    └──→ Phase 14 (About — AI Q&A needs chat infra)

Phase 17 (Store)
    └──→ Phase 22 (Courses — payment system)

Phase 20 (Admin)
    └──→ All content management

Phase 21 (Newsletter)
    └──→ Phase 22 (Courses — launch)
    └──→ Phase 23 (Community — audience)
```

---

## 🌱 Seeds Registry (Complete — 18 Seeds)

| ID | Feature | Resolved In | Phase |
|----|---------|-------------|-------|
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

---

> [!IMPORTANT]
> ## Correct Execution Order
>
> ### Pre-flight (completed):
> - [x] Dependency map in ROADMAP.md
> - [x] Theme checklist in all PLAN.md files
> - [x] All phase PLAN.md files created
> - [x] All 18 seeds planted
> - [x] Seed milestone assignments corrected
>
> ### Build in this exact order:
>
> 1.  Phase 2.5  — Supabase infrastructure (unlocks all database features)
> 2.  Phase 3    — LinkedIn data import
> 3.  Phase 3.5  — About page full build (use LinkedIn data immediately)
> 4.  Phase 4    — GitHub API integration
> 5.  Phase 5    — Interactive Terminal CLI (first major visual win)
> 6.  Phase 6    — Now page (/now)
> 7.  Phase 6.5  — Uses page (/uses)
> 8.  Phase 7    — Certificates wall
> 9.  Phase 8    — Resume role customizer
> 10. Phase 9    — Multi-theme system + Skill constellation (SEED-002)
> 11. Phase 10   — Testimonials + social proof (must exist before home)
> 12. Phase 11   — Cinematic home (GSAP) — BIGGEST visual milestone + SEED-001, 009, 011
> 13. Phase 12   — Projects + case studies + SEED-003, 005
> 14. Phase 13   — Blog system (MDX) — SEO CLOCK STARTS HERE + SEED-017
>
> ### After M3 is complete:
> 15. Phase 15   — Services + calculator + booking
> 16. Phase 16   — /hire conversion page
> 17. Phase 17   — Digital store
>
> ### After M4 is complete:
> 18. Phase 18   — AI tools (/tools)
> 19. Phase 19   — AI chat (/chat — AI Farhan)
> 20. Phase 20   — Admin dashboard
>
> ### After M5 is complete:
> 21. Phase 21   — Newsletter
> 22. Phase 22   — Courses
> 23. Phase 23   — Community hub
