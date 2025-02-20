import { z } from "zod";
import { Octokit } from "octokit";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

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

const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  pushed_at: z.string(),
  owner: z.object({
    login: z.string(),
  }),
});

type RepoType = z.infer<typeof RepoSchema>;

const requestProjects = async (): Promise<RepoType[]> => {
  const cached = getFromCache('projects');
  if (cached) return cached as RepoType[];

  const response = await octokit.rest.repos.listForAuthenticatedUser();
  const data = response.data as unknown[];
  setCache('projects', data);
  return data as RepoType[];
};

const requestLanguages = async (repos: {repo: string, owner: string}[]) => {
  const results: Record<string, Record<string, number>> = {};
  
  await Promise.all(
    repos.map(async ({repo, owner}) => {
      const cacheKey = `lang_${owner}_${repo}`;
      const cached = getFromCache(cacheKey);
      
      if (cached) {
        results[repo] = cached as Record<string, number>;
        return;
      }

      const response = await octokit.rest.repos.listLanguages({
        owner,
        repo,
      });
      
      // Filter out any undefined values and convert to Record<string, number>
      results[repo] = Object.fromEntries(
        Object.entries(response.data)
          .filter((entry): entry is [string, number] => typeof entry[1] === 'number')
      );
      
      setCache(cacheKey, results[repo]);
    })
  );

  return results;
};

const LanguageSchema = z.object({
  language: z.string(),
  bytes: z.number(),
});

// Export a single router with all procedures
export const githubRouter = createTRPCRouter({
  getProjectsWithLanguages: publicProcedure.query(async () => {
    const projects = await requestProjects();
    
    const validatedProjects = projects
      .filter((p: unknown): p is RepoType => p !== null)
      .map((project: RepoType) => RepoSchema.parse(project));

    const languages = await requestLanguages(
      validatedProjects.map((p: RepoType) => ({
        repo: p.name,
        owner: p.owner.login
      }))
    );

    return validatedProjects.map((project: RepoType) => ({
      ...project,
      languages: Object.entries(languages[project.name] || {}).map(([language, bytes]) => ({
        language,
        bytes
      }))
    }));
  }),
});
