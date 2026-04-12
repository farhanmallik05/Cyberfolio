# SEED-020: Changelog Page (Trust & Maintenance signals)

### Context
- **Target Phase**: Phase 13.5 (Minimal Admin Panel)
- **Goal**: Show visitors and potential clients that the "Neural Architect" brand is actively evolving.

### Implementation
- **Route**: `/changelog`
- **Data Source**: A `changelog` table in Supabase.
- **Display**: A vertical timeline with neon dots.
    - **Categories**: `FEATURE`, `FIX`, `REFACTOR`, `SECURITY`.
    - **Content**: Short titles + optional link to a blog post or GitHub commit.
- **Automation**: Add a checkbox in the Admin Panel when publishing a blog post or project to "Also add to changelog."

### Technical Notes
- Use `Share Tech Mono` for the version numbers (e.g., `v3.2.1`).
- Implement an RSS feed for the changelog specifically (`/api/changelog/rss`).
