export interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "github",
    url: "https://github.com/faluciano",
    ariaLabel: "Visit Felix's GitHub profile",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/faluciano/",
    ariaLabel: "Visit Felix's LinkedIn profile",
  },
  {
    name: "x",
    url: "https://twitter.com/picapollo821",
    ariaLabel: "Visit Felix's X (Twitter) profile",
  },
];
