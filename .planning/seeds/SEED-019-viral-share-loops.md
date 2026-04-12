# SEED-019: Viral Share Loops (Tools result sharing)

### Context
- **Target Phase**: Phase 18 (AI Micro-Tools)
- **Goal**: Drive organic social traffic by making tool results "shareable" as branded assets.

### Implementation
- **Feature**: A "Share Result" button on every AI tool page.
- **Workflow**:
    1. User generates a "Portfolio Roast" or "README".
    2. Button triggers an edge function (`/api/og/tool-result`) using `@vercel/og`.
    3. The function generates a 1200x630 image containing:
        - The tool name and result snippet.
        - "Neural Architect" branding with the neon visual style.
        - A stylized QR code or short link back to the tool.
    4. Provide direct sharing buttons for X (Twitter), LinkedIn, and WhatsApp.
- **Viral Hook**: Use the "Result Grade" (e.g., "Roast Score: 8.5/10") in the image to trigger competitive sharing behavior.

### Technical Notes
- Use `satori` for fast SVG-to-PNG generation on the edge.
- Cache generated images in Supabase Storage with the result ID to avoid re-generating on every share preview.
