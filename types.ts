interface Language {
  language: string;
  bytes: number;
}

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  owner: {
    login: string;
  };
  languages: {
    language: string;
    bytes: number;
  }[];
  stargazers_count: number;
  fork: boolean;
  topics: string[];
  homepage: string | null;
}

export type { Project };
