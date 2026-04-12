# Phase 20: Admin Dashboard (/admin)

## Scope
- Supabase Auth protected (admin role only)
- Mobile responsive — manageable on phone
- CMS sections:
  - Blog posts (MDX editor with preview)
  - Projects (add/edit/reorder)
  - Availability status (toggle + message)
  - Store products (add/edit/deactivate)
  - Now page content (JSON editor)
- Analytics dashboard: page views, traffic sources, most viewed projects, form submissions
- Store management: orders list, resend delivery emails, discount code management
- Leads CRM: all contact form submissions, status (new/replied/converted), notes
- SEED-018: public /api/* endpoints managed here

## Public API Endpoints (SEED-018)
- `GET /api/available` → availability status
- `GET /api/stats` → projects count, posts count, tools count (public numbers)
- `GET /api/now` → current focus (from now page)

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Admin uses same dark glass aesthetic
- [ ] Data tables use neon accent (--neon) headers
- [ ] Form inputs match existing .form-input style
- [ ] Status badges use neon/purple accents
- [ ] Headings use Orbitron
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Mobile layout works for quick updates
- [ ] No hardcoded hex colors — CSS variables only

## Dependency Check
- [ ] Phase 2.5 (Supabase Auth configured)
- [ ] All content phases complete (13, 15, 17)
- [ ] Analytics tool configured (Umami/Plausible)
- [ ] Admin email (farhanmallick2005@gmail.com) whitelisted in Supabase Auth
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
