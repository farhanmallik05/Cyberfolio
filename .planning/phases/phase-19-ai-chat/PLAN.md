# Phase 19: AI Chat — /chat (AI Farhan)

## Concept
Visitors can chat with an AI that responds as Farhan — knows all projects, services, blog posts, availability, and pricing. Available 24/7. Qualifies leads automatically. Never pretends to be human if directly asked.

## Scope
- /chat route with full chat UI
- RAG pipeline: vectorize all portfolio content
- Supabase pgvector for embeddings storage
- Streaming responses (Claude API)
- Conversation history in session (not persisted)
- Knowledge base: projects, blog, services, FAQ, availability (live from Supabase), pricing, tech stack
- SEED-008: AI greeter widget on home page ("Welcome back" for returning visitors)
- Lead qualification built into responses
- "Book a call" CTA surfaced when intent detected

## Knowledge Base Sources
- All /projects content (vectorized)
- All /blog posts (vectorized)
- /services content + pricing
- /uses page content
- FAQ (manual Q&A pairs)
- availability table (live query, not vectorized)

## Response Persona
- First person as Farhan
- Professional but approachable
- Redirects to real contact for complex asks
- Never fabricates project details
- Admits uncertainty gracefully

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Chat UI matches dark glass panel aesthetic
- [ ] Message bubbles use neon accent (--neon) for AI, dim color (--dim) for user
- [ ] Input uses existing .form-input style
- [ ] Font: Rajdhani for messages, Share Tech Mono for code snippets
- [ ] Loading: neon typing animation (3 dots)
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] No hardcoded hex colors — CSS variables only
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] Phase 2.5 (Supabase pgvector extension enabled)
- [ ] Phase 12 (project content ready for vectorization)
- [ ] Phase 13 (blog content ready — more = better)
- [ ] ANTHROPIC_API_KEY in environment
- [ ] Vector embeddings generated for all content
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
