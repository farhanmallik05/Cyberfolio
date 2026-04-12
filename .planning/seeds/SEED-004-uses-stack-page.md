# SEED-004: Uses / Stack Page

## What
A /uses page listing every tool, app, hardware, extension, and service used daily in the development workflow.

## Why
Developers love reading /uses pages. It builds personality, shows taste, generates organic search traffic (people search "best tools for X"), and creates affiliate income opportunities. It's extremely low maintenance once written.

## Details
- Categories: Hardware, Editor & IDE, Terminal, Chrome Extensions, Design Tools, AI Tools, Productivity, Self-Hosting
- Each item: icon, name, short reason why, link
- Cyberpunk aesthetic: styled like a spec sheet or equipment manifest
- Optional: Star/pin favorites
- Optional: "Last updated" date per item

## Trigger Condition
Surface when beginning **Milestone 2** Phase 6.5 (Uses Page) — zero dependencies, standalone page built alongside /now. Resolved in Phase 6.5, M2.

## Implementation Notes
- Static JSON data file: `src/data/uses.json`
- Render with category grouping and icons from `lucide-react` or custom SVGs
- Add affiliate links where applicable (Amazon, etc.)
- Can auto-generate from a spreadsheet or Notion page export
