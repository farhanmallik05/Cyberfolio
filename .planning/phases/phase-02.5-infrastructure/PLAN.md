# Phase 2.5: Infrastructure Setup

## Why This Phase Exists
Every phase from M4 onward writes to or reads from a database. Setting up Supabase inside Phase 16 would mean redoing environment config across 6+ phases. This phase does it once, correctly, so every future phase inherits a working foundation.

## Scope
- Supabase project creation and configuration
- Full database schema (all tables for all phases)
- Auth setup (admin role, RLS policies)
- Storage buckets (product files, images, avatars)
- Environment variables configured on Netlify
- Connection tested from Next.js app

## Database Schema (create all tables now)

### Table: blog_posts
id, slug, title, excerpt, content (MDX), category, reading_time, published_at, updated_at, published (bool), views (int), og_image_url, tags (array)

### Table: projects
id, slug, title, tagline, description, category, tech_stack (array), github_url, demo_url, featured (bool), status, thumbnail_url, case_study (bool), created_at, sort_order

### Table: products (store)
id, slug, title, description, price_inr, price_usd, category, file_url (storage), preview_url, sales_count, active (bool), created_at

### Table: orders
id, product_id, buyer_email, buyer_name, amount_paid, currency, payment_id (razorpay), delivered (bool), created_at

### Table: subscribers (newsletter)
id, email, name, confirmed (bool), subscribed_at, source

### Table: leads (contact form)
id, name, email, project_type, budget, timeline, message, status (new/replied/converted), created_at, notes

### Table: availability
id, is_available (bool), next_date, response_time, note, updated_at

### Table: site_stats
id, key (unique), value, updated_at

## Storage Buckets
- product-files (private, signed URLs)
- product-previews (public)
- blog-images (public)
- project-thumbnails (public)
- avatar (public)

## Environment Variables (add to Netlify + .env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RESEND_API_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SITE_URL=https://farhanmallik.dev
ADMIN_EMAIL=farhanmallick2005@gmail.com
```

## Deliverable
- Supabase project live and connected
- All tables created with correct schemas
- RLS policies active
- Env vars on Netlify
- /api/health endpoint returns 200 + db ping

---

## Theme Preservation Checklist
- N/A — infrastructure only, no UI

## Dependency Check
- [ ] Netlify project connected to domain
- [ ] Next.js app initialized
- [ ] No UI changes made in this phase
