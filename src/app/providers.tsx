"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useMemo, type ReactNode } from "react";
import superjson from "superjson";
import { api, queryClient } from "~/utils/api";

export function Providers({ children }: { children: ReactNode }) {
  const trpcClient = useMemo(
    () =>
      api.createClient({
        links: [
          httpBatchLink({
            url: "/api/trpc",
            transformer: superjson,
          }),
        ],
      }),
    [],
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </QueryClientProvider>
      </api.Provider>
    </ThemeProvider>
  );
}