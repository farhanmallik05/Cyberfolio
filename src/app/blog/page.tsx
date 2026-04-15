import { TerminalSquare } from "lucide-react";
import { BlogClient } from "@/components/blog/BlogClient";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
    title: "Blog | Farhan Mallik",
    description: "Deep dives into AI agents, automation, architecture, and the future of development.",
};

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 w-full">
            <div className="flex flex-col items-center mb-16 w-full">
                <TerminalSquare className="w-12 h-12 text-mech-silver/50 mb-4 animate-pulse" />
                <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-center tracking-widest uppercase mb-4 text-mech-white">
                    Transmission <span className="text-mech-cyan">Logs</span>
                </h1>
                <p className="text-mech-silver/60 font-rajdhani tracking-[0.3em] uppercase text-xs mb-8">
                    Decrypted Intelligence & Architecture blueprints
                </p>
                <div className="w-full max-w-xl h-px bg-gradient-to-r from-transparent via-mech-cyan/30 to-transparent" />
            </div>

            <BlogClient initialPosts={posts} />
        </div>
    );
}
