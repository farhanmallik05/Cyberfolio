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
        primary: "mech-button text-mech-cyan hover:text-white",
        secondary: "bg-transparent border border-mech-silver/30 text-mech-silver hover:border-mech-cyan/60 hover:text-mech-cyan hover:bg-mech-cyan/5",
        ghost: "bg-transparent text-mech-silver hover:text-mech-cyan hover:bg-mech-cyan/10",
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], glow && variant === "primary" ? "hover:shadow-[0_0_15px_rgba(0,174,239,0.5)]" : "", className)}
            {...props}
        >
            {icon && <span className="z-10">{icon}</span>}
            <span className="z-10 group-hover:text-white transition-colors duration-300">{children}</span>

            {variant === "primary" && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-mech-cyan transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            )}
        </motion.button>
    );
}
