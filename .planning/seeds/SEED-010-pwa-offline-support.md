# SEED-010: PWA + Offline Support

## What
Convert the portfolio into a Progressive Web App: installable on mobile/desktop, works offline with a custom offline page, adds a home screen icon, and supports push notifications for new blog posts.

## Why
PWA installs create a persistent brand presence on the user's device. Job seekers and recruiters save portfolios they like — make yours installable. Offline support also improves Lighthouse scores and demonstrates technical depth.

## Details
- `/manifest.json`: app name, icons (192x192, 512x512), theme color, display: standalone
- Service Worker via `next-pwa` or custom workbox config
- Offline fallback: `/offline` page with Neural Architect aesthetic
- Cached routes: /, /about, /projects, /uses, /now (static content)
- Push notifications (optional): new blog post alert via Web Push API
- Install prompt: custom "Install App" button in footer or nav

## Trigger Condition
Surface when beginning **Milestone 6: Community & Scale** — a polish layer after core content is stable and indexed.

## Implementation Notes
- `next-pwa` package makes this straightforward for Next.js
- Icons generated at all required sizes
- Service worker must not cache API routes or dynamic pages
- Test: Lighthouse PWA audit should score 100
