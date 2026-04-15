"use client";

import { useEffect, useRef } from 'react';
export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Clear existing content if theme changes
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'farhanmallik05/Cyberfolio');
    script.setAttribute('data-repo-id', 'R_kgDORYa-Qg');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDORYa-Qs4C61lE');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark_protanopia');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    ref.current.appendChild(script);
  }, []);

  return (
    <div className="mt-20 pt-10 border-t border-mech-silver/10">
      <div ref={ref} />
    </div>
  );
}
