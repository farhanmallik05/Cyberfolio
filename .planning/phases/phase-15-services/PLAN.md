# Phase 15: Services Full Build

## Scope
- /services full page
- 4 service blocks (Web Dev, Automation, UI/UX, AI Prompt Systems) with full detail:
  - What's included (bullet list)
  - Tech stack used
  - Timeline range
  - Starting price (INR + USD)
  - "Book Now" + "See Examples" CTAs
- How it works timeline (5 steps: Enquiry → Scoping → Build → Review → Deploy)
- Interactive pricing calculator (SEED-016)
- FAQ accordion
- Cal.com or Calendly embed (SEED-006)
- Past work previews (anonymized)
- Testimonials block

## Pricing Calculator Logic (SEED-016)
Inputs:
- Service type (Web / Automation / AI / Design)
- Complexity (Simple / Medium / Complex)
- Timeline (Rush +40% / Standard / Flexible -10%)
Output: Price range in INR + USD

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Service cards match existing card glass style
- [ ] Calculator uses neon accent inputs
- [ ] FAQ accordion uses glass panel style
- [ ] Headings use Orbitron
- [ ] Mono elements use Share Tech Mono
- [ ] Booking embed styled to match dark theme
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Mobile responsive — calculator usable on phone
- [ ] No hardcoded hex colors — CSS variables only
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] SEED-006 (Cal.com account setup)
- [ ] SEED-016 (pricing logic defined by owner)
- [ ] Testimonial content ready (from Phase 10)
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
