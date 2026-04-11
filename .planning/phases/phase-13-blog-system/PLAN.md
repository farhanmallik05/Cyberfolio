# Phase 13: Blog System (MDX)

## Why This Phase Is In M3 Not M4
SEO indexing takes 2-3 months minimum. Every week this is delayed = weeks of lost organic traffic that can never be recovered. Blog posts also feed Phase 19 (AI Chat) as the primary knowledge base — the earlier posts exist, the richer the AI's answers. First 3 posts should publish on launch day.

## Scope
- /blog index page with featured post hero, category filter, search (Fuse.js), grid
- /blog/[slug] post pages
- MDX with custom components: CodeBlock (copy button + syntax highlight), Callout (tip/warning/info), Quote (styled pull), Image (zoom on click), Demo (interactive inline component)
- Reading progress bar
- Sticky table of contents (desktop)
- giscus comments (GitHub Discussions)
- Newsletter signup (inline, not popup)
- OG image generation (SEED-017)
- RSS feed at /rss.xml
- JSON feed at /feed.json
- View counter (Supabase)
- Like/reaction (no login, localStorage)

## Launch Content (write before deploying)
- Post 1: "Building AI Agents with n8n and GPT-4"
- Post 2: "Self-Hosting n8n on Docker: Complete Guide"
- Post 3: "What I Learned at Buildathon 1.0"

## SEO Per Post
- Dynamic OG image (SEED-017)
- JSON-LD Article schema
- Canonical URL
- Twitter card meta
- Auto-generated excerpt
- Reading time calculated from word count

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Blog cards match existing card glass style
- [ ] Code blocks use neon color scheme
- [ ] Headings use Orbitron
- [ ] Mono labels use Share Tech Mono
- [ ] Body text uses Rajdhani at comfortable reading size
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Cyber theme default and unchanged
- [ ] Mobile optimized reading experience
- [ ] Dark code syntax theme (no light blocks)
- [ ] No hardcoded hex colors — CSS variables only
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] Phase 2.5 (Supabase — view counters)
- [ ] SEED-017 (OG image) built in this phase
- [ ] Resend API key in environment
- [ ] giscus GitHub repo configured
- [ ] At least 3 posts written before launch
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
