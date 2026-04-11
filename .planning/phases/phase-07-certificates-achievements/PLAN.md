# Phase 7: Certificates & Achievements Wall

## Objective
Build a full-page grid of certificates, badges, and achievements with a 3D flip animation revealing details on the back (issuer, date, credential ID, verify link). Filterable by category.

## Acceptance Criteria
- [ ] Grid of certificate cards, 3-4 columns on desktop, 1-2 on mobile
- [ ] Front of card: certificate icon/logo, title, issuer name, category badge
- [ ] Back of card (on hover/click): full details — issuer, date, credential ID, verify link
- [ ] Flip animation is smooth and 3D (CSS `rotateY`)
- [ ] Category filter tabs: All, Development, Design, AI/ML, Achievements
- [ ] Hackathon badges and Hacktoberfest badges included
- [ ] Each card links to the original credential verification URL
- [ ] Page is accessible (keyboard navigable, aria labels on flip buttons)
- [ ] Data sourced from static JSON for easy updates

## Implementation Plan

### 1. Data Source: `src/data/certificates.json`
```json
[
  {
    "id": "hacktoberfest-2023",
    "title": "Hacktoberfest 2023",
    "issuer": "DigitalOcean",
    "date": "October 2023",
    "category": "Achievement",
    "credentialId": "",
    "verifyUrl": "https://holopin.io/@farhanmallik05",
    "icon": "🎃"
  }
]
```

### 2. Component: `CertificateCard.tsx`
- Uses CSS `perspective`, `transform-style: preserve-3d`, `rotateY(180deg)` on hover/active
- Front face: `.front` div
- Back face: `.back` div with `rotateY(180deg)` offset
- `useState(isFlipped)` — click to flip on mobile, hover on desktop
- `aria-label="Flip to see details"` button overlay

### 3. Page: `src/app/certificates/page.tsx`
- Filter state: `activeCategory`
- Filtered cards: `useState` filters `certificates.json`
- Animated filter transition via Framer Motion `AnimatePresence`
- Grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

### 4. CSS additions to globals.css
```css
.card-flip-container { perspective: 1000px; }
.card-inner { transform-style: preserve-3d; transition: transform 0.6s; }
.card-inner.flipped { transform: rotateY(180deg); }
.card-face { backface-visibility: hidden; }
.card-back { transform: rotateY(180deg); }
```

## Files to Create/Modify
- `src/app/certificates/page.tsx` [NEW]
- `src/components/ui/CertificateCard.tsx` [NEW]
- `src/data/certificates.json` [NEW]
- `src/components/Navbar.tsx` [MODIFY] — optional nav link
- `src/app/globals.css` [MODIFY] — flip card CSS

## Verification
- Hover/click each card flips correctly
- Filter tabs filter cards correctly
- Verify links open in new tab
- Mobile: click to flip works
- Keyboard: Tab focus + Enter triggers flip

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Certificate cards match glass style: background: var(--glass), border: 1px solid var(--border), backdrop-filter: blur(20px)
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
