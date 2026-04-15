# Testing & Verification

Due to the heavy reliance on cinematic animations, asynchronous data fetching, and canvas elements, testing the Neural Architect portfolio relies heavily on automated audits and rigorous visual verification.

## GSD Automated Verification

As part of the **Get Shit Done (GSD)** execution loop, the project utilizes the `.planning/phases/` directories to construct verification criteria. 

When a phase completes execution, the orchestrator triggers a validation loop that asserts the `VERIFICATION.md` goals have been met. 

### Running System Health Audits
If you notice integration failures or state mismatch, you can invoke the GSD diagnostic tools:
```bash
/gsd-health
```
This forces an audit of the planning directory and attempts to repair corrupted orchestration logic.

## Manual Visual Verification

Because GSAP timelines and WebGL shaders are deeply tied to DOM mounting and screen sizes, developers must manually verify core interactions across viewport boundaries.

**Critical Paths to Verify Manually:**
1. **Boot Sequence (`HomeLoader.tsx`)**: Ensure the loading percentage visually completes and the component gracefully unmounts without throwing React hydration warnings.
2. **Glitch Alignments**: The `GlitchText` UI components inherently use tricky CSS tracking. Ensure layers do not misalign or truncate text unexpectedly on mobile viewports.
3. **Interactive Terminal (`Terminal.tsx`)**: 
   - Verify keyboard auto-focus triggers when mounted.
   - Validate input handling against unknown commands.
4. **Data Grid Loading (`ProjectsPreview.tsx`)**: Ensure that the "Fetching deployments" loading state appears before snapping the 3D cards into their loaded state. Monitor the console for the `Neural grid transmission failure` logs if fetching fails.

## CI/CD Pipeline Assumptions

Netlify deployment handles edge optimization, but edge environments differ from local Node setups:
- Verify that server-side functionality (like the `/api/github/projects/route.ts`) leverages standard Node runtimes or Edge runtimes properly if the `edge` tag is explicitly defined.
- Monitor build logs in Netlify specifically for `eslint` or `tsc` warnings related to typed definitions, as strict mode is enabled.
