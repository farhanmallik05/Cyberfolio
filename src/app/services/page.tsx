import { Metadata } from 'next';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceCards } from '@/components/services/ServiceCards';
import { PricingCalculator } from '@/components/services/PricingCalculator';
import { HowItWorks } from '@/components/services/HowItWorks';
import { FAQAccordion } from '@/components/services/FAQAccordion';
import CalBookingEmbed from '@/components/services/CalBookingEmbed';
import { TestimonialMarquee } from '@/components/TestimonialMarquee';
import { getServiceConfig } from '@/app/admin/actions';

export const metadata: Metadata = {
  title: 'Services & Pricing | Neural Architect',
  description: 'High-performance engineering tailored for visionary founders. Discover our web development, automation, and AI integration services.',
  openGraph: {
    title: 'Services & Pricing | Neural Architect',
    description: 'Explore custom deployment sequences: Web Apps, Automation, and AI Integrations.',
    url: 'https://farhan.dev/services',
    siteName: 'Neural Architect',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Services - Neural Architect',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function ServicesPage() {
  const serviceConfig = await getServiceConfig();

  return (
    <div className="min-h-screen bg-mech-bg relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mech-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-mech-blue/5 rounded-full blur-[100px]" />
      </div>

      <ServiceHero />
      <ServiceCards serviceConfig={serviceConfig} />
      <PricingCalculator serviceConfig={serviceConfig} />
      <HowItWorks />
      <FAQAccordion />
      <CalBookingEmbed />
      
      <div className="py-16 relative z-10 bg-black/30 border-t border-mech-cyan/10">
        <TestimonialMarquee />
      </div>
    </div>
  );
}
