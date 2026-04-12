# Phase 10: Testimonials & Social Proof

## Objective
Build an auto-scrolling marquee (or card carousel) of social proof: hackathon feedback, peer quotes, live GitHub stars/forks via API, and Hacktoberfest contribution badges.

## Acceptance Criteria
- [ ] Scrolling marquee of testimonial cards (infinite horizontal scroll)
- [ ] Manual testimonial quotes with: avatar, name, role, relationship, quote text
- [ ] Live GitHub stats fetched from GitHub API: stars, forks, contributions
- [ ] Hacktoberfest badge embedded from Holopin (https://holopin.io/@farhanmallik05)
- [ ] Cards pausable on hover (accessibility)
- [ ] Section added to homepage or a dedicated /testimonials route
- [ ] Responsive: stacks vertically on mobile
- [ ] Graceful fallback if GitHub API is unavailable (cached data)

## Implementation Plan

### 1. Data: `src/data/testimonials.json`
```json
[
  {
    "id": "peer-1",
    "name": "Name",
    "role": "Hackathon Teammate",
    "avatar": "/avatars/peer1.jpg",
    "quote": "...",
    "date": "2024"
  }
]
```

### 2. GitHub Stats: `src/lib/github.ts`
```ts
export async function getGitHubStats(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  // sum stars, forks, filter by repo
}
```
- Cache with Next.js `fetch` cache or `revalidate: 3600`
- Fallback: static JSON if API fails

### 3. Component: `TestimonialMarquee.tsx`
- CSS `animation: scroll linear infinite` on inner container
- `gap`, `min-width` per card for seamless loop
- `hover:animation-pause` utility class
- Duplicate cards array for seamless infinite scroll effect

### 4. Component: `GitHubStatsBar.tsx`
- Shows: Total Stars ⭐, Total Forks 🍴, Public Repos 📁, Contributions in 2024
- Styled as terminal output: `> fetching github stats... ✓`
- Animated count-up on scroll into view

### 5. Holopin Badge
- Embed: `<img src="https://holopin.io/api/user+badges?user=farhanmallik05" />`
- Display in Certificates page AND Testimonials section

### 6. Integration
- Add TestimonialMarquee section to homepage (after terminal section)
- Add GitHubStatsBar to the Projects page header

## Files to Create/Modify
- `src/components/TestimonialMarquee.tsx` [NEW]
- `src/components/GitHubStatsBar.tsx` [NEW]
- `src/data/testimonials.json` [NEW]
- `src/lib/github.ts` [NEW]
- `src/app/page.tsx` [MODIFY] — add TestimonialMarquee
- `src/app/projects/page.tsx` [MODIFY] — add GitHubStatsBar
- `src/app/globals.css` [MODIFY] — marquee scroll animation

## Verification
- Marquee scrolls continuously without jumping
- Pause on hover works
- GitHub stats render with real data
- Falls back to static data if API fails
- Holopin badge renders
- Mobile layout is acceptable

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Testimonial cards match glass style: background: var(--glass), border: 1px solid var(--border), backdrop-filter: blur(20px)
- [ ] Headings use Orbitron
- [ ] Monospace/code elements use Share Tech Mono
- [ ] Body text uses Rajdhani
- [ ] Glow effects match existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
- [ ] Cyber theme is default and unchanged
- [ ] No hardcoded hex colors — CSS variables only
- [ ] Tested visually against adjacent sections
- [ ] Mobile responsive: 768px and 480px tested
- [ ] No layout shifts introduced globally

## Dependency Check
- [ ] All listed phase dependencies are complete
- [ ] Feature flags set if experimental
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
