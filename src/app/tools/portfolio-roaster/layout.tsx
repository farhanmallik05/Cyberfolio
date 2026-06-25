
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Roaster | Neural Architect | Farhan Mallik',
  description: 'Explore the Portfolio Roaster page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  openGraph: {
    title: 'Portfolio Roaster | Neural Architect',
    description: 'Explore the Portfolio Roaster page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
