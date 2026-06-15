"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { GlitchText } from '@/components/ui/GlitchText';
import { MechButton } from '@/components/ui/MechButton';
import { FolderGit2, Database, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import styles from './HeroSection.module.css';
import { AvailabilityBadge } from './AvailabilityBadge';
import { SITE_STATS } from '@/data/stats';
import { useRole } from '@/context/RoleContext';

import { ScanningLoader } from '@/components/ui/ScanningLoader';

const AICore = dynamic(() => import('@/components/AICore').then(mod => mod.AICore), { 
  ssr: false,
  loading: () => <ScanningLoader /> 
});

export function HeroSection() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { activeRole } = useRole();
  const sectionRef = useRef<HTMLElement>(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || reduced) return;

    const ctx = gsap.context(() => {
      // Desktop only: override CSS default before animating in
      gsap.set(q(`.${styles.label}, .${styles.title}, .${styles.tagline}, .${styles.actions}, .${styles.statsStrip}`), {
        opacity: 0,
        y: 20
      });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(q(`.${styles.label}`), { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" })
        .to(q(`.${styles.title}`), { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .to(q(`.${styles.tagline}`), { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .to(q(`.${styles.actions}`), { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .to(q(`.${styles.statsStrip}`), { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, [q]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.background}>
        <AICore />
      </div>

      <div className={styles.content}>
        <div className={styles.label}>
          <div className={styles.line} />
          <AvailabilityBadge />
          <div className={styles.line} />
        </div>

        <GlitchText 
          text="FARHAN MALLIK" 
          className={styles.title} 
        />

        <p className={styles.tagline}>
          Engineering the future, one neural system at a time.
        </p>

        <div className={styles.actions}>
          <MechButton 
            variant="primary" 
            icon={<FolderGit2 className="w-4 h-4" />}
            onClick={() => {
              const el = document.getElementById('projects-preview');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Execute Projects
          </MechButton>
          <MechButton 
            variant="secondary" 
            icon={<Database className="w-4 h-4" />}
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Launch Nexus
          </MechButton>
        </div>

        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{SITE_STATS.projects}</span>
            <span className={styles.statLabel}>Deployments</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{SITE_STATS.years}</span>
            <span className={styles.statLabel}>Exp. Years</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{SITE_STATS.hackathons}</span>
            <span className={styles.statLabel}>Hackathons</span>
          </div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        onClick={() => {
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        <ChevronDown className="w-6 h-6 text-dim/50" />
      </motion.div>
    </section>
  );
}
