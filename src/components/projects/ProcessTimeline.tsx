"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProcessTimeline.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
    phase: string;
    description: string;
    tools?: string[];
}

interface ProcessTimelineProps {
    steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const stepsElements = containerRef.current?.querySelectorAll(`.${styles.step}`);
        if (!stepsElements || stepsElements.length === 0) return;

        const ctx = gsap.context(() => {
            // Vertical Progress Line fill
            gsap.fromTo(lineRef.current, 
                { scaleY: 0, transformOrigin: "top" },
                { 
                    scaleY: 1, 
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 0.5
                    }
                }
            );

            // Animate steps in
            stepsElements.forEach((step, idx) => {
                gsap.fromTo(step, 
                    { opacity: 0, x: idx % 2 === 0 ? -50 : 50 },
                    { 
                        opacity: 1, 
                        x: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: step,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [steps]);

    return (
        <div ref={containerRef} className={styles.container}>
            <div ref={lineRef} className={styles.absLine} />
            
            <div className={styles.stepsWrapper}>
                {steps.map((step, idx) => (
                    <div key={idx} className={`${styles.step} ${idx % 2 === 0 ? styles.left : styles.right}`}>
                        <div className={styles.dot} />
                        <div className={styles.content}>
                            <span className={styles.phaseLabel}>{step.phase.toUpperCase()}</span>
                            <h4 className={styles.stepTitle}>{step.phase}</h4>
                            <p className={styles.stepDesc}>{step.description}</p>
                            {step.tools && (
                                <div className={styles.tools}>
                                    {step.tools.map(tool => (
                                        <span key={tool} className={styles.toolBadge}>{tool}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
