import React, { useEffect, useMemo } from "react";
import { AppProps } from "next/app";
import "../../styles/globals.scss";
import "ress";
import "react-h5-audio-player/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "rc-pagination/assets/index.css";
import { useRouter } from "next/dist/client/router";
import * as gtag from "lib/gtag";
import { I18nProvider } from "next-localization";
import { NextPage } from "next";

export type MyAppProps = AppProps;

const MyApp: NextPage<MyAppProps> = ({
  Component,
  pageProps: { lngDict, ...pageProps },
}) => {
  const router = useRouter();
  const locale = useMemo(() => {
    const { locale } = router;

    return locale;
  }, [router]);
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

  return (
    <I18nProvider lngDict={lngDict} locale={locale}>
      <Component {...pageProps} />
    </I18nProvider>
  );
};

export default MyApp;
