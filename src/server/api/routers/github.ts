import { z } from "zod";
import { Octokit } from "octokit";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const requestProjects = async () => {
  const response = await octokit.rest.repos.listForAuthenticatedUser();
  return response.data;
};

const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  pushed_at: z.string(),
  language: z.string().nullable(),
});

export const projectsRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    const projects = await requestProjects();
    const validatedProjects = projects.map((project) => RepoSchema.parse(project));
    return validatedProjects;
  }),
});
