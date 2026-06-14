'use client';

import React, { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { TerminalStream } from '@/components/ui/TerminalStream';
import Link from 'next/link';

export default function PromptOptimizerPage() {
  const [prompt, setPrompt] = useState('');
  
  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/tools/prompt',
  });

  const handleOptimize = async () => {
    if (!prompt.trim()) return;
    await complete(prompt);
  };

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-8">
      <Link href="/tools" className="text-[var(--neon)] hover:underline flex items-center gap-2 w-fit">
        ← Back to Tools
      </Link>
      
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl font-black font-heading text-white uppercase tracking-wider">
          PROMPT <span className="text-[var(--neon)]">OPTIMIZER</span>
        </h1>
        <p className="text-[var(--text-muted)]">Refine your raw thoughts into high-context AI prompts.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Pane */}
        <div className="flex flex-col gap-4">
          <label className="text-[var(--neon)] font-mono text-sm uppercase">1. Enter Raw Prompt</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your messy, unformatted instructions here..."
            className="w-full h-[400px] bg-[var(--bg2)] border border-[var(--border)] rounded-sm p-4 text-white focus:outline-none focus:border-[var(--neon)] resize-none"
          />
          <button 
            onClick={handleOptimize}
            disabled={isLoading || !prompt.trim()}
            className="w-full py-4 bg-[var(--neon)] text-black font-bold font-heading uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            {isLoading ? 'OPTIMIZING...' : 'INITIALIZE OPTIMIZATION'}
          </button>
          {error && <div className="text-red-500 font-mono text-sm mt-2">Error: {error.message}</div>}
        </div>

        {/* Output Pane */}
        <div className="flex flex-col gap-4">
          <label className="text-[var(--neon)] font-mono text-sm uppercase">2. Optimized Output</label>
          <TerminalStream content={completion || 'Awaiting input...'} isStreaming={isLoading} />
        </div>
      </div>
    </div>
  );
}
