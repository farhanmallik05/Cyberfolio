# Phase 9: Multi-Theme System

## Objective
Implement four switchable themes with smooth CSS variable-based transitions. Themes persist in localStorage and animate on switch.

## Themes
1. **Cyber** — Current (dark blue-black, neon cyan, mechanical)
2. **Matrix** — Dark green terminal, monospace, falling characters accent
3. **Minimal** — Clean white/off-white, black typography, no glow effects
4. **Synthwave** — Deep purple background, pink/magenta neon, retro grid

## Acceptance Criteria
- [ ] Theme selector visible in navbar (icon button) or settings drawer
- [ ] All four themes render correctly across all pages
- [ ] Theme persists in `localStorage`
- [ ] Transition animation: smooth 400ms CSS transition on all color tokens
- [ ] No flash of wrong theme on page load (SSR-safe)
- [ ] Each theme has: background, foreground, primary, secondary, panel, border, glow colors
- [ ] Cyber theme = current design (no regressions)
- [ ] Fonts may change per theme (Matrix: monospace, Minimal: Inter only, Synthwave: Orbitron stays)

## Implementation Plan

### 1. Theme Tokens in globals.css
```css
:root {
  --bg: #05070D;
  --fg: #F0F6FC;
  --primary: #0FD3FF;
  --secondary: #00AEEF;
  --panel: rgba(13,17,23,0.7);
  --border: rgba(0,174,239,0.2);
  --glow: rgba(15,211,255,0.3);
}
[data-theme="matrix"] { --bg: #0A0F0A; --primary: #00FF41; ... }
[data-theme="minimal"] { --bg: #F8F8F8; --fg: #0A0A0A; --primary: #1A1A2E; ... }
[data-theme="synthwave"] { --bg: #1A0533; --primary: #FF006E; ... }
```

### 2. ThemeContext: `src/context/ThemeContext.tsx`
- `type Theme = 'cyber' | 'matrix' | 'minimal' | 'synthwave'`
- `useState` with `localStorage` persistence
- Sets `document.documentElement.dataset.theme` on change
- SSR-safe: use `useEffect` for initial set

### 3. ThemeToggle Component: `src/components/ui/ThemeToggle.tsx`
- Four icon buttons (or a segmented control)
- Icons: Cpu (Cyber), Terminal (Matrix), Sun (Minimal), Radio (Synthwave)
- Placed in Navbar right side

### 4. Refactor CSS to Use Tokens
- Audit all hardcoded colors (e.g., `#0FD3FF`) and replace with `var(--primary)`
- This is the biggest effort — do it systematically file by file

### 5. Transition Animation
```css
*, *::before, *::after {
  transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}
```

## Files to Create/Modify
- `src/context/ThemeContext.tsx` [NEW]
- `src/components/ui/ThemeToggle.tsx` [NEW]
- `src/app/globals.css` [MODIFY] — add theme data attributes
- `src/app/layout.tsx` [MODIFY] — ThemeProvider wrap, SSR script
- All component files [MODIFY] — replace hardcoded colors with CSS vars

## Verification
- Switch between all 4 themes — no layout breaks
- Refresh page — theme persists
- No flash on load
- Minimal theme: visually distinct (light background)
- All pages checked in all themes

---

## Theme Preservation Checklist
- [ ] Cyber theme (default) remains EXACTLY as the current design — no regressions
- [ ] New themes ONLY add new data-theme attribute values
- [ ] All themes use the same CSS variable names (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced beyond theme-specific overrides documented above
- [ ] Headings use Orbitron (except Minimal which may use Inter)
- [ ] Monospace/code elements use Share Tech Mono
- [ ] Body text uses Rajdhani (except Minimal)
- [ ] Glow effects match existing pattern per theme
- [ ] No hardcoded hex colors — CSS variables only
- [ ] Every existing component tested in all 4 themes
- [ ] Mobile responsive: 768px and 480px tested in all themes
- [ ] No layout shifts introduced globally
- [ ] SEED-002 (Skill Constellation) uses CSS variables for theming

## Dependency Check
- [ ] All listed phase dependencies are complete
- [ ] Supabase env vars present (if this phase reads/writes to database)
- [ ] Feature flags set if experimental
- [ ] ROADMAP.md status updated to ✅ on completion
- [ ] STATE.md updated with completion note
