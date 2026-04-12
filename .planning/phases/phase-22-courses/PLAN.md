# Phase 22: Course Platform (/courses)

## Scope (Phase 1 — redirect model)
- /courses index page listing courses
- Initial: redirect to Gumroad for payment/access
- Course detail pages with curriculum preview
- SEED-010: PWA manifest + service worker so courses accessible offline after load

## First Course: n8n Automation Masterclass
Modules:
1. What is n8n and why self-host
2. Docker setup (beginner-friendly)
3. Your first workflow (step-by-step)
4. Connecting external APIs
5. AI integrations (GPT, Claude)
6. Real automation projects
7. Deployment and maintenance

## Future (Phase 22 v2 — self-hosted)
- Mux video for streaming
- Course progress tracking (Supabase)
- Certificate generation on completion
- Community Discord access with enrollment

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Course cards match existing product card glass style
- [ ] Curriculum preview uses existing list styles
- [ ] Progress bars match existing skill bar style
- [ ] Headings use Orbitron
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] No hardcoded hex colors — CSS variables only
- [ ] Mobile responsive at 768px and 480px

## Dependency Check
- [ ] Phase 17 (store/payment pattern established)
- [ ] Phase 21 (newsletter for launch announcement)
- [ ] Gumroad account setup
- [ ] Course content outlined (can be recorded later)
- [ ] SEED-010 (PWA) implemented in this phase
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
