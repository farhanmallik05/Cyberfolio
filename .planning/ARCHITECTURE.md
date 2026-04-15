# Neural Architect — Complete Site Architecture

## Extended, In-Depth & Future-Ready

---

## 🎨 DESIGN LOCK — NEVER CHANGE THESE

> **Every phase, component, page, and feature must conform to these values. No exceptions. No overrides.**

### Colors
```css
--neon:          #00F5FF  /* primary neon cyan */
--neon2:         #BF5FFF  /* secondary electric purple */
--bg:            #070C1A  /* deepest background */
--bg2:           #0D1425  /* card/panel background */
--glass:         rgba(0,245,255,0.04)
--glass2:        rgba(13,20,37,0.85)
--border:        rgba(0,245,255,0.15)
--text:          #C8D8E8  /* primary text */
--dim:           #5A7A9A  /* secondary/muted text */
```

### Gradient
```css
background: linear-gradient(#0A0F1F, #121A30);
```

### Typography
```
Headings:    Orbitron (weights: 400, 700, 900)
Monospace:   Share Tech Mono
Body:        Rajdhani (weights: 300, 400, 600, 700)
Source:      Google Fonts CDN
```

### Glow Patterns
```css
/* Standard */
box-shadow: 0 0 20px rgba(0,245,255,0.3);
/* Intense */
box-shadow: 0 0 40px rgba(0,245,255,0.6), 0 0 80px rgba(0,245,255,0.2);
/* Purple */
box-shadow: 0 0 20px rgba(191,95,255,0.3);
```

### Glassmorphism
```css
background: var(--glass);
border: 1px solid var(--border);
backdrop-filter: blur(20px);
```

### Card Hover
```css
border-color: rgba(0,245,255,0.3);
box-shadow: 0 0 30px rgba(0,245,255,0.08), 0 20px 60px rgba(0,0,0,0.4);
```

### Section Tags
```css
font-family: 'Share Tech Mono';
font-size: 11px;
color: var(--neon);
letter-spacing: 4px;
text-transform: uppercase;
```

### Protocol v12.0 — Viewport Priority
- **System**: Role-based content filtering expanded to 12 sectors + 'All'.
- **Trigger**: `RoleBadge` fixed bottom-left UI with scrollable popover.
- **State**: `RoleProvider` (Context) synchronizes UI roles with Skill sectors.
- **Persistence**: URL `?role=...` + LocalStorage sync.

### Section Format
`[glow-line][number — Name]` → Example: `▸▸ 01 — About`

### Buttons
```css
/* Primary */
background: var(--neon); color: var(--bg);
box-shadow: 0 0 25px rgba(0,245,255,0.4);
/* Outline */
border: 1px solid var(--neon); color: var(--neon);
/* Ghost */
border: 1px solid var(--neon2); color: var(--neon2);
```

### Layout
```
Section padding: 120px 60px 80px (desktop) / 100px 24px 60px (mobile)
Max width: 1400px centered
```

### Animation Timing
```
Standard:  0.8s ease
Fast:      0.3s ease
Slow:      1.2s cubic-bezier(0.16,1,0.3,1)
Elastic:   elastic.out(1, 0.5) — GSAP
```

### ⚡ Animation Ownership Matrix
- **GSAP**: Use for multi-element timelines, complex scroll-triggered effects, layout reordering (Flip), and WebGL/Three.js coordination.
- **Framer Motion**: Use for component-level entry animations, hover states, micro-interactions, modal transitions, and multi-step forms.
- **Rule**: If an animation spans more than 3 distinct components or relies on scroll position, it belongs in GSAP.

### 🚀 Performance & Accessibility Budget
- **Lighthouse Target**: Core Web Vitals ≥ 90 on all pages (75+ for Phase 11b WebGL home).
- **Reduced Motion**: All animations MUST check `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable heavy movements/parallax.
- **Hydration**: Prioritize server components; interactive elements must use `Suspense` with neon-skeleton fallback.
- **Breakpoint Freeze**: Mobile v2 is finalized; all new features prioritize Desktop (1024px+) with responsive fluid down-scaling.

---

---

```
/
│
├── 🏠 CORE EXPERIENCE
├── ⚡ PLATFORM LAYER  
├── 💰 MONETIZATION LAYER
├── 🤖 AI LAYER
├── 🌐 COMMUNITY LAYER
└── 🔧 SYSTEM LAYER
```

---

# 🏠 CORE EXPERIENCE

---

## `/` — The Cinematic Home

**Purpose:** First impression. Showroom. Brand statement.
**Experience:** Single page, scroll-driven, full GSAP animation suite.

### Sections in order:

```
01. LOADER
    └── Boot sequence terminal animation
    └── Logo glitch reveal
    └── Curtain split transition into hero
    └── sessionStorage check — shows once per session

02. HERO
    └── Animated name with neon mask reveal
    └── Role typewriter cycling:
        "AI Developer" → "Automation Architect" 
        → "UI/UX Designer" → "Neural Architect"
    └── Tagline with word-by-word stagger
    └── 3 CTAs: View Work / Hire Me / Download Resume
    └── Live availability badge (green/red, real-time)
    └── Scroll indicator with animated arrow
    └── WebGL shader background or Three.js neural object
    └── Stats strip: Projects / Years / Hackathons / Clients

03. ABOUT (PREVIEW)
    └── 2-line bio with text scramble reveal
    └── 3 highlight badges: Hackathon Finalist / 
        Hacktoberfest / Open Source
    └── "Learn More →" links to /about

04. SKILLS (VISUAL)
    └── **Constellation V2**: Responsive SVG architecture (unified Mobile/Desktop).
    └── **Interaction**: Click-to-lock nodes (persistent connections + labels).
    └── **Visuals**: Animated 'flowing beams' (dashed stoke offsets) for active data paths.
    └── **Logic**: O(1) SKILL_CAT lookup mapping for instant sector highlighting.
    └── **Zoom**: Smooth `viewBox` panning to focus on selected sectors.

05. PROJECTS (PREVIEW — 3 featured)
    └── Horizontal scroll on desktop
    └── Each card: title, stack, 1-line desc, live/github
    └── 3D tilt on hover
    └── "View All Projects →" → /projects

06. SERVICES (PREVIEW — 4 cards)
    └── Icon + title + 1-line + starting price
    └── Hover: card flips to show more detail
    └── "See Full Services →" → /services
    └── "Book a Call →" → opens calendar modal

07. TESTIMONIALS
    └── Scrolling marquee (infinite loop)
    └── Hackathon judge quotes
    └── Peer/teammate feedback
    └── GitHub contribution stats (live API)

08. BLOG (PREVIEW — 3 latest posts)
    └── Category tag + title + reading time
    └── Subtle image or emoji illustration
    └── "Read All Posts →" → /blog

09. CONTACT (INLINE)
    └── Multi-step form wizard
    └── Step 1: Project type
    └── Step 2: Budget range
    └── Step 3: Timeline
    └── Step 4: Message
    └── Step 5: Success animation
    └── Direct email + calendar booking link

10. FOOTER
    └── Logo + tagline
    └── Nav links
    └── Social links
    └── Live time (IST clock, real-time)
    └── Spotify now playing widget
    └── "Built with Next.js + GSAP" credit
    └── Version number (v3.0.0)
    └── Easter egg hint
```

### Future additions to home:
```
→ AI greeter: "Welcome back, [name]" for returning visitors
   (cookie-based, no login needed)
→ Cursor trail constellation that forms your initials
→ Ambient sound toggle (subtle synth hum)
→ Matrix rain easter egg on fast scroll
→ Visitor count: "Join 4,200+ developers who visited"
```

---

# ⚡ PLATFORM LAYER

---

## `/about` — Full About Page

```
SECTIONS:
├── Extended bio (500-800 words)
├── Philosophy / working style
├── Full education timeline
│   ├── B.Tech KCC (2024-2028)
│   ├── DAV Centenary School
│   └── Self-taught milestones
├── Experience timeline
│   ├── Freelance projects
│   ├── Hackathon history
│   └── Open source contributions
├── Personality section
│   ├── What I'm reading
│   ├── What I'm building
│   ├── What inspires me
│   └── Outside of code
├── Values section (3-4 principles)
├── Photo / avatar section
│   └── Animated glitch photo reveal
│   └── OR illustrated avatar
└── CTA: Work with me / Download resume
```

## `/projects` — Projects Index

```
LAYOUT:
├── Filter bar: All / Web Dev / Automation / AI / Design / Open Source
├── Sort: Latest / Most Complex / Featured
├── Search bar (fuzzy search, client-side — Fuse.js)
└── Project cards grid (masonry or uniform)

EACH CARD:
├── Project name, 1-line description, tech stack tags
├── Category badge, year, status: Live/In Progress/Archived
├── Thumbnail / mockup image
└── Links: Live Demo + GitHub + Case Study

INTERACTIONS:
├── GSAP FLIP filter animation (smooth reorder)
├── Hover: 3D tilt + glow border
└── Click: /projects/[slug] case study
```

## `/projects/[slug]` — Case Study

```
├── HERO: title, tagline, stack, year/duration/role, CTAs
├── OVERVIEW: problem, role, outcomes/metrics
├── PROCESS (scroll-scrubbed timeline): Research → Design → Dev → Deploy
├── TECHNICAL DEEP DIVE: architecture diagram, decisions, code snippets
├── VISUAL SHOWCASE: screenshots, mobile mockups, before/after, Loom video
├── RESULTS & METRICS: performance scores, user feedback, lessons
├── RELATED PROJECTS
└── CTA: Book a call
```

## `/blog` — Blog System

```
├── Featured post (hero size)
├── Category filter: All / AI / Automation / Web Dev / Career
├── Latest posts grid (2 large + 4 small)
├── Newsletter signup (inline)
└── Full-text search (Fuse.js)

EACH POST:
├── Category badge, title, excerpt, read time, date, thumbnail

POST PAGE (/blog/[slug]):
├── MDX with custom components (CodeBlock, Callout, Demo, Quote)
├── Reading progress bar
├── Sticky TOC sidebar
├── Like/reaction buttons (no login)
├── GitHub Discussions comments (giscus)
├── Related posts
└── Newsletter signup
```

## `/store` — Digital Products

```
├── Categories: Notion / Automation / Resume / Portfolio / Prompts / Courses
├── Product cards: preview image, title, price (INR+USD), sales count, buy button
├── Bundle deals, free lead magnets

PRODUCT PAGE (/store/[slug]):
├── Mockup carousel, video walkthrough
├── Razorpay/Stripe checkout
├── **Idempotency Logic**: Supabase `.upsert` with `onConflict: 'razorpay_payment_id'`.
├── **Shipping Trigger**: Resend delivery email fires ONLY if the upsert response indicates a newly created row (created_at == updated_at).
├── **Pricing Source of Truth**: Database stores prices in **INR**; USD is calculated monthly via edge function for global display.
├── Supabase purchase recording
├── Resend delivery email (time-limited signed URL)
└── /store/success?product=[slug] thank you page
```

## `/services` — Full Services

```
├── Availability banner (live)
├── Service blocks: Web Dev / Automation / UI/UX / AI
│   Each: included items, tech, timeline, starting price, book/examples CTAs
├── How it works timeline (5 steps)
├── Interactive pricing calculator
├── Past client work (anonymized)
├── FAQ accordion
└── Cal.com booking embed
```

## `/hire` — Conversion Page

```
├── Availability banner: "Currently accepting 2 new clients for May"
├── Who I work with: Startups / Agencies / Founders / Students
├── What you get: Direct comms, fast turnaround, full code ownership
├── Engagement models: Project / Hourly / Retainer / Consulting
├── Booking: quick call / discovery / strategy session
├── Send a brief (detailed form with budget, timeline, attachments)
└── Testimonials
```

## `/uses` — Stack & Tools

```
Categories: Hardware / Development / Design / Automation & AI / 
Productivity / Hosting & Infra / Communication / Learning

Each item: icon + name + "Why I use this" + link + affiliate label
└── Last updated date
```

## `/now` — Now Page

```
├── Currently Building (progress %)
├── Currently Learning
├── Currently Reading
├── Availability (freelance/collab/internship status)
├── Location & timezone (live IST clock)
├── Listening To (Spotify API)
├── Life stuff (1-2 personal sentences)
└── Last Updated date
```

---

# 🤖 AI LAYER

---

## `/chat` — AI Version of You

```
Responds AS Farhan (first person)
Knowledge base: resume, projects, blog posts, services, FAQ, availability
Tech: Claude/Gemini API + RAG + Supabase pgvector + streaming responses
├── **Sync Pipeline**: Weekly Cron job pulls latest blog posts & GitHub commits → embeds via OpenAI → upserts to pgvector.
├── **Confidence Fallback**: If RAG similarity score < 0.75, display: "I'm still learning that — please ask me directly via [Contact Form]."
└── **Suggested Prompts**: 2x3 grid of quick-start buttons (e.g. "What's his tech stack?", "Is he available?").
Sample: "What does he charge for a landing page?" → direct answer + book a call CTA
```

## `/tools` — Free AI Micro-Tools

```
├── /tools/prompt-optimizer
├── /tools/readme-generator
├── /tools/n8n-workflow-explainer
├── /tools/resume-analyzer
├── /tools/portfolio-roaster
└── /tools/tech-stack-picker

Each: clean UI, usage counter, share result, "Built by Farhan" → back to portfolio
├── **Viral Loops**: "Share Result" button generates custom OG image with user's tool results + "Try this tool at [brand-url]".
├── **Rate Limiting**: Hybrid approach. FingerprintJS (free users) + IP fallback; Auth required for 10+ uses/day.
SEO: each tool ranks for specific developer searches
```

---

# 💰 MONETIZATION LAYER

---

## `/courses` — Course Platform

```
Ideas: n8n Automation Masterclass / Docker Self-Host / Prompt Engineering / Portfolio Builder
Platform: Next.js + Supabase + Mux video OR redirect to Gumroad initially
Future: certificates, Discord community, live cohorts
```

---

# 🌐 COMMUNITY LAYER

---

## `/newsletter` — Email List

```
Stack: Resend + React Email + Supabase subscriber list
Content: weekly/biweekly — what I built, 1 automation tip, 1 AI tool, 1 resource
Signup: specific value prop, sample issue, subscriber count
```

## `/community` — Developer Hub

```
├── Discord server links
├── Open source contribution projects
├── Monthly challenge (automation / AI)
├── Community showcase
└── Job board (automation gigs)
```

---

# 🔧 SYSTEM LAYER

---

## `/admin` — Private Dashboard

```
Protected by Supabase Auth (admin role only)
├── Content management (blog, projects, availability, store, now page)
├── Analytics (page views, top sources, form submissions, revenue)
├── Store management (orders, delivery emails, discount codes)
└── Leads/enquiries (status: New / Replied / Converted, notes)
```

## System Routes

```
/sitemap.xml    /robots.txt    /rss.xml    /feed.json
/manifest.json  /og            /404        /500
/offline        /terms         /privacy    /refunds
/changelog      /backups       /api/og
```

### 🛠️ Infrastructure Standard
- **GitHub API**: Cache responses in Netlify Edge caching for 1 hour to prevent rate-limiting in production.
- **Database Backup**: Daily GitHub Action triggers pg_dump export to Supabase Storage bucket `/backups/db/`.
- **SEO Utilities**: Shared `generateMetadata` wrapper with JSON-LD Breadcrumb generation on all Platform Layer pages.

---

# 🗺️ COMPLETE SITEMAP

```
/
├── about
├── projects / projects/[slug]
├── blog / blog/[slug]
├── store / store/[slug]
├── services
├── hire
├── uses
├── now
├── chat
├── tools / tools/[slug]
├── courses
├── newsletter
├── community
├── api/available  api/stats  api/now
└── admin
```
