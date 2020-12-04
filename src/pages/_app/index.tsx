import React, { FC } from "react";
import { AppProps } from "next/app";
import "../../styles/globals.scss";
import "ress";
import "react-h5-audio-player/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "rc-pagination/assets/index.css";

export type MyAppProps = AppProps;

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
