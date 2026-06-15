"use client";
import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { THEMES } from "@/data/themes";
import { useTheme } from "@/context/ThemeContext";

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

export default function BackgroundCanvas() {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1.5} />
            <ambientLight intensity={0.5} />
            <RotatingRings />
        </Canvas>
    );
}
