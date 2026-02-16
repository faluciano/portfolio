import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// Create a server-side tRPC caller for use in Server Components
// The context is intentionally empty as per the tRPC setup
export const api = appRouter.createCaller(
  /* eslint-disable @typescript-eslint/no-unsafe-assignment -- tRPC adapter expects Pages API types but server components use a stub context */
  createTRPCContext({
    req: {} as any,
    res: {} as any,
    info: {} as any,
  }),
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
);
