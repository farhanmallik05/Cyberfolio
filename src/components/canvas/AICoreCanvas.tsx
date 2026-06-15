"use client";
import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { THEMES } from "@/data/themes";
import { useTheme } from "@/context/ThemeContext";

function Core() {
    const { theme } = useTheme();
    const sphereRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);

    const themeData = THEMES.find(t => t.id === theme) || THEMES[0];
    const accentColor = themeData.accentColor;
    const accentColor2 = themeData.accentColor2;

    useFrame((state, delta) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x += delta * 0.2;
            sphereRef.current.rotation.y += delta * 0.3;
        }
        if (outerRef.current) {
            outerRef.current.rotation.x -= delta * 0.1;
            outerRef.current.rotation.y -= delta * 0.15;
        }
    });

    return (
        <group>
            {/* Inner pulsing core */}
            <Sphere ref={sphereRef} args={[1.2, 32, 32]}>
                <MeshDistortMaterial
                    color={accentColor}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.8}
                    roughness={0.2}
                    distort={0.4}
                    speed={2}
                />
            </Sphere>

            {/* Outer wireframe shell */}
            <Icosahedron ref={outerRef} args={[1.6, 2]}>
                <meshBasicMaterial color={accentColor2} wireframe transparent opacity={0.3} />
            </Icosahedron>

            {/* Ambient and point lights */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color={accentColor} />
            <pointLight position={[-10, -10, -10]} intensity={1} color={accentColor2} />
        </group>
    );
}

export default function AICoreCanvas() {
    return (
        <Canvas camera={{ position: [0, 0, 4] }}>
            <Core />
        </Canvas>
    );
}
