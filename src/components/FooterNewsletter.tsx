'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-mech-silver/10">
      <h4 className="font-orbitron text-[10px] uppercase tracking-[0.2em] text-mech-silver/40 mb-4">Signal Subscription</h4>
      <form onSubmit={handleSubscribe} className="flex items-center max-w-sm">
        <input 
          type="email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER_EMAIL" 
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 bg-black/40 border border-mech-silver/10 text-mech-white font-mono text-xs px-3 py-2 outline-none focus:border-mech-cyan transition-colors"
        />
        <button 
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-mech-cyan text-black px-4 py-2 border border-mech-cyan hover:bg-transparent hover:text-mech-cyan transition-colors disabled:opacity-50"
        >
          {status === 'success' ? <CheckCircle2 size={16} /> : <Send size={16} />}
        </button>
      </form>
      {status === 'error' && <p className="text-red-500 font-mono text-[10px] mt-2 uppercase">Connection failed.</p>}
    </div>
  );
}
