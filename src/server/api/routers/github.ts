import { z } from "zod";
import { Octokit } from "@octokit/rest";
import { unstable_cache } from "next/cache";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Project, Language } from "~/types";

if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is not set");
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Schema for validating GitHub API responses
const UserSchema = z.object({
  login: z.string(),
});

const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  pushed_at: z.string(),
  created_at: z.string(),
  owner: z.object({
    login: z.string(),
  }),
  stargazers_count: z.number(),
  fork: z.boolean(),
  homepage: z.string().nullable(),
  topics: z.array(z.string()).default([]),
});

type RepoType = z.infer<typeof RepoSchema>;

const ReposSchema = z.array(RepoSchema);

const fetchProjects = async (): Promise<RepoType[]> => {
  const userResponse = await octokit.rest.users.getAuthenticated();
  const user = UserSchema.safeParse(userResponse.data);
  if (!user.success) throw new Error("Failed to validate user data");

  const ownedResponse = await octokit.rest.repos.listForAuthenticatedUser({
    visibility: "public",
    sort: "pushed",
    per_page: 100,
  });
  const ownedRepos = ReposSchema.safeParse(ownedResponse.data);
  if (!ownedRepos.success) throw new Error("Failed to validate owned repos");

  return ownedRepos.data
    .filter((repo) => !repo.fork)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    );
};

const fetchLanguages = async (
  repos: { repo: string; owner: string }[],
): Promise<Record<string, Language[]>> => {
  const results: Record<string, Record<string, number>> = {};

  await Promise.all(
    repos.map(async ({ repo, owner }) => {
      try {
        const languageResponse = await octokit.rest.repos.listLanguages({
          owner,
          repo,
        });

        const parsedData = z
          .record(z.string(), z.number())
          .safeParse(languageResponse.data);
        if (!parsedData.success) {
          console.error(`Failed to validate language data for ${repo}`);
          results[repo] = {};
          return;
        }

        results[repo] = parsedData.data;
      } catch (error) {
        console.error(`Error fetching languages for ${repo}:`, error);
        results[repo] = {};
      }
    }),
  );

  return Object.fromEntries(
    Object.entries(results).map(([repo, langs]) => [
      repo,
      Object.entries(langs).map(([language, bytes]) => ({
        language,
        bytes,
      })),
    ]),
  );
};

// Cache the combined fetch for 1 hour, revalidate in background
const getCachedProjectsWithLanguages = unstable_cache(
  async (): Promise<Project[]> => {
    const projects = await fetchProjects();

    const languages = await fetchLanguages(
      projects.map((p) => ({
        repo: p.name,
        owner: p.owner.login,
      })),
    );

    return projects.map((project) => ({
      ...project,
      languages: languages[project.name] ?? [],
    }));
  },
  ["github-projects-with-languages"],
  { revalidate: 3600 }, // 1 hour
);

// Export a single router with all procedures
export const githubRouter = createTRPCRouter({
  getProjectsWithLanguages: publicProcedure.query(async () => {
    return getCachedProjectsWithLanguages();
  }),
});
