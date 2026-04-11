# SEED-024: Discount Code System (Phase 17)

### Context
- **Target Phase**: Phase 17 (Digital Store)
- **Goal**: Drive conversions with limited-time or limited-use discount codes (e.g. `EARLYBIRD50`).

### Implementation
- **Schema**: `discount_codes` table (code, percent_off, max_uses, current_uses, expires_at).
- **Atomic decrement**: Use a Supabase RPC to decrement `max_uses` atomically when a payment is successful.
- **Validation**:
    - Pre-checkout check (is code valid/active/expired?).
    - Post-payment verification (double check count before delivering product).

### Technical Notes
- Store codes in uppercase.
- Implement "Bulk Generate" tool in the Admin Panel for marketing campaigns.
