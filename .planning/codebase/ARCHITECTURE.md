# System Architecture Alpha

Analyzing core design patterns and data flow models.

## Data-Driven Content Ledger
The project follows a "Source of Truth" pattern in `src/data/`. All dynamic content (Experience, Bio, Skills, Certificates, Projects, Now-priorities) are stored as structured JSON. Components act as "Neural Renderers" that ingest this data, ensuring style-to-content separation.

### Core Data Flows:
1. **Sync**: Raw Professional Data (LI Export) -> JSON Content Ledger.
2. **Fetch**: JSON Content Ledger -> Next.js Page (Server/Client components).
3. **Render**: UI Components (MechPanel) -> User Interface.

## Modular Component Design
UI elements are architected as atomic, reusable modules:
- **Base Layer**: Standard interactive controls (links, buttons).
- **Mech Layer**: Functional panels and glassmorphism containers.
- **Cinematic Layer**: Complex GSAP and Motion-based effects.

## Styling & Theme Isolation
Following the hardening phase, complex visual effects are strictly isolated into **CSS Modules** to prevent global namespace pollution and ensure high-performance rendering of dynamic background effects.

---

# Directory Structure

```text
/src
  /app          - Next.js 16 App Router (Page Logic)
  /components   - Reusable mechanical UI modules
  /data         - Centralized JSON Content Ledger (Source of Truth)
  /lib          - Core utilities (Icon mapping, analytics)
  /styles       - Global theme tokens and CSS variables
/public         - Static assets (images, fonts)
/.planning      - Persistent GSD system state and roadmap
```
