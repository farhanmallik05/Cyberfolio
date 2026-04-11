# Phase 11: Cinematic Home Redesign (GSAP)

## Objective
Transform the current homepage into a full scroll-driven, GSAP-animated cinematic experience. Every section has an entrance animation. The page feels like a showreel, not a static layout.

## Acceptance Criteria

### Boot Loader
- [ ] Terminal boot sequence plays once per session (sessionStorage flag)
- [ ] Logo glitch reveal after boot text completes
- [ ] "Curtain split" transition into hero
- [ ] Skippable via Escape or click

### Hero Section
- [ ] Name reveals with neon mask animation (GSAP clip-path or mask)
- [ ] Role typewriter cycles: "AI Developer" → "Automation Architect" → "UI/UX Designer" → "Neural Architect"
- [ ] Tagline word-by-word stagger animation
- [ ] 3 CTAs: "View Work" → /projects, "Hire Me" → /hire, "Download Resume" (PDF)
- [ ] Live availability badge (green/red from /public/status.json)
- [ ] Stats strip: Projects / Years / Hackathons / Clients (count-up animation on load)
- [ ] Animated scroll indicator arrow

### About Preview Section
- [ ] 2-line bio with text scramble reveal (GSAP SplitText or custom)
- [ ] 3 highlight badges: Hackathon Finalist / Hacktoberfest / Open Source
- [ ] "Learn More →" links to /about

### Projects Preview Section
- [ ] 3 featured projects (from static data or GitHub API)
- [ ] Horizontal scroll on desktop
- [ ] 3D tilt on hover (mouse position → transform)
- [ ] Each card: title, stack tags, 1-line desc, live/github links
- [ ] "View All Projects →" → /projects

### Services Preview Section
- [ ] 4 service cards: icon + title + 1-line + starting price
- [ ] Hover: card flip to show more detail
- [ ] "See Full Services →" → /services
- [ ] "Book a Call →" → opens Cal.com modal or /services

### Contact Multi-Step Wizard
- [ ] Replace current simple form with 5-step wizard
- [ ] Step 1: Project type (select), Step 2: Budget, Step 3: Timeline, Step 4: Message, Step 5: Success animation
- [ ] Steps use Framer Motion for slide transitions
- [ ] Connects to existing Firebase contact submission

### Footer Enhancements
- [ ] Live IST clock (real-time, updates every second)
- [ ] "Built with Next.js + GSAP" credit
- [ ] v3.0.0 version badge
- [ ] Easter egg hint text (e.g., "try typing 'sudo rm -rf /")

## Implementation Plan

### GSAP Setup
- GSAP 3 is already installed
- Use `gsap.registerPlugin(ScrollTrigger, SplitText)` in a client component
- All GSAP animations in `useEffect` with cleanup
- `useRef` for each section container as ScrollTrigger anchor

### Component Structure
```
src/
├── components/
│   ├── home/
│   │   ├── BootLoader.tsx       [NEW]
│   │   ├── HeroSection.tsx      [NEW]
│   │   ├── AboutPreview.tsx     [NEW]
│   │   ├── ProjectsPreview.tsx  [NEW]
│   │   ├── ServicesPreview.tsx  [NEW]
│   │   ├── ContactWizard.tsx    [NEW]
│   │   └── StatsStrip.tsx       [NEW]
└── app/page.tsx                 [MODIFY — compose sections]
```

### Availability Status
- `public/status.json`: `{ "available": true, "message": "Open to freelance" }`
- API route: `/api/available` — reads status.json
- Hero badge: fetches on mount, shows 🟢/🔴 with pulse animation

### Resume PDF
- Place in `/public/farhan-mallik-resume.pdf`
- Download link: `<a href="/farhan-mallik-resume.pdf" download>`

## Files to Create/Modify
- `src/components/home/BootLoader.tsx` [NEW]
- `src/components/home/HeroSection.tsx` [NEW]
- `src/components/home/AboutPreview.tsx` [NEW]
- `src/components/home/ProjectsPreview.tsx` [NEW]
- `src/components/home/ServicesPreview.tsx` [NEW]
- `src/components/home/ContactWizard.tsx` [NEW]
- `src/components/home/StatsStrip.tsx` [NEW]
- `src/app/api/available/route.ts` [NEW]
- `public/status.json` [NEW]
- `public/farhan-mallik-resume.pdf` [ADD — user provides]
- `src/app/page.tsx` [MODIFY — compose all home sections]
- `src/components/Footer.tsx` [MODIFY — IST clock, version badge]

## Verification
- Boot loader plays on first visit, skips on return within session
- All GSAP animations trigger correctly on scroll
- Hero typewriter cycles all 4 roles
- Stats count-up works
- Availability badge reads from status.json
- Contact wizard submits to Firebase (existing flow)
- Footer IST clock updates every second
- Mobile layout tested on 375px, 768px
- No console errors from GSAP

## Dependencies
- Phase 9 (themes) should be done first for smooth theming
- GSAP already installed (v3.14.2)
- SplitText plugin: bundled with GSAP 3 (check license — GSAP Club required for SplitText in prod OR use custom split approach)

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] All GSAP animations use CSS variables for colors — zero hardcoded hex
- [ ] Boot loader uses Share Tech Mono for terminal text
- [ ] Hero section headings use Orbitron
- [ ] Body text uses Rajdhani
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Cyber theme is default and unchanged
- [ ] All sections inherit theme via CSS variables (themes from Phase 9)
- [ ] No hardcoded hex colors — CSS variables only
- [ ] Tested visually against design lock specifications
- [ ] Mobile responsive: 375px, 768px, and 480px tested
- [ ] No layout shifts introduced globally
- [ ] SEED-001 (availability) reads from CSS variables for badge colors
- [ ] SEED-009 (Spotify) widget matches glass panel style
- [ ] SEED-011 (Matrix rain) uses --neon color

## Dependency Check
- [ ] Phase 9 (themes) complete — CSS variables system ready
- [ ] Phase 5 (terminal) complete — boot loader references terminal
- [ ] Phase 10 (testimonials) complete — real content for strip
- [ ] Resume PDF at /public/farhan-mallik-resume.pdf
- [ ] public/status.json created
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
