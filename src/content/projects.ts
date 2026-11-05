/**
 * GitHub repo names to pin at the top of the projects list, in display
 * order. Couch Kit and Faros match the Projects section of the resume.
 */
export const FEATURED_PROJECTS = [
  "react-native-couch-kit",
  "faros",
  "gungeon-companion",
];

/**
 * Public repos that aren't portfolio projects: the GitHub profile config,
 * course labs and demos, and an unmodified dashboard template.
 */
export const HIDDEN_PROJECTS = [
  "faluciano",
  "lect6",
  "Lab2Debug",
  "lab2-OpenLibraryAPI",
  "onenine-browser",
];

export interface ResumeProject {
  name: string;
  url: string;
  description: string;
  tech: string[];
}

// Mirrors the Projects section of public/resume.pdf — keep the two in sync.
export const resumeProjects: ResumeProject[] = [
  {
    name: "Couch Kit",
    url: "https://github.com/faluciano/react-native-couch-kit",
    description:
      "Open-source TypeScript framework for local multiplayer games; coordinates TV and mobile clients over WiFi and WebSockets and ships as a suite of npm packages.",
    tech: ["TypeScript", "React Native", "WebSockets", "npm"],
  },
  {
    name: "Faros",
    url: "https://github.com/faluciano/faros",
    description:
      "Full-stack geospatial app with a Go REST API, Turso database, and React client, deployed on Azure.",
    tech: ["Go", "SQL", "REST API", "Azure", "Turso"],
  },
];
