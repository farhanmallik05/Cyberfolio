import React from 'react';
import Link from 'next/link';
import { BookOpen, Code, Database, BrainCircuit, Play } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

const COURSES = [
  {
    slug: 'nextjs-mastery',
    title: 'Next.js 16 Mastery',
    icon: Code,
    description: 'Build enterprise-grade applications with App Router, Server Actions, and advanced caching strategies.',
    price: '₹2,499',
    level: 'Advanced',
    modules: 12
  },
  {
    slug: 'ai-agents-n8n',
    title: 'AI Agents & Automation',
    icon: BrainCircuit,
    description: 'Create autonomous AI agents and complex workflow automations using n8n and LangChain.',
    price: '₹3,499',
    level: 'Pro',
    modules: 8
  },
  {
    slug: 'database-architect',
    title: 'Database Architecture',
    icon: Database,
    description: 'Master Postgres, Supabase, and Qdrant vector databases for modern web applications.',
    price: '₹1,999',
    level: 'Intermediate',
    modules: 10
  }
];

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let enrolledSlugs: string[] = [];
  if (user?.email) {
    const { data } = await supabase
      .from('enrollments')
      .select('course_slug')
      .eq('email', user.email);
    if (data) {
      enrolledSlugs = data.map(d => d.course_slug);
    }
  }

  const enrolledCourses = COURSES.filter(c => enrolledSlugs.includes(c.slug));
  const availableCourses = COURSES.filter(c => !enrolledSlugs.includes(c.slug));

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-wider">
          TRAINING <span className="text-[var(--neon)]">MODULES</span>
        </h1>
        <p className="text-[var(--text-muted)] font-mono text-sm mt-2">
          Advance your capabilities with structured engineering courses.
        </p>
      </header>

      {user && enrolledCourses.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-heading font-bold uppercase flex items-center gap-2 border-b border-[var(--border)] pb-4">
            <Play className="text-[var(--neon)]" /> ENROLLED SYSTEMS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <GlassPanel key={course.slug} className="p-6 flex flex-col gap-4 border-[var(--neon)] bg-[var(--neon)]/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[var(--neon)]/20 rounded-sm">
                    <course.icon className="w-6 h-6 text-[var(--neon)]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">{course.title}</h3>
                    <p className="font-mono text-xs text-[var(--neon)] uppercase">Active</p>
                  </div>
                </div>
                <div className="w-full bg-black h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-[var(--neon)] h-full w-[35%]" />
                </div>
                <Link 
                  href={`/courses/${course.slug}`}
                  className="mt-4 w-full text-center py-3 bg-[var(--neon)] text-black font-bold font-heading uppercase hover:bg-white transition-colors"
                >
                  RESUME PROTOCOL
                </Link>
              </GlassPanel>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-heading font-bold uppercase flex items-center gap-2 border-b border-[var(--border)] pb-4">
          <BookOpen className="text-[var(--text-muted)]" /> AVAILABLE SYSTEMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <GlassPanel key={course.slug} className="p-6 flex flex-col justify-between group hover:border-[var(--glass)] transition-all">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-[var(--bg2)] rounded-sm group-hover:bg-[var(--neon)]/10 transition-colors">
                    <course.icon className="w-6 h-6 text-[var(--text-muted)] group-hover:text-[var(--neon)] transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] uppercase border border-[var(--border)] px-2 py-1">{course.level}</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl group-hover:text-[var(--neon)] transition-colors">{course.title}</h3>
                  <p className="font-mono text-sm text-[var(--text-muted)] mt-2 leading-relaxed">{course.description}</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="font-mono text-lg font-bold">{course.price}</span>
                <Link 
                  href={`/courses/${course.slug}`}
                  className="font-heading uppercase text-sm text-[var(--neon)] hover:text-white transition-colors flex items-center gap-1"
                >
                  View Details &rarr;
                </Link>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>
    </div>
  );
}
