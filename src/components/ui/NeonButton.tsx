import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "blue" | "magenta" | "purple" | "green" | "theme";
}

export function NeonButton({
    children,
    className,
    variant = "theme",
    ...props
}: NeonButtonProps) {

    const variants = {
        blue: "text-[#00F0FF] border-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#05070D] shadow-[0_0_10px_#00F0FF,inset_0_0_10px_#00F0FF] hover:shadow-[0_0_20px_#00F0FF,inset_0_0_20px_#00F0FF]",
        magenta: "text-[#FF2CFB] border-[#FF2CFB] hover:bg-[#FF2CFB] hover:text-[#05070D] shadow-[0_0_10px_#FF2CFB,inset_0_0_10px_#FF2CFB] hover:shadow-[0_0_20px_#FF2CFB,inset_0_0_20px_#FF2CFB]",
        purple: "text-[#6A00FF] border-[#6A00FF] hover:bg-[#6A00FF] hover:text-[#05070D] shadow-[0_0_10px_#6A00FF,inset_0_0_10px_#6A00FF] hover:shadow-[0_0_20px_#6A00FF,inset_0_0_20px_#6A00FF]",
        green: "text-[#39FF14] border-[#39FF14] hover:bg-[#39FF14] hover:text-[#05070D] shadow-[0_0_10px_#39FF14,inset_0_0_10px_#39FF14] hover:shadow-[0_0_20px_#39FF14,inset_0_0_20px_#39FF14]",
        theme: "text-[var(--neon)] border-[var(--neon)] hover:bg-[var(--neon)] hover:text-[var(--bg)] shadow-[0_0_10px_var(--glass),inset_0_0_10px_var(--glass)] hover:shadow-[0_0_20px_var(--neon),inset_0_0_20px_var(--neon)]",
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
