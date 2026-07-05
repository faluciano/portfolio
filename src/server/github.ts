import "server-only";
import { z } from "zod";
import { Octokit } from "@octokit/rest";
import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { env } from "~/env";
import type { ClientProject, Language, Project } from "~/types";

const octokit = new Octokit({
  auth: env.GITHUB_TOKEN,
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

async function getCachedProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("github-projects");

  const projects = await fetchProjects();
  const languages = await fetchLanguages(
    projects.map((p) => ({ repo: p.name, owner: p.owner.login })),
  );
  return projects.map((project) => ({
    ...project,
    languages: languages[project.name] ?? [],
  }));
}

/**
 * Projects for the client, trimmed of fields the UI never reads
 * (`owner`, `created_at`) to keep the RSC payload small.
 */
export async function getProjects(): Promise<ClientProject[]> {
  // Defer the GitHub fetch to request time so a build-time API failure
  // (rate limit, outage, missing token) never breaks the static build; the
  // section streams in and falls back to <ErrorBoundary> on failure instead.
  await connection();
  const projects = await getCachedProjects();
  return projects.map(({ owner, created_at, ...project }) => project);
}

/**
 * Aggregated language byte counts across all projects. Returned instead of
 * full project objects so the Skills section payload stays tiny.
 */
export async function getSkills(): Promise<Language[]> {
  // Deferred to request time as well — see getProjects() for rationale.
  await connection();
  const projects = await getCachedProjects();
  const counts: Record<string, number> = {};

  for (const project of projects) {
    for (const lang of project.languages) {
      counts[lang.language] = (counts[lang.language] ?? 0) + lang.bytes;
    }
  }

  return Object.entries(counts).map(([language, bytes]) => ({
    language,
    bytes,
  }));
}
