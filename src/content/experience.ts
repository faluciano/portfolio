// Mirrors the Experience section of public/resume.pdf — keep the two in sync.
export interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  current: boolean;
  highlights: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    company: "Microsoft",
    location: "Seattle, WA",
    role: "Software Engineer",
    period: "Sep 2024 – Present",
    current: true,
    highlights: [
      "Led migration of a Microsoft Defender for Endpoint service processing approximately 3.5 billion protection samples daily, deploying it in a new region and completing the production cutover with zero service errors",
      "Reduced p50 service latency by 26% and p90 latency by 7% after the migration",
      "Modernizing Defender services for Microsoft Cobalt/ARM and migrating them to Kubernetes to improve hardware portability, scalability, and deployment consistency",
      "Cut build times by 50%+ and lowered portfolio costs by optimizing build pipelines and developer tooling",
    ],
  },
  {
    company: "Amazon Web Services",
    location: "Seattle, WA",
    role: "Software Development Engineer",
    period: "Jun 2022 – May 2023",
    current: false,
    highlights: [
      "Built diagnostic tooling for Amazon Aurora MySQL clusters that accelerated root-cause analysis of production incidents and reduced customer downtime",
      "Automated operational workflows in Python, Bash, and SQL across multiple teams, reducing mean time to resolution by 80%+",
    ],
  },
  {
    company: "ADP",
    location: "Roseland, NJ",
    role: "Software Engineer Intern",
    period: "Jun 2021 – Aug 2021",
    current: false,
    highlights: [
      "Built a Java user-management platform with Struts and Hibernate for the Data Exchange team, supporting onboarding for 1,000+ customers and improving developer workflows",
    ],
  },
];

export const education = {
  school: "New Jersey Institute of Technology",
  degree: "B.S. in Computer Science",
  year: "May 2022",
  location: "Newark, NJ",
} as const;
