export interface Service {
  id: string;
  title: string;
  icon: string;        // Lucide icon name
  description: string; // one line
  startingPrice: string;
  includes: string[];  // shown on card back
}

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: 'Code',
    description: 'High-performance cinematic web applications built with Next.js.',
    startingPrice: '₹6,999',
    includes: [
      'Responsive Design',
      'SEO Optimization',
      'Animation Integration',
      'Database Connection',
      'CMS Support'
    ]
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: 'Cpu',
    description: 'Workflow optimization using n8n and custom neural scripts.',
    startingPrice: '₹3,999',
    includes: [
      'Workflow Analysis',
      'Third-party Integration',
      'Custom Scripting',
      'Error Monitoring',
      'Scalable Logic'
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    icon: 'Figma',
    description: 'Cyber-mechanical visual systems designed for high-conversion.',
    startingPrice: '₹2,999',
    includes: [
      'Visual Research',
      'Wireframing',
      'Prototyping',
      'Theme Engineering',
      'Asset Design'
    ]
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    icon: 'Brain',
    description: 'Deploying RAG pipelines and custom LLM agents into your stack.',
    startingPrice: '₹9,999',
    includes: [
      'Prompt Optimization',
      'Vector Database Setup',
      'RAG Implementation',
      'Agent Development',
      'API Integration'
    ]
  }
];
