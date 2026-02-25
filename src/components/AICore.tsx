"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Core() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);

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
                    color="#0FD3FF"
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
                <meshBasicMaterial color="#00AEEF" wireframe transparent opacity={0.3} />
            </Icosahedron>

            {/* Ambient and point lights */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#0FD3FF" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#00AEEF" />
        </group>
    );
}

export function AICore() {
    return (
        <div className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <Core />
            </Canvas>
        </div>
    );
}
