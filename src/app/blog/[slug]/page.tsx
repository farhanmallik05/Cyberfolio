import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { CustomMDX } from "@/components/mdx/CustomMDX";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ChevronLeft, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MechButton } from "@/components/ui/MechButton";
import { BlogComments } from "@/components/blog/BlogComments";
import { PostMetrics } from "@/components/blog/PostMetrics";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx?$/, ""),
    }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const post = await getPostBySlug(slug);
        const ogImage = `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`;
        
        return {
            title: `${post.title} | Farhan Mallik`,
            description: post.excerpt,
            openGraph: {
                title: post.title,
                description: post.excerpt,
                type: "article",
                url: `https://farhanmallik.com/blog/${slug}`,
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description: post.excerpt,
                images: [ogImage],
            }
        };
    } catch {
        return { title: "Post Not Found" };
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    
    let post;
    try {
        post = await getPostBySlug(slug);
    } catch (e) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-32 pb-24 px-4 relative">
            <ScrollProgress />
            
            <div className="max-w-4xl mx-auto z-10 relative">
                {/* Back Link */}
                <Link 
                    href="/blog" 
                    className="group inline-flex items-center gap-2 text-mech-silver/40 hover:text-mech-cyan transition-colors mb-12 font-orbitron text-[10px] tracking-widest"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    BACK_TO_TERMINAL
                </Link>

                {/* Header */}
                <header className="space-y-8 mb-16">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="px-3 py-1 bg-mech-cyan/10 border border-mech-cyan/30 text-mech-cyan font-orbitron text-[10px] tracking-widest">
                            {post.category.toUpperCase()}
                        </span>
                        <div className="h-px w-8 bg-mech-silver/20" />
                        <div className="flex items-center gap-2 text-[10px] font-mono text-mech-silver/50 tracking-wider">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-mech-silver/50 tracking-wider">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-mech-white leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 pt-4 border-t border-mech-silver/5">
                        <div className="w-10 h-10 rounded-sm overflow-hidden border border-mech-silver/20 flex-shrink-0">
                            <div className="w-full h-full bg-mech-base flex items-center justify-center text-mech-cyan font-orbitron font-bold">
                                FM
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-orbitron text-mech-white tracking-widest">{post.author.toUpperCase()}</div>
                            <div className="text-[10px] font-mono text-mech-silver/40">NEURAL_ARCHITECT</div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-mech max-w-none">
                    <CustomMDX source={post.content} />
                </div>

                <PostMetrics 
                    slug={slug} 
                    initialViews={post.views || 0} 
                    initialLikes={post.likes || 0} 
                />

                {/* Footer / Tags */}
                <footer className="mt-10 pt-10 border-t border-mech-silver/10">
                    <div className="flex flex-wrap gap-2 items-center">
                        <Tag className="w-4 h-4 text-mech-silver/40 mr-2" />
                        {post.tags.map(tag => (
                            <span 
                                key={tag} 
                                className="px-2 py-1 bg-mech-base border border-mech-silver/10 text-mech-silver/50 font-mono text-[10px] rounded-sm hover:border-mech-cyan/30 hover:text-mech-cyan transition-all cursor-mech-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Giscus Comments via Client Wrapper */}
                    <BlogComments />

                    {/* Navigation Suggestion */}
                    <div className="mt-16 p-8 bg-mech-base/30 border border-mech-silver/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-1">
                            <div className="text-[10px] font-orbitron text-mech-silver/30 tracking-widest">NEXT_TRANSMISSION</div>
                            <div className="text-mech-white font-orbitron font-bold">Interested in building similar systems?</div>
                        </div>
                        <Link href="/contact">
                            <MechButton variant="secondary">
                                INITIATE_CONTACT
                            </MechButton>
                        </Link>
                    </div>
                </footer>
            </div>
        </article>
    );
}
