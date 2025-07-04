import { type AppType } from "next/app";
import { api, queryClient } from "~/utils/api";
import "~/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import HeadNav from "~/components/headnav";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Felix Luciano - Software Engineer Portfolio"
          />
          <title>Felix Luciano - Portfolio</title>
          <meta
            name="keywords"
            content="Felix Luciano, Felix Luciano Salomon, Felix Luciano Portfolio, Felix Luciano Salomon Portfolio, Felix Luciano Resume, Felix Luciano Salomon Resume, Felix Luciano Projects, Felix Luciano Salomon Projects, Felix Luciano Skills, Felix Luciano Salomon Skills, Felix Luciano Contact, Felix Luciano Salomon Contact, Felix Luciano Software Engineer, Felix Luciano Salomon Software Engineer, Felix Luciano Developer, Felix Luciano Salomon Developer, Felix Luciano Full Stack Developer, Felix Luciano Salomon Full Stack Developer, Felix Luciano Frontend Developer, Felix Luciano Salomon Frontend Developer, Felix Luciano Backend Developer, Felix Luciano Salomon Backend Developer, Felix Luciano Web Developer, Felix Luciano Salomon Web Developer, Felix Luciano JavaScript Developer, Felix Luciano Salomon JavaScript Developer, Felix Luciano TypeScript Developer, Felix Luciano Salomon TypeScript Developer, Felix Luciano Python Developer, Felix Luciano Salomon Python Developer, Felix Luciano Java Developer, Felix Luciano Salomon Java Developer, Felix Luciano C++ Developer, Felix Luciano Salomon C++ Developer, Felix Luciano Go Developer, Felix Luciano Salomon Go Developer, Felix Software, Felix Developer, Felix Full Stack Developer, Felix Frontend Developer, Felix Backend Developer, Felix Web Developer, Felix JavaScript Developer, Felix TypeScript Developer, Felix Python Developer, Felix Java Developer, Felix C++ Developer, Felix Go Developer, Felix Luciano Salomon NJIT, Felix Luciano Salomon New Jersey Institute of Technology, Felix NJIT, Felix New Jersey Institute of Technology, Felix Luciano NJIT, Felix Luciano Salomon NJI, Felix AWS, Felix Luciano AWS, Felix Luciano Salomon AWS"
          />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>"
          />
        </Head>
        <main className={`${GeistSans.variable} ${GeistMono.variable}`}>
          <HeadNav />
          <Component {...pageProps} />
          <SpeedInsights />
        </main>
      </QueryClientProvider>
    </api.Provider>
  );
};

export default MyApp;
