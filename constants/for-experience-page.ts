export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  achievements: string[];
};

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    company: "EnvZone",
    role: "Frontend Developer",
    duration: "09/2024 — Present",
    achievements: [
      "Developed scalable frontend features using React, Next.js, and TypeScript for AI-powered government contracting platforms.",
      "Built responsive and high-performance UI systems optimized for complex data-heavy workflows and user experience.",
      "Contributed to Proposal Engine-related features focused on proposal generation, contract intelligence, and productivity tools.",
      "Integrated AWS services including S3, Cognito, Bedrock, and Knowledge Bases into AI-driven application workflows.",
      "Worked with prompts, foundation models, LangGraph flows, and vector database integrations for AI-powered features.",
      "Collaborated closely with designers and backend engineers to deliver modern, user-centric interfaces and smooth interactions.",
    ],
  },
  {
    company: "TMA Solutions",
    role: "Frontend Developer",
    duration: "01/2026 — Present",
    achievements: [
      "Built and maintained frontend features using React and JavaScript.",
      "Worked with Jenkins pipelines to support deployment and automation workflows.",
      "Collaborated through Jira and Confluence for task management, documentation, and agile development processes.",
      "Implemented UI testing and automation flows using Playwright to improve application reliability.",
    ],
  },
];

