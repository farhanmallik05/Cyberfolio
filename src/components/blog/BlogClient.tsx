"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MechPanel } from "@/components/ui/MechPanel";
import { MechButton } from "@/components/ui/MechButton";
import { Calendar, Clock, ArrowRight, Search,  X } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";
import { BlogPost, Category } from "@/types/blog";

interface BlogClientProps {
    initialPosts: BlogPost[];
}

const CATEGORIES: Category[] = ["AI", "Automation", "Architecture", "Development", "Security", "Career"];

export function BlogClient({ initialPosts }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");

    const fuse = useMemo(() => new Fuse(initialPosts, {
        keys: ["title", "excerpt", "tags", "category"],
        threshold: 0.3,
    }), [initialPosts]);

    const filteredPosts = useMemo(() => {
        let result = searchQuery 
            ? fuse.search(searchQuery).map(r => r.item)
            : initialPosts;

        if (selectedCategory !== "All") {
            result = result.filter(post => post.category === selectedCategory);
        }

        return result;
    }, [searchQuery, selectedCategory, fuse, initialPosts]);

    return (
        <div className="space-y-12">
            {/* Search and Filter HUD */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-6 bg-mech-base/30 border border-mech-silver/10 rounded-sm backdrop-blur-md">
                <div className="relative w-full md:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mech-silver/40 group-focus-within:text-mech-cyan transition-colors" />
                    <input 
                        type="text"
                        placeholder="SEARCH_LOGS..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-mech-base/50 border border-mech-silver/10 py-3 pl-12 pr-4 text-mech-white font-mono text-sm focus:outline-none focus:border-mech-cyan/50 transition-all"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-mech-silver/40 hover:text-mech-white"
                            aria-label="Clear search query"
                            title="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`px-3 py-1.5 text-[10px] font-orbitron tracking-widest border transition-all ${
                            selectedCategory === "All" 
                                ? "bg-mech-cyan text-mech-base border-mech-cyan" 
                                : "bg-transparent text-mech-silver/60 border-mech-silver/10 hover:border-mech-cyan/30"
                        }`}
                    >
                        ALL
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 text-[10px] font-orbitron tracking-widest border transition-all ${
                                selectedCategory === cat 
                                    ? "bg-mech-cyan text-mech-base border-mech-cyan" 
                                    : "bg-transparent text-mech-silver/60 border-mech-silver/10 hover:border-mech-cyan/30"
                            }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post, idx) => (
                        <motion.div
                            key={post.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <MechPanel border className="h-full group hover:bg-mech-base/50 transition-all cursor-mech-pointer">
                                    <div className="p-6 flex flex-col h-full space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-orbitron tracking-[0.2em] text-mech-cyan px-2 py-1 bg-mech-cyan/5 border border-mech-cyan/20">
                                                {post.category.toUpperCase()}
                                            </span>
                                            <div className="flex items-center gap-2 text-[10px] font-mono text-mech-silver/40">
                                                <Calendar className="w-3 h-3" />
                                                {post.date}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-orbitron font-bold text-mech-white group-hover:text-mech-cyan transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-mech-silver/70 font-rajdhani text-sm leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-mech-silver/5">
                                            <div className="flex items-center gap-2 text-[10px] font-mono text-mech-silver/40">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </div>
                                            <div className="text-mech-cyan flex items-center gap-2 text-[10px] font-orbitron tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                                READ_LOG <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </MechPanel>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <Database className="w-12 h-12 text-mech-silver/20 mx-auto" />
                    <p className="text-mech-silver/40 font-mono text-sm tracking-widest">NO_RECORDS_MATCH_QUERY</p>
                    <MechButton variant="secondary" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                        RESET_FILTERS
                    </MechButton>
                </div>
            )}
        </div>
    );
}

                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
function Database(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
    )
}
