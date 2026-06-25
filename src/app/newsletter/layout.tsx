
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter | Neural Architect | Farhan Mallik',
  description: 'Explore the Newsletter page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  openGraph: {
    title: 'Newsletter | Neural Architect',
    description: 'Explore the Newsletter page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
