# SEED-006: Consulting Booking Calendar

## What
Embedded Cal.com (or Calendly) with tiered offerings: free 30-min discovery call, paid 1-hour strategy session, weekly retainer packages, and a project-based pricing calculator.

## Why
Converts portfolio visitors directly into paid clients or calls. Removes friction. Makes it dead simple to hire you without a back-and-forth email chain.

## Details
- Cal.com embed (preferred over Calendly — open source, more control)
- Offering tiers:
  - 30-min Discovery Call (Free)
  - 1hr Strategy Session ($XX)
  - Weekly Retainer (contact for pricing)
- Project-based pricing calculator: select deliverables, get instant estimate
- Add to: Services page, Contact page, Hire command in Terminal (Phase 5)
- Integrates with: Live Availability Status (SEED-001)

## Trigger Condition
Surface when beginning **Milestone 3: Monetization** or when user reports actively offering freelance services.

## Implementation Notes
- Cal.com: `npm install @calcom/embed-react`
- Custom embed styled to match the cyberpunk aesthetic
- Pricing calculator: JSON config file for rates, rendered as interactive form
- Store inquiry submissions in Firestore (already set up)
