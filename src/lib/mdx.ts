import { createClient } from '@/utils/supabase/server';
import { BlogPost } from '@/types/blog';

// Utility to convert Supabase row to BlogPost type
                               // eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDBToBlogPost = (post: any): (BlogPost & { is_published: boolean }) => ({
    slug: post.slug,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt || '',
    date: post.created_at,
    author: post.author || 'Farhan Mallik',
    category: post.category || 'Development',
    tags: post.tags || [],
    image: post.image || '',
    featured: post.featured || false,
    is_published: post.is_published,
    views: post.views || 0,
    likes: post.likes || 0,
    // Add these for the type but they'll be calculated/missing if not in DB
    readTime: '5 min read', 
    wordCount: post.content.split(' ').length,
});

export async function getAllPosts(includeDrafts: boolean = false): Promise<(BlogPost & { is_published: boolean })[]> {
    try {
        const supabase = await createClient();

        let query = supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!includeDrafts) {
            query = query.eq('is_published', true);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching posts from Supabase:', error);
            return [];
        }

        return (data || []).map(mapDBToBlogPost);
    } catch (e) {
        console.error('Failed to initialize Supabase or fetch posts:', e);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<(BlogPost & { is_published: boolean }) | null> {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // Post not found
            console.error('Error fetching post by slug:', error);
            return null;
        }

        return mapDBToBlogPost(data);
    } catch (e) {
        console.error('Failed to initialize Supabase or fetch post by slug:', e);
        return null;
    }
}

// Slugs remain useful for static generation
export async function getPostSlugs() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('blog_posts')
            .select('slug')
            .eq('is_published', true);

        if (error) return [];
        return data.map(d => d.slug);
    } catch (e) {
        console.error('Failed to initialize Supabase or fetch post slugs:', e);
        return [];
    }
}
