"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MechButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    className?: string;
    icon?: ReactNode;
    glow?: boolean;
}

export function MechButton({
    children,
    variant = "primary",
    className,
    icon,
    glow = true,
    ...props
}: MechButtonProps) {
    const baseStyles = "relative font-orbitron text-sm tracking-widest uppercase py-3 px-6 flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 rounded-sm group";

    const variants = {
        primary: "bg-[var(--bg2)] border border-[var(--border)] text-[var(--neon)] shadow-[0_0_8px_var(--glass)] hover:text-[var(--bg)] hover:bg-[var(--neon)] hover:shadow-[0_0_15px_var(--neon)]",
        secondary: "bg-transparent border border-[color-mix(in_srgb,var(--neon)_30%,transparent)] text-[var(--text)] hover:border-[var(--neon)] hover:text-[var(--neon)] hover:bg-[var(--glass)]",
        ghost: "bg-transparent text-[var(--dim)] hover:text-[var(--neon)] hover:bg-[var(--glass)]",
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], glow && variant === "primary" ? "hover:shadow-[0_0_15px_rgba(0,174,239,0.5)]" : "", className)}
            {...props}
        >
            {icon && <span className="z-10">{icon}</span>}
            <span className="z-10 transition-colors duration-300">{children}</span>

            {variant === "primary" && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--neon)] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            )}
        </motion.button>
    );
}
