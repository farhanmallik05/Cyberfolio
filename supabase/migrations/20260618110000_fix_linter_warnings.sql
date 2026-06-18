-- ============================================================
-- Fix Supabase Linter Warnings
-- ============================================================


-- 2. Fix mutable search paths on existing functions
ALTER FUNCTION public.update_updated_at() SET search_path = '';
DO $$ 
DECLARE 
    func_sig text;
BEGIN 
    FOR func_sig IN 
        SELECT oid::regprocedure::text 
        FROM pg_proc 
        WHERE proname IN ('increment_blog_view', 'increment_blog_like')
    LOOP 
        EXECUTE 'ALTER FUNCTION ' || func_sig || ' SET search_path = ''''';
    END LOOP; 
END $$;

-- 3. Fix permissive INSERT RLS policies by explicitly binding them to anon and authenticated roles
DROP POLICY IF EXISTS "Allow public analytics" ON public.analytics;
CREATE POLICY "Allow public analytics" ON public.analytics FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts to briefs" ON public.briefs;
CREATE POLICY "Allow anonymous inserts to briefs" ON public.briefs FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public enquiries" ON public.enquiries;
CREATE POLICY "Allow public enquiries" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public subscriptions" ON public.subscribers;
CREATE POLICY "Allow public subscriptions" ON public.subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public visitor logs" ON public.visitor_log;
CREATE POLICY "Allow public visitor logs" ON public.visitor_log FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 4. Remove SELECT listing policy for public bucket
-- Public buckets natively serve GET requests without this policy.
DROP POLICY IF EXISTS "Allow public read access to brief-attachments" ON storage.objects;
