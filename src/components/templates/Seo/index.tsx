import React, { FC } from "react";
import NextHead from "next/head";
import { NextSeo, NextSeoProps } from "next-seo";
import { useI18n } from "next-localization";

export type SeoProps = Pick<NextSeoProps, "canonical" | "title">;

const Seo: FC<SeoProps> = ({ canonical, title }) => {
  const { t } = useI18n();

  return (
    <>
      <NextHead>
        <link href="/images/icons/favicon.ico" rel="icon" />
        <meta charSet="utf-8" />
        <meta content="ie=edge" httpEquiv="x-ua-compatible" />
        <meta content="kk-web" name="author" />
      </NextHead>
      <NextSeo
        canonical={`https://serifuya.kk-web.link${canonical}`}
        description={t("common.description")}
        facebook={{
          appId: "230514991919530",
        }}
        openGraph={{
          description: t("common.description"),
          images: [
            {
              height: 630,
              url: "https://serifuya.kk-web.link/images/card.png",
              width: 1200,
            },
          ],
          title: `${title ? `${title} | ` : ""}${t("common.subTitle")}`,
          url: `https://serifuya.kk-web.link${canonical}`,
        }}
        title={`${title ? `${title} | ` : ""}${t("common.subTitle")}`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
    </>
  );
};

export default Seo;
