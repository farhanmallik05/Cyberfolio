
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Neural Architect | Farhan Mallik',
  description: 'Explore the About page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  openGraph: {
    title: 'About | Neural Architect',
    description: 'Explore the About page of Neural Architect | Farhan Mallik\'s portfolio. Discover AI engineering, web development, and automation projects.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
