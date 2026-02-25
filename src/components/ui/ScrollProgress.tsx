"use client";
import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-mech-blue to-mech-silver z-[10000] origin-left shadow-[0_0_8px_rgba(0,174,239,0.8)]"
            style={{ scaleX: scrollYProgress }}
        />
    );
}
