-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    name text NOT NULL,
    description text,
    price integer NOT NULL DEFAULT 0, -- price in cents
    currency text NOT NULL DEFAULT 'USD',
    file_path text NOT NULL, -- Path in the store-files bucket
    is_free boolean DEFAULT false,
    type text NOT NULL DEFAULT 'Digital Asset',
    color_theme text NOT NULL DEFAULT 'text-neon-blue',
    image_url text, -- Thumbnail image URL
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public to view products
CREATE POLICY "Allow public to view products" ON public.products
    FOR SELECT USING (true);

-- Allow admin to manage products
CREATE POLICY "Allow admin to manage products" ON public.products
    FOR ALL USING (auth.email() = 'mallikfarhan10@gmail.com');


-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    dodo_payment_id text UNIQUE NOT NULL, -- Idempotency key from Dodo Payments
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    customer_email text NOT NULL,
    amount integer NOT NULL, -- Amount paid in cents
    status text NOT NULL DEFAULT 'pending', -- pending, successful, failed
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own orders
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.email() = customer_email);

-- Allow admin to manage orders
CREATE POLICY "Allow admin to manage orders" ON public.orders
    FOR ALL USING (auth.email() = 'mallikfarhan10@gmail.com');


-- Storage Bucket: store-files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('store-files', 'store-files', false)
ON CONFLICT (id) DO NOTHING;

-- RLS for store-files (Private, only Admin can manage, delivery generates signed URLs)
CREATE POLICY "Admin can manage store-files" ON storage.objects
    FOR ALL USING (
        bucket_id = 'store-files' AND 
        auth.email() = 'mallikfarhan10@gmail.com'
    );
