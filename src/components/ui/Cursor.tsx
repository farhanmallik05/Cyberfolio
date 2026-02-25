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
        <>
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-mech-cyan pointer-events-none z-[9999] shadow-[0_0_10px_2px_rgba(15,211,255,0.8)]"
                animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
                transition={{ type: "spring", stiffness: 800, damping: 28, mass: 0.2 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-mech-blue pointer-events-none z-[9998] opacity-60"
                animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }}
                transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
            />
        </>
    );
}
