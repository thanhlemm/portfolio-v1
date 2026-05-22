export type SkillsGroup = {
  title: string;
  tags: { label: string; hint?: string }[];
};

export const SKILLS_GROUPS: SkillsGroup[] = [
  {
    title: "Frontend",
    tags: [
      { label: "HTML/CSS" },
      { label: "React" },
      { label: "Next.js" },
      { label: "TypeScript" },
      { label: "JavaScript" },
      { label: "Tailwind CSS" },
      { label: "Framer Motion" },
      { label: "Shadcn/UI" },
    ],
  },

  {
    title: "Backend",
    tags: [
      { label: "Node.js" },
      { label: "REST APIs" },
      { label: "PostgreSQL" },
      { label: "MySQL" },
    ],
  },

  {
    title: "AI / Cloud",
    tags: [
      { label: "LangChain" },
      { label: "LangGraph" },
      { label: "AWS Bedrock" },
      { label: "AWS S3" },
      { label: "AWS Knowledge Base" },
    ],
  },

  {
    title: "DevOps & Tools",
    tags: [
      { label: "Git" },
      { label: "GitHub" },
      { label: "Docker" },
      { label: "Jenkins" },
      { label: "Jira" },
      { label: "Sentry" },
      { label: "VS Code" },
    ],
  },
];