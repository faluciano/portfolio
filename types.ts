type Language = {
  language: string;
  bytes: number;
};

type Project = {
  name: string;
  description: string;
  html_url: string;
  pushed_at: string;
  languages: Language[];
  owner: {
    login: string;
  };
};
