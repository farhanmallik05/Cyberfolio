'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isLoading = status === 'streaming' || status === 'submitted';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen py-24 px-4 md:px-12 max-w-4xl mx-auto flex flex-col h-screen">
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-3xl md:text-5xl font-black font-heading text-white uppercase tracking-wider">
          AI <span className="text-[var(--neon)]">FARHAN</span>
        </h1>
        <p className="text-[var(--text-muted)] font-mono text-sm mt-2">
          &gt; CONNECTED TO RAG PIPELINE v1.0
        </p>
      </header>

      <div className="flex-1 overflow-hidden bg-[var(--bg2)] border border-[var(--border)] rounded-sm flex flex-col relative shadow-[0_0_20px_rgba(0,245,255,0.05)]">
        {/* Glow Top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-30" />

        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-[var(--neon)] scrollbar-track-transparent">
          {messages.length === 0 && (
            <div className="text-center text-[var(--text-muted)] mt-10 font-mono text-sm">
              <p>Welcome to the AI terminal.</p>
              <p>Ask me about Farhan's projects, services, or availability.</p>
            </div>
          )}
          
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] md:max-w-[75%] p-4 rounded-sm border ${
                  m.role === 'user' 
                    ? 'bg-[var(--bg)] border-[var(--border)] text-white ml-8' 
                    : 'bg-black border-[var(--neon)] text-[var(--neon)] mr-8 shadow-[0_0_10px_rgba(0,245,255,0.1)]'
                }`}
              >
                <div className="text-xs opacity-50 mb-1 font-mono uppercase tracking-wider">
                  {m.role === 'user' ? 'USER' : 'AI_FARHAN'}
                </div>
                <div className="font-mono whitespace-pre-wrap leading-relaxed text-sm">
                  {m.parts.map((part, i) => {
                    if (part.type === 'text') return <span key={i}>{part.text}</span>;
                    if (part.type === 'reasoning') return <span key={i} className="opacity-50 italic">{part.text}</span>;
                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-black border border-[var(--neon)] p-4 rounded-sm">
                <span className="inline-block w-2 h-4 bg-[var(--neon)] animate-pulse" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)] bg-black flex gap-4 flex-shrink-0">
          <input
            className="flex-1 bg-[var(--bg2)] text-white border border-[var(--border)] rounded-sm px-4 py-3 focus:outline-none focus:border-[var(--neon)] font-mono text-sm transition-colors"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-[var(--neon)] text-black font-bold font-heading uppercase tracking-widest disabled:opacity-50 hover:bg-white transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
