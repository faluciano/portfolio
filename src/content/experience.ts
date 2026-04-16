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
      "Security infrastructure for Microsoft Defender for Endpoint",
      "Reduced build times by over 50% across the MDE portfolio",
      "Platform migrations to ARM and Kubernetes",
    ],
  },
  {
    company: "Amazon Web Services",
    location: "Seattle, WA",
    role: "Software Development Engineer",
    period: "Jun 2022 – May 2023",
    current: false,
    highlights: [
      "Built operational tooling for Amazon Aurora",
      "Reduced incident resolution time by 80%",
    ],
  },
  {
    company: "ADP",
    location: "Roseland, NJ",
    role: "Software Engineer Intern",
    period: "Jun 2021 – Aug 2021",
    current: false,
    highlights: ["Developed internal tools for payroll and HR platform"],
  },
  {
    company: "NJIT",
    location: "Newark, NJ",
    role: "Teaching Assistant",
    period: "Sep 2019 – May 2021",
    current: false,
    highlights: ["Supported students in CS coursework and labs"],
  },
];

export const education = {
  school: "New Jersey Institute of Technology",
  degree: "B.S. in Computer Science",
  year: "May 2022",
  location: "Newark, NJ",
} as const;
