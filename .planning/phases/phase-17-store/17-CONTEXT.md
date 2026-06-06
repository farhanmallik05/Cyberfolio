# Phase 17: Digital Store (/store) - Context

**Gathered:** 2026-06-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the `/store` catalog and product deep-links (`/store/[slug]`), replacing the placeholder `/marketplace` page. This phase will integrate Dodo Payments for checkout, configure product and order tables in Supabase, and wire up automated delivery emails via Resend with time-limited download URLs.

</domain>

<decisions>
## Implementation Decisions

### Route & Sitemap
- **D-01:** Rename the existing `/marketplace` directory to `/store` in the App Router to conform with the canonical sitemap in `ARCHITECTURE.md`.
- **D-02:** Establish `/store/[slug]` dynamic routes for individual product details.

### Payment Gateway
- **D-03:** Integrate **Dodo Payments** as the exclusive payment processor for all checkouts and transactions. This replaces the old Razorpay/Stripe dual-integration plan.
- **D-04:** Implement Dodo Payments checkout overlay or redirection, utilizing secure webhook validation to verify signatures and record transaction status.

### Product & Order Catalog Data
- **D-05:** Sourced from dynamic Supabase Postgres tables (`products` and `orders`). This allows products to be updated, added, or deleted via the `/admin` CMS in future phases without redeploying code.
- **D-06:** Keep product files in a private Supabase Storage bucket (`store-files`) to prevent public hotlinking.

### Fulfillment & Delivery
- **D-07:** Redirection to a `/store/success` thank-you page displaying a temporary direct download link.
- **D-08:** Send an automated transactional email via **Resend** containing a signed, time-limited URL (e.g., 24-hour expiration) generated via Supabase Storage client.
- **D-09:** Payment webhook idempotency will be enforced using Supabase `.upsert` with `onConflict: 'dodo_payment_id'`. Fulfillment trigger is fired only when the transaction record is newly created.

### Free Lead Magnets
- **D-10:** Free products will capture the user's email, append the email to the newsletter subscribers table, and immediately trigger an instant browser download without requiring checkout loops or emails.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Specs & Integration Guides
- `.planning/seeds/SEED-030-dodo-payments-integration.md` — Dodo Payments serverless details and webhook signature verification snippet
- `.planning/ARCHITECTURE.md` — Design system specs and color variables
- `.planning/phases/phase-17-store/PLAN.md` — Original scope details

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/marketplace/page.tsx` — Current static catalog UI (cards layout, tags). Move to `/store` and refactor to fetch from database.
- `src/components/ui/GlassPanel.tsx` — Base glassmorphism cards.
- `src/lib/supabase.ts` — DB Client reference.

### Established Patterns
- Next.js Edge routes or Route Handlers for webhooks.
- Standard Next.js server actions or API endpoints for DB updates.

### Integration Points
- Rename `src/app/marketplace/` -> `src/app/store/`.
- New DB Migrations in `supabase/migrations/` for `products`, `orders`, and `subscribers`.
- Resend SDK configuration in dependencies.

</code_context>

<specifics>
## Specific Ideas

- Display product prices with dynamic currency symbols (calculating USD conversion if needed or using Dodo's multi-currency support).
- The store success screen should feature a terminal-like "downloading payload..." progress bar.

</specifics>

<deferred>
## Deferred Ideas

- Course Platform integration `/courses` is deferred to Phase 22.
- Admin Store Management CMS is deferred to Phase 20.

</deferred>

---

*Phase: 17-store*
*Context gathered: 2026-06-06*
