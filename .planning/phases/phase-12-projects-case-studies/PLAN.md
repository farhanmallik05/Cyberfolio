# Phase 12: Projects Index + Case Studies

## Objective
Rebuild /projects as a fully filterable, searchable, animated grid and create dynamic /projects/[slug] case study pages with a scroll-scrubbed process timeline.

## Acceptance Criteria

### Projects Index (/projects)
- [ ] Filter tabs: All / Web Dev / Automation / AI / Design / Open Source
- [ ] GSAP FLIP animation when filtering (cards smoothly reposition)
- [ ] Sort options: Latest / Featured / Most Complex
- [ ] Client-side search with Fuse.js (fuzzy match on title, description, tags)
- [ ] Each card: name, description, tech stack tags, category badge, year, status, thumbnail, Live/GitHub/Case Study links
- [ ] Featured projects: larger card treatment
- [ ] Hover: 3D tilt + glow border (mouse position → CSS transform)
- [ ] Status badges: Live (green) / In Progress (amber) / Archived (grey)
- [ ] Empty state when no filter results

### Case Study Pages (/projects/[slug])
- [ ] Dynamic route renders from `src/data/projects.json`
- [ ] HERO: title (animated reveal), tagline, tech stack badges, year/duration/role, Status badge, "Live Demo" + "GitHub" CTAs
- [ ] OVERVIEW: problem statement, my role, key outcomes/metrics
- [ ] PROCESS: scroll-scrubbed timeline (ScrollTrigger) — 4 phases: Research → Design → Dev → Deploy
- [ ] TECH DEEP DIVE: key decisions explained, challenges + solutions, code snippet blocks
- [ ] VISUAL SHOWCASE: screenshot carousel, mobile mockups
- [ ] RESULTS: performance scores, user feedback, "What I learned"
- [ ] RELATED PROJECTS: 2-3 similar project cards
- [ ] CTA: "Have a similar project? Let's talk" → /hire
- [ ] Proper metadata: title, description, OG image

### Data Structure
- [ ] `src/data/projects.json` — single source of truth
- [ ] Each project has: slug, title, tagline, description, tech[], category, year, status, featured (bool), thumbnailUrl, liveUrl, githubUrl, caseStudy (bool), overview, process[], techDetails, results

## Implementation Plan

### Data First
```json
// src/data/projects.json
[
  {
    "slug": "neural-architect-portfolio",
    "title": "Neural Architect Portfolio",
    "tagline": "Cyberpunk portfolio with full GSAP animation suite",
    "description": "Personal portfolio built with Next.js 16...",
    "tech": ["Next.js", "Three.js", "GSAP", "Firebase", "Tailwind"],
    "category": "Web Dev",
    "year": 2025,
    "status": "live",
    "featured": true,
    "thumbnail": "/projects/portfolio-thumb.png",
    "liveUrl": "https://farhanmallik.dev",
    "githubUrl": "https://github.com/farhanmallik05/portfolio",
    "caseStudy": true,
    "overview": {
      "problem": "...",
      "role": "Full-stack developer + designer",
      "outcomes": ["Achieved 95+ Lighthouse score", "...]
    },
    "process": [
      { "phase": "Research", "description": "...", "tools": ["Figma"] },
      ...
    ]
  }
]
```

### GSAP FLIP Filter
```tsx
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip);
// On filter change: snapshot → setState → Flip.from(snapshot)
```

### Fuse.js Search
```ts
import Fuse from 'fuse.js';
const fuse = new Fuse(projects, { keys: ['title', 'description', 'tech'] });
const results = fuse.search(query).map(r => r.item);
```

### 3D Tilt
```tsx
// onMouseMove on card: calculate mouse offset from card center
// apply: rotateX, rotateY via CSS transform
// useRef + addEventListener (not JSX onMouseMove for perf)
```

## Files to Create/Modify
- `src/data/projects.json` [NEW]
- `src/app/projects/page.tsx` [MODIFY — full rebuild]
- `src/app/projects/[slug]/page.tsx` [NEW]
- `src/components/ui/ProjectCard.tsx` [MODIFY — add 3D tilt, status badge]
- `src/components/projects/FilterBar.tsx` [NEW]
- `src/components/projects/ProcessTimeline.tsx` [NEW]
- `src/components/projects/ScreenshotCarousel.tsx` [NEW]

## Dependencies
- Phase 4 (GitHub data) can later replace/augment the static JSON
- Fuse.js: `npm install fuse.js`
- GSAP FLIP plugin: already in GSAP package

## Verification
- All filter tabs filter correctly
- GSAP FLIP animation plays (no layout jumps)
- Fuse.js search returns relevant results
- Empty state shows when no results
- Navigate to /projects/[slug] for a project with caseStudy: true
- Scroll through case study — process timeline animates with scroll
- 3D tilt works on hover on desktop
- Mobile: tilt disabled, touch-friendly
- No broken images (use placeholder if thumbnails not ready)

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Project cards match glass style: background: var(--glass), border: 1px solid var(--border), backdrop-filter: blur(20px)
- [ ] Headings use Orbitron
- [ ] Monospace/code elements use Share Tech Mono
- [ ] Body text uses Rajdhani
- [ ] 3D tilt glow uses CSS variable: box-shadow: 0 0 30px rgba(0,245,255,0.08)
- [ ] Status badges use CSS variables for colors
- [ ] Cyber theme is default and unchanged
- [ ] No hardcoded hex colors — CSS variables only
- [ ] Tested visually against adjacent sections
- [ ] Mobile responsive: 768px and 480px tested
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] Phase 4 (GitHub API) complete
- [ ] Fuse.js installed: `npm install fuse.js`
- [ ] GSAP FLIP plugin available (bundled with GSAP)
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
