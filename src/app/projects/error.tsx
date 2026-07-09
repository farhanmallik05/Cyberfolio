"use client";

import { useEffect } from "react";
import { MechButton } from "@/components/ui/MechButton";
import { AlertOctagon } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      <AlertOctagon className="w-16 h-16 text-red-500 mb-6" />
      <h2 className="text-2xl font-orbitron font-bold text-red-400 uppercase tracking-wider mb-2">System Error</h2>
      <p className="text-zinc-400 mb-8 max-w-md">
        Failed to access project databanks. The connection to the mainframe may be unstable.
      </p>
      <MechButton variant="secondary" onClick={() => reset()}>
        REBOOT SYSTEM
      </MechButton>
    </div>
  );
}
