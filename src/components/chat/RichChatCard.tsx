import React from 'react';
import Link from 'next/link';

interface RichChatCardProps {
  type: 'project' | 'service';
  slug: string;
  title?: string;
}

export function RichChatCard({ type, slug, title }: RichChatCardProps) {
  const isProject = type === 'project';
  const tag = isProject ? 'PROJECT' : 'SERVICE';
  const url = `/${type}s/${slug}`;
  const displayTitle = title || slug.replace(/-/g, ' ');

  return (
    <Link href={url} className="block mt-4 mb-4 no-underline group relative max-w-md">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[var(--neon)] via-transparent to-[var(--neon)] rounded-sm opacity-30 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-black/80 backdrop-blur-md border border-[var(--neon)]/50 rounded-sm p-4 hover:bg-[var(--bg2)] transition-colors overflow-hidden">
        
        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-[10px] font-mono font-bold text-[var(--neon)] uppercase tracking-widest border border-[var(--neon)]/30 px-2 py-0.5 rounded-sm inline-block mb-2">
              {tag} :: ENTRY
            </span>
            <h4 className="text-white font-heading text-lg capitalize m-0">{displayTitle}</h4>
          </div>
          <div className="text-[var(--neon)] opacity-50 group-hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
