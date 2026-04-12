# Phase 18: Free AI Micro-Tools (/tools)

## Why Build Free Tools
1. Each tool can rank for specific search queries
2. Proves AI skills publicly (not just claimed)
3. Drives developer traffic to portfolio
4. Usage counters = social proof
5. Positions Neural Architect as a builder, not just a portfolio site

## Scope
- /tools index listing all tools
- 3 initial tool pages: /tools/prompt-optimizer, /tools/readme-generator, /tools/portfolio-roaster
- Claude API (Anthropic) powered
- Usage counters in Supabase (SEED-013)
- Each tool: share result button, usage count, "Built by Farhan" → back to portfolio
- SEED-012: Ambient sound toggle option introduced here as a site-wide feature

## Tool Specs

### prompt-optimizer
Input: raw prompt textarea
Output: improved prompt with explanation
API: Claude claude-sonnet-4-20250514
System prompt: expert prompt engineer

### readme-generator
Input: project name, description, tech stack, features (form fields)
Output: complete README.md (copy button)
API: Claude

### portfolio-roaster
Input: portfolio URL
Output: brutal honest feedback on design, content, missing sections, SEO
API: Claude + web capabilities

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Tool pages match existing glass panel style
- [ ] Input fields match existing .form-input style
- [ ] Output areas use monospace Share Tech Mono
- [ ] Headings use Orbitron
- [ ] Loading states use neon animation
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Mobile usable — inputs work on phone
- [ ] No hardcoded hex colors — CSS variables only
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] Phase 2.5 (Supabase — usage counters)
- [ ] ANTHROPIC_API_KEY in environment
- [ ] Rate limiting implemented (prevent abuse)
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
