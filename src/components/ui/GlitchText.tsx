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
                "relative inline-block font-orbitron font-bold text-white overflow-hidden",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <span className={cn(
                "absolute inset-0 -ml-[2px] text-mech-blue opacity-70 pointer-events-none",
                isHovered ? "animate-pulse" : ""
            )} style={{ clipPath: "inset(0 0 55% 0)" }} aria-hidden="true">
                {text}
            </span>
            <span className="relative z-10">{text}</span>
            <span className={cn(
                "absolute inset-0 ml-[2px] text-mech-cyan opacity-70 pointer-events-none",
                isHovered ? "animate-pulse" : ""
            )} style={{ clipPath: "inset(55% 0 0 0)" }} aria-hidden="true">
                {text}
            </span>
        </Component>
    );
}
