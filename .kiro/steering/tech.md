# Technology Steering: Neural Architect

## 1. System Design: C4 Context Model

```mermaid
graph TD
    Visitor(["Web Visitor [Person] - A client, recruiter, or developer."])
    Portfolio["Neural Architect Platform [System] - Cinematic portfolio, blog, and service hub."]
    
    GitHub["GitHub API [External] - Provides live repository stats."]
    Supabase["Supabase [External] - Auth, PostgreSQL DB, Edge Functions."]
    Qdrant["Qdrant Vector DB [External] - Stores semantic embeddings."]
    DodoPayments["Dodo Payments [External] - Global payment processing & billing."]
    CalCom["Cal.com [External] - Booking and scheduling API."]

    Visitor -->|"Views, interacts, and purchases from"| Portfolio
    Portfolio -->|"Fetches stats from"| GitHub
    Portfolio -->|"Reads/Writes data, authenticates via"| Supabase
    Supabase -->|"Syncs embeddings via Edge Functions to"| Qdrant
    Portfolio -->|"Processes payments via"| DodoPayments
    Portfolio -->|"Embeds scheduling widget from"| CalCom
```
```

---

## 2. Exhaustive Tech Stack Matrix

| Layer | Dependency | Version | Justification / Purpose | Absolute Path |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `^16.1.6` | App Router provides mixed SSR/SSG. Edge API routes handle lightweight endpoints. | [`package.json`](file:///d:/Antigravity/Projects/Portfolio/package.json) |
| **UI Library** | React | `^19.2.4` | Server Components reduce client bundle. Context API used for global state (Themes). | [`package.json`](file:///d:/Antigravity/Projects/Portfolio/package.json) |
| **Styling** | Tailwind CSS | `^3.4.1` | Atomic CSS utility classes mixed with local CSS modules for extreme customizability. | [`tailwind.config.ts`](file:///d:/Antigravity/Projects/Portfolio/tailwind.config.ts) |
| **Animations** | Framer Motion | `^12.34.3`| Handles granular micro-interactions, modal pop-ups, and step-wizard states. | [`package.json`](file:///d:/Antigravity/Projects/Portfolio/package.json) |
| **Cinematic UI** | GSAP | `^3.14.2` | ScrollTrigger manages complex, multi-component wave rendering and timeline pinning. | [`GSAPRegistrar.tsx`](file:///d:/Antigravity/Projects/Portfolio/src/components/home/GSAPRegistrar.tsx) |
| **WebGL & 3D** | Three.js + Fiber | `^0.183.1`| Performs GPU-accelerated background rendering (stars, grids, particles) without DOM thrashing. | [`BackgroundSystem.tsx`](file:///d:/Antigravity/Projects/Portfolio/src/components/BackgroundSystem.tsx) |
| **Database** | Supabase JS | `^2.103.0`| Interacts with Postgres tables, stores contact submissions, manages Auth for the `/admin` panel. | [`supabase/`](file:///d:/Antigravity/Projects/Portfolio/supabase/) |
| **Vector Engine** | Qdrant Client | `^1.18.0` | Enables high-speed semantic search over case studies and blogs for the RAG AI Chatbot. | [`qdrant.ts`](file:///d:/Antigravity/Projects/Portfolio/src/lib/qdrant.ts) |

---

## 3. Database Schema Overview (Entity Relationship)

```mermaid
erDiagram
    CONTACT_MESSAGES {
        uuid id PK
        string name
        string email
        string project_type
        string budget
        text message
        timestamp created_at
    }
    BLOG_POSTS {
        uuid id PK
        string title
        string slug
        boolean published
        timestamp published_at
    }
    DIGITAL_ORDERS {
        uuid id PK
        string razorpay_id UK
        string customer_email
        float amount
        string status
        timestamp created_at
    }
    VECTOR_EMBEDDINGS {
        uuid chunk_id PK
        string source_url
        vector content_vector
    }

    CONTACT_MESSAGES ||--o{ DIGITAL_ORDERS : "placed_by_same_email"
```

---

## 4. CI/CD & Deployment Pipeline

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as GitHub
    participant CI as GitHub Actions
    participant Vercel as Netlify / Host
    participant Supa as Supabase Cloud

    Dev->>Git: Push to `main`
    Git->>CI: Trigger Build & Test Action
    activate CI
    CI->>CI: Run ESLint & Vitest
    CI->>Supa: Apply DB Migrations (`npx supabase db push`)
    Supa-->>CI: Success
    CI->>Vercel: Trigger Production Build
    Vercel->>Vercel: `next build` (Turbopack)
    Vercel-->>CI: Build Complete
    CI-->>Git: Green Check (Deploy Success)
    deactivate CI
```

---

## 5. Security & Performance Constraints

> [!IMPORTANT]
> **Zero Global CSS Pollution**: All non-Tailwind styling MUST reside in `.module.css` files. Global scoping is prohibited except for theme variables in `globals.css`.

> [!WARNING]
> **Idempotency in Payments**: Digital product webhooks MUST use Supabase `upsert` with `onConflict: 'dodo_payment_id'` to prevent duplicate deliveries.

> [!TIP]
> **Edge Caching**: GitHub API fetches MUST utilize Next.js `fetch` caching with `revalidate: 3600` to prevent rate-limiting during high traffic spikes.
