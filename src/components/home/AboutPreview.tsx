"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { User, ShieldCheck } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './AboutPreview.module.css';

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { targetRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={(node) => {
        sectionRef.current = node;
        targetRef.current = node;
      }} 
      className={styles.section} 
      data-visible={isIntersecting}
      id="about-preview"
    >
      <div className={styles.grid}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            <User className="w-5 h-5" />
            About Me
          </h2>
          
          <div className={styles.bio} ref={textRef}>
            I am a <span className={styles.highlight}>Computer Science student</span> and 
            <span className={styles.highlight}> Full-Stack Developer</span> deep-diving into 
            the intersection of neural aesthetics and system architecture. 
            <br /><br />
            My focus lies in building <span className={styles.highlight}>agentic workflows</span> and 
            high-fidelity visual experiences that bridge the gap between complex logic 
            and human intuition.
          </div>

          <div className="flex gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                <ShieldCheck className="w-3 h-3 text-neon" />
                <span className="text-[10px] font-mono text-dim uppercase">Security Focused</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                <ShieldCheck className="w-3 h-3 text-neon" />
                <span className="text-[10px] font-mono text-dim uppercase">Scalability Driven</span>
             </div>
          </div>
        </div>

        <div className={styles.identity}>
          <div className={styles.identityFrame} />
          <div className={styles.identityContent}>
            {`> root@farhan-mallik:~$ ./profile.sh 
[ OK ] INITIALIZING: NEXT.JS // SUPABASE // PYTHON // AI 
[ OK ] SPECIALTY: FULL_STACK_ARCHITECTURE 
> STATUS: BUILDING_HIGH_PERFORMANCE_SYSTEMS... DONE.`}
          </div>
        </div>
      </div>
    </section>
  );
}
