# Phase 18: Free AI Micro-Tools (/tools) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-06
**Phase:** 18-ai-tools
**Areas discussed:** AI Model Provider, Rate Limiting Strategy, AI Output UI, Portfolio Roaster URL Handling, Ambient Sound Toggle Placement

---

## AI Model Provider

| Option | Description | Selected |
|--------|-------------|----------|
| Gemini API | e.g. Gemini 2.0 Flash - faster, cost-effective, native to Google environment | ✓ |
| Anthropic Claude API | Claude Sonnet API as originally planned | |
| Support both | Configuration-dependent dual support | |

**User's choice:** Gemini API
**Notes:** Decided to pivot to Gemini API for better performance and alignment with workspace SDK tools.

---

## Rate Limiting Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| LocalStorage + Supabase Logs | Client-side blocks + server-side DB logs checking (easy setup) | ✓ |
| Upstash Redis | Redis database lookup for rate walls | |

**User's choice:** LocalStorage limits + Supabase IP logs
**Notes:** Avoids adding a new external SaaS service (Redis) while providing sufficient protection against typical API spamming.

---

## AI Output UI

| Option | Description | Selected |
|--------|-------------|----------|
| Streaming Monospace | Stream output dynamically into terminal-style code blocks | ✓ |
| Static Card | Static markdown rendering inside a card once completed | |

**User's choice:** Stream markdown output dynamically into terminal-style code block with typing animations
**Notes:** Matches the cyberpunk hacking aesthetic of the site.

---

## Portfolio Roaster URL Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Server scraping + fallback | Fetch URL contents, fallback to user text copy-paste if blocked | ✓ |
| Copy-paste only | Textarea asking user to paste page contents directly | |

**User's choice:** Scraping fallback: fetch URL content on server, if it fails, ask user to paste raw text/code
**Notes:** Provides a smooth UX for sites that can be fetched, while gracefully handling JS-heavy or Cloudflare-protected portfolios.

---

## Ambient Sound Toggle Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Global HUD | Speaker toggle next to Theme HUD, persists across routes | ✓ |
| Local widget | Play button restricted only to `/tools` page | |

**User's choice:** Global HUD (floating speaker toggle next to Theme HUD) - persists across routes
**Notes:** Fully implements the SEED-012 audio experience site-wide, adding to the cinematic immersion.

---

## the agent's Discretion

- Choice of ambient background music tracks and volume level (default should be low synth drone/pad).
- Visual design of the roasting severity scale.
