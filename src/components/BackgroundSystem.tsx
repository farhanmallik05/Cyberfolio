"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingRings() {
    const ringsRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (ringsRef.current) {
            ringsRef.current.rotation.x += delta * 0.05;
            ringsRef.current.rotation.y += delta * 0.08;
        }
    });

    return (
        <group ref={ringsRef}>
            <mesh>
                <torusGeometry args={[3, 0.02, 16, 64]} />
                <meshBasicMaterial color="#00AEEF" wireframe transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4, 0.02, 16, 64]} />
                <meshBasicMaterial color="#0FD3FF" wireframe transparent opacity={0.2} />
            </mesh>
            <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
                <torusGeometry args={[5, 0.01, 16, 64]} />
                <meshBasicMaterial color="#C9D1D9" wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    );
}

export function BackgroundSystem() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-mech-base">
            {/* Layer 2: Galaxy Nebula Gradient (CSS) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mech-navy/50 via-mech-base to-mech-base opacity-70"></div>

            {/* Layer 3: Blueprint Grid Overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #00AEEF 1px, transparent 1px),
            linear-gradient(to bottom, #00AEEF 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Layer 1 & 4: Starfield and 3D Rings */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
                    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1.5} />
                    <ambientLight intensity={0.5} />
                    <RotatingRings />
                </Canvas>
            </div>
        </div>
    );
}
