import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    neonBorder?: boolean;
}

export function GlassPanel({ children, className, neonBorder = false, ...props }: GlassPanelProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-lg overflow-hidden relative",
                neonBorder && "border-[var(--neon)] shadow-[0_0_15px_var(--glass)] border",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            {children}
        </div>
    );
}
