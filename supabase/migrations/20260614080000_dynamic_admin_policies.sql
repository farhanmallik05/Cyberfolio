-- Create Admins Table for Dynamic Security Policies
CREATE TABLE IF NOT EXISTS public.admins (
    email text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Initial Admin User
INSERT INTO public.admins (email) 
VALUES ('mallikfarhan10@gmail.com') 
ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security on Admins
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admins themselves) can view the admin registry
CREATE POLICY "Allow admin to view admin list" ON public.admins
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.email()));


-- Refactor Subscribers Policies
DROP POLICY IF EXISTS "Allow admin to view subscribers" ON public.subscribers;

CREATE POLICY "Allow admin to view subscribers dynamically" ON public.subscribers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admins WHERE admins.email = auth.email()
        )
    );


-- Refactor Enrollments Policies
DROP POLICY IF EXISTS "Allow admin to manage enrollments" ON public.enrollments;

CREATE POLICY "Allow admin to manage enrollments dynamically" ON public.enrollments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admins WHERE admins.email = auth.email()
        )
    );
