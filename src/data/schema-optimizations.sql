-- Supabase schema optimization indexes
-- Run these in the Supabase SQL Editor to improve query performance

-- 1. Index on portfolio_projects status for the home page query:
-- SELECT * FROM portfolio_projects WHERE status = 'live' ORDER BY year DESC
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_status_year ON portfolio_projects(status, year DESC);

-- 2. Index on analytics events for timestamp ordering
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);

-- 3. Index on visitor log by IP hash for quick lookups
CREATE INDEX IF NOT EXISTS idx_visitor_log_ip_hash ON visitor_log(ip_hash);

-- 4. Index on blog posts (assuming there's a status/published_at column if applicable in the future)
-- CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC) WHERE status = 'published';
