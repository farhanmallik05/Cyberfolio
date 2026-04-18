"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code, Cpu, Figma, Brain, ChevronRight, Briefcase, Palette, BrainCircuit } from 'lucide-react';
import { getServiceConfig } from '@/app/admin/actions';
import { ServiceConfig, Service } from '@/types/services';
import styles from './ServicesPreview.module.css';

const ICON_MAP = {
  Code,
  Cpu,
  Figma,
  Brain,
  BrainCircuit,
  Palette,
  Briefcase
};

export function ServicesPreview() {
  const [services, setServices] = useState<ServiceConfig>([]);

  useEffect(() => {
    getServiceConfig().then(setServices);
  }, []);

  const enabledServices = services.filter(s => s.enabled);

  return (
    <section className={styles.section} id="services">
      <div className={styles.header}>
        <h2 className="font-orbitron text-3xl font-black text-white uppercase tracking-tighter">
          System_Solutions
        </h2>
        <p className="text-dim text-sm font-mono uppercase tracking-[0.2em] mt-2">
          Specialized service architectures
        </p>
      </div>

      <div className={styles.grid}>
        {enabledServices.map((service: Service) => {
          const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP] || Code;
          
          return (
            <div key={service.id} className={styles.cardContainer}>
              <div className={styles.cardInner}>
                {/* Front Side */}
                <div className={styles.cardFront}>
                  <Icon className={styles.icon} size={40} />
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.desc}>{service.description}</p>
                  <div className={styles.price}>
                    Starting From <span className="text-white font-bold ml-1">{service.startingPrice}</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className={styles.cardBack}>
                  <h4 className={styles.backTitle}>Module_Inclusions</h4>
                  <ul className={styles.includeList}>
                    {service.includes.map((item, idx) => (
                      <li key={idx} className={styles.includeItem}>
                        <div className={styles.dot} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-orbitron text-neon tracking-widest uppercase">
                    Initialize Protocol <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
         <Link href="/contact" className="group/cta inline-block">
            <p className="text-dim font-mono text-xs uppercase tracking-[0.3em] group-hover/cta:text-mech-cyan transition-colors duration-300">
               Have an idea? <span className="text-mech-cyan group-hover/cta:text-white underline underline-offset-4 decoration-mech-cyan/30 group-hover/cta:decoration-white transition-all">Let&apos;s build it.</span>
            </p>
         </Link>
      </div>
    </section>
  );
}
