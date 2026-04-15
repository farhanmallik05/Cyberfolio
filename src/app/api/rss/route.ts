import { getAllPosts } from "@/lib/mdx";

export async function GET() {
    const posts = await getAllPosts();
    const siteUrl = "https://farhanmallik.com";

    const rssItems = posts.map(post => `
        <item>
            <title>${escapeXml(post.title)}</title>
            <link>${siteUrl}/blog/${post.slug}</link>
            <description>${escapeXml(post.excerpt)}</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
            <category>${post.category}</category>
        </item>
    `).join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>Farhan Mallik | Blog</title>
                <link>${siteUrl}/blog</link>
                <description>Neural Architect logs on AI, automation, and full-stack development.</description>
                <language>en-us</language>
                <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
                <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
                ${rssItems}
            </channel>
        </rss>`;

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}

function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}
