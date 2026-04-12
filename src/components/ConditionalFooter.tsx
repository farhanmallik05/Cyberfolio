"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Do not render the global footer on the homepage as it has its own cinematic HomeFooter
  if (pathname === "/") return null;
  
  return <Footer />;
}
