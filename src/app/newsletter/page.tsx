'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ChevronRight } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter_page' }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Transmission successful. Welcome to the network.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Connection failed.');
      }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Try again.');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex items-center justify-center relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--neon-glow)_0%,_transparent_70%)] opacity-10 pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <GlassPanel className="p-8 md:p-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[var(--neon)]/10 rounded-full flex items-center justify-center mb-8 border border-[var(--neon)]/30 shadow-[0_0_30px_var(--neon-glow)]">
            <Mail className="w-8 h-8 text-[var(--neon)]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-widest mb-4 leading-tight">
            JOIN THE <span className="text-[var(--neon)] mech-text-glow">INNER CIRCLE</span>
          </h1>
          
          <p className="text-[var(--text-muted)] font-mono text-sm mb-12 max-w-md leading-relaxed">
            Get exclusive transmissions about new open-source projects, architectural deep-dives, and early access to premium tools. No spam, just signal.
          </p>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col gap-4">
            <div className="relative group">
              <input 
                type="email"
                required
                placeholder="ENTER_EMAIL_ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-black/50 border border-[var(--border)] text-white font-mono text-sm px-6 py-4 outline-none focus:border-[var(--neon)] transition-all group-hover:border-[var(--glass)]"
              />
              <div className="absolute top-0 right-0 h-full w-1 bg-[var(--neon)] opacity-0 group-focus-within:opacity-100 transition-opacity" />
            </div>

            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-4 bg-[var(--neon)] text-black font-bold font-heading uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {status === 'loading' ? 'TRANSMITTING...' : status === 'success' ? 'CONNECTED' : 'ESTABLISH CONNECTION'}
              {status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>

            {message && (
              <div className={`mt-4 font-mono text-xs uppercase p-3 border ${status === 'success' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
                [{status === 'success' ? 'SUCCESS' : 'ERROR'}]: {message}
              </div>
            )}
          </form>

          <div className="mt-12 pt-8 border-t border-[var(--border)] w-full flex justify-between items-center text-[var(--dim)] font-mono text-[10px] uppercase">
            <span>Encrypted Transmission</span>
            <span>Opt-out Anytime</span>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
