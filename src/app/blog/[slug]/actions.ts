'use server';

import { createClient } from '@/utils/supabase/server';

export async function incrementView(slug: string) {
    const supabase = await createClient();
    await supabase.rpc('increment_blog_view', { post_slug: slug });
}

export async function incrementLike(slug: string) {
    const supabase = await createClient();
    await supabase.rpc('increment_blog_like', { post_slug: slug });
}

export async function getMetrics(slug: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('blog_posts')
        .select('views, likes')
        .eq('slug', slug)
        .single();
    
    return {
        views: data?.views || 0,
        likes: data?.likes || 0
    };
}
