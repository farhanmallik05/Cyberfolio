-- Create briefs table
CREATE TABLE IF NOT EXISTS public.briefs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    company_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    timeline TEXT NOT NULL,
    description TEXT NOT NULL,
    attachment_url TEXT
);

-- Enable RLS
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can submit a brief)
CREATE POLICY "Allow anonymous inserts to briefs" 
ON public.briefs FOR INSERT 
TO public
WITH CHECK (true);

-- Allow admins to read briefs
CREATE POLICY "Allow admins to read briefs" 
ON public.briefs FOR SELECT 
TO authenticated 
USING (auth.jwt() ->> 'role' = 'admin');

-- Allow admins to update/delete briefs
CREATE POLICY "Allow admins to manage briefs" 
ON public.briefs FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'role' = 'admin');

-- Set up the storage bucket for brief-attachments
INSERT INTO storage.buckets (id, name, public) 
VALUES ('brief-attachments', 'brief-attachments', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anonymous uploads to the 'brief-attachments' bucket
CREATE POLICY "Allow anonymous uploads to brief-attachments"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'brief-attachments');

-- Allow public read access to 'brief-attachments' bucket
CREATE POLICY "Allow public read access to brief-attachments"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'brief-attachments');

-- Allow admins to manage brief-attachments
CREATE POLICY "Allow admins to manage brief-attachments"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'brief-attachments' AND auth.jwt() ->> 'role' = 'admin');
