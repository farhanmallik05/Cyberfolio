-- ============================================================
-- Portfolio Projects Table (full schema + seed data)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug        text UNIQUE NOT NULL,
    title       text NOT NULL,
    tagline     text,
    description text,
    tech        text[] DEFAULT '{}',
    tech_stack  text[] DEFAULT '{}',
    category    text,
    skill_tags  text[] DEFAULT '{}',
    year        integer DEFAULT EXTRACT(YEAR FROM now()),
    status      text NOT NULL DEFAULT 'published',
    featured    boolean DEFAULT false,
    thumbnail   text,
    live_url    text,
    github_url  text,
    case_study  boolean DEFAULT false,
    overview    jsonb DEFAULT '{}',
    screenshots jsonb DEFAULT '[]',
    process     jsonb DEFAULT '[]',
    tech_details text,
    results     text,
    created_at  timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
    updated_at  timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Everyone can read
DROP POLICY IF EXISTS "Public can read projects" ON public.portfolio_projects;
CREATE POLICY "Public can read projects"
    ON public.portfolio_projects FOR SELECT USING (true);

-- Service role can write (admin server actions bypass RLS when using service key)
DROP POLICY IF EXISTS "Service role manages projects" ON public.portfolio_projects;
CREATE POLICY "Service role manages projects"
    ON public.portfolio_projects FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ── Auto-update updated_at ────────────────────────────────────
CREATE OR REPLACE FUNCTION update_portfolio_projects_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS portfolio_projects_updated_at ON public.portfolio_projects;
CREATE TRIGGER portfolio_projects_updated_at
    BEFORE UPDATE ON public.portfolio_projects
    FOR EACH ROW EXECUTE PROCEDURE update_portfolio_projects_updated_at();

-- ── Seed data ────────────────────────────────────────────────
INSERT INTO public.portfolio_projects
    (slug, title, tagline, description, tech, tech_stack, category, skill_tags, year, status, featured, live_url, github_url, case_study, overview, screenshots, process, tech_details, results)
VALUES
(
    'neural-ledger-portfolio',
    'Neural Ledger Portfolio',
    'A high-fidelity, cinematic web portfolio utilizing hardware-accelerated animations.',
    'An immersive digital portfolio constructed as a cyber-mechanical terminal, demonstrating advanced frontend capabilities in layout fluidity, real-time 3D rendering, and custom scroll-driven animation architecture.',
    ARRAY['Next.js', 'GSAP', 'Three.js', 'CSS Modules'],
    ARRAY['Next.js', 'GSAP', 'Three.js', 'CSS Modules'],
    'Web Dev',
    ARRAY['frontend', 'design-ux', 'core-lang', 'devops'],
    2026, 'live', true,
    'https://farhanmallik.dev',
    'https://github.com/farhanmallik05/portfolio',
    true,
    '{"problem":"Standard template-based portfolios lacked the raw mechanical identity required to stand out.","role":"Frontend Architect & Interaction Designer","outcomes":["100/100 Lighthouse Performance","Engineered GSAP Flip index mapping zero layout shifts","Micro-interactions coupled with heavy GSAP timelines"]}',
    '[{"url":null,"caption":"Terminal Command Emulation","mobile":false}]',
    '[{"phase":"Architecture Setup","description":"Defined global CSS variables for strict color palette enforcement.","tools":["Figma","CSS"]},{"phase":"Animation Integration","description":"Built scroll-synced components with GSAP inside useIsomorphicLayoutEffect.","tools":["GSAP","ScrollTrigger"]},{"phase":"3D Processing","description":"Imported compressed GLTF primitives. Mapped pointer velocities to mesh rotations.","tools":["Three.js","R3F"]}]',
    'Transitioned from React state-linked animations to DOM references via GSAP contexts to eliminate unnecessary re-renders.',
    'Increased dwell time by 400% compared to previous static iterations.'
),
(
    'n8n-cognitive-pipeline',
    'Cognitive Workflow Pipeline',
    'Self-healing enterprise webhook infrastructure.',
    'A deeply automated routing system running entirely on n8n and Python microservices to intercept API failures, summarize log traces, and execute autonomous recovery playbooks.',
    ARRAY['n8n', 'Python', 'Docker', 'PostgreSQL'],
    ARRAY['n8n', 'Python', 'Docker', 'PostgreSQL'],
    'Automation',
    ARRAY['automation', 'backend-api', 'devops', 'core-lang'],
    2025, 'in-progress', true,
    null,
    'https://github.com/farhanmallik05/n8n-cognitive',
    true,
    '{"problem":"Manual intervention in failed asynchronous webhooks was creating significant operational delays. Support engineers spent 20+ hours weekly diagnosing raw API payloads.","role":"Automation Engineer","outcomes":["Automated 80% of Level 1 payload triages","Reduced error identification time from 15 minutes to <2 seconds","Established a scalable Dockerized instance topology"]}',
    '[{"url":null,"caption":"n8n Sub-workflow execution map","mobile":false}]',
    '[{"phase":"Infrastructure Scaling","description":"Set up highly available n8n Docker containers connected to a central PostgreSQL database to handle up to 5,000 tasks per hour.","tools":["Docker Compose","n8n"]},{"phase":"Python Log Parser","description":"Wrote a bespoke Python queue consumer to ingest incoming failed trace chunks and format them cleanly for alert broadcasting.","tools":["Python","FastAPI"]}]',
    'Utilized advanced n8n webhooks alongside a redundant Postgres structure. Webhooks process asynchronously while the Python instance acts as a circuit breaker during flood scenarios.',
    'Completely eliminated dead-letter queues by introducing automatic retry mechanics managed intelligently by the system.'
),
(
    'claude-security-agent',
    'Claude Security Agent',
    'Autonomous pull request security auditing.',
    'A specialized GitHub App wrapper leveraging the Claude API. It hooks directly into the CI/CD pipeline, automatically reading code diffs, mapping dependencies, and generating zero-hallucination security patches.',
    ARRAY['Python', 'Claude API', 'GitHub Actions', 'Node.js'],
    ARRAY['Python', 'Claude API', 'GitHub Actions', 'Node.js'],
    'AI',
    ARRAY['ai-llm', 'security-ops', 'automation', 'backend-api', 'devops'],
    2026, 'live', true,
    null,
    'https://github.com/farhanmallik05/claude-sec',
    true,
    '{"problem":"Vulnerabilities were slipping into staging branches due to superficial manual reviews. Static analysis tools generated too much noise and no actionable patch code.","role":"AI Integrations Lead","outcomes":["Identified zero-day dependency leaks continuously","Outputted ready-to-merge patches without human prompting","Averaged a latency of ~4s per 2,000 LOC diffs"]}',
    '[{"url":null,"caption":"Agent posting a diff patch directly in PR comments","mobile":false}]',
    '[{"phase":"Prompt Engineering","description":"Engineered multi-shot structural prompts restricting the Claude API to strictly output unified diff formats with exact line references.","tools":["Anthropic API","Python"]},{"phase":"Pipeline Wrapping","description":"Wrote a lightweight Node.js action that listens for PR payload events, aggregates the changes, and initiates the inference call.","tools":["GitHub Actions","TypeScript"]}]',
    'The integration leverages Claude extended context window to cache the repository structure inside the thread. It mitigates token limits by stripping un-changed functions directly in Python before sending payloads.',
    'Saved engineering teams roughly 4 hours per sprint in manual security tracing, while preventing major key-exposure leaks.'
),
(
    'codefolio',
    'Codefolio',
    'A premium developer portfolio platform with real-time analytics.',
    'A full-stack SaaS platform for developers to create stunning, data-driven portfolio sites with built-in analytics, GitHub integration, and AI-powered project descriptions.',
    ARRAY['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    ARRAY['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    'Web Dev',
    ARRAY['frontend', 'backend-api', 'design-ux', 'devops'],
    2026, 'live', true,
    null,
    'https://github.com/farhanmallik05/codefolio',
    true,
    '{"problem":"Developers needed a better way to showcase their work beyond static resumes.","role":"Full Stack Developer","outcomes":["Real-time GitHub stats integration","AI-generated project summaries","Custom domain support"]}',
    '[]', '[]',
    'Built on Next.js App Router with Supabase for real-time data and authentication.',
    'Enabled developers to create professional portfolios in under 5 minutes.'
),
(
    'hr-os',
    'HR OS',
    'Intelligent HR management operating system.',
    'A comprehensive HR management platform that automates recruitment, onboarding, payroll, and performance tracking using AI-powered workflows and real-time data pipelines.',
    ARRAY['Next.js', 'Python', 'n8n', 'PostgreSQL'],
    ARRAY['Next.js', 'Python', 'n8n', 'PostgreSQL'],
    'Automation',
    ARRAY['automation', 'ai-llm', 'backend-api', 'frontend'],
    2026, 'in-progress', true,
    null,
    'https://github.com/farhanmallik05/hr-os',
    true,
    '{"problem":"HR teams were drowning in manual processes, losing hours on routine tasks.","role":"Product Architect","outcomes":["Automated 90% of routine HR workflows","Reduced onboarding time from 2 weeks to 2 days","Integrated AI-powered candidate screening"]}',
    '[]', '[]',
    'Built with a microservices architecture using n8n for workflow orchestration.',
    'Reduced HR operational costs by 60% in pilot deployments.'
),
(
    'track-financially',
    'Track-Financially',
    'A premium Next.js fintech dashboard for the Indian market.',
    'A premium Next.js fintech dashboard for the Indian market, automating transaction capture via Gmail integration, providing real-time spending analytics, and generating intelligent financial insights.',
    ARRAY['Next.js', 'Gmail API', 'Supabase', 'Gemini AI'],
    ARRAY['Next.js', 'Gmail API', 'Supabase', 'Gemini AI'],
    'Web Dev',
    ARRAY['frontend', 'backend-api', 'ai-llm', 'automation'],
    2026, 'live', true,
    null,
    'https://github.com/farhanmallik05/track-financially',
    true,
    '{"problem":"Indians lacked a smart tool to automatically track expenses from bank emails and UPI transactions.","role":"Full Stack Developer & Product Designer","outcomes":["Automated Gmail transaction parsing","Real-time spending analytics dashboard","AI-powered budget recommendations"]}',
    '[]', '[]',
    'Uses Gmail API OAuth2 to parse transaction emails and Gemini AI for financial insights.',
    'Helps users save an average of 20% more by providing actionable spending insights.'
)
ON CONFLICT (slug) DO UPDATE SET
    title        = EXCLUDED.title,
    tagline      = EXCLUDED.tagline,
    description  = EXCLUDED.description,
    tech         = EXCLUDED.tech,
    tech_stack   = EXCLUDED.tech_stack,
    category     = EXCLUDED.category,
    skill_tags   = EXCLUDED.skill_tags,
    year         = EXCLUDED.year,
    status       = EXCLUDED.status,
    featured     = EXCLUDED.featured,
    live_url     = EXCLUDED.live_url,
    github_url   = EXCLUDED.github_url,
    case_study   = EXCLUDED.case_study,
    overview     = EXCLUDED.overview,
    screenshots  = EXCLUDED.screenshots,
    process      = EXCLUDED.process,
    tech_details = EXCLUDED.tech_details,
    results      = EXCLUDED.results,
    updated_at   = timezone('utc', now());
