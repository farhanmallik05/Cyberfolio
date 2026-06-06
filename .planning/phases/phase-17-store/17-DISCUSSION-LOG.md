# Phase 17: Digital Store (/store) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-06
**Phase:** 17-store
**Areas discussed:** Route Choice, Payment Gateway, Product Catalog Source, Order Fulfillment, Lead Magnets

---

## Route Choice

| Option | Description | Selected |
|--------|-------------|----------|
| Rename to `/store` | Align route name with ARCHITECTURE.md sitemap | ✓ |
| Keep as `/marketplace` | Maintain current directory folder name | |

**User's choice:** Rename to `/store`
**Notes:** Aligns with standard URL semantics and fits the sitemap contract defined in ARCHITECTURE.md.

---

## Payment Gateway

| Option | Description | Selected |
|--------|-------------|----------|
| Dodo Payments | Use Dodo Payments for everything (global taxes, MOR, checkout) | ✓ |
| Razorpay + Stripe | Dual setup (Razorpay for INR, Stripe for USD checkouts) | |

**User's choice:** Dodo Payments for everything
**Notes:** Decided to drop Razorpay/Stripe in favor of Dodo Payments to streamline tax compliance and global checkout flows.

---

## Product Catalog Source

| Option | Description | Selected |
|--------|-------------|----------|
| Supabase `products` table | Store products dynamically in PostgreSQL database | ✓ |
| Static JSON ledger | Keep products in a local `products.json` file | |

**User's choice:** Supabase database `products` table
**Notes:** Enables dynamic changes to catalog prices or additions from the admin panel CMS in later milestones.

---

## Order Fulfillment

| Option | Description | Selected |
|--------|-------------|----------|
| Redirect + Signed URL Email | Success page link + Resend email containing 24-hr signed URL | ✓ |
| Redirect only | Display download link on success page only (no Resend email) | |

**User's choice:** Redirect + Signed URL Email
**Notes:** Provides a highly professional delivery experience while protecting the download asset using signed URLs.

---

## Lead Magnets

| Option | Description | Selected |
|--------|-------------|----------|
| Capture email -> Instant download | Add email to subscribers list and trigger direct download | ✓ |
| Capture email -> Email download link | Send download link via email to verify address validity | |

**User's choice:** Capture email -> Instant browser download + add to subscribers list
**Notes:** Maximizes conversion rate by removing friction. The user gets the file immediately, and their email is saved.

---

## the agent's Discretion

- Choice of file expiration limit for signed Supabase Storage links (defaults to 24 hours).
- Design and copy details of the transactional Resend emails.
