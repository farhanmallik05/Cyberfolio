export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'process' | 'pricing' | 'technical' | 'support';
}

export const SERVICES_FAQ: FAQItem[] = [
  {
    id: "faq-cost",
    question: "What's the typical service cost for a custom build?",
    answer: "Pricing is calculated based on scope complexity and deployment timeline. You can use the terminal calculator above to generate a baseline estimate. All builds require a 50% deposit before initializing the dev environment.",
    category: "pricing"
  },
  {
    id: "faq-timeline",
    question: "What's the deployment timeline for a neural build?",
    answer: "Standard deployments take 2-4 weeks from scoping to production. If you require an accelerated build, selecting the 'Rush' timeline parameter bumps your project to high-priority, reducing turnaround by up to 50% for a premium.",
    category: "process"
  },
  {
    id: "faq-tech-stack",
    question: "What technology stack do you use for your architectures?",
    answer: "I specialize in React/Next.js ecosystems for the front end, backed by Supabase for database and auth infrastructure. I utilize Framer Motion and GSAP for cinematic animations, and native CSS custom properties for theme rendering.",
    category: "technical"
  },
  {
    id: "faq-design",
    question: "Do you handle the UX/UI design as well?",
    answer: "Yes. I provide end-to-end service, starting from visual research and Figma wireframes to full implementation. My signature style leans heavily into futuristic, dark mode, high-contrast aesthetics.",
    category: "process"
  },
  {
    id: "faq-maintenance",
    question: "Do you provide post-deployment support?",
    answer: "Absolutely. I offer an optional 30-day hyper-care period post-launch to monitor error rates and ensure system stability. For long-term maintenance, we can discuss a retainer agreement during the scoping phase.",
    category: "support"
  },
  {
    id: "faq-ai",
    question: "How do you integrate AI into my application?",
    answer: "AI integration ranges from simple prompt pipelines to fully autonomous RAG (Retrieval-Augmented Generation) agents connected to your data using pgvector. We determine the best approach based on your specific automation needs.",
    category: "technical"
  },
  {
    id: "faq-automation",
    question: "Can you automate my existing business workflows?",
    answer: "Yes. Using tools like n8n and custom neural scripts, I can build bridges between your existing SaaS tools, automate data entry, and streamline repetitive tasks to increase operational bandwidth.",
    category: "technical"
  },
  {
    id: "faq-communication",
    question: "How do we communicate during the build cycle?",
    answer: "All primary comms happen asynchronously via a dedicated Slack/Discord channel or email thread. You'll receive weekly status updates, and we'll sync via video call for major milestone reviews.",
    category: "process"
  },
  {
    id: "faq-revisions",
    question: "How many revision cycles are included?",
    answer: "Standard contracts include two major revision cycles: one after the design prototype phase, and one after the functional build is complete. Additional revisions are billed at an hourly rate.",
    category: "process"
  },
  {
    id: "faq-start",
    question: "How do we initialize a project?",
    answer: "Book a discovery call using the terminal below or fill out the contact form. We'll discuss your objectives, outline a scope of work, and establish a timeline. Once the deposit is secured, the build begins.",
    category: "process"
  }
];
