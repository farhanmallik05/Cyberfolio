"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ScreenshotCarousel.module.css";

interface ScreenshotCarouselProps {
    images: string[];
}

export function ScreenshotCarousel({ images }: ScreenshotCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    if (!images || images.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={`${styles.viewport} relative h-[400px] md:h-[600px] w-full bg-mech-base/50 overflow-hidden`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`Screenshot ${currentIndex + 1}`}
                            fill
                            className="object-contain p-4 md:p-8"
                            priority={currentIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {images.length > 1 && (
                <div className={styles.controls}>
                    <button 
                        onClick={prev} 
                        className={styles.btn}
                        aria-label="Previous Screenshot"
                    >
                        <ChevronLeft />
                    </button>
                    <div className={styles.dots}>
                        {images.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`${styles.dot} ${idx === currentIndex ? styles.active : ""}`}
                                onClick={() => setCurrentIndex(idx)}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={next} 
                        className={styles.btn}
                        aria-label="Next Screenshot"
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
}
