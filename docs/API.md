# API Reference & Data Flow

The Neural Architect portfolio relies on a hybrid data model: static JSON ledgers for deterministic, high-read structure, and dynamic dynamic external APIs for live proofs of work.

## Internal APIs (Serverless Proxies)

To circumvent CORS limitations and protect secret tokens such as the GitHub PAT, external requests are proxied through local Next.js Route Handlers.

### `GET /api/github/projects`
**Description:** Fetches repository data from GitHub, ensuring high rate limits via authentication, and sorting by the most recently updated.
**Authentication:** Relies on `process.env.GITHUB_TOKEN` injected by the Node server environment (via `.env.local` or Netlify Env Vars).

**Response Signature:**
```json
// Returns a Promise<Project[]> structure expected by the frontend
[
  {
    "id": 123456,
    "name": "project-repo",
    "description": "Neural processing application.",
    "html_url": "https://github.com/user/project-repo",
    "language": "TypeScript",
    "stargazers_count": 42,
    "forks_count": 10,
    "updated_at": "2026-04-12T15:00:00Z"
  }
]
```

## Static Data Integrations (Content Ledgers)

For complex domain structures that rarely change, the application queries static `.json` files loaded directly at build-time.

- **`src/data/skills.json`**: Powers the constellation/grid mapping on the Skills section layout. Contains proficiency values and categorization mappings.
- **`src/data/certificates.json`**: An array of objects defining the certification paths, image assets, and verification URLs necessary to render the 3D credentials wall.

## External PaaS (Supabase)

Supabase functions as the primary backend orchestration layer.

**Client Initialization:**
The global Supabase client is initialized via `@supabase/supabase-js`.
```typescript
// src/lib/supabaseClient.ts
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

**Table Schema (Current Integrations):**
- **`leads`**: Managed via the multi-step `Contact Form` wizard. Records inbound requests, parsing budget parameters and timeline ranges directly into structured formats.
- *(Future)* **`metrics`**: For visitor logs and RAG processing context blocks for the `/chat` AI proxy.
