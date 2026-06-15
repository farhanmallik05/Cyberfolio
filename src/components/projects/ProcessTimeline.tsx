'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProcessPhase {
  phase: string;
  description: string;
  tools?: string[];
}

export function ProcessTimeline({ phases }: { phases: ProcessPhase[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.timeline-node');
    const line = containerRef.current.querySelector('.timeline-line');
    
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reduced) return;

    const ctx = gsap.context(() => {
      // Animate line drawing
      gsap.fromTo(line, 
        { height: 0 },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          }
        }
      );
      
      // Animate nodes fading in
      elements.forEach((node, i) => {
        gsap.fromTo(node,
          { opacity: 0, x: i % 2 === 0 ? 20 : -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative py-12 ml-4 md:ml-0 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-mech-silver/10 md:left-1/2 md:-translate-x-1/2" />
      <div className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-mech-cyan shadow-[0_0_10px_var(--neon)] md:left-1/2 md:-translate-x-1/2 h-full" />
      
      <div className="space-y-16">
        {phases.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={item.phase} className={`timeline-node relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-start`}>
              <div className="absolute left-[-5px] md:left-1/2 top-4 w-3 h-3 bg-mech-base border-2 border-mech-cyan rounded-full shadow-[0_0_8px_var(--neon)] md:-translate-x-1/2 z-10" />
              
              <div className={`pl-8 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <h4 className="font-orbitron text-xl text-mech-white uppercase tracking-wider mb-2">{item.phase}</h4>
                <p className="font-inter text-mech-silver/80 leading-relaxed text-sm mb-4">
                  {item.description}
                </p>
                {item.tools && item.tools.length > 0 && (
                  <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                    {item.tools.map(tool => (
                      <span key={tool} className="text-[10px] font-mono text-mech-cyan/60 uppercase tracking-widest border border-mech-cyan/20 px-2 py-1 bg-mech-cyan/5">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
