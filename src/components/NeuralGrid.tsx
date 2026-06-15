"use client";

import dynamic from "next/dynamic";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

const NeuralGridCanvas = dynamic(() => import("./canvas/NeuralGridCanvas"), { ssr: false });

export function NeuralGrid() {
    const { prefersReducedMotion } = useDeviceCapabilities();
    const enableCanvas = !prefersReducedMotion;

    return (
        <div className="absolute inset-0 w-full h-full -z-10 bg-transparent pointer-events-none opacity-50">
            {enableCanvas && <NeuralGridCanvas />}
        </div>
    );
}
