# Phase 21: Newsletter System (/newsletter)

## Scope
- /newsletter signup page (value prop, sample issue preview, subscriber count)
- Resend for email sending
- React Email for templates
- Supabase for subscriber list management
- Unsubscribe handling (one-click)
- Archive of past issues at /newsletter/archive
- SEED-014: podcast audio version of posts (text-to-speech, linked in emails)
- Double opt-in confirmation flow

## Email Template (React Email)
- Neural Architect branding
- Dark background (#070C1A via variable)
- Neon accent (#00F5FF) for headers
- Rajdhani font (web-safe fallback: Georgia)
- Sections: what I built, 1 automation tip, 1 AI tool, 1 resource link

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Signup form matches existing .contact-form style
- [ ] Confirmation pages match site aesthetic
- [ ] Email templates reflect Neural Architect brand
- [ ] Success animation matches site style
- [ ] No hardcoded hex colors — CSS variables only
- [ ] Mobile responsive at 768px and 480px

## Dependency Check
- [ ] Phase 2.5 (Supabase — subscribers table)
- [ ] RESEND_API_KEY in environment
- [ ] Domain verified in Resend (farhanmallik.dev)
- [ ] From address: hello@farhanmallik.dev
- [ ] Unsubscribe URL implemented
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
