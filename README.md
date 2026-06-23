# 🌌 Neural Architect — Professional Portfolio

> **Building the bridge between logic and human interaction.**

Welcome to the central repository of **Farhan Mallick**, a Computer Science Engineer and AI Architect. This portfolio is a high-fidelity, interactive experience designed to showcase the intersection of **AI Agents**, **Immersive UX**, and **Data-Driven Architecture**.

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-0.10-3ECF8E?style=for-the-badge&logo=supabase)
![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?style=for-the-badge&logo=three.js)

*   **Core Logic**: Next.js 16 (App Router) + Turbopack
*   **Intelligence Layer**: Supabase (PostgreSQL, Auth, Edge Functions, pgvector) + Google GenAI + Groq
*   **Cinematics**: GSAP (Scroll-driven animations) + Three.js & React Three Fiber (3D canvas) + Framer Motion
*   **Hardened Styling**: Tailwind CSS + PostCSS + CSS Modules
*   **Typography**: *Orbitron* (Headings), *Rajdhani* (Body), *Share Tech Mono* (UI)

## 🏛️ System Architecture

```mermaid
graph TD
    Client[Client Browser] --> Next[Next.js App Router]
    Client -.->|WebGL| Canvas[Three.js Canvas]
    Client -.->|Animations| GSAP[GSAP/Framer]
    
    subgraph Frontend [Presentation Layer]
        Next --> Pages[Server Components]
        Next --> UI[Client Components]
        Next --> Terminal[Terminal CLI]
    end
    
    subgraph API [API Routes]
        Next --> ChatAPI[/api/chat]
        Next --> AnalyticsAPI[/api/analytics]
        Next --> LeadsAPI[Server Actions]
    end
    
    subgraph Intelligence [Intelligence Layer]
        ChatAPI --> |System Prompt| Grok[xAI Grok-2]
        ChatAPI --> |Query| Qdrant[(Qdrant Vector DB)]
        Qdrant -.-> |RAG Context| Grok
    end
    
    subgraph Data [Data Layer]
        LeadsAPI --> Supabase[(Supabase PG)]
        AnalyticsAPI --> Supabase
        Next --> GitHub[GitHub API]
    end
    
    Supabase --> Edge[Supabase Edge Functions]
    Edge --> Resend[Resend Email API]
```

## 🚀 Key Features

*   **💻 Neural Terminal CLI**: A custom-built interactive terminal component allowing users to explore professional history through a classic command-line interface.
*   **🌌 Skill Constellation V2**: A responsive SVG neural map with click-to-lock interaction pathways, flowing data beams, and intelligent viewpoint priority panning.
*   **🔗 LinkedIn Professional Sync**: All professional history and achievements are synchronized via a unified JSON Content Ledger.
*   **🏆 Achievement Matrix**: An interactive 3D Wall of achievements featuring filtered categories and keyboard-accessible flip interactions for credential verification.
*   **🛰️ Real-time GitHub Integration**: Live project indexing directly from the GitHub API, showcasing star counts, fork activity, and primary languages.

## 🏗️ Folder Structure

```text
.
├── .planning/          # Full SDD Documentation (State, Roadmap, Requirements)
├── content/            # Markdown or MDX content
├── docs/               # API, configuration, and architecture documentation
├── public/             # Optimized 3D assets and static media
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/     # High-fidelity UI components
│   ├── context/        # React context providers (Audio, Role, Theme)
│   ├── data/           # The Source of Truth (JSON Ledgers)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Shared utilities, DB setup, integrations
│   ├── scripts/        # Automation scripts
│   ├── types/          # Global TypeScript types
│   └── utils/          # Helper utilities
```

## 🔄 CI/CD Pipeline & Automation

This project utilizes GitHub Actions and Dependabot for automated quality assurance and maintenance.

### 1. Automated Testing (CI)
The `ci.yml` workflow triggers on pushes and pull requests to the `main` branch. It ensures codebase integrity through:
- **Type Checking:** Validates TypeScript strictness (`npm run type-check`).
- **Linting:** Enforces ESLint rules (`npm run lint`).
- **Unit Tests:** Executes the Vitest test suite with coverage (`npm run test:coverage`).
- **E2E Testing:** Runs Playwright end-to-end browser tests to guarantee critical user flows.

### 2. Performance & Accessibility Scoring
The `lighthouse.yml` workflow automates Lighthouse audits on every pull request to `main`. It runs the project against Lighthouse CI (`lhci`) to enforce:
- A targeted **90+ score** across Performance, Accessibility, Best Practices, and SEO.
- Graceful degradation tests for WebGL and GSAP animations to maintain high FPS and low TBT (Total Blocking Time).

### 3. Automated Maintenance
Dependabot is configured (`.github/dependabot.yml`) to automatically schedule monthly Pull Requests for:
- **Minor/Patch Updates:** Keeping libraries like `react`, `next`, `@supabase/supabase-js`, and `gsap` up to date securely.
- **Major Upgrades Isolation:** Major framework versions (e.g., Tailwind v4, ESLint v10) are intentionally ignored by Dependabot to allow manual validation, ensuring the UI remains unbroken.

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and configure the following variables to connect all services:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Base URL of the site |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase Measurement ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Key |
| `SUPABASE_URL` | Server-side Supabase URL Alias |
| `SUPABASE_ANON_KEY` | Server-side Supabase Anon Key Alias |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (Admin) |
| `GITHUB_TOKEN` | GitHub Personal Access Token for API |
| `CAL_API` | Cal.com API Key |
| `NEXT_PUBLIC_CAL_USERNAME` | Cal.com Username |
| `NEXT_PUBLIC_CAL_LINK` | Full link to Cal.com scheduling page |
| `ADMIN_PASSWORD` | Password for admin access / auth |
| `GROQ_API_KEY` | Groq API Key |
| `RESEND_API_KEY` | Resend API Key for emails |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Dodo Payments Webhook Secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile Site Key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile Secret Key |
| `JWT_SECRET` | Secret for sessions (defaults to Admin password) |
| `IP_SALT` | Salt used for rate limiting IPs |
| `QDRANT_URL` | URL to Qdrant vector DB instance |
| `QDRANT_API_KEY` | Qdrant API Key |
| `GEMINI_API_KEY` | Google GenAI API Key for embeddings |

## 💻 Local Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd portfolio
    ```

2.  **Install dependencies:**
    This project uses `npm`. Run the following to install all required packages:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Copy `.env.example` to `.env.local` and fill in the values corresponding to the table above.
    ```bash
    cp .env.example .env.local
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

## ⚡ Deployment Instructions (Netlify)

This project is optimized for deployment on **Netlify** for globally distributed performance.

1.  **Push to GitHub:** Ensure your latest code is committed and pushed to your primary branch.
2.  **Connect to Netlify:**
    *   Log in to Netlify and create a new site from your GitHub repository.
3.  **Configure Build Settings:**
    *   **Build Command:** `npm run build`
    *   **Publish Directory:** `.next`
    *   *Note: Netlify usually auto-detects Next.js projects and applies the Essential Next.js plugin automatically.*
4.  **Set Environment Variables:**
    *   In the Netlify dashboard for your site, go to **Site configuration > Environment variables**.
    *   Add all the required environment variables listed in the Environment Variables section above. Make sure you use production keys.
5.  **Deploy:** Trigger a deployment. Netlify will build the Next.js app and serve it across their edge network.

---

*“Working code is the baseline. Optimized, accessible, and cinematic code is the goal.”*
