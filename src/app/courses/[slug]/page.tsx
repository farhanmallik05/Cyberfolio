import React from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ArrowLeft, Lock, FileCode, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${title} Course | Neural Architect | Farhan Mallik`,
    description: `Explore the ${title} course module. Advance your engineering capabilities with structured learning protocols.`,
    openGraph: {
      title: `${title} Course | Neural Architect`,
      description: `Explore the ${title} course module on Neural Architect.`,
    },
  };
}


export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isEnrolled = false;
  if (user?.email) {
    const { data } = await supabase
      .from('enrollments')
      .select('id')
      .eq('email', user.email)
      .eq('course_slug', slug)
      .single();
    if (data) isEnrolled = true;
  }

  // Mock Modules for UI
  const modules = [
    { title: 'System Architecture Overview', locked: !isEnrolled },
    { title: 'Environment Initialization', locked: !isEnrolled },
    { title: 'Database Integration (Supabase)', locked: !isEnrolled },
    { title: 'Deployment & CI/CD Pipelines', locked: !isEnrolled }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto flex flex-col gap-8">
      <Link href="/courses" className="text-[var(--neon)] font-mono text-sm hover:text-white transition-colors flex items-center gap-2">
        <ArrowLeft size={16} /> BACK_TO_CATALOG
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 flex flex-col gap-6">
          <header>
            <h1 className="text-3xl md:text-5xl font-black font-heading text-white uppercase tracking-wider mb-4">
              {slug.replace('-', ' ')}
            </h1>
            <p className="text-[var(--text-muted)] font-mono leading-relaxed">
              Master the exact patterns and architectures used to build production-grade applications.
              This course covers everything from zero to deployment.
            </p>
          </header>

          <div className="flex flex-col gap-4 mt-8">
            <h3 className="font-heading font-bold uppercase text-lg border-b border-[var(--border)] pb-2">Curriculum</h3>
            {modules.map((mod, i) => (
              <div key={i} className={`p-4 flex items-center justify-between border rounded-sm font-mono text-sm ${mod.locked ? 'bg-black/50 border-[var(--border)] text-[var(--dim)]' : 'bg-[var(--bg2)] border-[var(--glass)] hover:border-[var(--neon)] cursor-pointer transition-all'}`}>
                <div className="flex items-center gap-3">
                  {mod.locked ? <Lock size={16} /> : <FileCode size={16} className="text-[var(--neon)]" />}
                  <span>Module 0{i + 1}: {mod.title}</span>
                </div>
                {!mod.locked && <CheckCircle size={16} className="text-[var(--text-muted)] opacity-50" />}
              </div>
            ))}
          </div>
        </div>

        <aside className="w-full md:w-80 flex-shrink-0">
          <GlassPanel className="p-6 sticky top-32 flex flex-col gap-6">
            {isEnrolled ? (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500 w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl uppercase">Enrolled</h3>
                  <p className="font-mono text-xs text-[var(--dim)] mt-2">Access Granted.</p>
                </div>
                <button className="w-full py-4 bg-[var(--neon)] text-black font-bold font-heading uppercase tracking-widest hover:bg-white transition-colors">
                  BEGIN_MODULE_01
                </button>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-heading font-bold text-2xl uppercase border-b border-[var(--border)] pb-4 mb-4">Access Protocol</h3>
                  <div className="font-mono text-3xl font-bold mb-2">₹1,999</div>
                  <p className="font-mono text-xs text-[var(--dim)] mb-6">One-time payment. Lifetime access.</p>
                </div>
                <button className="w-full py-4 bg-[var(--neon)] text-black font-bold font-heading uppercase tracking-widest hover:bg-white transition-colors relative overflow-hidden group">
                  <span className="relative z-10">PURCHASE_ACCESS</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform" />
                </button>
                <div className="text-center font-mono text-[10px] text-[var(--dim)] uppercase">
                  Powered by Dodo Payments
                </div>
              </>
            )}
          </GlassPanel>
        </aside>
      </div>
    </div>
  );
}
