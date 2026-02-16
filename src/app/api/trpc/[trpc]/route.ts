import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- tRPC adapter expects Pages API types but we use App Router fetch handler
      createTRPCContext({ req: req as any, res: {} as any, info: {} as any }),
  });

export { handler as GET, handler as POST };
