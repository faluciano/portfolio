export interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  current: boolean;
}

export const experiences: ExperienceEntry[] = [
  {
    company: "Microsoft",
    location: "Seattle, WA",
    role: "Software Engineer",
    period: "Sep 2024 – Present",
    current: true,
  },
  {
    company: "Amazon Web Services",
    location: "Seattle, WA",
    role: "Software Development Engineer",
    period: "Jun 2022 – May 2023",
    current: false,
  },
  {
    company: "ADP",
    location: "Roseland, NJ",
    role: "Software Engineer Intern",
    period: "Jun 2021 – Aug 2021",
    current: false,
  },
  {
    company: "NJIT",
    location: "Newark, NJ",
    role: "Teaching Assistant",
    period: "Sep 2019 – May 2021",
    current: false,
  },
];

export const education = {
  school: "New Jersey Institute of Technology",
  degree: "B.S. in Computer Science",
  year: "May 2022",
  location: "Newark, NJ",
} as const;
