import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import HeadNav from "components/headnav";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Felix Luciano Porfolio</title>
      </Head>
      <HeadNav/>
      <Component {...pageProps} />
      <Analytics/>
    </>
  );
};

export default api.withTRPC(MyApp);
