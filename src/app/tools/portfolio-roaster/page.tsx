'use client';

import React, { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { TerminalStream } from '@/components/ui/TerminalStream';
import Link from 'next/link';

export default function PortfolioRoasterPage() {
  const [url, setUrl] = useState('');
  const [manualContent, setManualContent] = useState('');
  const [mode, setMode] = useState<'url' | 'manual'>('url');
  
  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/tools/roast',
  });

  const handleRoast = async () => {
    if (mode === 'url' && !url.trim()) return;
    if (mode === 'manual' && !manualContent.trim()) return;
    
    await complete('', {
      body: {
        url: mode === 'url' ? url : undefined,
        manualContent: mode === 'manual' ? manualContent : undefined
      }
    });
  };

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-8">
      <Link href="/tools" className="text-[var(--neon)] hover:underline flex items-center gap-2 w-fit">
        ← Back to Tools
      </Link>
      
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl font-black font-heading text-white uppercase tracking-wider">
          PORTFOLIO <span className="text-[#FF3366]">ROASTER</span>
        </h1>
        <p className="text-[var(--text-muted)]">Aggressively honest feedback for your dev portfolio.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Pane */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 border-b border-[var(--border)] pb-2">
            <button 
              className={`font-mono text-sm uppercase ${mode === 'url' ? 'text-[#FF3366]' : 'text-[var(--text-muted)]'}`}
              onClick={() => setMode('url')}
            >
              Scan URL
            </button>
            <button 
              className={`font-mono text-sm uppercase ${mode === 'manual' ? 'text-[#FF3366]' : 'text-[var(--text-muted)]'}`}
              onClick={() => setMode('manual')}
            >
              Manual Paste
            </button>
          </div>

          {mode === 'url' ? (
            <input 
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-portfolio.com"
              className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-sm p-4 text-white focus:outline-none focus:border-[#FF3366]"
            />
          ) : (
             <textarea 
              value={manualContent}
              onChange={(e) => setManualContent(e.target.value)}
              placeholder="Paste your portfolio text or HTML structure here if the URL scan fails..."
              className="w-full h-[250px] bg-[var(--bg2)] border border-[var(--border)] rounded-sm p-4 text-white focus:outline-none focus:border-[#FF3366] resize-none"
            />
          )}

          <button 
            onClick={handleRoast}
            disabled={isLoading || (mode === 'url' ? !url.trim() : !manualContent.trim())}
            className="w-full py-4 bg-[#FF3366] text-white font-bold font-heading uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black transition-colors mt-auto"
          >
            {isLoading ? 'ROASTING IN PROGRESS...' : 'INITIATE ROAST'}
          </button>
          {error && <div className="text-red-500 font-mono text-sm mt-2">Error: {error.message}</div>}
        </div>

        {/* Output Pane */}
        <div className="flex flex-col gap-4">
          <label className="text-[#FF3366] font-mono text-sm uppercase">Burn Report</label>
          <TerminalStream content={completion || 'Awaiting target...'} isStreaming={isLoading} />
        </div>
      </div>
    </div>
  );
}
