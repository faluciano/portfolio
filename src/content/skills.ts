export interface SkillGroup {
  label: string;
  skills: string[];
}

// Mirrors the Skills section of public/resume.pdf — keep the two in sync.
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      "Java",
      "Python",
      "C++",
      "SQL",
      "Go",
      "C#",
      "TypeScript",
      "Bash",
      "Rust",
    ],
  },
  {
    label: "Backend & Infrastructure",
    skills: [
      "Distributed Systems",
      "Kubernetes",
      "Docker",
      "REST APIs",
      "WebSockets",
      "CI/CD",
      "GitHub Actions",
      "Azure DevOps",
    ],
  },
  {
    label: "Cloud & Databases",
    skills: [
      "AWS",
      "Azure",
      "Amazon Aurora MySQL",
      "MySQL",
      "PostgreSQL",
      "Turso",
    ],
  },
];
