"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './HomeLoader.module.css';

interface HomeLoaderProps {
  children: React.ReactNode;
}

export function HomeLoader({ children }: HomeLoaderProps) {
  const [complete, setComplete] = useState(false);
  const [renderContent, setRenderContent] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bootLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // Update progress bar width via ref to avoid inline style lint warnings
  useEffect(() => {
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${progress}%`;
    }
  }, [progress]);

  useEffect(() => {
    // Local storage check to persist loader status across visits
    const hasShown = localStorage.getItem('na-loader-shown') || sessionStorage.getItem('na-loader-shown');
    if (hasShown) {
      setComplete(true);
      setRenderContent(true);
      return;
    }

    // Progress simulation tied to real load
    let progressVal = 0;
    const interval = setInterval(() => {
      if (document.readyState === 'complete') {
        progressVal += Math.random() * 15;
      } else {
        progressVal += Math.random() * 5;
      }
      
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(interval);
      }
      setProgress(Math.floor(progressVal));
    }, 100);

    // Sequence start
    const ctx = gsap.context(() => {
      console.log("HomeLoader: bootLinesRef.current =", bootLinesRef.current);
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('na-loader-shown', 'true');
          localStorage.setItem('na-loader-shown', 'true');
          setComplete(true);
          setRenderContent(true);
        }
      });

      // 1. Initial fade in for lines (Faster stagger: 0.2s)
      tl.to(bootLinesRef.current, {
        opacity: 1,
        stagger: 0.15,
        duration: 0.05,
        ease: "none",
        delay: 0.3
      });

      // 2. Logo reveal (Snappier)
      tl.to(logoRef.current, {
        opacity: 1,
        duration: 0.1,
        delay: 0.2
      });

      // Flash (Less repeats, faster)
      tl.to(logoRef.current, {
        filter: 'brightness(1.5)',
        repeat: 3,
        yoyo: true,
        duration: 0.05
      });

      // 3. Pause (Shortened)
      tl.to({}, { duration: 0.3 });

      // 4. Curtain split (Faster: 0.5s)
      tl.to(curtainTopRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "expo.inOut"
      }, "split");

      tl.to(curtainBottomRef.current, {
        yPercent: 100,
        duration: 0.5,
        ease: "expo.inOut"
      }, "split");

      // Fade out lines & logo
      tl.to([logoRef.current, ...bootLinesRef.current], {
        opacity: 0,
        duration: 0.2
      }, "split");

      // Fade out main container
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.1
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  if (complete && renderContent) {
    return <>{children}</>;
  }

  const lines = [
    "INITIALIZING NEURAL ARCHITECT v3.0.0",
    "LOADING CORE MODULES...",
    "ESTABLISHING CONNECTION...",
    "IDENTITY CONFIRMED: FARHAN MALLIK",
    "SYSTEM READY."
  ];

  return (
    <div ref={containerRef} className={styles.loaderOverlay}>
      <div ref={curtainTopRef} className={`${styles.curtain} ${styles.curtainTop}`} />
      
      <div className={styles.content}>
        <div className="space-y-1 mb-8">
          {lines.map((line, i) => (
            <div 
              key={i} 
              ref={el => { bootLinesRef.current[i] = el; }} 
              className={styles.bootLine}
            >
              <span className={styles.prefix}>{">"}</span>
              {line}
              {i === lines.length - 1 && <span className={`${styles.cursor} ${styles.blinking}`} />}
            </div>
          ))}
        </div>

        <div className={styles.bottomSection}>
          <div ref={logoRef} className={styles.logoGlitch}>
            NEURAL_ARCHITECT
          </div>
          
          <div className={styles.progressCounter}>
            <span className={styles.percentText}>{progress}%</span>
            <div className={styles.progressTrack}>
              <div ref={progressFillRef} className={styles.progressFill} />
            </div>
          </div>
        </div>
      </div>

      <div ref={curtainBottomRef} className={`${styles.curtain} ${styles.curtainBottom}`} />
    </div>
  );
}
