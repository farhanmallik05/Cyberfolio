# Phase 8: Resume Role Customizer

## Objective
Allow visitors to select the role they're hiring for (Frontend Dev, Automation Engineer, AI Developer) and have the portfolio dynamically reorder sections and highlight the most relevant skills, projects, and experience.

## Acceptance Criteria
- [ ] Role selector visible on homepage and/or a dedicated /resume page
- [ ] Three roles: Frontend Developer, Automation Engineer, AI Developer
- [ ] Selecting a role changes what's highlighted on the Projects page
- [ ] Selecting a role reorders skill priorities on the Skills page
- [ ] A tailored summary/bio appears based on selected role
- [ ] Role selection persists in `localStorage`
- [ ] "Viewing as: [Role]" indicator in navbar or sticky bar
- [ ] Default state: all roles, generic view
- [ ] Smooth transition between roles (Framer Motion)

## Implementation Plan

### 1. Context: `src/context/RoleContext.tsx`
```tsx
type Role = 'default' | 'frontend' | 'automation' | 'ai';
const RoleContext = createContext<{ role: Role, setRole: ... }>();
```
- Wrap layout in `<RoleProvider>`
- Persist to `localStorage` on change

### 2. Data: `src/data/role-config.json`
```json
{
  "frontend": {
    "bio": "Building pixel-perfect UIs...",
    "highlightedSkills": ["React", "Next.js", "TypeScript", "CSS"],
    "featuredProjects": ["project-slug-1", "project-slug-2"],
    "label": "Frontend Developer"
  },
  "automation": { ... },
  "ai": { ... }
}
```

### 3. Role Selector Component: `src/components/RoleSelector.tsx`
- Three toggle buttons styled as terminal command options
- Render in hero section beneath the CTA buttons
- `> Select viewing mode:  [FRONTEND] [AUTOMATION] [AI]`
- Active role highlighted with neon glow

### 4. Consuming Role in Pages
- `page.tsx` (home): show role-specific bio and subtitle
- `projects/page.tsx`: filter/sort projects based on `featuredProjects`
- `skills/page.tsx`: reorder skill groups, highlight featured skills

### 5. "Viewing As" Banner
- Sticky top bar (below navbar) showing current role
- `You are viewing as: Automation Engineer` with reset button

## Files to Create/Modify
- `src/context/RoleContext.tsx` [NEW]
- `src/components/RoleSelector.tsx` [NEW]
- `src/data/role-config.json` [NEW]
- `src/app/layout.tsx` [MODIFY] — wrap with RoleProvider
- `src/app/page.tsx` [MODIFY] — consume role context
- `src/app/projects/page.tsx` [MODIFY] — filter by role
- `src/app/skills/page.tsx` [MODIFY] — sort by role

## Verification
- Select each role, verify bio updates
- Verify projects filtered correctly per role
- Verify localStorage persists role on refresh
- Verify "Viewing As" banner shows
- Default state renders all content

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Role selector buttons match existing button styles
- [ ] Headings use Orbitron
- [ ] Monospace/code elements use Share Tech Mono
- [ ] Body text uses Rajdhani
- [ ] Active role glow matches existing pattern: box-shadow: 0 0 20px rgba(0,245,255,0.3)
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
