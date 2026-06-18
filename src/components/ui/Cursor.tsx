"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="hidden sm:block">
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
                style={{ backgroundColor: "var(--neon)", boxShadow: "0 0 10px 2px var(--glass)" }}
                animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
                transition={{ type: "spring", stiffness: 800, damping: 28, mass: 0.2 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9998] opacity-60"
                style={{ borderColor: "var(--neon)" }}
                animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }}
                transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
            />
        </div>
    );
}
