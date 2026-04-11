# Testing Protocols Alpha

Evaluating system stability and visual fidelity.

## Phase 1: Automated Verification
- **`npm run build`**: The primary gatekeeper. All changes must pass a full production build to verify TypeScript types and Next.js static generation.
- **`npm run lint`**: Enforces architectural standards, specifically around CSS best practices and React hooks usage.

## Phase 2: Manual Quality Assurance
- **UI Fidelity Sweep**: Manual verification on the local dev server (`localhost:3001` or `3000`) for all cinematic transitions and GLSL-inspired effects.
- **Data Integrity Check**: Cross-verifying that `src/data/*.json` updates propagate correctly to their respective modules (About, Skills, Certificates).
- **Accessibility Audit**: Ensuring semantic HTML tags and keyboard navigation remain operational after component refactors.

## Phase 3: Performance Benchmarking
- **Lighthouse / Core Web Vitals**: Periodic assessment of LCP and CLS to ensure the cinematic aesthetic does not degrade user load performance.
