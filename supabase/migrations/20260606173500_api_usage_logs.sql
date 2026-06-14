create table public.api_usage_logs (
    id uuid default gen_random_uuid() primary key,
    ip_hash text not null,
    tool_name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS to prevent public access
alter table public.api_usage_logs enable row level security;

-- No policies are created. This means:
-- 1. Anonymous and Authenticated users have NO access (cannot read, insert, update, or delete).
-- 2. The Service Role key (used in server-side API routes) bypasses RLS and can freely insert logs.
