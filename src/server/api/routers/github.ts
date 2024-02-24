import { z } from "zod";
import { Octokit } from "octokit";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const requestProjects = async () => {
  const response = await octokit.rest.repos.listForAuthenticatedUser();
  return response.data;
};

const requestLanguages = async(repo: string, owner: string) => {
  const response = await octokit.rest.repos.listLanguages({ owner: owner, repo: repo });
  return response.data;
}

const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  pushed_at: z.string(),
  owner: z.object({
    login: z.string(),
  }),
});

const LanguageSchema = z.object({
  language: z.string(),
  bytes: z.number(),
});


export const projectsRouter = createTRPCRouter({
  getProjects: publicProcedure.query(async () => {
    const projects = await requestProjects() as unknown as Project[];
    const validatedProjects = projects.map((project) => RepoSchema.parse(project)); 
    return validatedProjects as unknown as Project[] || [];
  }),
});

export const languagesRouter = createTRPCRouter({
  getLanguages: publicProcedure.input(z.object({
    repo: z.string(),
    owner: z.string(),
  })).query(async (opts) => {
    const languages = await requestLanguages(opts.input.repo, opts.input.owner);
    const validatedLanguages = Object.keys(languages).map((language) => LanguageSchema.parse({ language, bytes: languages[language] }));
    return validatedLanguages as Language[] || [];
  }),
});

