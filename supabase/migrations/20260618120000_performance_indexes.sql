-- ============================================================
-- Performance Enhancements: Database Indexes
-- ============================================================

-- Index on slug for fast exact lookups (often used in /projects/[slug])
CREATE INDEX IF NOT EXISTS portfolio_projects_slug_idx ON public.portfolio_projects (slug);

-- Index on status for filtering published projects
CREATE INDEX IF NOT EXISTS portfolio_projects_status_idx ON public.portfolio_projects (status);

-- Index on category for filtering by category
CREATE INDEX IF NOT EXISTS portfolio_projects_category_idx ON public.portfolio_projects (category);

-- Index on featured for fast boolean lookups
CREATE INDEX IF NOT EXISTS portfolio_projects_featured_idx ON public.portfolio_projects (featured);
