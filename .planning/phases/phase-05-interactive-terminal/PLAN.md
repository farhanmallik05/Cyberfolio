# Phase 5: Interactive Terminal / CLI

## Objective
Build a fake terminal section on the homepage (or dedicated /terminal route) where visitors type commands to explore the portfolio — fully keyboard navigable, true to the Neural Architect brand.

## Acceptance Criteria
- [ ] Terminal renders with monospace font, cursor blink, and neon cyan output
- [ ] Command: `help` → lists all available commands
- [ ] Command: `projects` → displays project list with titles and tech stack
- [ ] Command: `skills` → prints an ASCII skill tree by category
- [ ] Command: `contact` → scrolls to or links to the contact form
- [ ] Command: `hire` → shows availability status and next steps
- [ ] Command: `sudo hire` → easter egg response (funny, memorable)
- [ ] Command: `clear` → clears terminal output
- [ ] Command: `who` → prints bio blurb
- [ ] Unknown commands: shows "command not found" error in red
- [ ] Keyboard navigable: up/down arrow keys cycle command history
- [ ] Responsive: works on mobile (touch keyboard)
- [ ] Accessible: aria-live region announces output

## Implementation Plan

### 1. Component: `TerminalSection.tsx`
- Location: `src/components/TerminalSection.tsx`
- State: `inputValue`, `history` (array of `{type: 'input'|'output'|'error', text}`)
- `useRef` for auto-scroll to bottom on new output
- `useRef` for input focus
- Command history: `useRef` array, arrow keys cycle through it

### 2. Command Registry: `src/data/terminal-commands.ts`
```ts
export const COMMANDS: Record<string, () => string[]> = {
  help: () => ['Available commands: help, who, projects, skills, contact, hire, sudo hire, clear'],
  who: () => ['Farhan Mallick', 'Computer Science Student • Builder • UI/UX Explorer', ...],
  projects: () => [...project list...],
  skills: () => [...ascii skill tree...],
  contact: () => ['Opening secure channel... → /contact'],
  hire: () => ['Status: 🟢 Available', 'Response time: 24h', ...],
  clear: () => [], // special: resets history
}
```

### 3. Styling
- Dark panel with `font-mono` and `text-mech-cyan`
- Input line: `> ` prefix in cyan, typed text in white
- Error output: `text-red-400`
- Success/info: `text-mech-cyan`
- Warning/easter egg: `text-neon-amber` or `text-mech-blue`
- Cursor: animated `|` or block cursor with CSS animation

### 4. Integration
- Add as a section on homepage after the hero
- Or add `/terminal` route for standalone access
- Add `terminal` command to the Navbar nav items
- Easter egg: `sudo hire` shows the Neural response in magenta

## Files to Create/Modify
- `src/components/TerminalSection.tsx` [NEW]
- `src/data/terminal-commands.ts` [NEW]
- `src/app/page.tsx` [MODIFY] — add TerminalSection
- `src/components/Navbar.tsx` [MODIFY] — optionally add Terminal nav item
- `src/app/globals.css` [MODIFY] — add `.terminal-cursor` blink animation

## Verification
- Type all commands manually and verify output
- Test up/down arrow command history
- Test mobile keyboard input
- Check auto-scroll behavior
- Verify `clear` command empties history
- Verify unknown command shows error

---

## Theme Preservation Checklist
- [ ] Uses only existing CSS variables (--neon, --neon2, --bg, --bg2, --glass, --glass2, --border, --text, --dim)
- [ ] No new fonts introduced (Orbitron / Share Tech Mono / Rajdhani only)
- [ ] Terminal panel matches glass style: background: var(--glass), border: 1px solid var(--border), backdrop-filter: blur(20px)
- [ ] Headings use Orbitron
- [ ] Terminal output uses Share Tech Mono
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
