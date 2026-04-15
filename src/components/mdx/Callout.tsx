"use client";

import { Info, AlertTriangle, Lightbulb, Beaker } from "lucide-react";
import { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "experiment";

interface CalloutProps {
    children: ReactNode;
    type?: CalloutType;
}

const calloutStyles = {
    info: {
        bg: "bg-mech-cyan/5",
        border: "border-mech-cyan/30",
        text: "text-mech-cyan",
        icon: <Info className="w-5 h-5 flex-shrink-0" />,
        label: "INFO"
    },
    warning: {
        bg: "bg-amber-500/5",
        border: "border-amber-500/30",
        text: "text-amber-500",
        icon: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
        label: "WARNING"
    },
    tip: {
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/30",
        text: "text-emerald-500",
        icon: <Lightbulb className="w-5 h-5 flex-shrink-0" />,
        label: "TIP"
    },
    experiment: {
        bg: "bg-mech-purple/5",
        border: "border-mech-purple/30",
        text: "text-mech-purple",
        icon: <Beaker className="w-5 h-5 flex-shrink-0" />,
        label: "EXPERIMENT"
    }
};

export function Callout({ children, type = "info" }: CalloutProps) {
    const style = calloutStyles[type];

    return (
        <div className={`my-8 p-4 rounded-sm border-l-4 ${style.bg} ${style.border} flex gap-4 w-full`}>
            <div className={style.text}>
                {style.icon}
            </div>
            <div className="flex-1">
                <div className={`text-[10px] font-orbitron font-bold tracking-[0.2em] mb-1 ${style.text}`}>
                    {style.label}
                </div>
                <div className="text-mech-silver font-inter prose-p:my-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
