"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
    const ref = useRef<THREE.Points>(null);

    // Generating a grid/sphere of points
    const positions = useMemo(() => {
        const pts = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            pts[i * 3] = (Math.random() - 0.5) * 10;
            pts[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pts[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pts;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00F0FF"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function NeuralGridCanvas() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <Particles />
        </Canvas>
    );
}
