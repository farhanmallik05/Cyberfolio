"use client";

import { HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps extends HTMLAttributes<HTMLHeadingElement> {
    text: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
}

export function GlitchText({ text, as: Component = "h1", className, ...props }: GlitchTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Component
            className={cn(
                "relative inline-block font-orbitron font-bold text-white",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <span className={cn(
                "absolute top-0 left-0 -ml-1 text-neon-magenta opacity-70",
                isHovered ? "animate-pulse" : ""
            )} style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}>
                {text}
            </span>
            <span className="relative z-10">{text}</span>
            <span className={cn(
                "absolute top-0 left-0 ml-1 text-neon-blue opacity-70",
                isHovered ? "animate-pulse" : ""
            )} style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}>
                {text}
            </span>
        </Component>
    );
}
