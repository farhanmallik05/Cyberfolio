'use client';

import { useState, useEffect } from 'react';
import { incrementView, incrementLike, getMetrics } from '@/app/blog/[slug]/actions';
import { Eye, Heart } from 'lucide-react';
import clsx from 'clsx';

interface PostMetricsProps {
    slug: string;
    initialViews?: number;
    initialLikes?: number;
}

export function PostMetrics({ slug, initialViews = 0, initialLikes = 0 }: PostMetricsProps) {
    const [views, setViews] = useState(initialViews);
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        // Increment view on mount (only once per session/visit usually, but here we just increment on load)
        const recordView = async () => {
            const viewedKey = `viewed_${slug}`;
            if (!sessionStorage.getItem(viewedKey)) {
                await incrementView(slug);
                sessionStorage.setItem(viewedKey, 'true');
                setViews(v => v + 1);
            }
        };

        // Check local storage for likes
        if (localStorage.getItem(`liked_${slug}`)) {
            setHasLiked(true);
        }

        // Fetch fresh metrics after a small delay to get accurate counts
        const fetchMetrics = async () => {
            const metrics = await getMetrics(slug);
            if (metrics.views > views) setViews(metrics.views);
            if (metrics.likes > likes) setLikes(metrics.likes);
        };

        recordView().then(fetchMetrics);
    }, [slug]);

    const handleLike = async () => {
        if (hasLiked || isLiking) return;
        
        setIsLiking(true);
        setHasLiked(true);
        setLikes(l => l + 1);
        localStorage.setItem(`liked_${slug}`, 'true');
        
        await incrementLike(slug);
        setIsLiking(false);
    };

    return (
        <div className="flex items-center gap-6 mt-8 py-6 border-t border-b border-mech-silver/10">
            <div className="flex items-center gap-2 text-mech-silver/60 font-mono text-sm">
                <Eye className="w-4 h-4" />
                <span>{views.toLocaleString()} VIEWS</span>
            </div>
            <button 
                onClick={handleLike}
                disabled={hasLiked || isLiking}
                className={clsx(
                    "flex items-center gap-2 font-mono text-sm transition-all duration-300",
                    hasLiked 
                        ? "text-mech-cyan scale-105" 
                        : "text-mech-silver/60 hover:text-mech-white cursor-mech-pointer active:scale-95"
                )}
            >
                <Heart className={clsx("w-4 h-4", hasLiked && "fill-mech-cyan animate-pulse")} />
                <span>{likes.toLocaleString()} LIKES</span>
            </button>
        </div>
    );
}
