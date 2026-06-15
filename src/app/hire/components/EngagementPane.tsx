"use client";

import { MechPanel } from "@/components/ui/MechPanel";

interface EngagementPaneProps {
  onSelectBook: () => void;
}

export function EngagementPane({ onSelectBook }: EngagementPaneProps) {
  const models = [
    {
      title: "Hourly",
      tag: "Flexible",
      startingAt: "₹999 / hr",
      features: [
        "Architecture audits & strategy",
        "Bug fixes & targeted refactors",
        "1:1 Consulting & Code Reviews",
        "No minimum commitment",
      ],
      description: "Best for agencies + freelance ops needing immediate, targeted bandwidth.",
    },
    {
      title: "Retainer",
      tag: "Ongoing",
      startingAt: "₹6,999 / mo",
      features: [
        "Dedicated weekly bandwidth",
        "Sustained feature development",
        "Priority async communication",
        "Deep integration with your team",
      ],
      description: "Best for scaling startups that need continuous momentum.",
    },
    {
      title: "Project-Based",
      tag: "Fixed Scope",
      startingAt: "₹6,999",
      features: [
        "Scope-locked delivery",
        "Milestone-gated execution",
        "Clear acceptance criteria",
        "End-to-end ownership",
      ],
      description: "Best for founders with defined builds and strict timelines.",
    },
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {models.map((model, idx) => (
        <MechPanel key={idx} border glowHover className="p-6 md:p-8 flex flex-col h-full bg-mech-panel/50">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest text-mech-cyan border border-mech-cyan/30 rounded-full">
                {model.tag}
              </span>
              <span className="inline-block px-2 py-1 text-[10px] font-share-tech text-mech-silver/70 bg-white/5 border border-white/10 rounded-full">
                Starting at {model.startingAt}
              </span>
            </div>
            <h3 className="text-2xl font-orbitron text-white mb-2">{model.title}</h3>
            <p className="text-sm text-mech-silver/80">{model.description}</p>
          </div>

          
          <ul className="flex-grow space-y-3 mb-8">
            {model.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start text-sm text-mech-silver">
                <span className="text-mech-cyan mr-2">▹</span>
                {feature}
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onSelectBook}
            className="w-full py-3 mt-auto text-center font-orbitron uppercase text-sm tracking-widest text-black bg-mech-cyan hover:bg-white hover:text-black transition-colors"
          >
            Let's Talk →
          </button>
        </MechPanel>
      ))}
    </div>
  );
}
