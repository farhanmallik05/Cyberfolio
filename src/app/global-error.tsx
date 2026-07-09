"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ fontFamily: "monospace" }}>
          <div className="max-w-md w-full border border-red-500/30 bg-red-500/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest mb-4">Critical System Failure</h2>
            <p className="text-zinc-400 mb-6">A fatal exception has occurred in the mainframe. Our engineering units have been notified and logged the trace.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/20 transition-colors uppercase tracking-wider text-sm"
            >
              Reboot Sequence
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
