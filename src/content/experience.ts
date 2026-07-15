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
      "Led migration and production cutover for a Defender service processing approximately 3.5 billion protection samples daily; the cutover had zero service errors, and the migration reduced p50 latency by 26% and p90 latency by 7%",
      "Modernizing Defender services for Microsoft Cobalt/ARM and migrating them to Kubernetes",
      "Cut build times by 50%+ and lowered portfolio costs",
    ],
  },
  {
    company: "Amazon Web Services",
    location: "Seattle, WA",
    role: "Software Development Engineer",
    period: "Jun 2022 – May 2023",
    current: false,
    highlights: [
      "Built diagnostic tooling for Amazon Aurora MySQL clusters",
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
      "Built a Java user-management platform with Struts and Hibernate, supporting onboarding for 1,000+ customers and improving developer workflows",
    ],
  },
];

export const education = {
  school: "New Jersey Institute of Technology",
  degree: "B.S. in Computer Science",
  year: "May 2022",
  location: "Newark, NJ",
} as const;
