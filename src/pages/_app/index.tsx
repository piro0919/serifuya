import React, { FC, useEffect } from "react";
import { AppProps } from "next/app";
import "../../styles/globals.scss";
import "ress";
import "react-h5-audio-player/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "rc-pagination/assets/index.css";
import { useRouter } from "next/dist/client/router";
import * as gtag from "lib/gtag";

export type MyAppProps = AppProps;

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);

      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default MyApp;
