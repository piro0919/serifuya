import React, { FC } from "react";
import NextHead from "next/head";
import { NextSeo, NextSeoProps } from "next-seo";

export type SeoProps = Pick<NextSeoProps, "canonical" | "title">;

const Seo: FC<SeoProps> = ({ canonical, title }) => (
  <>
    <NextHead>
      <link href="/images/favicon.ico" rel="icon" />
      <meta charSet="utf-8" />
      <meta content="ie=edge" httpEquiv="x-ua-compatible" />
    </NextHead>
    <NextSeo
      canonical={`https://serifuya.kk-web.link${canonical}`}
      description="女の子のボイスフリー素材を無料で配布しています"
      facebook={{
        appId: "230514991919530",
      }}
      openGraph={{
        description: "女の子のボイスフリー素材を無料で配布しています",
        images: [
          {
            height: 630,
            url: "https://serifuya.kk-web.link/images/card.png",
            width: 1200,
          },
        ],
        title: `${title ? `${title} | ` : ""}女の子のボイスフリー素材 せりふや`,
        url: `https://serifuya.kk-web.link${canonical}`,
      }}
      title={`${title ? `${title} | ` : ""}女の子のボイスフリー素材 せりふや`}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  </>
);

export default Seo;
