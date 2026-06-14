"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { THEMES } from "@/data/themes";
import { useTheme } from "@/context/ThemeContext";

import styles from './BackgroundSystem.module.css';

function RotatingRings() {
    const { theme } = useTheme();
    const ringsRef = useRef<THREE.Group>(null);

    const themeData = THEMES.find(t => t.id === theme) || THEMES[0];
    const accentColor = themeData.accentColor;

    useFrame((state, delta) => {
        if (ringsRef.current) {
            ringsRef.current.rotation.x += delta * 0.05;
            ringsRef.current.rotation.y += delta * 0.08;
        }
    });

    return (
        <group ref={ringsRef}>
            <mesh>
                <torusGeometry args={[3, 0.005, 16, 64]} />
                <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.1} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4, 0.005, 16, 64]} />
                <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.08} />
            </mesh>
            <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
                <torusGeometry args={[5, 0.002, 16, 64]} />
                <meshBasicMaterial color={theme === 'cyber' ? "#C9D1D9" : accentColor} wireframe transparent opacity={0.05} />
            </mesh>
        </group>
    );
}

export function BackgroundSystem() {
    const { theme } = useTheme();
    const themeData = THEMES.find(t => t.id === theme) || THEMES[0];
    const accentColor = themeData.accentColor; // used by RotatingRings via context

    // Disable WebGL canvas on mobile or when the user prefers reduced motion —
    // prevents GPU crashes on low-end devices and respects accessibility preferences.
    const [enableCanvas, setEnableCanvas] = useState(true);

    useEffect(() => {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobile || reducedMotion) {
            setEnableCanvas(false);
        }
    }, []);

    // Suppress the unused warning — accentColor is indirectly consumed by child components.
    void accentColor;

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-mech-base">
            {/* Layer 2: Galaxy Nebula Gradient (CSS) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mech-navy/50 via-mech-base to-mech-base opacity-70"></div>

            {/* Layer 3: Blueprint Grid Overlay */}
            <div className={styles.gridOverlay}></div>

            {/* Layer 1 & 4: Starfield and 3D Rings — disabled on mobile / reduced-motion */}
            {enableCanvas && (
                <div className="absolute inset-0">
                    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
                        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1.5} />
                        <ambientLight intensity={0.5} />
                        <RotatingRings />
                    </Canvas>
                </div>
            )}
        </div>
    );
}
