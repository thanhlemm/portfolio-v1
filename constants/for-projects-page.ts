export type Project = {
  title: string;
  description: string;
  stack: string[];
  thumbnailSrc: string;
  liveUrl: string;
  githubUrl: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Hotel Management System",
    description:
      "A full-stack hotel management platform with online booking, VNPay payments, real-time messaging, room management, and role-based workflows for customers, receptionists, and administrators.",
    stack: ["React", "Django", "MySQL", "WebSockets"],
    thumbnailSrc: "/assets/projects_hotel_management.png",
    liveUrl: "https://oceanhotel.vercel.app",
    githubUrl: "https://github.com/thanhlemm/DoAn_QLKS",
  },
  {
    title: "AI Study Tracker Backend",
    description:
      "A NestJS backend concept for an AI-powered study management platform that analyzes learning performance, tracks study sessions, and generates personalized schedules using AI-driven insights.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "TypeORM", "JWT", "OpenAI"],
    thumbnailSrc: "/file.svg",
    liveUrl: "",
    githubUrl: "https://github.com/thanhlemm/AI-study-tracker-BE",
  },
];

