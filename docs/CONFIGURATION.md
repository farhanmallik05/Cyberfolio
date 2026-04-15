# Configuration Guide

This document highlights critical environment variables and structural configuration levers that control the behavior of the Neural Architect platform.

## Environment Variables

The application relies heavily on proper environment masking. Ensure your development `.env.local` and Netlify Production configurations align with the following schema:

| Variable | Description | Requirement |
|----------|-------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | The REST endpoint URL for your active Supabase project. Required for database inserts and auth flow. | **Mandatory** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public key safely exposed to the client to initialize Supabase. | **Mandatory** |
| `GITHUB_TOKEN` | Classic Personal Access Token for the GitHub API proxy route. Bypasses standard rate-limiting. | **Mandatory** |
| `GITHUB_USERNAME` | The GitHub handle from which repositories will be scraped (e.g. `farhanmallik05`). | **Mandatory** |

> **VERIFY Marker**: Ensure that `NEXT_PUBLIC_SUPABASE_URL` correctly binds to project `snyvarunuobcpfadkpmc` in production. Check the Supabase Console for any deviation.

## Global Theming & CSS Variables

The aesthetic configuration is primarily managed through `globals.css` and applied contextually via Next.js global state.

Altering the global colorway involves overriding these root CSS properties. The immutable `data-theme="cyber"` sets the baseline logic:

```css
:root {
  --neon: #00F5FF;        /* Main Neon Cyan */
  --neon2: #BF5FFF;       /* Secondary Electric Purple */
  --bg: #070C1A;          /* Deep Void Background */
  --bg2: #0D1425;         /* Glassmorphic Panel Base */
  --border: rgba(0, 245, 255, 0.15); /* Wireframe Outlines */
}
```

Other available themes shift these exact definitions using dynamic mapping stored in `localStorage` under the key `na-theme`.

## Framework Tooling Configuration

- **Turbopack Setup**: Configured via `package.json` utilizing the `--turbo` flag. Disabling Turbopack gracefully degrades to default Webpack compilation if required.
- **GSAP ScrollTrigger**: Globally registered within specialized `useEffect` layouts to prevent server-side execution failures inside Next.js 16 components.
