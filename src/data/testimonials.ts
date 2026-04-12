export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  quote: string;
  category: 'hackathon' | 'professional' | 'peer';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Hackathon Judge',
    role: 'Senior Solutions Architect',
    company: 'CloudTech Global',
    quote: "Farhan's architectural approach to the neural interface was the highlight of the event. The seamless integration of real-time data with cinematic UX sets a new bar for portfolio engineering.",
    category: 'hackathon'
  },
  {
    id: '2',
    name: 'Tech Lead',
    role: 'DevOps & Infrastructure',
    company: 'Nexus Systems',
    quote: "A rare developer who understands both high-fidelity design and hardened backend security. The way he handled complex role-based state synchronization across the portfolio is impeccable.",
    category: 'professional'
  },
  {
    id: '3',
    name: 'Project Partner',
    role: 'Full Stack Developer',
    quote: "Working with Farhan is like watching a digital architect at work. He doesn't just write code; he builds experiences that feel alive. His dedication to 'Design Locks' is inspiring.",
    category: 'peer'
  },
  {
    id: '4',
    name: 'Open Source Peer',
    role: 'Automation Engineer',
    quote: "The automation scripts and CLI integration in his project are world-class. It's rare to see a developer focus so much on the 'Developer Experience' within their own personal site.",
    category: 'peer'
  }
];
