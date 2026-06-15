"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import styles from './BackgroundSystem.module.css';

const BackgroundCanvas = dynamic(() => import("./canvas/BackgroundCanvas"), { ssr: false });

export function BackgroundSystem() {
    // Disable WebGL canvas on mobile or when the user prefers reduced motion —
    // prevents GPU crashes on low-end devices and respects accessibility preferences.
    const { isMobile, prefersReducedMotion, isLowEnd } = useDeviceCapabilities();
    const enableCanvas = !isMobile && !prefersReducedMotion && !isLowEnd;

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-mech-base">
            {/* Layer 2: Galaxy Nebula Gradient (CSS) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mech-navy/50 via-mech-base to-mech-base opacity-70"></div>

            {/* Layer 3: Blueprint Grid Overlay */}
            <div className={styles.gridOverlay}></div>

            {/* Layer 1 & 4: Starfield and 3D Rings — disabled on mobile / reduced-motion */}
            {enableCanvas && (
                <div className="absolute inset-0">
                    <BackgroundCanvas />
                </div>
            )}
        </div>
    );
}
