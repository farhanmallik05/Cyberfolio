"use client";

import { HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./GlitchText.module.css";

interface GlitchTextProps extends HTMLAttributes<HTMLHeadingElement> {
    text: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
}

export function GlitchText({ text, as: Component = "h1", className, ...props }: GlitchTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Component
            className={cn(
                styles.container,
                "font-orbitron font-bold text-white",
                isHovered ? styles.pulse : "",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-text={text}
            {...props}
        >
            <span className="relative z-10">{text}</span>
        </Component>
    );
}
