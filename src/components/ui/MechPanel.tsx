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
                border && "border border-mech-silver/10",
                glowHover && "hover:border-mech-cyan/40 hover:shadow-[0_0_20px_rgba(15,211,255,0.1)] transition-all duration-300",
                className
            )}
            {...props}
        >
            {/* Decorative corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-mech-silver/30 group-hover:border-mech-cyan/60 transition-colors" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-mech-silver/30 group-hover:border-mech-cyan/60 transition-colors" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-mech-silver/30 group-hover:border-mech-cyan/60 transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-mech-silver/30 group-hover:border-mech-cyan/60 transition-colors" />

            {/* Light sweep animation on hover */}
            {glowHover && (
                <div className="absolute -inset-full h-full w-1/2 z-0 block transform -skew-x-12 translate-x-[-200%] bg-gradient-to-r from-transparent via-mech-cyan/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-sweep" />
            )}

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
