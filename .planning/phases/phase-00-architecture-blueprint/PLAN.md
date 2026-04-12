# Phase 0: Site Architecture Blueprint

## Status: ✅ Reference Document — Not executable, guides all future phases

## Purpose
This document captures the complete intended architecture of the Neural Architect portfolio. Every future phase is planned against this blueprint. It will evolve but this is the starting canonical specification.

## Milestone Structure (Derived from Blueprint)

### M1: Foundation & Data Sync (Active)
Phases 1-4: Code hardening, GitHub sync, LinkedIn data, projects integration.

### M2: Interactive Experience
Phases 5-10: Terminal CLI, Now Page, Certificates, Role Customizer, Themes, Testimonials.

### M3: Cinematic Home & Core Pages
Full GSAP-driven home redesign, complete Projects (index + case studies), Blog system.

### M4: Monetization & Conversion
Services full build, /hire conversion page, /store product catalog + checkout.

### M5: AI & Platform Layer
/chat (AI version of Farhan), /tools (free AI micro-tools), /admin dashboard.

### M6: Community & Scale
/courses, /newsletter, /community, /uses, advanced blog features.

---

## Key Architecture Decisions

### Tech Stack (Locked)
- Framework: Next.js 16 App Router
- Styling: Tailwind CSS 3 + CSS variables for theming
- Animation: Framer Motion (component level) + GSAP (scroll-driven, page level)
- 3D: Three.js via @react-three/fiber
- Backend: Firebase Firestore (contact, store orders, analytics)
- Future backend: Supabase (AI embeddings via pgvector, newsletter, admin)
- Payments: Razorpay (India) + Stripe (international)
- Email: Resend + React Email
- AI: Claude/Gemini API + RAG pipeline

### Content Strategy
- Projects: Static JSON initially → GitHub API → Firestore CMS
- Blog: MDX files in /content/blog
- Store products: Firestore documents
- Now/Uses: Static JSON files (easy monthly updates)
- Availability: /public/status.json or env var

### Route Map
```
/ → Cinematic SPA home
/about
/projects → /projects/[slug]
/blog → /blog/[slug]
/store → /store/[slug]
/services
/hire
/uses
/now
/chat (AI)
/tools → /tools/[slug]
/courses
/newsletter
/community
/admin (auth-protected)
```

### Design System Principles
- All colors via CSS variables (enables multi-theme)
- Typography: Orbitron (headings/brand), Inter (body/UI)
- Motion: Enter animations always present, never on exit unless intentional
- Brand: Cyberpunk-mechanical — neon glows, scan lines, blueprint grids, glitch effects
- Accessibility: WCAG AA minimum, keyboard navigable, aria-live regions

---

## Home Page Section Order (Canonical)
1. LOADER — Boot sequence (once per session)
2. HERO — Name reveal, role typewriter, 3 CTAs, availability badge, stats strip
3. ABOUT PREVIEW — 2-line bio, 3 badges, link to /about
4. SKILLS — Interactive constellation map (not progress bars)
5. PROJECTS PREVIEW — 3 featured, horizontal scroll, 3D tilt
6. SERVICES PREVIEW — 4 cards, hover flip, book a call
7. TESTIMONIALS — Scrolling marquee + GitHub stats
8. BLOG PREVIEW — 3 latest posts
9. CONTACT INLINE — Multi-step form wizard
10. FOOTER — Logo, nav, social, IST clock, Spotify, version badge
