-- Subscribers Table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text UNIQUE NOT NULL,
    source text DEFAULT 'newsletter_page',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anon to insert (subscribe)
CREATE POLICY "Allow public to insert subscribers" ON public.subscribers
    FOR INSERT WITH CHECK (true);

-- Allow authenticated admin to view
CREATE POLICY "Allow admin to view subscribers" ON public.subscribers
    FOR SELECT USING (auth.email() = 'mallikfarhan10@gmail.com');


-- Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL,
    course_slug text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(email, course_slug)
);

-- Enable RLS
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Users can view their own enrollments
CREATE POLICY "Users can view own enrollments" ON public.enrollments
    FOR SELECT USING (auth.email() = email);

-- Admin can manage all enrollments
CREATE POLICY "Allow admin to manage enrollments" ON public.enrollments
    FOR ALL USING (auth.email() = 'mallikfarhan10@gmail.com');
