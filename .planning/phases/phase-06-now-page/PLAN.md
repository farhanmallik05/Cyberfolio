# Phase 6: Now Page (/now)

## Objective
Build a `/now` page that shows what Farhan is currently working on, learning, reading, and listening to. Updated monthly, makes the portfolio feel alive and human.

## Acceptance Criteria
- [ ] Route `/now` exists and renders without errors
- [ ] Page has 4 sections: Working On, Learning, Reading, Listening To
- [ ] Each item has an icon, title, optional description, and optional link
- [ ] A "Last Updated" date is visible at the top
- [ ] Data is sourced from a static JSON file (easy to update monthly)
- [ ] Page fits the Neural Architect aesthetic (MechPanel cards, Orbitron headings)
- [ ] Navbar links to /now
- [ ] Page has proper metadata (title, description) for SEO

## Implementation Plan

### 1. Data Source: `src/data/now.json`
```json
{
  "lastUpdated": "April 2026",
  "working": [
    { "title": "Neural Architect Portfolio", "description": "Building this portfolio", "link": "/" }
  ],
  "learning": [
    { "title": "Three.js Advanced Techniques", "description": "WebGL shaders and particle systems" }
  ],
  "reading": [
    { "title": "The Pragmatic Programmer", "author": "Hunt & Thomas" }
  ],
  "listening": [
    { "title": "Syntax.fm", "type": "podcast" }
  ]
}
```

### 2. Page: `src/app/now/page.tsx`
- Import `now.json`
- Static rendering (no `use client` needed unless adding animations)
- Sections rendered as MechPanel cards
- Terminal-style section headers (e.g., `> CURRENT_PROCESSES`)
- Last updated badge in top right

### 3. Styling
- Section icons: Lucide icons (Code2, BookOpen, Headphones, Cpu)
- "Now" badge: blinking pulse dot next to title (like live indicator)
- Items: small cards with subtle left-border accent colors per category

### 4. Integration
- Add `/now` to Navbar `navItems` array
- Add `terminal` command handler to link to /now
- Add footer link to /now

## Files to Create/Modify
- `src/app/now/page.tsx` [NEW]
- `src/data/now.json` [NEW]
- `src/components/Navbar.tsx` [MODIFY] — add Now nav item
- `src/components/Footer.tsx` [MODIFY] — add Now footer link

## Verification
- Navigate to /now — page renders
- Check all 4 sections display
- Verify "Last Updated" shows correct date
- Check mobile layout
- Run next build with no errors

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Now page cards match glass style: background: var(--glass), border: 1px solid var(--border), backdrop-filter: blur(20px)
- [ ] Headings use Orbitron
- [ ] Monospace/code elements use Share Tech Mono
- [ ] Body text uses Rajdhani
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Cyber theme is default and unchanged
- [ ] No hardcoded hex colors — CSS variables only
- [ ] Tested visually against adjacent sections
- [ ] Mobile responsive: 768px and 480px tested
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] All listed phase dependencies are complete
- [ ] Feature flags set if experimental
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
