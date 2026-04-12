"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GSAPRegistrar from '@/components/home/GSAPRegistrar';
import { HomeLoader } from '@/components/home/HomeLoader';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { SkillsPreview } from '@/components/home/SkillsPreview';
import { BackgroundSystem } from '@/components/BackgroundSystem';
import { Terminal as TerminalIcon } from 'lucide-react';
import { TerminalCLI } from '@/components/ui/TerminalCLI';

// Heavy sections wrapped in dynamic imports
const ProjectsPreview = dynamic(() => import('@/components/home/ProjectsPreview').then(mod => mod.ProjectsPreview), { ssr: false });
const ServicesPreview = dynamic(() => import('@/components/home/ServicesPreview').then(mod => mod.ServicesPreview), { ssr: false });
const TestimonialsStrip = dynamic(() => import('@/components/home/TestimonialsStrip').then(mod => mod.TestimonialsStrip), { ssr: false });
const BlogPreview = dynamic(() => import('@/components/home/BlogPreview').then(mod => mod.BlogPreview), { ssr: false });
const ContactSection = dynamic(() => import('@/components/home/ContactSection').then(mod => mod.ContactSection), { ssr: false });
const MatrixRain = dynamic(() => import('@/components/home/MatrixRain').then(mod => mod.MatrixRain), { ssr: false });

export default function Home() {
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key to toggle Matrix Rain: Shift + M
      if (e.shiftKey && e.key === 'M') {
        setShowMatrix(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen bg-mech-base w-full">
      {/* Infrastructure */}
      <GSAPRegistrar />
      
      {/* Background System (Stars/Grid) */}
      <BackgroundSystem />

      {/* Secret Matrix Layer */}
      {showMatrix && <MatrixRain />}

      <HomeLoader>
        <motion.div 
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col w-full relative z-10"
        >
          {/* Wave 2: Hero */}
          <div className="relative z-[100]">
            <HeroSection />
          </div>

          {/* Wave 3: Content Previews */}
          <div className="relative z-[90] bg-mech-base">
            <AboutPreview />
          </div>
          
          <div className="relative z-[80] bg-mech-base">
            <SkillsPreview />
          </div>

          <div className="relative z-[70]">
            <ProjectsPreview />
          </div>
          
          <div className="relative z-[60] bg-mech-base">
            <ServicesPreview />
          </div>

          <div className="relative z-[50] bg-mech-base">
            <TestimonialsStrip />
          </div>

          <div className="relative z-[40] bg-mech-base">
            <BlogPreview />
          </div>

          {/* Wave 4: Finalization */}
          <div id="contact" className="relative z-[30] bg-mech-base">
            <ContactSection />
          </div>

          {/* Terminal CLI Restoration */}
          <div className="relative z-[20] bg-mech-base py-20 border-t border-white/5">
            <div className="container mx-auto px-4">
               <div className="flex items-center gap-4 mb-8">
                  <TerminalIcon className="text-neon w-5 h-5" />
                  <h3 className="font-orbitron text-sm tracking-[0.2em] text-dim uppercase">Interactive Terminal Access</h3>
               </div>
               <TerminalCLI />
            </div>
          </div>

        </motion.div>
      </HomeLoader>
    </main>
  );
}
