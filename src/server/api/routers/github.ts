import { z } from "zod";
import { Octokit } from "@octokit/rest";
import { connection } from "next/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Project, Language } from "~/types";
import fs from "fs/promises";
import path from "path";

if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is not set");
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Cache responses for 1 hour
const CACHE_DIR = path.resolve(".cache");
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

// Ensure the cache directory exists
const ensureCacheDir = async () => {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error("Failed to create cache directory:", error);
  }
};

void ensureCacheDir();

const getFromCache = async <T>(key: string, schema: z.ZodType<T>): Promise<T | null> => {
  const cacheFile = path.join(CACHE_DIR, `${key}.json`);
  try {
    const stats = await fs.stat(cacheFile);
    if (Date.now() - stats.mtime.getTime() > CACHE_TTL) {
      return null; // Cache expired
    }
    const data = await fs.readFile(cacheFile, "utf-8");
    const parsedData = schema.safeParse(JSON.parse(data));
    if (parsedData.success) {
      return parsedData.data;
    } else {
      console.error(`Failed to parse cached data for ${key}:`, parsedData.error);
      return null;
    }
  } catch (error) {
    return null; // Not found or other error
  }
};

const setCache = async (key: string, data: unknown) => {
  const cacheFile = path.join(CACHE_DIR, `${key}.json`);
  try {
    await fs.writeFile(cacheFile, JSON.stringify(data), "utf-8");
  } catch (error) {
    console.error(`Failed to write to cache file ${key}.json:`, error);
  }
};

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
});

type RepoType = z.infer<typeof RepoSchema>;

const ReposSchema = z.array(RepoSchema);

const requestProjects = async (): Promise<RepoType[]> => {
  const cached = await getFromCache("projects", ReposSchema);
  if (cached) {
    return cached;
  }

  try {
    // Get authenticated user's information
    const userResponse = await octokit.rest.users.getAuthenticated();
    const user = UserSchema.safeParse(userResponse.data);
    if (!user.success) throw new Error("Failed to validate user data");

    // Fetch owned repositories only (leaner, focuses on your work)
    const ownedResponse = await octokit.rest.repos.listForAuthenticatedUser({
      visibility: "public",
      sort: "pushed",
      per_page: 100,
    });
    const ownedRepos = ReposSchema.safeParse(ownedResponse.data);
    if (!ownedRepos.success) throw new Error("Failed to validate owned repos");

    // Filter and sort on the server for consistent ordering
    const filteredRepos = ownedRepos.data
      .filter((repo) => !repo.fork)
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      );

    void setCache("projects", filteredRepos);
    return filteredRepos;
  } catch (error) {
    console.error("Error fetching projects:", error);

    // If we hit an error (e.g. GitHub rate limiting), try to fall back to
    // any stale cache instead of returning an empty list.
    const stale = await getFromCache("projects", ReposSchema).catch(() => null);
    if (stale) {
      return stale;
    }

    return [];
  }
};

const requestLanguages = async (repos: {repo: string, owner: string}[]): Promise<Record<string, Language[]>> => {
  const results: Record<string, Record<string, number>> = {};
  
  await Promise.all(
    repos.map(async ({repo, owner}) => {
      const cacheKey = `lang_${owner}_${repo}`;
      const cached = await getFromCache(cacheKey, z.record(z.string(), z.number()));
      
      if (cached) {
        results[repo] = cached;
        return;
      }

      try {
        const languageResponse = await octokit.rest.repos.listLanguages({
          owner,
          repo,
        });
        
        const parsedData = z.record(z.string(), z.number()).safeParse(languageResponse.data);
        if (!parsedData.success) {
          console.error(`Failed to validate language data for ${repo}`);
          results[repo] = {};
          return;
        }
        
        results[repo] = parsedData.data;
        void setCache(cacheKey, results[repo]);
      } catch (error) {
        console.error(`Error fetching languages for ${repo}:`, error);
        results[repo] = {};
      }
    })
  );

  // Convert the results to the Language[] format
  return Object.fromEntries(
    Object.entries(results).map(([repo, langs]) => [
      repo,
      Object.entries(langs).map(([language, bytes]) => ({
        language,
        bytes,
      })),
    ])
  );
};

// Export a single router with all procedures
export const githubRouter = createTRPCRouter({
  getProjectsWithLanguages: publicProcedure.query(async () => {
    // Mark this as dynamic - requires runtime data fetching
    await connection();
    
    const projects = await requestProjects();
    
    const languages = await requestLanguages(
      projects.map((p) => ({
        repo: p.name,
        owner: p.owner.login
      }))
    );

    return projects.map((project) => ({
      ...project,
      languages: languages[project.name] ?? [],
    })) satisfies Project[];
  }),
});
