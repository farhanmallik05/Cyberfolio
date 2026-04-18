'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_FAQ } from '@/data/faq';
import { ChevronDown } from 'lucide-react';
import { MechPanel } from '@/components/ui/MechPanel';

export function FAQAccordion() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['faq-cost', 'faq-timeline']));

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  return (
    <section className="py-24 px-6 sm:px-12 md:px-24 mx-auto max-w-4xl relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-mech-silver mb-4">
          Common <span className="text-mech-cyan">Queries</span>
        </h2>
      </div>

      <div className="space-y-4">
        {SERVICES_FAQ.map((faq) => {
          const isOpen = openItems.has(faq.id);

          return (
            <MechPanel key={faq.id} glowHover={false} className="overflow-hidden">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg md:text-xl font-orbitron text-mech-silver pr-8">
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
                    <div className="px-6 pb-6 pt-0 text-mech-silver/70 font-rajdhani text-lg">
                      <div className="h-[1px] w-full bg-mech-cyan/20 mb-4" />
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
