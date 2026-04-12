"use client";
import React from 'react';
import { TESTIMONIALS } from '@/data/testimonials';
import styles from './TestimonialMarquee.module.css';

export function TestimonialMarquee() {
  // Duplicate the array to create a seamless loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className={styles.marqueeSection}>
      <h2 className={styles.sectionTitle}>// SOCIAL_PROOF_VALIDATION</h2>
      
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.marqueeContent} animate-marquee pause-on-hover`}>
          {duplicatedTestimonials.map((t, index) => (
            <div 
              key={`${t.id}-${index}`} 
              className={styles.testimonialCard}
            >
              <div className={styles.categoryTag}>{t.category}</div>
              <p className={styles.quote}>{t.quote}</p>
              
              <div className={styles.author}>
                <div className={styles.authorInfo}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>
                    {t.role} {t.company ? ` @ ${t.company}` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
