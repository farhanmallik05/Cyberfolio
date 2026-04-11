# System Structure Alpha

Visualizing the system hierarchy and module ownership.

## Core Hierarchy
```text
Portfolio/
├── .planning/          # GSD Blueprint & persistent state
│   ├── codebase/       # Current system mapping (THIS)
│   ├── debug/          # Active investigation logs
│   ├── STATE.md        # Real-time project health
│   └── ROADMAP.md      # Future operational phases
├── public/             # Cinematic assets and fonts
└── src/
    ├── app/            # Route segments and Page modules
    │   ├── (shared)/   # Global layout and headers
    │   ├── skills/     # High-density module diagnostics
    │   └── ...
    ├── components/     # Functional UI modules
    │   ├── ui/         # Base mechanical primitives
    │   └── icons/      # Specialized icon components
    ├── data/           # Content Ledger (JSON)
    ├── lib/            # Shared utilities & constants
    └── styles/         # Global visual tokens
```

## Module Definitions
- **`/src/data/`**: Explicit source of truth for text, lists, and credentials.
- **`/src/components/ui/`**: Pure mechanical components with no side-effects.
- **`/src/lib/icons.ts`**: The mandatory registry for all Lucide symbols used across the platform.
- **`/src/app/`**: Orchestration layer that binds data to components.
