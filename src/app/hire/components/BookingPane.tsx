"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MechPanel } from "@/components/ui/MechPanel";

// Dynamically import Cal component with ssr disabled
const Cal = dynamic(() => import("@calcom/embed-react").then((mod) => mod.default), {
  ssr: false,
});

export function BookingPane() {
  const [mounted, setMounted] = useState(false);
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <MechPanel border glowHover={false} className="p-12 flex items-center justify-center bg-mech-panel/50 min-h-[400px]">
        <div className="text-mech-cyan animate-pulse font-orbitron">Initializing Secure Uplink...</div>
      </MechPanel>
    );
  }

  if (!calLink) {
    return (
      <MechPanel border glowHover={false} className="p-12 flex flex-col items-center justify-center bg-mech-panel/50 min-h-[400px] text-center">
        <h3 className="text-xl font-orbitron text-mech-rose mb-4">Booking Temporarily Unavailable</h3>
        <p className="text-mech-silver">The scheduling uplink is currently offline. Please use the brief submission form instead.</p>
      </MechPanel>
    );
  }

  return (
    <MechPanel border glowHover={false} className="p-2 md:p-6 bg-black/50 min-h-[600px] overflow-hidden">
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </MechPanel>
  );
}
