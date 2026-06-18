"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

const AICoreCanvas = dynamic(() => import("./canvas/AICoreCanvas"), { ssr: false });

export function AICore() {
    const { prefersReducedMotion } = useDeviceCapabilities();
    
    // Only disable WebGL if user explicitly prefers reduced motion
    const enableWebGL = !prefersReducedMotion;

    return (
        <div className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {enableWebGL && <AICoreCanvas />}
        </div>
    );
}
