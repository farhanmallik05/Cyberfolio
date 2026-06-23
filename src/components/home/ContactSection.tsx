"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send,  ArrowLeft, CheckCircle2, Terminal } from 'lucide-react';
import { MechButton } from '@/components/ui/MechButton';
import styles from './ContactSection.module.css';

const STEPS = [
  {
    id: 'type',
    title: 'Initialize_Project',
    desc: 'What type of neural system are we building?',
    options: ['Web Application', 'AI Integration', 'Workflow Automation', 'UI/UX Design']
  },
  {
    id: 'budget',
    title: 'Financial_Parameters',
    desc: 'Select your operational budget range.',
    options: ['< ₹10,000', '₹10k - ₹50k', '₹50k - ₹100k', '₹100k+']
  },
  {
    id: 'timeline',
    title: 'Temporal_Constraint',
    desc: 'When does the system need to go live?',
    options: ['ASAP', '2 - 4 Weeks', '1 - 2 Months', 'Flexible']
  },
  {
    id: 'details',
    title: 'Final_Transmission',
    desc: 'Provide your coordinates and mission details.'
  }
];

export function ContactSection() {
  const [step, setStep] = useState(0);
                                           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({
    type: '',
    budget: '',
    timeline: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (key: string, value: string) => {
                       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, [key]: value }));
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Transmission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  // Sync progress variable to CSS without inline styles
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--progress', `${progress}%`);
    }
  }, [progress]);

  if (submitted) {
    return (
      <section className={styles.section} id="contact">
        <div className={styles.wizardContainer}>
          <div className="flex flex-col items-center justify-center h-full p-10 text-center">
            <CheckCircle2 className="w-16 h-16 text-neon mb-6" />
            <h2 className="font-orbitron text-2xl font-black text-white uppercase mb-2">Transmission_Success</h2>
            <p className="text-dim font-inter">Your data has been successfully encrypted and sent to HQ. Expect a breach confirmation soon.</p>
            <MechButton variant="secondary" className="mt-8" onClick={() => { setSubmitted(false); setStep(0); setFormData({}); }}>
              Reset Nexus
            </MechButton>
          </div>
        </div>
      </section>
    );
  }

  const currentStep = STEPS[step];

  return (
    <section className={styles.section} id="contact">
      <div className="mb-12">
        <h2 className="font-orbitron text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
          <Terminal className="text-neon" />
          Mission_Control
        </h2>
        <p className="text-dim text-sm font-mono uppercase tracking-[0.2em] mt-2">
          Secure channel for deployment requests
        </p>
      </div>

      <div className={styles.wizardContainer}>
        <div ref={progressBarRef} className={styles.progressBar} />
        
        <div className={styles.progressHeader}>
          <span className={styles.stepIndicator}>Step_0{step + 1} / 0{STEPS.length}</span>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="text-dim hover:text-white flex items-center gap-2 text-[10px] font-mono uppercase">
              <ArrowLeft size={12} /> Back
            </button>
          )}
        </div>

        <div className={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className={styles.stepTitle}>{currentStep.title}</h3>
              <p className={styles.stepDesc}>{currentStep.desc}</p>

              {currentStep.options ? (
                <div className={styles.optionsGrid}>
                  {currentStep.options.map((opt) => (
                    <div 
                      key={opt} 
                      className={`${styles.optionCard} ${formData[currentStep.id] === opt ? styles.optionCardSelected : ''}`}
                      onClick={() => handleOptionSelect(currentStep.id, opt)}
                    >
                      <span className={styles.optionTitle}>{opt}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    required
                    type="email" 
                    placeholder="YOUR_EMAIL_COORDINATES"
                    className={styles.inputField}
                    value={formData.email}
                                                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e) => setFormData((p: any) => ({ ...p, email: e.target.value }))}
                  />
                  <textarea 
                    required
                    placeholder="MISSION_DETAILS..."
                    className={styles.inputField}
                    value={formData.message}
                                                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e) => setFormData((p: any) => ({ ...p, message: e.target.value }))}
                  />
                  <div className="flex justify-end pt-4">
                    <MechButton 
                      variant="primary" 
                      onClick={() => {}} 
                      icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'ENCRYPTING...' : 'INITIATE_TRANSMISSION'}
                    </MechButton>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
