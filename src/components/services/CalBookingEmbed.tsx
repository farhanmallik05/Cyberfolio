'use client';

import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { motion } from 'framer-motion';
import { MechPanel } from '@/components/ui/MechPanel';
import Link from 'next/link';

export default function CalBookingEmbed() {
  const [mounted, setMounted] = useState(false);
  const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME;

  useEffect(() => {
    setMounted(true);
    if (calUsername) {
      (async function () {
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#00f5ff" } },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      })();
    }
  }, [calUsername]);

  if (!mounted) return null;

  return (
    <section id="booking-embed" className="py-24 px-6 sm:px-12 md:px-24 mx-auto max-w-5xl relative z-10 scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-mech-silver mb-4">
          Initialize <span className="text-mech-cyan">Deployment</span>
        </h2>
        <p className="text-mech-silver/70 font-rajdhani text-lg max-w-2xl mx-auto">
          Schedule a scoping call to discuss your architecture requirements.
        </p>
      </div>

      <MechPanel glowHover={false} className="p-2 md:p-6 bg-black/50">
        {calUsername ? (
          <div className="w-full h-[600px] overflow-y-auto overflow-x-hidden rounded-lg">
            <Cal
              calLink={calUsername}
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ theme: 'dark' }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-2xl font-orbitron text-mech-silver mb-4">Ready to upgrade your systems?</h3>
            <p className="text-mech-silver/70 font-rajdhani text-lg mb-8 max-w-md">
              Our direct booking system is currently offline. Please use the contact protocol to initialize a deployment sequence.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-mech-cyan text-black font-orbitron font-bold uppercase tracking-widest rounded hover:bg-mech-cyan/90 transition-colors shadow-[0_0_15px_rgba(0,245,255,0.3)]"
              >
                Launch Contact Protocol
              </motion.button>
            </Link>
          </div>
        )}
      </MechPanel>
    </section>
  );
}
