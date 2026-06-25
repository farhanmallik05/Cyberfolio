
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Successful | Neural Architect | Farhan Mallik',
  description: 'Thank you for your purchase from the Neural Architect Store.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
