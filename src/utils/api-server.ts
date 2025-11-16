import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// Create a server-side tRPC caller for use in Server Components
// The context is intentionally empty as per the tRPC setup
export const api = appRouter.createCaller(
  createTRPCContext({
    req: {} as any,
    res: {} as any,
    info: {} as any,
  })
);