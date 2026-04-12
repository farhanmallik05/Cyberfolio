# Phase 14: About Page — Expanded (Premium Layer)

## Scope
This is NOT the initial About build (that's Phase 3.5). This phase adds premium features on top of the existing About page.

## Features
- Video introduction (30-60 seconds, muted autoplay, Loom or uploaded)
- Interactive draggable timeline (drag to explore education/experience — replaces static timeline from Phase 3.5)
- AI-powered "Ask me anything" Q&A section (powered by Phase 19 AI Chat infrastructure)
- Working style card (INTJ / Deep Work / Async-first / Night owl)
- Personality type badges
- "Outside of code" section with hobbies and interests

## Design Rules
- Video player uses neon-bordered glass panel
- Draggable timeline uses GSAP Draggable plugin
- AI Q&A section embeds a mini version of /chat UI
- Working style card uses existing card glass style

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Video player styled with neon glow border
- [ ] Headings use Orbitron
- [ ] Mono labels use Share Tech Mono
- [ ] Body text uses Rajdhani
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Cyber theme default and unchanged
- [ ] Mobile responsive at 768px and 480px
- [ ] No hardcoded hex colors — CSS variables only
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] Phase 3.5 (base About page) complete
- [ ] Phase 19 (AI Chat) complete — for AI Q&A feature
- [ ] GSAP Draggable plugin available
- [ ] Video file hosted (Supabase Storage or Loom embed)
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
