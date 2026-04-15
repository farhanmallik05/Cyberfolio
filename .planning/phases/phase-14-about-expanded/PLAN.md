# Phase 14: About Page — Expanded (Premium Layer)

## Scope
This is NOT the initial About build (that's Phase 3.5). This phase adds premium features on top of the existing About page.
*Note: The AI Q&A Widget previously designated for this phase has been **deferred** to Phase 19 (AI Chat) per architectural review.*

## Features
- Video introduction (30-60 seconds, muted autoplay, Loom or uploaded native video)
- Interactive draggable timeline (drag to explore education/experience — replaces static timeline from Phase 3.5)
- Working style card (INTJ / Deep Work / Async-first / Night owl)
- Personality type badges
- "Outside of code" section with hobbies and interests

## Component Breakdown
1. **`TimelineInteractive.tsx`**: A client side component wrapping `aboutData.experience` / `aboutData.academicRecord` mapped dynamically to a scrollable/draggable horizontal flex pane using `GSAP Draggable`.
2. **`BioVideoPulse.tsx`**: A specialized client-side wrapper embedding the introductory footage. It will hover above or next to the main bio and feature a subtle pulse glow matching `var(--neon)`.
3. **`PersonalityMetrics.tsx`**: Add badges and layout cards for work style inside the bottom grid using `MechPanel.tsx`.

## Design Rules
- Video player uses neon-bordered glass panel
- Draggable timeline uses GSAP Draggable plugin and `useGSAP` hook for App router compatibility.
- Working style card uses existing card glass style (`MechPanel`)

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Headings use Orbitron, Mono labels use Share Tech Mono, Body text uses Rajdhani
- [ ] Mobile responsive at 768px and 480px
- [ ] No hardcoded hex colors — CSS variables only

## Dependency Check
- [ ] Phase 3.5 (base About page) complete
- [x] ~~Phase 19 (AI Chat) complete~~ (Deferred to Phase 19 execution module)
- [ ] GSAP + Draggable plugin configured.
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
