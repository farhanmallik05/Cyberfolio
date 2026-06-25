
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompt Optimizer | Neural Architect | Farhan Mallik',
  description: 'Explore the Prompt Optimizer page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  openGraph: {
    title: 'Prompt Optimizer | Neural Architect',
    description: 'Explore the Prompt Optimizer page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
