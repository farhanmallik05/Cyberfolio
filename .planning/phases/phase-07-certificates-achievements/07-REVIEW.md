# Code Review :: Phase 7 — Certificates & Achievements Wall

Audit of the high-fidelity mission credentials system.

## Summary of Findings

| Severity | Category | Description |
| :--- | :--- | :--- |
| 🔴 **Critical** | Accessibility | Search input in `CertificatesPage` is missing an `aria-label`, failing WCAG 4.1.2. |
| 🟡 **Warning** | Performance | Redundant `transition-transform` class in `CertificateCard` conflicts with Framer Motion logic. |
| 🔵 **Info** | Maintainability | GitHub README extraction logic is duplicating patterns from the `/social` Node. |

---

## Detailed Findings

### [CRITICAL] Accessibility: Headless Search Input
**File**: [page.tsx](file:///d:/Antigravity/Projects/Portfolio/src/app/certificates/page.tsx#L55-61)
The search input lacks an explicit `aria-label` or `<label>` element. This prevents screen readers from identifying the purpose of the field.
- **Fix**: Add `aria-label="Search certificates and achievements"`.

### [WARNING] Performance: Double Transition Conflict
**File**: [CertificateCard.tsx](file:///d:/Antigravity/Projects/Portfolio/src/components/ui/CertificateCard.tsx#L49)
The card wrapper utilizes both a CSS transition class and Framer Motion's `animate` prop. While visually functioning, this can lead to jittery 3D rotations on slower hardware due to animation orchestration conflicts.
- **Fix**: Remove `transition-transform duration-700` from the `motion.div`.

### [INFO] Maintainability: Extraction Abstraction
**File**: [social/page.tsx](file:///d:/Antigravity/Projects/Portfolio/src/app/social/page.tsx)
The logic for stripping markdown from titles is robust but currently resides in the page component.
- **Fix**: Move `sanitizeReadmeTitle` to `src/lib/github-api.ts` to share logic with future data-heavy nodes.

---

## Conclusion
Phase 7 is structurally sound with high visual fidelity. The identified issues are low-effort fixes that will substantially improve the project's hardening status.
