//import { z } from "zod";
import { Octokit } from "octokit";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const octokit = new Octokit({auth:process.env.GITHUB_TOKEN});

const requestProjects = () =>{
    return octokit.rest.users.getAuthenticated();
}

export const projectsRouter = createTRPCRouter({
  hello: publicProcedure
    .query(() => {
      return requestProjects();
    }),
});
