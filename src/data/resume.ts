import { Role } from "@/context/RoleContext";

export interface ResumeIdentity {
  name: string;
  title: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  relevant_courses: string[];
}

export interface ResumeExperience {
  role: string;
  organization: string;
  location: string;
  period: string;
  details: string[];
  tags: string[];
}

export interface ResumeProject {
  name: string;
  tagline: string;
  tech: string[];
  link?: string;
  github?: string;
  outcomes: string[];
  tags: string[];
}

export interface ResumeSkillGroup {
  category: string;
  skills: { name: string; proficiency: number; tags: string[] }[];
}

export interface ResumeData {
  identity: ResumeIdentity;
  objectives: Record<Role, string>;
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  achievements: { title: string; issuer: string; year: string; tags: string[] }[];
}

export const resumeData: ResumeData = {
  identity: {
    name: "Farhan Mallik",
    title: "AI Engineer & Fullstack Builder",
    photo: "/images/farhan.jpg",
    email: "mallikfarhan10@gmail.com",
    phone: "+91 [REDACTED]",
    location: "Greater Noida, UP",
    linkedin: "https://linkedin.com/in/farhanmallik",
    github: "https://github.com/farhanmallik05",
    portfolio: "https://farhanmallik.dev"
  },

  objectives: {
    all: "Software Engineer and Neural Architect focused on building the bridge between logic and human interaction through AI, automation, and immersive UI.",
    "core-lang": "Software Engineer specializing in Python and C++ for high-performance systems and efficient algorithm design.",
    frontend: "Frontend Architect specializing in high-fidelity, cinematic web experiences using React, Next.js, and advanced animation libraries.",
    "ai-llm": "AI Engineer focused on architecting agentic workflows and LLM-integrated systems for autonomous problem solving.",
    "ml-data": "Machine Learning Engineer specialized in statistical modeling and neural architecture for data-driven insights.",
    automation: "Automation Engineer focused on self-healing enterprise infrastructure and autonomous workflow routing.",
    "backend-api": "Backend Developer focused on scalable API service meshes and robust data-layer orchestration using Node.js and PostgreSQL.",
    "design-ux": "UI/UX Designer specializing in cyber-mechanical aesthetics and immersive human-computer interfaces.",
    devops: "DevOps Engineer focused on infrastructure scaling, CI/CD hardening, and cloud-native architecture.",
    content: "Technical Content Creator and Strategist bridging the gap between complex engineering concepts and audience engagement.",
    leadership: "Technical Lead and Mentor driving community-driven development and research-oriented open-source initiatives.",
    "security-ops": "Security Operations Engineer focused on codebase hardening, persistent audit cycles, and data privacy.",
    "cs-core": "Computer Science Researcher focused on theoretical computation foundations and algorithmic efficiency."
  },

  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "KCC Institute of Technology and Management",
      location: "Greater Noida, UP",
      duration: "2024 – 2028",
      relevant_courses: ["DSA", "DBMS", "OS", "Web Technologies", "AI & ML"]
    }
  ],

  skills: [
    {
      category: "Languages",
      skills: [
        { name: "Python", proficiency: 85, tags: ["python-dev", "automation", "ai-llm", "ml-data", "core-lang"] },
        { name: "TypeScript", proficiency: 80, tags: ["frontend-dev", "backend-api", "core-lang"] },
        { name: "C++", proficiency: 75, tags: ["core-lang", "cs-core"] },
        { name: "Java", proficiency: 70, tags: ["core-lang", "cs-core"] }
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "Next.js", proficiency: 90, tags: ["frontend-dev"] },
        { name: "React", proficiency: 90, tags: ["frontend-dev"] },
        { name: "Tailwind CSS", proficiency: 95, tags: ["frontend-dev", "ui-ux-designer"] },
        { name: "GSAP / Framer", proficiency: 85, tags: ["frontend-dev", "ui-ux-designer"] }
      ]
    },
    {
      category: "AI & Data",
      skills: [
        { name: "LLM Orchestration", proficiency: 90, tags: ["ai-llm"] },
        { name: "n8n Automation", proficiency: 95, tags: ["automation-eng", "ai-llm"] },
        { name: "Supabase / PG", proficiency: 80, tags: ["backend-api", "ai-llm"] },
        { name: "Scikit-Learn", proficiency: 75, tags: ["ml-data"] }
      ]
    }
  ],

  experience: [
    {
      role: "Campus Lead",
      organization: "Open Source Community Group (OSCG)",
      location: "Greater Noida, UP",
      period: "Feb 2026 - Present",
      details: [
        "Driving research-oriented open-source community on campus.",
        "Organizing technical workshops on AI and Web Technologies.",
        "Enabling peer contributions to global OSS projects."
      ],
      tags: ["leadership", "devops", "content"]
    },
    {
      role: "Open Source Developer",
      organization: "Open Source Connect (NexFellow)",
      location: "Remote",
      period: "Jan 2026 - Mar 2026",
      details: [
        "Contributed to global open-source projects.",
        "Improved community-driven software through international collaboration.",
        "Mentored new contributors on Git workflows and PR standards."
      ],
      tags: ["devops", "backend-api", "core-lang"]
    },
    {
      role: "Mentee",
      organization: "Apertre",
      location: "Remote",
      period: "Jan 2026 - Mar 2026",
      details: [
        "Engaged in iterative review cycles for complex Python/TypeScript codebases.",
        "Implemented performance optimizations in data ingestion modules.",
        "Collaborated in a professional ecosystem for high-velocity builds."
      ],
      tags: ["core-lang", "backend-api", "devops"]
    }
  ],

  projects: [
    {
      name: "Neural Ledger Portfolio",
      tagline: "High-fidelity cinematic terminal portfolio",
      tech: ["Next.js", "GSAP", "Three.js", "Tailwind"],
      github: "https://github.com/farhanmallik05/portfolio",
      outcomes: [
        "100/100 Lighthouse Performance metrics.",
        "Custom GSAP 'Flip' architecture for zero layout shifts.",
        "Integrated real-time WebGL primitives with React state."
      ],
      tags: ["frontend", "design-ux"]
    },
    {
      name: "Claude Security Agent",
      tagline: "Autonomous pull request security auditing",
      tech: ["Python", "Claude API", "GitHub Actions"],
      github: "https://github.com/farhanmallik05/claude-sec",
      outcomes: [
        "Identified zero-day dependency leaks continuously.",
        "Generated automated security patches without human prompting.",
        "Reduced security review time by 80%."
      ],
      tags: ["ai-llm", "security-ops", "automation"]
    },
    {
      name: "Cognitive Workflow Pipeline",
      tagline: "Self-healing enterprise webhook infrastructure",
      tech: ["n8n", "Python", "Docker", "PostgreSQL"],
      github: "https://github.com/farhanmallik05/n8n-cognitive",
      outcomes: [
        "Automated 80% of Level 1 payload triages.",
        "Reduced error identification time to <2 seconds.",
        "Scalable Docker-based instance topology."
      ],
      tags: ["automation", "backend-api", "devops"]
    }
  ],

  achievements: [
    {
      title: "14+ Hackathon ",
      issuer: "Various (MLH, Devfolio)",
      year: "2023 - Present",
      tags: ["leadership", "core-lang", "frontend"]
    },
    {
      title: "Top Contributor",
      issuer: "Hacktoberfest / Open Source",
      year: "2024",
      tags: ["devops", "core-lang"]
    }
  ]
};
