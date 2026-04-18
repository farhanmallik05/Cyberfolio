'use server';

import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { BlogPost } from '@/types/blog';

const COOKIE_NAME = 'admin_session';

function getAdminSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}

export async function loginAdmin(password: string) {
    if (password === process.env.ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, 'authorized', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        return { success: true };
    }
    return { success: false, error: 'Unauthorized payload.' };
}

export async function verifyAdmin() {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    return session?.value === 'authorized';
}

export async function toggleAvailability(state: boolean) {
    if (!(await verifyAdmin())) throw new Error('Unauthorized');

    const supabase = getAdminSupabase();
    const { error } = await supabase
        .from('admin_settings')
        .update({ is_available: state })
        .eq('id', 'global_status');

    if (error) throw error;
    
    revalidatePath('/');
    return { success: true };
}

export async function saveBlogPost(postData: Partial<BlogPost> & { slug: string, is_published?: boolean }) {
    if (!(await verifyAdmin())) throw new Error('Unauthorized');

    const supabase = getAdminSupabase();
    
    const { error } = await supabase
        .from('blog_posts')
        .upsert({
            slug: postData.slug,
            title: postData.title,
            excerpt: postData.excerpt,
            content: postData.content,
            author: postData.author || 'Farhan Mallik',
            category: postData.category,
            tags: postData.tags,
            image: postData.image,
            featured: postData.featured,
            is_published: postData.is_published ?? false,
            updated_at: new Date().toISOString(),
        }, { onConflict: 'slug' });

    if (error) throw error;
    
    revalidatePath('/blog');
    revalidatePath(`/blog/${postData.slug}`);
    
    return { success: true };
}

export async function deleteBlogPost(slug: string) {
    if (!(await verifyAdmin())) throw new Error('Unauthorized');

    const supabase = getAdminSupabase();
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('slug', slug);

    if (error) throw error;

    revalidatePath('/blog');
    return { success: true };
}

export async function togglePostStatus(slug: string, is_published: boolean) {
    if (!(await verifyAdmin())) throw new Error('Unauthorized');

    const supabase = getAdminSupabase();
    
    const { error } = await supabase
        .from('blog_posts')
        .update({ is_published })
        .eq('slug', slug);

    if (error) throw error;
    
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    
    return { success: true };
}

export async function getAdminSettings() {
    if (!(await verifyAdmin())) return null;
    const supabase = getAdminSupabase();
    
    const { data: adminData } = await supabase
        .from('admin_settings')
        .select('is_available, service_config')
        .eq('id', 'global_status')
        .single();
        
    return {
        is_available: adminData?.is_available ?? true,
        service_config: adminData?.service_config ?? {}
    };
}

import { ServiceConfig } from '@/types/services';

/** Public — no auth needed. Used by /services page to filter the calculator. */
export async function getServiceConfig(): Promise<ServiceConfig> {
    // Build-safety: Netlify build env may not have Supabase vars.
    // Return empty config so prerendering doesn't crash.
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return [] as ServiceConfig;
    }
    const supabase = getAdminSupabase();
    const { data } = await supabase
        .from('admin_settings')
        .select('service_config')
        .eq('id', 'global_status')
        .single();
    return (data?.service_config ?? []) as ServiceConfig;
}

export async function saveServiceConfig(config: ServiceConfig) {
    if (!(await verifyAdmin())) throw new Error('Unauthorized');
    const supabase = getAdminSupabase();
    const { error } = await supabase
        .from('admin_settings')
        .update({ service_config: config })
        .eq('id', 'global_status');
    if (error) throw error;
    revalidatePath('/services');
    return { success: true };
}

export async function getAdminMetrics() {
    if (!(await verifyAdmin())) return { enquiries: [], subscribers: [] };
    const supabase = getAdminSupabase();
    
    const [enq, sub] = await Promise.all([
        supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('subscribers').select('*').order('created_at', { ascending: false }).limit(10)
    ]);

    return {
        enquiries: enq.data || [],
        subscribers: sub.data || []
    };
}
