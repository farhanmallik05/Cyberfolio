# SEED-021: SEO Breadcrumb System (JSON-LD integrated)

### Context
- **Target Phase**: Phase 12 (Projects Index + Case Studies)
- **Goal**: Improve Google search result snippets and deep-site navigation.

### Implementation
- **Component**: Create a `Breadcrumbs` component for the "Platform Layer" (Blog, Store, Projects).
- **Style**: Minimal mono text with ` ▸ ` separators.
- **Search Engine Logic**:
    - Automatically inject `LdJson` schema of type `BreadcrumbList`.
    - Map route segments to human labels (e.g., `/blog/nextjs-gsap` → `Home / Blog / Next.js + GSAP`).

### Technical Notes
- Use the `metadata` API in Next.js to provide standard titles while the component handles the structured data.
- Ensure the "Home" icon uses the local site symbol `◈` as defined in the `RoleContext`.
