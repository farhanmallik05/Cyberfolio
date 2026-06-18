"use client";
import React from 'react';
import { Newspaper, ArrowRight } from 'lucide-react';
import { MechButton } from '@/components/ui/MechButton';
import Link from 'next/link';
import styles from './BlogPreview.module.css';

const BLOG_POSTS = [
  {
    title: "Building a RAG Pipeline with Supabase pgvector",
    date: "Coming_Soon",
    excerpt: "Exploring the integration of vector databases and large language models for intelligent knowledge retrieval."
  },
  {
    title: "n8n Automation: From Zero to Production",
    date: "Coming_Soon",
    excerpt: "A deep dive into building scalable agentic workflows and automating complex business logic without code."
  },
  {
    title: "Designing Cinematic UIs with GSAP and Three.js",
    date: "Coming_Soon",
    excerpt: "Techniques for creating high-fidelity, motion-driven interfaces that feel alive and responsive."
  }
];

export function BlogPreview() {
  return (
    <section className={styles.section} id="blog">
      <div className={styles.header}>
        <div>
          <h2 className="font-orbitron text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <Newspaper className="text-neon" />
            Latest Articles
          </h2>
          <p className="text-dim text-sm font-mono uppercase tracking-[0.2em] mt-2">
            Technical research and transmissions
          </p>
        </div>
        <Link href="/blog">
          <MechButton variant="secondary" icon={<ArrowRight size={16} />}>
            Full Archive
          </MechButton>
        </Link>
      </div>

      <div className={styles.grid}>
        {BLOG_POSTS.map((post, i) => (
          <div key={i} className={styles.blogCard}>
            <div className={styles.badge}>DRAFT_v0.1</div>
            <div className={styles.date}>{post.date}</div>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className="mt-auto flex items-center gap-2 text-[10px] font-orbitron text-dim uppercase tracking-widest group cursor-not-allowed">
               Reading Restricted <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
