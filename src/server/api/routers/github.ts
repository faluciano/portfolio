import { z } from "zod";
import { Octokit } from "@octokit/rest";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Project, Language } from "~/types";

if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is not set");
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Cache responses for 1 hour
const cache = new Map<string, {data: unknown, timestamp: number}>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

const getFromCache = (key: string) => {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
};

const setCache = (key: string, data: unknown) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
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

const requestProjects = async (): Promise<RepoType[]> => {
  const cached = getFromCache('projects');
  if (cached) return cached as RepoType[];

  try {
    // Get authenticated user's information
    const userResponse = await octokit.rest.users.getAuthenticated();
    const user = UserSchema.safeParse(userResponse.data);
    if (!user.success) throw new Error('Failed to validate user data');

    // Fetch owned repositories
    const ownedResponse = await octokit.rest.repos.listForAuthenticatedUser({
      visibility: 'public',
      sort: 'pushed',
      per_page: 100,
    });
    const ownedRepos = z.array(RepoSchema).safeParse(ownedResponse.data);
    if (!ownedRepos.success) throw new Error('Failed to validate owned repos');

    // Fetch repositories user has contributed to
    const contributedResponse = await octokit.rest.search.repos({
      q: `user:${user.data.login} fork:true`,
      sort: 'updated',
      per_page: 100,
    });
    const contributedRepos = z.object({ items: z.array(RepoSchema) }).safeParse(contributedResponse.data);
    if (!contributedRepos.success) throw new Error('Failed to validate contributed repos');

    // Fetch starred repositories
    const starredResponse = await octokit.rest.activity.listReposStarredByAuthenticatedUser({
      per_page: 100,
    });
    const starredRepos = z.array(RepoSchema).safeParse(starredResponse.data);
    if (!starredRepos.success) throw new Error('Failed to validate starred repos');

    // Combine all repositories and remove duplicates
    const allRepos = [
      ...ownedRepos.data,
      ...contributedRepos.data.items,
      ...starredRepos.data,
    ].filter((repo) => {
      // Include if:
      // 1. User owns the repo, or
      // 2. It's a fork that's been modified
      return (
        repo.owner.login === user.data.login ||
        (repo.fork && repo.pushed_at !== repo.created_at)
      );
    });

    // Remove duplicates while preserving order
    const uniqueRepos = Array.from(
      new Map(allRepos.map(repo => [repo.id, repo])).values()
    );

    // Create base repo objects with required fields
    const enrichedRepos = uniqueRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      pushed_at: repo.pushed_at,
      created_at: repo.created_at,
      owner: {
        login: repo.owner.login,
      },
      stargazers_count: repo.stargazers_count,
      fork: repo.fork,
      homepage: repo.homepage,
    }));

    setCache('projects', enrichedRepos);
    return enrichedRepos;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

const requestLanguages = async (repos: {repo: string, owner: string}[]): Promise<Record<string, Language[]>> => {
  const results: Record<string, Record<string, number>> = {};
  
  await Promise.all(
    repos.map(async ({repo, owner}) => {
      const cacheKey = `lang_${owner}_${repo}`;
      const cached = getFromCache(cacheKey);
      
      if (cached) {
        results[repo] = cached as Record<string, number>;
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
        setCache(cacheKey, results[repo]);
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
