# Project Conventions Alpha

Establishing standardized development protocols and mechanical aesthetics.

## Coding Standards
1. **TypeScript Supremacy**: No `any` types. All data models must be defined in `src/types/` (or locally if scoped).
2. **Data-Driven Content**: Site content must be sourced from `src/data/*.json`. Hardcoding text in components is discouraged.
3. **Component Structure**: Single responsibility components. Use `MechPanel` for all primary containers to maintain aesthetic consistency.

## Styling Protocols
1. **Tailwind for Layout**: Use Tailwind for rapid interface composition and layouting.
2. **CSS Modules for Effects**: Complex visual effects (glitches, gradients, grid systems) **must** be moved to CSS Modules (`*.module.css`) to prevent global pollution and satisfying project-wide linting standards.
3. **No Inline Styles**: Adhere to the "Style Isolation" standard; inline `style` props are permitted only for truly dynamic animations (e.g., Framer Motion properties).

## Accessibility Protocols
1. **Semantic HTML**: Use proper tags (`<nav>`, `<main>`, `<header>`, `<footer>`).
2. **Interactive Isolation**: Never nest interactive elements (e.g., links inside buttons or cards). Use dedicated controls for flipping/details.
3. **Tab Order**: Ensure all interactive modules are keyboard navigable with clear focus states.

---

# Testing Protocols Alpha

Evaluating system stability and visual fidelity.

## Automated Verification
1. **`npm run build`**: Mandatory verification before any major commit. Ensures type safety and static generation success.
2. **`npm run lint`**: Used to enforce styling and architectural conventions.

## Manual Audits
1. **UI Fidelity Check**: Visual verification on the Dev Server (`localhost:3000`) for all animation and styling refactors.
2. **Responsiveness Audit**: Verify rendering across Mobile, Tablet, and Ultrawide resolutions.
3. **Data Integrity Audit**: Confirm JSON updates correctly reflect in the UI without truncation or mapping errors.
