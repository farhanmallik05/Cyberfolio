# SEED-025: Tool Monetization (Fingerprint-based limits)

### Context
- **Target Phase**: Phase 18/19 (AI Tools/Chat)
- **Goal**: Protect API costs (Claude/Gemini) while allowing free users to explore.

### Implementation
- **Logic**:
    1. Every AI tool usage identifies the user via `FingerprintJS` + `Supabase IP logging`.
    2. 3 free uses per device/day across all micro-tools.
    3. Beyond 3 uses: require "Sign in with GitHub/LinkedIn" to get 10 more uses.
    4. Beyond 13 uses: trigger "Get Unlimited Access" → redirect to /store/ai-premium-pass.
- **Conversion Trigger**: Show "X uses remaining today" on every generation to create scarcity.

### Technical Notes
- Store usage logs in a `tool_usage` table with `fingerprint_id` or `user_id`.
- Use a Supabase Edge Function to verify usage count before making the downstream LLM call.
