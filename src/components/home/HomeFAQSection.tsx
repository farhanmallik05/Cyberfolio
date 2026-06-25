'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_FAQ } from '@/data/faq';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { MechPanel } from '@/components/ui/MechPanel';

export function HomeFAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['faq-cost']));

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  const displayFaqs = SERVICES_FAQ.slice(0, 6);

  return (
    <section className="py-24 px-6 sm:px-12 md:px-24 mx-auto max-w-4xl relative z-10">
      <div className="mb-16">
        <h2 className="font-orbitron text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
          <MessageSquare className="text-neon w-8 h-8" />
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-dim font-mono text-sm uppercase tracking-widest">
          Common inquiries about systems and operations
        </p>
      </div>

      <div className="space-y-4">
        {displayFaqs.map((faq) => {
          const isOpen = openItems.has(faq.id);

          return (
            <MechPanel key={faq.id} glowHover={true} className="overflow-hidden">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none group/btn"
              >
                <h3 className="text-lg md:text-xl font-orbitron text-mech-silver pr-8 group-hover/btn:text-white transition-colors duration-300">
                  {faq.question}
                </h3>
                <motion.div
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-mech-cyan shrink-0"
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-0 text-mech-silver/80 font-rajdhani text-lg leading-relaxed">
                      <div className="h-[1px] w-full bg-gradient-to-r from-mech-cyan/40 to-transparent mb-4" />
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </MechPanel>
          );
        })}
      </div>
    </section>
  );
}
