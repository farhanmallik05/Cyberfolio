import React from 'react';
import Link from 'next/link';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Tools | Neural Architect | Farhan Mallik',
  description: 'Explore the Tools page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  openGraph: {
    title: 'Tools | Neural Architect',
    description: 'Explore the Tools page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  },
};

export default function ToolsIndexPage() {
  const tools = [
    {
      title: 'Prompt Optimizer',
      description: 'Refine your raw thoughts into precise, high-context AI prompts.',
      href: '/tools/prompt-optimizer',
      icon: '⚡'
    },
    {
      title: 'Portfolio Roaster',
      description: 'Get an aggressively honest, constructive roast of your portfolio design.',
      href: '/tools/portfolio-roaster',
      icon: '🔥'
    },
    {
      title: 'README Generator',
      description: 'Generate a professional GitHub README from your source code context.',
      href: '/tools/readme-generator',
      icon: '📝',
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-black font-heading text-[var(--neon)] uppercase tracking-wider drop-shadow-[0_0_10px_var(--neon)]">
          // MICRO-TOOLS
        </h1>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl">
          A collection of free, experimental AI utilities built with the Gemini API. 
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link 
            key={tool.title} 
            href={tool.disabled ? '#' : tool.href}
            className={`block relative group p-6 rounded-xl border transition-all duration-300 ${
              tool.disabled 
                ? 'border-[var(--border)] opacity-50 cursor-not-allowed' 
                : 'border-[var(--neon)] bg-[var(--glass)] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:-translate-y-1'
            }`}
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h2 className="text-xl font-bold font-heading text-white mb-2">{tool.title}</h2>
            <p className="text-[var(--text-muted)] text-sm">{tool.description}</p>
            {tool.disabled && <span className="absolute top-4 right-4 text-xs bg-[var(--border)] px-2 py-1 rounded-sm">COMING SOON</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
