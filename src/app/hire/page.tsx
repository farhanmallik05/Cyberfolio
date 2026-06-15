import type { Metadata } from "next";
import { HireFunnel } from "./components/HireFunnel";
import { AvailabilityBadge } from "@/components/home/AvailabilityBadge";
import { SITE_STATS } from "@/data/stats";
import { TESTIMONIALS } from "@/data/testimonials";
import { MechPanel } from "@/components/ui/MechPanel";

export const metadata: Metadata = {
  title: "Hire Me | Farhan Mallik",
  description: "Engagement models, booking, and project brief submission for agencies and founders.",
};

export default function HirePage() {
  const displayTestimonials = TESTIMONIALS.slice(0, 2);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <section className="text-center mb-16 relative z-10">
          <div className="flex justify-center mb-6">
            <AvailabilityBadge />
          </div>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-6 tracking-wider uppercase">
            Let's Build <span className="text-mech-cyan glow-text-cyan">Something</span>
          </h1>
          <p className="text-lg md:text-xl text-mech-silver max-w-2xl mx-auto mb-10 font-share-tech leading-relaxed">
            Whether you need a targeted architecture audit, sustained bandwidth for your scaling startup, or end-to-end delivery of a fixed-scope build.
          </p>

          {/* Stats Strip */}
          <div className="flex flex-wrap justify-center gap-8 text-mech-cyan font-orbitron text-sm uppercase tracking-widest">
            <div className="flex flex-col items-center">
              <span className="text-2xl text-white">{SITE_STATS.projects}</span>
              <span>Projects Shipped</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-white">{SITE_STATS.years}</span>
              <span>Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-white">{SITE_STATS.hackathons}</span>
              <span>Hackathons</span>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative z-10 max-w-4xl mx-auto">
          {displayTestimonials.map((t) => (
            <MechPanel key={t.id} border glowHover={false} className="p-6 bg-mech-panel/30 flex flex-col justify-between">
              <p className="text-mech-silver italic mb-4">"{t.quote}"</p>
              <div>
                <p className="text-white font-orbitron text-sm">{t.name}</p>
                <p className="text-mech-cyan text-xs font-share-tech">{t.role} {t.company ? `at ${t.company}` : ''}</p>
              </div>
            </MechPanel>
          ))}
        </section>

        {/* Interactive Tab Funnel */}
        <HireFunnel />
      </div>
    </div>
  );
}
