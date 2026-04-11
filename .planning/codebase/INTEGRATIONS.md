# Integration Grid

Mapping external data bridges and system hooks.

## External Intelligence
- **GitHub API**:
    - **Usage**: Fetching dynamic project metrics (stars, forks, languages).
    - **Endpoint**: `https://api.github.com/users/farhanmallik05/repos`
- **LinkedIn Export Pattern**:
    - **Mechanism**: CSV ingestion and non-destructive JSON merge.
    - **Context**: Updating experience, certifications, and skills without manual entry.

## Internal Utilities
- **Unified Icon Mapper (`src/lib/icons.ts`)**:
    - Centralized dictionary for mapping string identifiers (from JSON) to Lucide icon components.
    - Prevents icon drift across SocialHub, Footer, and Certifications.
- **Analytics Hook**:
    - Basic event tracking for project discovery and resume downloads.

## Planned Bridges
- **Supabase pgvector**: Integrating semantic search for the project marketplace and blog discovery.
- **RSS Feed**: Aggregating LinkedIn "Build in Public" activity directly into the Home Dashboard.
