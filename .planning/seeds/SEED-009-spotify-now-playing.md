# SEED-009: Spotify Now Playing Widget

## What
A real-time widget in the footer (or Now page) that shows what Farhan is currently listening to on Spotify — or "Last heard: [track]" when offline.

## Why
Music taste is personality. It makes the portfolio feel alive and human. Spotify has a public API that's straightforward to integrate. Developers and designers specifically find these touches memorable.

## Details
- Footer widget: album art thumbnail + track name + artist + animated equalizer bars
- Fallback: "Last heard: [track]" when not actively playing
- Or: "Coding to: [playlist name]" with static playlist link
- "What I code to" playlist link to a public Spotify playlist
- Now page: full Now Playing block with more detail

## Trigger Condition
Surface when beginning **Milestone 3** Phase 11 (Cinematic Home) — Spotify widget goes in the footer of the redesigned home page. Resolved in Phase 11, M3.

## Implementation Notes
- Spotify Web API: requires OAuth refresh token (server-side)
- Next.js API route: `/api/now-playing` — calls Spotify, returns track data
- Refresh token stored in env var (never client-side)
- Edge function for low latency
- Fallback: static JSON with last-known track
- Package: `spotify-web-api-node` or raw fetch
