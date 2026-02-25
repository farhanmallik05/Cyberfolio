"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoadingBar() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Trigger a visual pulse on route change
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
                    style={{
                        background: "linear-gradient(90deg, #00F0FF, #FF2CFB, #6A00FF)",
                        boxShadow: "0 0 10px #00F0FF, 0 0 20px #FF2CFB",
                    }}
                />
            )}
        </AnimatePresence>
    );
}
