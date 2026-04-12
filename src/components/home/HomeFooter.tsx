"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Terminal, Clock } from 'lucide-react';
import styles from './HomeFooter.module.css';

export function HomeFooter() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const istTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.title}>NEURAL_ARCHITECT</div>
            <p className={styles.tagline}>
              Engineering high-fidelity digital experiences and agentic systems.
            </p>
            <div className="flex gap-4 mt-2">
              <a 
                href="https://github.com/farhanmallik05" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub Profile"
                className="text-dim hover:text-neon transition-colors"
              >
                <Github size={18} />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
                className="text-dim hover:text-neon transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                aria-label="Twitter Profile"
                title="Twitter Profile"
                className="text-dim hover:text-neon transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div className={styles.nav}>
            <div className={styles.navCol}>
              <span className={styles.navTitle}>Navigation</span>
              <Link href="/projects" className={styles.navLink}>Projects</Link>
              <Link href="/about" className={styles.navLink}>Identity</Link>
              <Link href="/blog" className={styles.navLink}>Logs</Link>
            </div>
            <div className={styles.navCol}>
              <span className={styles.navTitle}>Capabilities</span>
              <Link href="/services" className={styles.navLink}>Services</Link>
              <Link href="/skills" className={styles.navLink}>Neural_Core</Link>
              <Link href="/stack" className={styles.navLink}>The_Matrix</Link>
            </div>
            <div className={styles.navCol}>
              <span className={styles.navTitle}>Access</span>
              <a href="mailto:mallikfarhan10@gmail.com" className={styles.navLink}>Direct_Link</a>
              <Link href="/contact" className={styles.navLink}>Nexus_Entry</Link>
              <Link href="/cv" className={styles.navLink}>Dossier.pdf</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.clock}>
            <Clock size={14} />
            <span className="font-mono tracking-widest">{time} IST</span>
            <span className="text-dim-extra ml-4 bg-white/5 px-2 py-0.5 rounded text-[9px] uppercase">Node: AS-SOUTH-1</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
             <div className={styles.copyright}>
                © {new Date().getFullYear()} NEURAL_ARCHITECT / FARHAN MALLIK
             </div>
             <div className="flex items-center gap-2 font-mono text-[9px] text-dim-extra uppercase tracking-widest">
                <Terminal size={10} /> v3.1.2-STABLE // BUILD_2024.Q4
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
