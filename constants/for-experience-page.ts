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
      "Developed scalable frontend features using React, Next.js, and TypeScript.",
      "Optimized UI performance and responsiveness to improve user experience across devices.",
      "Integrated AWS services including S3, Bedrock, Cognito, and Knowledge Bases into internal workflows.",
      "Worked with AI-powered features using prompts, foundation models, LangGraph flows, and vector database integrations.",
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

