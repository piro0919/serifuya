import React, { ComponentPropsWithoutRef, FC } from "react";
import NextHead from "next/head";

export type HeadProps = {
  title?: ComponentPropsWithoutRef<"title">["children"];
};

const Head: FC<HeadProps> = ({ title }) => (
  <NextHead>
    <meta charSet="utf-8" />
    <link rel="icon" href="/images/favicon.ico" />
    <meta content="ie=edge" http-equiv="x-ua-compatible" />
    <meta
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
      name="viewport"
    />
    <title>{`${
      title ? `${title} | ` : ""
    }女の子のボイスフリー素材 せりふや`}</title>
  </NextHead>
);

export default Head;
