# Portfolio website

Built using [Create T3 app](https://create.t3.gg/en/introduction)

# Description

This is my portfolio website. It lists my projects and experience. Projects
and skills are pulled from the GitHub API at request time and cached with
Next.js Cache Components.

# Technologies used

- Next.js (App Router, React Server Components)
- React Three Fiber
- Tailwind
- Typescript

# Development

Create a `.env` file with a GitHub personal access token:

```
GITHUB_TOKEN=ghp_...
```

Then:

```
bun install
bun dev
```

End-to-end tests run with Playwright: `bun run test:e2e`.
