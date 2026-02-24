import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "blue" | "magenta" | "purple" | "green";
}

export function NeonButton({
    children,
    className,
    variant = "blue",
    ...props
}: NeonButtonProps) {

    const variants = {
        blue: "text-neon-blue border-neon-blue hover:bg-neon-blue hover:text-cyber-base shadow-[0_0_10px_#00F0FF,inset_0_0_10px_#00F0FF] hover:shadow-[0_0_20px_#00F0FF,inset_0_0_20px_#00F0FF]",
        magenta: "text-neon-magenta border-neon-magenta hover:bg-neon-magenta hover:text-cyber-base shadow-[0_0_10px_#FF2CFB,inset_0_0_10px_#FF2CFB] hover:shadow-[0_0_20px_#FF2CFB,inset_0_0_20px_#FF2CFB]",
        purple: "text-neon-purple border-neon-purple hover:bg-neon-purple hover:text-cyber-base shadow-[0_0_10px_#6A00FF,inset_0_0_10px_#6A00FF] hover:shadow-[0_0_20px_#6A00FF,inset_0_0_20px_#6A00FF]",
        green: "text-neon-green border-neon-green hover:bg-neon-green hover:text-cyber-base shadow-[0_0_10px_#39FF14,inset_0_0_10px_#39FF14] hover:shadow-[0_0_20px_#39FF14,inset_0_0_20px_#39FF14]",
    };

    return (
        <button
            className={cn(
                "relative px-6 py-3 font-orbitron font-medium tracking-wider uppercase transition-all duration-300 border bg-transparent",
                variants[variant],
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
}
