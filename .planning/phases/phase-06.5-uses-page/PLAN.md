# Phase 6.5: Uses Page (/uses)

## Why This Phase Exists
Zero dependencies. 2-3 hour build. Adds immediate SEO value for searches like "best tools for developers India" or "n8n docker setup tools". Complements /now page — same content category, same effort level. Slot naturally here. Also listed in footer/nav as a personality page.

## Scope
- /uses route
- Sections: Hardware, Development, Design, Automation & AI, Productivity, Hosting, Learning resources
- Each item: icon + name + 1-line description + link + "why I use this" tooltip
- Last updated date
- Affiliate disclaimer if applicable

## Content Sections
1. Hardware — laptop, monitor, peripherals
2. Development — VS Code + extensions, terminal, browser, DevTools extensions, Git workflow
3. Design — Figma + plugins, color tools, fonts
4. Automation & AI — n8n, Docker, AI tools daily
5. Productivity — Notion, task management, notes
6. Hosting & Infra — Netlify, Supabase, Cloudflare
7. Learning — platforms, YouTube, newsletters

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Tool cards match .skill-category glass style: background: var(--glass), border: 1px solid var(--border), backdrop-filter: blur(20px)
- [ ] Headings use Orbitron
- [ ] Mono labels use Share Tech Mono
- [ ] Body text uses Rajdhani
- [ ] Glow on hover matches existing card pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Cyber theme default and unchanged
- [ ] Mobile responsive at 768px and 480px

## Dependency Check
- [ ] No dependencies — standalone page
- [ ] Nav updated to include /uses link
- [ ] Footer updated to include /uses link
