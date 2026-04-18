'use client';

import { motion } from 'framer-motion';
import { MechPanel } from '@/components/ui/MechPanel';
import { Code, Cpu, Figma, Brain, BrainCircuit, Palette, CheckCircle2, Briefcase } from 'lucide-react';

import { ServiceConfig } from '@/types/services';

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-8 h-8 text-mech-cyan" />,
  Cpu: <Cpu className="w-8 h-8 text-mech-cyan" />,
  Figma: <Figma className="w-8 h-8 text-mech-cyan" />,
  Brain: <Brain className="w-8 h-8 text-mech-cyan" />,
  BrainCircuit: <BrainCircuit className="w-8 h-8 text-mech-cyan" />,
  Palette: <Palette className="w-8 h-8 text-mech-cyan" />,
  Briefcase: <Briefcase className="w-8 h-8 text-mech-cyan" />
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ServiceCards({ serviceConfig }: { serviceConfig: ServiceConfig }) {
  // Filter to only enabled services
  const enabledServices = serviceConfig.filter(s => s.enabled);
  return (
    <section className="py-16 px-6 sm:px-12 md:px-24 mx-auto max-w-7xl relative z-10">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {enabledServices.map((service) => (
          <motion.div key={service.id} variants={item} className="h-full">
            <MechPanel glowHover={true} className="p-8 h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-lg bg-mech-cyan/10 border border-mech-cyan/20">
                  {iconMap[service.icon]}
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-mech-silver/50 mb-1">Starts at</p>
                  <p className="text-2xl font-orbitron text-mech-silver font-bold tracking-wider">{service.startingPrice}</p>
                </div>
              </div>
              
              <h3 className="text-2xl font-orbitron text-mech-silver mb-3">
                {service.title}
              </h3>
              
              <p className="text-mech-silver/70 font-rajdhani text-lg mb-8 flex-grow">
                {service.description}
              </p>
              
              <div className="mt-auto">
                <h4 className="text-sm font-mono text-mech-cyan uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-mech-cyan/50"></span>
                  Deployment Includes
                </h4>
                <ul className="space-y-3">
                  {service.includes.slice(0, 4).map((include, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-mech-cyan/70 shrink-0 mt-0.5" />
                      <span className="text-mech-silver/80 font-rajdhani">{include}</span>
                    </li>
                  ))}
                  {service.includes.length > 4 && (
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 flex items-center justify-center text-mech-cyan/70 text-xs shrink-0 mt-0.5">+</span>
                      <span className="text-mech-silver/50 font-rajdhani italic">{service.includes.length - 4} more included</span>
                    </li>
                  )}
                </ul>
              </div>
            </MechPanel>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
