export interface Language {
  language: string;
  bytes: number;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  created_at: string;
  owner: {
    login: string;
  };
  languages: Language[];
  stargazers_count: number;
  fork: boolean;
  homepage: string | null;
  topics: string[];
}