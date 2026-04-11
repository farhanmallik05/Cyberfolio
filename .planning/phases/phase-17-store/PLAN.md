# Phase 17: Digital Store (/store)

## Scope
- /store catalog page with category filter, product grid
- /store/[slug] individual product pages
- Razorpay (primary — India) + Stripe (international)
- Supabase: products table, orders table, purchase tracking
- Resend: automated delivery emails with signed Supabase Storage download URL (time-limited)
- /store/success thank-you page
- Free lead magnets (email in exchange for download)
- SEED-015: password protection for premium case studies and select content

## Initial Products (4 at launch)
1. Notion OS Kit — ₹299
2. n8n Workflow Pack — ₹499
3. ATS Resume Pack — ₹199
4. Portfolio Template — ₹399

## Purchase Flow
Click Buy → Razorpay modal → Payment → Supabase records order → Resend sends delivery email with signed Supabase Storage URL → /store/success page

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Product cards match existing card glass style
- [ ] Payment modal doesn't conflict with theme
- [ ] Success page matches site aesthetic
- [ ] Headings use Orbitron
- [ ] Price displayed in neon accent color (--neon)
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Mobile checkout works correctly
- [ ] No hardcoded hex colors — CSS variables only
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] Phase 2.5 (Supabase schema — products, orders tables)
- [ ] Razorpay account + API keys in env
- [ ] Resend account + API key in env
- [ ] Supabase Storage bucket for product files
- [ ] Product files ready for upload
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
