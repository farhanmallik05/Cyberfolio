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
    <html>
      <body>
        <div style={{ padding: "50px", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2>Something went critically wrong.</h2>
          <p>Our engineers have been notified.</p>
        </div>
      </body>
    </html>
  );
}
