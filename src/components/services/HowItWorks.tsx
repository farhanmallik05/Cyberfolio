'use client';

import { motion } from 'framer-motion';

const STEPS = [
  { num: '01', title: 'Enquiry', desc: 'Initial contact & requirements' },
  { num: '02', title: 'Scoping', desc: 'Architecture & technical spec' },
  { num: '03', title: 'Build', desc: 'Development & integration' },
  { num: '04', title: 'Review', desc: 'UAT & revisions' },
  { num: '05', title: 'Deploy', desc: 'Production launch & handover' }
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-24 mx-auto max-w-6xl relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-mech-silver mb-4">
          Deployment <span className="text-mech-cyan">Protocol</span>
        </h2>
      </div>

      <div className="relative">
        {/* Horizontal Connector (desktop only) */}
        <div className="hidden md:block absolute top-12 left-10 right-10 h-[2px] bg-mech-cyan/20">
          <motion.div 
            className="h-full bg-mech-cyan"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        {/* Vertical Connector (mobile only) */}
        <div className="md:hidden absolute top-10 bottom-10 left-8 w-[2px] bg-mech-cyan/20">
          <motion.div 
            className="w-full bg-mech-cyan"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
          {STEPS.map((step, idx) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex md:flex-col items-start md:items-center text-left md:text-center relative"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-mech-bg border-2 border-mech-cyan/40 flex items-center justify-center mb-0 md:mb-6 shrink-0 relative z-10 shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                <span className="text-xl md:text-2xl font-orbitron text-mech-cyan font-bold">{step.num}</span>
              </div>
              
              <div className="ml-6 md:ml-0 mt-2 md:mt-0">
                <h3 className="text-xl font-orbitron text-mech-silver mb-2">{step.title}</h3>
                <p className="text-sm font-rajdhani text-mech-silver/60">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
