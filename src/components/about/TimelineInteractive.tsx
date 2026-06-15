'use client';

import { useRef } from 'react';

import { GraduationCap, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
    type: 'experience' | 'education';
    title: string;
    subtitle: string;
    period: string;
    details?: string;
    status?: string;
}

interface TimelineInteractiveProps {
    experience: { role: string; organization: string; period: string; details: string }[];
    academicRecord: { degree: string; institution: string; period: string; status: string }[];
}

export default function TimelineInteractive({ experience, academicRecord }: TimelineInteractiveProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    // Merge and sort entries chronologically (reverse chronological for vertical)
    const entries: TimelineEntry[] = [
        ...academicRecord.map(e => ({
            type: 'education' as const,
            title: e.degree,
            subtitle: e.institution,
            period: e.period,
            status: e.status,
        })),
        ...experience.map(e => ({
            type: 'experience' as const,
            title: e.role,
            subtitle: e.organization,
            period: e.period,
            details: e.details,
        })),
    ].sort((a, b) => {
        const yearRegex = /\d{4}/;
        const yearA = parseInt(a.period.match(yearRegex)?.[0] || '0');
        const yearB = parseInt(b.period.match(yearRegex)?.[0] || '0');
        return yearB - yearA; // Reverse chronological for vertical readability
    });

    useGSAP(() => {
        if (!containerRef.current || !lineRef.current) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobile || reduced) return;

        const ctx = gsap.context(() => {
            // 1. Animate central line filling
            gsap.fromTo(lineRef.current,
                { height: 0 },
                {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                        end: 'bottom 80%',
                        scrub: 1,
                    }
                }
            );

            // 2. Animate nodes arrival
            const nodes = gsap.utils.toArray('.timeline-node') as HTMLElement[];
            nodes.forEach((node) => {
                const isLeft = node.classList.contains('node-left');
                gsap.fromTo(node,
                    { 
                        opacity: 0, 
                        x: isLeft ? -50 : 50,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: node,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef, dependencies: [entries.length] });

    return (
        <div className="w-full space-y-12 py-12">
            {/* Section Header */}
            <div className="flex items-center justify-center">
                <h3 className="font-orbitron text-sm text-white flex items-center gap-3 tracking-[0.2em] uppercase">
                    <span className="w-8 h-[1px] bg-mech-cyan/50" />
                    Chronological_Matrix
                    <span className="w-8 h-[1px] bg-mech-cyan/50" />
                </h3>
            </div>

            {/* Vertical Timeline Container */}
            <div 
                ref={containerRef}
                className="relative max-w-4xl mx-auto px-4 overflow-hidden"
            >
                {/* Central Track Line (Background) */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-mech-silver/10 md:-translate-x-1/2" />
                
                {/* Active Filling Line */}
                <div 
                    ref={lineRef}
                    className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-mech-cyan shadow-[0_0_15px_rgba(15,211,255,0.8)] md:-translate-x-1/2 z-10"
                />

                {/* Timeline Nodes */}
                <div className="space-y-12 relative z-20">
                    {entries.map((entry, idx) => {
                        const isExperience = entry.type === 'experience';
                        const accentColor = isExperience ? 'mech-cyan' : 'mech-blue';
                        const isEven = idx % 2 === 0;

                        return (
                            <div 
                                key={idx} 
                                className={`
                                    timeline-node flex flex-col md:flex-row items-start 
                                    ${isEven ? 'node-left md:flex-row-reverse' : 'node-right'}
                                    relative
                                `}
                            >
                                {/* Center Indicator Dot */}
                                <div className={`
                                    absolute left-[29px] md:left-1/2 top-6 w-3 h-3 rounded-full 
                                    border-2 border-${accentColor} bg-mech-base 
                                    shadow-[0_0_8px_rgba(${isExperience ? '15,211,255' : '0,174,239'},0.8)] 
                                    -translate-x-1/2 z-30 transition-all duration-500
                                `} />

                                {/* Content Card */}
                                <div className={`
                                    w-full md:w-[45%] pl-16 md:pl-0 
                                    ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}
                                `}>
                                    <div className={`
                                        relative p-6 rounded border border-mech-silver/10 bg-mech-panel/30 
                                        hover:border-${accentColor}/40 transition-all duration-500 group
                                        hover:bg-${accentColor}/5
                                    `}>
                                        {/* Type Icon */}
                                        <div className={`
                                            absolute top-4 ${isEven ? 'md:left-4' : 'right-4'} 
                                            text-mech-silver/20 group-hover:text-${accentColor} transition-colors
                                        `}>
                                            {isExperience 
                                                ? <Briefcase className="w-4 h-4" /> 
                                                : <GraduationCap className="w-4 h-4" />
                                            }
                                        </div>

                                        <div className="space-y-3">
                                            {/* Period Tag */}
                                            <span className={`
                                                inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.2em] rounded
                                                bg-mech-silver/5 text-mech-silver/40 border border-mech-silver/10
                                                group-hover:bg-${accentColor}/15 group-hover:text-${accentColor} group-hover:border-${accentColor}/30
                                                transition-all
                                            `}>
                                                {entry.period}
                                            </span>

                                            {/* Title */}
                                            <h4 className="font-orbitron text-xs uppercase tracking-widest text-mech-silver/70 group-hover:text-white transition-colors">
                                                {entry.title}
                                            </h4>

                                            {/* Subtitle */}
                                            <p className="text-[10px] text-mech-silver/40 font-mono group-hover:text-mech-silver/60">
                                                {entry.subtitle}
                                            </p>

                                            {/* Details or Status */}
                                            {entry.details && (
                                                <p className="text-[10px] leading-relaxed text-mech-silver/30 group-hover:text-mech-silver/50 transition-colors">
                                                    {entry.details}
                                                </p>
                                            )}
                                            {entry.status && (
                                                <span className={`
                                                    inline-block mt-1 px-2 py-0.5 rounded text-[8px] font-mono uppercase
                                                    ${entry.status.toLowerCase() === 'in progress'
                                                        ? 'bg-mech-cyan/10 border border-mech-cyan/20 text-mech-cyan'
                                                        : 'bg-mech-blue/10 border border-mech-blue/20 text-mech-blue'
                                                    }
                                                `}>
                                                    {entry.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Decorator */}
            <p className="text-center font-mono text-[9px] text-mech-silver/20 tracking-[0.4em] uppercase py-8">
                transmission scroll active :: interactive_chronicle_v2.0
            </p>
        </div>
    );
}
