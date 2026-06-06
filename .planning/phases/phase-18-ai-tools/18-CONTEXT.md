# Phase 18: Free AI Micro-Tools (/tools) - Context

**Gathered:** 2026-06-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the `/tools` index route and three AI micro-tools: Prompt Optimizer (`/tools/prompt-optimizer`), README Generator (`/tools/readme-generator`), and Portfolio Roaster (`/tools/portfolio-roaster`). Additionally, implement a global audio engine toggle (Ambient Sound, SEED-012) and track API usage counters in Supabase.

</domain>

<decisions>
## Implementation Decisions

### AI API Provider
- **D-01:** Use **Gemini API** (specifically `gemini-2.0-flash` or similar current model) to power all three micro-tools. This replaces the old Claude-based plan, taking advantage of higher speeds, cost-effectiveness, and native workspace tooling.
- **D-02:** Key configured via `GEMINI_API_KEY` in env.

### Rate Limiting & Abuse Prevention
- **D-03:** Store rate limit counters in `localStorage` client-side (e.g., maximum 10 runs per user per day).
- **D-04:** Enforce server-side logging by tracking requests (hashed IP, timestamp, and tool type) in a Supabase table (`api_usage_logs`) to prevent quick API abuse.

### UI Output Rendering
- **D-05:** Stream output dynamically using a custom React typing animation wrapper.
- **D-06:** Render code/markdown results inside a monospace terminal-style panel (`Share Tech Mono`) with corner accent brackets, scan lines, and a "Copy to Clipboard" utility button.

### Portfolio Roaster Scraping
- **D-07:** Implement server-side scraping fallback: attempt to fetch the URL's HTML structure (using lightweight node fetch/cheerio parser). If the page blocks crawling (e.g., Cloudflare guards or SPA hydration), display a fallback textarea asking the user to manually paste their portfolio's textual structure or code snippet.

### Ambient Sound Toggle (SEED-012)
- **D-08:** Global HUD indicator. Place a speaker toggle widget in the shared overlay dashboard (alongside `ThemeHUD` and `RoleBadge`). The toggle enables/disables a subtle synth background hum (persisting across page transitions via React context/session storage).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Specs
- `.planning/codebase/ARCHITECTURE.md` — Animation matrix (GSAP context safety) and typography
- `.planning/phases/phase-18-ai-tools/PLAN.md` — Original scope details

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/TerminalCLI.tsx` — Command parsing and output rendering styling details.
- `src/components/ThemeHUD.tsx` — Floating panel toggle layout pattern (reference for Ambient Sound HUD).
- `src/lib/supabase.ts` — Database logs insertion.

### Established Patterns
- Client-side routes use framer-motion entry transitions.
- Streaming response API routes.

### Integration Points
- Route creation under `src/app/tools/` (including nested route folders).
- Database migrations in `supabase/migrations/` for `api_usage_logs`.
- Adding ambient music audio tracks to `/public/audio/`.

</code_context>

<specifics>
## Specific Ideas

- The portfolio roaster output should have a "Roast Severity" meter UI (visualizing the severity of design/copy critiques in neon colors).
- Prompt optimizer should display a before/after split view inside a terminal box.

</specifics>

<deferred>
## Deferred Ideas

- AI Chatbot Farhan RAG interface `/chat` is deferred to Phase 19.
- Redis-based enterprise rate walls are deferred.

</deferred>

---

*Phase: 18-ai-tools*
*Context gathered: 2026-06-06*
