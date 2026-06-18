"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Cpu,  Database, Layout, Brain, Zap } from 'lucide-react';
import { MechButton } from '@/components/ui/MechButton';
import Link from 'next/link';
import styles from './SkillsPreview.module.css';

const PREVIEW_SKILLS = [
  { title: 'Frontend Engine', icon: Layout, desc: 'Next.js, React, GSAP, CSS Theme Systems' },
  { title: 'Backend Core', icon: Database, desc: 'Node.js, Supabase, PostgreSQL, APIs' },
  { title: 'Neural Logic', icon: Brain, desc: 'LLM Agents, RAG Pipelines, Prompt Engineering' },
  { title: 'Automation', icon: Zap, desc: 'n8n Workflows, Python Scripts, Cron Jobs' },
];

export function SkillsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(q(`.${styles.skillCard}`), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <h2 className="font-orbitron text-2xl font-black text-white mb-2 uppercase tracking-tighter">
          Technical Skills
        </h2>
        <p className="text-dim text-sm font-mono uppercase tracking-widest">
          Integrated systems and technical stack
        </p>
      </div>

      <div className={styles.grid}>
        {PREVIEW_SKILLS.map((skill, i) => (
          <div key={i} className={styles.skillCard}>
            <skill.icon className={styles.skillIcon} size={28} strokeWidth={1.5} />
            <h3 className={styles.skillTitle}>{skill.title}</h3>
            <p className={styles.skillDesc}>{skill.desc}</p>
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Cpu size={40} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/skills">
          <MechButton variant="secondary" className="px-8">
            Access Full Matrix
          </MechButton>
        </Link>
      </div>
    </section>
  );
}
