# Phase 12 Code Review: Cinematic Projects & Case Studies

**Review Mode**: Standard
**Status**: Critical Fixes Required

---

## 🛑 Critical Findings

### 1. GSAP Memory Leak (Missing Cleanup)
- **File**: `src/components/projects/ProcessTimeline.tsx` (Lines 31-72)
- **Issue**: The `gsap.context()` is used, but it's not correctly wrapping all animations, and there's a risk that ScrollTrigger instances remain active after component unmount.
- **Impact**: Performance degradation and "ghost" vertical scroll triggers after navigating away.
- **Fix**: Ensure all ScrollTriggers are created inside the `gsap.context` block and call `ctx.revert()` in the cleanup function.

### 2. Runtime Dependency Hazards
- **File**: `src/components/ui/ProjectCard.tsx`
- **Issue**: Re-imports restored previously, but check if `framer-motion` versioning is consistent with the rest of the app.
- **Fix**: Verified imports are now stable.

---

## ⚠️ Warning Findings

### 1. Hardcoded Grid Layouts
- **File**: `src/app/projects/page.tsx`
- **Issue**: `grid-cols-3` might be too dense for smaller tablets before hitting the mobile breakpoint.
- **Fix**: Use `lg:grid-cols-3 md:grid-cols-2 grid-cols-1`.

### 2. Empty State Visuals
- **File**: `src/app/projects/page.tsx`
- **Issue**: The "No Intelligence Matching" message is very plain compared to the rest of the cinematic UI.
- **Fix**: Add a subtle glitch effect or a scanning animation to the empty state.

---

## 💡 Info & Optimization

### 1. Fuse.js Threshold Tuning
- **File**: `src/app/projects/page.tsx`
- **Issue**: `threshold: 0.3` is standard, but for technical terms, `0.2` might be better to avoid fuzzy matches that don't make sense (e.g., matching "React" with "Reach").

### 2. Safari Backdrop Filter
- **File**: `src/components/projects/ProcessTimeline.module.css`
- **Issue**: Already patched `-webkit-backdrop-filter`. (Resolved)

---

## Conclusion
The architecture is sound, but **GSAP ScrollTrigger management** needs tightening to prevent performance issues in a multi-page Next.js environment.
