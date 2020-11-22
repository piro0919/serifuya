import React, { FC } from "react";
import { AppProps } from "next/app";
import "../../styles/globals.scss";
import "ress";
export type MyAppProps = AppProps;

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
