import { getAllPosts } from "@/lib/mdx";

export async function GET() {
    const posts = await getAllPosts();
    const siteUrl = "https://farhanmallik.com";

    const feed = {
        version: "https://jsonfeed.org/version/1.1",
        title: "Farhan Mallik | Blog",
        home_page_url: `${siteUrl}/blog`,
        feed_url: `${siteUrl}/api/feed`,
        description: "Neural Architect logs on AI, automation, and full-stack development.",
        authors: [
            {
                name: "Farhan Mallik",
                url: siteUrl
            }
        ],
        items: posts.map(post => ({
            id: `${siteUrl}/blog/${post.slug}`,
            url: `${siteUrl}/blog/${post.slug}`,
            title: post.title,
            content_text: post.excerpt,
            date_published: new Date(post.date).toISOString(),
            tags: post.tags,
            category: post.category
        }))
    };

    return new Response(JSON.stringify(feed, null, 2), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
