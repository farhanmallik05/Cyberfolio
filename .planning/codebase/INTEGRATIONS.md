# Project Integrations

Documenting all external service dependencies and internal utility registries.

---

## External Services

### GitHub API
- **Purpose**: Live repository statistics (`/projects` page — stars, forks, languages, descriptions).
- **Auth**: Unauthenticated (public API, 60 req/hr rate limit per IP).
- **Pattern**: Fetched at route level via React Server Component in `/app/projects/page.tsx`.
- **Phase 14.5 Upgrade**: Vercel Edge KV caching planned for 1-hour TTL to prevent rate-limiting in production.

### Supabase
- **Project ID**: `snyvarunuobcpfadkpmc`
- **Status**: ✅ Active & Integrated
- **Services in use**:
  - **PostgreSQL**: `contact_submissions` table (Phase 11)
  - **Auth**: Admin role guard planned (Phase 20)
  - **pgvector**: RAG knowledge base planned (Phase 19 AI Chat)
  - **Edge Functions**: Proximity-based queries planned
  - **Storage**: Database backup target (`/backups/db/`)
- **Client**: `@supabase/supabase-js` initialized in `src/lib/supabase.ts`
- **Contact API**: `POST /api/contact` → Edge Function proxy → Supabase insert

### GSAP (ScrollTrigger)
- **Version**: 3.14.2
- **License**: Club GreenSock (or Standard per usage)
- **Purpose**: Cinematic home page orchestration — 10-section wave-based scroll system
- **Pattern**: Plugins registered in `GSAPRegistrar.tsx` (client-only, no SSR execution)
- **Safety**: All contexts managed via `gsap.context(fn, ref)` with `ctx.revert()` cleanup

### Three.js / @react-three/fiber
- **Version**: Three.js 0.183 / r3f 9.5
- **Purpose**: `AICore.tsx` — WebGL neural object in the Hero background
- **Pattern**: Dynamic-imported with `{ ssr: false }` to prevent hydration mismatch

### Google Fonts (Next Font)
- **Fonts loaded**: Orbitron (400, 500, 700, 900), Inter
- **Pattern**: `next/font/google` API in `src/app/layout.tsx` — CSS variables emitted to root
- **Share Tech Mono**: External `@font-face` in `globals.css` (monospace labels)

### Vercel
- **Deployment**: Static Export + Vercel Edge Functions
- **Planned**: Edge KV for GitHub API caching (Phase 14.5)

---

## Planned Integrations (Future Phases)
| Service | Phase | Purpose |
|---------|-------|---------|
| Cal.com | 15 | Consulting booking calendar embed |
| Resend + React Email | 21 | Newsletter delivery |
| Razorpay | 17 | Store checkout (INR primary) |
| Stripe | 17 | Store checkout (USD international) |
| Claude/Gemini API | 19 | AI Chat — RAG-powered portfolio assistant |
| Giscus | 13 | Blog comments via GitHub Discussions |
| Fuse.js | 12/13 | Client-side fuzzy search (projects + blog) |
| Mux Video | 22 | Course platform video delivery |

---

## Internal Utilities

### Unified Icon Mapper (`src/lib/icons.ts`)
- **Purpose**: Centralized export of all Lucide icons used across the project.
- **Rule**: Never import directly from `lucide-react` in components — always use this registry.
- **Benefit**: Tree-shaking optimization + single audit point + prevents duplicate icon variants.

### Content Ledger (`src/data/`)
- **Pattern**: LinkedIn Export Pattern — CSV ingestion → non-destructive JSON merge.
- **Context**: Experience, education, and skills are updated via CSV export from LinkedIn, merged manually into `about.json` and `skills.json`. No 3rd-party sync service.

### ThemeContext + ThemeHUD
- **Mechanism**: `React.createContext` + `localStorage` persistence.
- **FOUC Prevention**: Inline `<script>` in `<head>` reads `localStorage` before React hydration — applies `data-theme` attribute immediately.
- **Pattern**: CSS `[data-theme="inferno"]` selectors in `globals.css` override the default Cyber variable values.

### RoleContext + RoleBadge
- **Mechanism**: `React.createContext` with `activeRole` state (`'frontend' | 'ai' | 'automation'`).
- **Consumers**: `RoleBadge` (floating display), `SkillConstellation` (filtered nodes), `ResumePage` (section weights).
