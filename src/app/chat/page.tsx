'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import ReactMarkdown from 'react-markdown';
import { RichChatCard } from '@/components/chat/RichChatCard';

const SUGGESTED_PROMPTS = [
  "What are your skills?",
  "How much do your services cost?",
  "Are you available for a project?"
];

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
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

  const handleChipClick = (prompt: string) => {
    if (isLoading) return;
    sendMessage({ text: prompt });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("farhanmallik05@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, error]);

  return (
    <div className="min-h-[100dvh] pt-24 pb-4 px-4 md:px-12 max-w-4xl mx-auto flex flex-col h-[100dvh]">
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
            <div className="text-center mt-10 font-mono text-sm flex flex-col items-center">
              <p className="text-[var(--text-muted)] mb-8">Welcome to the AI terminal. How can I assist you?</p>
              
              <div className="flex flex-wrap justify-center gap-3 max-w-lg">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleChipClick(prompt)}
                    className="border border-[var(--border)] bg-black/50 text-[var(--neon)] px-4 py-2 text-xs uppercase tracking-widest hover:border-[var(--neon)] hover:bg-[var(--neon)]/10 transition-colors rounded-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`w-fit max-w-[90%] md:max-w-[80%] p-4 rounded-sm border ${
                  m.role === 'user' 
                    ? 'bg-[var(--bg)] border-[var(--border)] text-white md:ml-8' 
                    : 'bg-black border-[var(--neon)] text-white md:mr-8 shadow-[0_0_10px_rgba(0,245,255,0.1)]'
                }`}
              >
                <div className={`text-xs opacity-50 mb-2 font-mono uppercase tracking-wider ${m.role === 'assistant' ? 'text-[var(--neon)]' : ''}`}>
                  {m.role === 'user' ? 'USER' : 'AI_FARHAN'}
                </div>
                <div className="font-mono text-sm leading-relaxed prose prose-invert max-w-none prose-p:my-1 prose-a:text-[var(--neon)] prose-strong:text-white">
                  {m.parts.map((part, i) => {
                    if (part.type === 'text') {
                      return (
                        <ReactMarkdown
                          key={i}
                          components={{
                            a: ({ node, href, children, ...props }) => {
                              if (!href) return <a {...props}>{children}</a>;
                              const isProject = href.includes('/projects/');
                              const isService = href.includes('/services/');
                              
                              if (isProject || isService) {
                                const slug = href.split('/').pop() || '';
                                const type = isProject ? 'project' : 'service';
                                return <RichChatCard type={type} slug={slug} title={children?.toString()} />;
                              }
                              
                              return <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors" {...props}>{children}</a>;
                            }
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      );
                    }
                    if (part.type === 'reasoning') return <span key={i} className="opacity-50 italic block mt-2 border-l-2 border-gray-600 pl-2">{part.text}</span>;
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

          {error && (
            <div className="flex justify-center mt-4">
              <div className="bg-red-950/50 border border-red-500/50 p-4 rounded-sm max-w-md w-full text-center">
                <p className="text-red-400 font-mono text-sm mb-4">
                  Connection Error: Rate limit exceeded or API unavailable.
                </p>
                <p className="text-[var(--text-muted)] text-xs mb-4">
                  Please contact Farhan directly instead.
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="bg-black border border-white text-white px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  {copied ? 'COPIED!' : 'COPY EMAIL'}
                </button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)] bg-black flex gap-2 md:gap-4 flex-shrink-0">
          <input
            className="flex-1 bg-[var(--bg2)] text-white border border-[var(--border)] rounded-sm px-4 py-3 focus:outline-none focus:border-[var(--neon)] font-mono text-sm transition-colors min-w-0"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="px-4 md:px-8 py-3 bg-[var(--neon)] text-black font-bold font-heading uppercase tracking-widest disabled:opacity-50 hover:bg-white transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
