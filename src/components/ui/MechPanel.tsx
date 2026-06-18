'use client';

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MechPanelProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    border?: boolean;
    glowHover?: boolean;
}

export function MechPanel({
    children,
    className,
    border = true,
    glowHover = true,
    ...props
}: MechPanelProps) {
    return (
        <motion.div
            className={cn(
                "mech-panel relative overflow-hidden flex flex-col group",
                border && "border border-[var(--border)]",
                glowHover && "hover:border-[var(--neon)] hover:shadow-[0_0_20px_var(--glass)] transition-all duration-300",
                className
            )}
            {...props}
        >
            {/* Decorative corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--dim)] group-hover:border-[var(--neon)] transition-colors" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--dim)] group-hover:border-[var(--neon)] transition-colors" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--dim)] group-hover:border-[var(--neon)] transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--dim)] group-hover:border-[var(--neon)] transition-colors" />

            {/* Light sweep animation on hover */}
            {glowHover && (
                <div className="absolute -inset-full h-full w-1/2 z-0 block transform -skew-x-12 translate-x-[-200%] bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--neon)_10%,transparent)] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-sweep" />
            )}

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
